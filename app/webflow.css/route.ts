const CSS_URL =
  "https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/css/D76lzFt38IJM.css";

const ASSET_BASE =
  "https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await fetch(CSS_URL, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    return new Response("/* Failed to load Webflow stylesheet */", {
      status: 502,
      headers: { "Content-Type": "text/css; charset=utf-8" },
    });
  }

  const css = await response.text();

  // The original stylesheet references fonts/images via ../asset.ext.
  // Once served from our own /webflow.css route those relative URLs would break,
  // so resolve them back to the original asset directory.
  const rewritten = css.replace(
    /url\((['"]?)\.\.\/([^)'"\s]+)\1\)/g,
    (_match, quote, assetPath) =>
      `url(${quote}${ASSET_BASE}${assetPath}${quote})`,
  );

  return new Response(rewritten, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
