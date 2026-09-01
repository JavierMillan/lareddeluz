import { writeFileSync } from "node:fs";

const [url, output, widthText, heightText] = process.argv.slice(2);
const width = Number(widthText);
const height = Number(heightText);
const targets = await fetch("http://127.0.0.1:9223/json").then((response) => response.json());
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("No page target available");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const callback = pending.get(message.id);
  if (!callback) return;
  pending.delete(message.id);
  if (message.error) callback.reject(new Error(message.error.message));
  else callback.resolve(message.result);
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: width,
  screenHeight: height,
});
await send("Page.navigate", { url });
await new Promise((resolve) => setTimeout(resolve, 1400));
const metrics = await send("Runtime.evaluate", {
  expression: `(() => {
    const button = document.querySelector('.workbook-back');
    if (!button) return null;
    const rect = button.getBoundingClientRect();
    const style = getComputedStyle(button);
    return { text: button.textContent, x: rect.x, y: rect.y, width: rect.width, height: rect.height, color: style.color, display: style.display, opacity: style.opacity };
  })()`,
  returnByValue: true,
});
console.log(JSON.stringify(metrics.result.value));
const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
writeFileSync(output, Buffer.from(screenshot.data, "base64"));
socket.close();
