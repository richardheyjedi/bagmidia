const port = 9223;
const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
const target = targets.find((entry) => entry.type === "page");
if (!target) throw new Error("Nenhuma página CDP encontrada");
const socket = new WebSocket(target.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  const resolver = pending.get(message.id);
  if (resolver) { pending.delete(message.id); resolver(message); }
});
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
const send = (method, params = {}) => new Promise((resolve) => {
  const id = ++sequence;
  pending.set(id, resolve);
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result?.result?.value;
};

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "http://127.0.0.1:5173/" });
await new Promise((resolve) => setTimeout(resolve, 1000));

const menu = await evaluate(`(() => { const b = document.querySelector('header button'); b.click(); return { expanded: b.getAttribute('aria-expanded'), open: document.querySelector('.mobile-panel').classList.contains('is-open') }; })()`);
const faq = await evaluate(`(() => { const b = document.querySelector('#faq button'); b.click(); const panel = b.closest('div[data-state]').querySelector('[role="region"]'); return { expanded: b.getAttribute('aria-expanded'), hidden: panel.hidden, answer: panel.textContent.trim() }; })()`);
const modal = await evaluate(`(() => { document.querySelector('#exemplos button[aria-label^="Ampliar"]').click(); return document.querySelector('.image-modal').classList.contains('is-open'); })()`);
const config = await evaluate(`(() => { const button = document.querySelector('#configurador [role="button"][aria-label^="Espaço"]'); button.dispatchEvent(new MouseEvent('click', { bubbles:true })); const text = [...document.querySelectorAll('#configurador p, #configurador span')].find((node) => node.textContent.trim().startsWith('1 espaços selecionados')); return Boolean(text); })()`);
console.log(JSON.stringify({ menu, faq, modalOpen: modal, configuratorSelectionUpdated: config }, null, 2));
socket.close();
