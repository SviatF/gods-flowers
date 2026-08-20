import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { gunzipSync } from "node:zlib";

const SITE_ID = "6883334a2c2e5c0d3344a5e4";
const SITE_BASE = `https://cdn.prod.website-files.com/${SITE_ID}/`;
const CSS_URL = `${SITE_BASE}css/D76lzFt38IJM.css`;
const COMPLETE = "public/assets/.complete";

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchBytes(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`Failed ${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function save(url, dest) {
  if (await exists(dest)) return;
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, await fetchBytes(url));
  console.log(`asset ${dest}`);
}

async function getSnapshotHtml() {
  const page = await readFile("app/online/page.tsx", "utf8");
  const encoded = page.match(/const snapshot = "([A-Za-z0-9+/=]+)";/)?.[1];
  if (!encoded) throw new Error("Could not locate the embedded online snapshot");
  return gunzipSync(Buffer.from(encoded, "base64")).toString("utf8");
}

function destination(ref) {
  return join("public", "assets", ...ref.split("/").map((part) => decodeURIComponent(part)));
}

function remoteForPageRef(ref) {
  if (ref.startsWith("shared/")) return `https://cdn.prod.website-files.com/img/${ref.slice(7)}`;
  return SITE_BASE + ref;
}

function cssAsset(raw) {
  if (!raw || raw.startsWith("data:")) return null;
  const url = new URL(raw, CSS_URL);
  if (url.hostname !== "cdn.prod.website-files.com") return null;
  const sitePrefix = `/${SITE_ID}/`;
  if (url.pathname.startsWith(sitePrefix)) {
    return { url: url.href, ref: url.pathname.slice(sitePrefix.length) };
  }
  if (url.pathname.startsWith("/img/")) {
    return { url: url.href, ref: `shared/${url.pathname.slice(5)}` };
  }
  return null;
}

async function main() {
  if (await exists(COMPLETE)) {
    console.log("assets already vendored");
    return;
  }

  await mkdir("public/assets/css", { recursive: true });
  let css = (await fetchBytes(CSS_URL)).toString("utf8");
  const downloads = new Map();

  css = css.replace(/url\((['"]?)(.*?)\1\)/g, (full, quote, raw) => {
    const item = cssAsset(raw);
    if (!item) return full;
    downloads.set(item.ref, item.url);
    return `url(${quote}/assets/${item.ref}${quote})`;
  });
  await writeFile("public/assets/css/site.css", css);

  const html = await getSnapshotHtml();
  for (const match of html.matchAll(/\/assets\/([^\s"'<>),]+)/g)) {
    const ref = match[1];
    if (ref !== "css/site.css") downloads.set(ref, remoteForPageRef(ref));
  }

  downloads.set("koFABjcAIxiD.png", `${SITE_BASE}koFABjcAIxiD.png`);

  const queue = [...downloads.entries()];
  const workers = Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const [ref, url] = queue.shift();
      await save(url, destination(ref));
    }
  });
  await Promise.all(workers);

  await writeFile(COMPLETE, `Vendored ${downloads.size} assets + CSS\n`);
  console.log(`done: ${downloads.size} assets + CSS`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
