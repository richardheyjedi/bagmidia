import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = resolve("docs/research/bagmidia.lovable.app-1118d396/root-8a5edab2/source/index.html");
const outputPath = resolve("index.html");

const source = await readFile(sourcePath, "utf8");
const bodyStart = source.indexOf("<body>");
const bodyEnd = source.indexOf("</body>");
if (bodyStart < 0 || bodyEnd < 0) throw new Error("HTML original sem body válido");

let body = source.slice(bodyStart + "<body>".length, bodyEnd);
body = body.replaceAll("\u0000", "");
body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
body = body.replace(/<aside\s+id="lovable-badge"[\s\S]*?<\/aside>/gi, "");
body = body.replace(/src="\/__l5e\/assets-v1\/[^/]+\/([^"]+)"/g, 'src="/assets/$1"');
body = body.replace(/src="\/assets\/[^/]+\.js"/g, "");
body = body.replace(/style="opacity:0;transform:([^\"]+)"/g, 'data-reveal="$1"');
body = body.replace(/style="opacity:0"/g, 'data-reveal="none"');
body = body.replace(/\s+data-tsr-stream-part=""/g, "");
body = body.replace(/<!--\$-->|<!--\/\$-->|<!-- -->/g, "");

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Anuncie sua empresa nos sacos de pão distribuídos pelas padarias. Publicidade local, física e presente no dia a dia das famílias." />
    <meta property="og:title" content="BAG MÍDIA — Sua marca em circulação" />
    <meta property="og:description" content="Publicidade em sacos de pão: sua marca na rotina e dentro dos lares." />
    <title>BAG MÍDIA — Sua marca em circulação | Publicidade em sacos de pão</title>
    <link rel="icon" type="image/png" href="/assets/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    ${body}
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;

await writeFile(outputPath, html);
console.log(`Prepared ${outputPath}`);
