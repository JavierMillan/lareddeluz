import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const required = [
  "dist/index.html",
  "dist/despega/index.html",
  "dist/ejercicios/index.html",
  "dist/CNAME",
  "dist/assets/despega-workbook.pdf",
];

for (const file of required) {
  await access(path.join(root, file));
}

const home = await readFile(path.join(root, "dist/index.html"), "utf8");
const despega = await readFile(path.join(root, "dist/despega/index.html"), "utf8");

if (!home.includes("La Red de Luz")) {
  throw new Error("Falta identidad de La Red de Luz");
}
if (!despega.includes("DESPEGA")) {
  throw new Error("Falta identidad de DESPEGA");
}
if (home.includes("despega.html")) {
  throw new Error("Persiste la ruta legacy despega.html");
}

// El cuaderno tiene que quedar alcanzable: es el entregable de /ejercicios
const ejercicios = await readFile(path.join(root, "dist/ejercicios/index.html"), "utf8");
if (!ejercicios.includes("Cuaderno de trabajo")) {
  throw new Error("Falta identidad del cuaderno de trabajo");
}
// El enlace vive en el bundle de DESPEGA, no en su HTML
const { readdir } = await import("node:fs/promises");
const bundles = await readdir(path.join(root, "dist/assets"));
const despegaBundles = bundles.filter((name) => name.startsWith("despega-") && name.endsWith(".js"));
if (!despegaBundles.length) {
  throw new Error("No se encontro el bundle de DESPEGA");
}
const linked = await Promise.all(despegaBundles.map(async (name) =>
  (await readFile(path.join(root, "dist/assets", name), "utf8")).includes("ejercicios")));
if (!linked.some(Boolean)) {
  throw new Error("DESPEGA no enlaza el cuaderno de trabajo");
}

console.log("Build contract: OK");
