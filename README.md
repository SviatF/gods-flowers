# Gods Flowers / Freesia Academy clone

Next.js App Router reproduction of the supplied Freesia Academy Online page.

## Rendering

`app/online/page.tsx` exports `dynamic = "force-dynamic"`, so `/online` is rendered on the server for every request (SSR). The root route `/` re-exports the same page.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

The page snapshot is stored inside the server component and decompressed during server rendering. The original Webflow stylesheet, image/font assets and Webflow runtime scripts are loaded from the original public Webflow CDN to preserve the supplied design and interactions without duplicating binary assets in this repository.
