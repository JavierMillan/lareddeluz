import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const required = [
  "dist/index.html",
  "dist/despega/index.html",
  "dist/CNAME",
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

console.log("Build contract: OK");
