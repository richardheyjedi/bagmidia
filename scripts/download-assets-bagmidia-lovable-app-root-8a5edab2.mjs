import { mkdir, writeFile } from "node:fs/promises";

const assets = {
  "favicon.png": "https://bagmidia.lovable.app/favicon.png",
  "logo.png": "https://bagmidia.lovable.app/__l5e/assets-v1/d5ce222e-0c82-42e0-a5a3-744913f6bf57/logo.png",
  "saco-bagmidia.png": "https://bagmidia.lovable.app/__l5e/assets-v1/d5bb0604-7295-4b4e-938e-e28f40fdda97/saco-bagmidia.png",
  "mesa-cafe.jpg": "https://bagmidia.lovable.app/__l5e/assets-v1/0de8bc68-2094-49f1-b0d2-28502a8550d8/mesa-cafe.jpg",
  "saco-coca.png": "https://bagmidia.lovable.app/__l5e/assets-v1/11687083-90ea-4b51-9466-d54c784ec059/saco-coca.png",
  "saco-kumon.png": "https://bagmidia.lovable.app/__l5e/assets-v1/51635d48-d163-4e7c-b46f-fb7a7b12955b/saco-kumon.png",
  "saco-padaria.png": "https://bagmidia.lovable.app/__l5e/assets-v1/fa28efb0-23d1-4cd9-8c12-4caf68bbd5c6/saco-padaria.png",
  "mesa-wizard.jpg": "https://bagmidia.lovable.app/__l5e/assets-v1/5d1ceb2b-6529-4112-a709-63c84a86256e/mesa-wizard.jpg",
  "sacos-duo.jpg": "https://bagmidia.lovable.app/__l5e/assets-v1/2480268d-9e96-4af6-a585-b5408f1e65f9/sacos-duo.jpg",
  "sacos-variados.jpg": "https://bagmidia.lovable.app/__l5e/assets-v1/20c678f2-8013-4e7c-8ada-1ae82eed152f/sacos-variados.jpg",
};

await mkdir("public/assets", { recursive: true });
await Promise.all(Object.entries(assets).map(async ([name, url]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  await writeFile(`public/assets/${name}`, Buffer.from(await response.arrayBuffer()));
}));
console.log(`Downloaded ${Object.keys(assets).length} assets.`);
