/**
 * Genera la hoja de UN ejercicio, con lo que el lector escribio, como PDF.
 *
 * Sin librerias: un PDF valido es texto plano con una tabla de referencias
 * cruzadas al final. Meter jsPDF (~350KB) para esto seria pagar de mas —
 * aqui solo necesitamos texto en una pagina carta.
 *
 * Limitacion asumida: las fuentes base de PDF usan WinAnsi, asi que los
 * acentos se codifican por byte. Es suficiente para español.
 */

import type { Exercise } from "./exercises";
import { answerToBlocks, type ExerciseAnswer, type PrintBlock } from "./exerciseExperiences";

const PAGE_W = 612; // carta, 72dpi
const PAGE_H = 792;
const MARGIN = 56;
const LINE = 15;

/** WinAnsiEncoding: el subconjunto que ocupa el español. */
const WIN_ANSI: Record<string, number> = {
  "á": 0xe1, "é": 0xe9, "í": 0xed, "ó": 0xf3, "ú": 0xfa, "ü": 0xfc, "ñ": 0xf1,
  "Á": 0xc1, "É": 0xc9, "Í": 0xcd, "Ó": 0xd3, "Ú": 0xda, "Ü": 0xdc, "Ñ": 0xd1,
  "¿": 0xbf, "¡": 0xa1, "—": 0x97, "–": 0x96, "“": 0x93, "”": 0x94, "‘": 0x91,
  "’": 0x92, "·": 0xb7, "…": 0x85, "«": 0xab, "»": 0xbb, "°": 0xb0,
};

function pdfString(text: string): string {
  let out = "";
  for (const char of text) {
    const code = WIN_ANSI[char] ?? char.charCodeAt(0);
    if (char === "(" || char === ")" || char === "\\") out += "\\" + char;
    else if (code < 32 || code > 255) out += " ";
    else if (code > 126) out += "\\" + code.toString(8).padStart(3, "0");
    else out += char;
  }
  return out;
}

/** Parte un texto en renglones que quepan en `width` puntos. */
function wrap(text: string, size: number, width: number): string[] {
  // Helvetica ~0.5em por caracter en promedio; suficiente para maquetar.
  const perChar = size * 0.5;
  const max = Math.max(8, Math.floor(width / perChar));
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (!line.length) line = word;
    else if ((line + " " + word).length <= max) line += " " + word;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

/** El PDF como texto. Separado del Blob para poder verificarlo en pruebas. */
export function buildExercisePdfString(exercise: Exercise, answers: ExerciseAnswer): string {
  const pages: string[][] = [[]];
  let ops = pages[0];
  let y = PAGE_H - MARGIN;
  const width = PAGE_W - MARGIN * 2;

  const startPage = () => {
    ops = [];
    pages.push(ops);
    y = PAGE_H - MARGIN;
    put(`${exercise.code} · ${exercise.title.toUpperCase()} · CONTINÚA`, 8, "F2", 0.45);
    y -= 3;
    rule();
  };
  const ensureSpace = (height: number) => {
    if (y - height < MARGIN + 24) startPage();
  };
  const put = (text: string, size: number, font: "F1" | "F2", gray = 0) => {
    ensureSpace(size + 5);
    ops.push(`BT /${font} ${size} Tf ${gray} g 1 0 0 1 ${MARGIN} ${y} Tm (${pdfString(text)}) Tj ET`);
    y -= size + 5;
  };
  const block = (text: string, size: number, font: "F1" | "F2", gray = 0, lead = LINE) => {
    for (const paragraph of text.split(/\r?\n/)) {
      for (const line of wrap(paragraph, size, width)) {
        ensureSpace(lead);
        ops.push(`BT /${font} ${size} Tf ${gray} g 1 0 0 1 ${MARGIN} ${y} Tm (${pdfString(line)}) Tj ET`);
        y -= lead;
      }
    }
  };
  const rule = () => {
    ensureSpace(18);
    ops.push(`0.8 g ${MARGIN} ${y} m ${PAGE_W - MARGIN} ${y} l S`);
    y -= 18;
  };

  // Encabezado, como en el cuaderno
  put(`${exercise.code} · ${exercise.title.toUpperCase()}`, 9, "F2", 0.45);
  y -= 4;
  put(exercise.title, 21, "F2");
  y -= 6;
  rule();

  block("PARA QUÉ SIRVE", 8, "F2", 0.45, 13);
  block(exercise.purpose, 10, "F1", 0.15);
  y -= 10;

  // Cada interacción se vuelve bloques lineales antes de maquetarse.
  // El fallback mantiene compatible el generador para llamadas antiguas.
  const configured = answerToBlocks(exercise.code, answers);
  const fallback: PrintBlock[] = Object.entries(answers).flatMap(([label, value]) => {
    const lines = (Array.isArray(value) ? value : [value]).map((item) => item.trim()).filter(Boolean);
    return lines.length ? [{ label, lines }] : [];
  });
  const blocks = configured.length ? configured : fallback;

  for (const { label, lines } of blocks) {
    block(label.toUpperCase(), 8, "F2", 0.45, 13);
    for (const line of lines) block(line, 11, "F1", 0);
    y -= 12;
  }

  const close = exercise.signal || exercise.expect;
  if (close) {
    ensureSpace(70);
    rule();
    block("CÓMO SABES QUE FUNCIONÓ", 8, "F2", 0.45, 13);
    block(close, 9, "F1", 0.3, 12);
  }

  // Pie constante en todas las páginas.
  pages.forEach((page, index) => page.push(
    `BT /F1 7.5 Tf 0.5 g 1 0 0 1 ${MARGIN} ${MARGIN - 16} Tm (${pdfString(`DESPEGA · ${exercise.num} / 20 · página ${index + 1} / ${pages.length} · lareddeluz.com`)}) Tj ET`,
  ));

  const pageIds = pages.map((_, index) => 5 + index * 2);
  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];
  pages.forEach((page, index) => {
    const pageId = pageIds[index];
    const contentId = pageId + 1;
    const content = page.join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  return pdf;
}

export function buildExercisePdf(exercise: Exercise, answers: ExerciseAnswer): Blob {
  const pdf = buildExercisePdfString(exercise, answers);
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i += 1) bytes[i] = pdf.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: "application/pdf" });
}

export function downloadExercisePdf(exercise: Exercise, answers: ExerciseAnswer) {
  const url = URL.createObjectURL(buildExercisePdf(exercise, answers));
  const link = document.createElement("a");
  link.href = url;
  link.download = `DESPEGA-${exercise.code}-${exercise.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
