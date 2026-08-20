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

type Answers = Record<string, string>;

/** El PDF como texto. Separado del Blob para poder verificarlo en pruebas. */
export function buildExercisePdfString(exercise: Exercise, answers: Answers): string {
  const ops: string[] = [];
  let y = PAGE_H - MARGIN;
  const width = PAGE_W - MARGIN * 2;

  const put = (text: string, size: number, font: "F1" | "F2", gray = 0) => {
    ops.push(`BT /${font} ${size} Tf ${gray} g 1 0 0 1 ${MARGIN} ${y} Tm (${pdfString(text)}) Tj ET`);
    y -= size + 5;
  };
  const block = (text: string, size: number, font: "F1" | "F2", gray = 0, lead = LINE) => {
    for (const line of wrap(text, size, width)) {
      ops.push(`BT /${font} ${size} Tf ${gray} g 1 0 0 1 ${MARGIN} ${y} Tm (${pdfString(line)}) Tj ET`);
      y -= lead;
    }
  };
  const rule = () => {
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

  // Lo que escribio el lector: el motivo de esta hoja
  for (const [label, value] of Object.entries(answers)) {
    if (!value.trim()) continue;
    block(label.toUpperCase(), 8, "F2", 0.45, 13);
    block(value, 11, "F1", 0);
    y -= 12;
    if (y < MARGIN + 90) break; // una hoja por ejercicio
  }

  if (y > MARGIN + 60) {
    rule();
    block("CÓMO SABES QUE FUNCIONÓ", 8, "F2", 0.45, 13);
    block(exercise.signal || exercise.expect, 9, "F1", 0.3, 12);
  }

  // Pie
  ops.push(`BT /F1 7.5 Tf 0.5 g 1 0 0 1 ${MARGIN} ${MARGIN - 16} Tm (${pdfString(`DESPEGA · Cuaderno de trabajo · ${exercise.num} / 20 · lareddeluz.com`)}) Tj ET`);

  const content = ops.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];

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

export function buildExercisePdf(exercise: Exercise, answers: Answers): Blob {
  const pdf = buildExercisePdfString(exercise, answers);
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i += 1) bytes[i] = pdf.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: "application/pdf" });
}

export function downloadExercisePdf(exercise: Exercise, answers: Answers) {
  const url = URL.createObjectURL(buildExercisePdf(exercise, answers));
  const link = document.createElement("a");
  link.href = url;
  link.download = `DESPEGA-${exercise.code}-${exercise.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
