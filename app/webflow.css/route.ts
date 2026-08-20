const CSS_URL =
  "https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/css/D76lzFt38IJM.css";

const ASSET_BASE =
  "https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await fetch(CSS_URL, {
    cache: "no-store",
    headers: {
      Accept: "text/css,*/*;q=0.1",
      "Accept-Language": "uk-UA,uk;q=0.9,en;q=0.8",
      Referer: "https://www.freesiaacademy.com/online/",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    return new Response(
      `/* Failed to load Webflow stylesheet: ${response.status} ${response.statusText} */`,
      {
        status: 502,
        headers: { "Content-Type": "text/css; charset=utf-8" },
      },
    );
  }

  const css = await response.text();

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
