"use client";

import Script from "next/script";

const SITE_ID = "6883334a2c2e5c0d3344a5e4";

export function WebflowRuntime() {
  return (
    <>
      <Script id="webflow-document-classes" strategy="afterInteractive">
        {`(function(w,d){var n=d.documentElement,t=' w-mod-';n.className+=t+'js';if('ontouchstart' in w||(w.DocumentTouch&&d instanceof DocumentTouch)){n.className+=t+'touch';}})(window,document);`}
      </Script>
      <Script
        src={`https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8_site=${SITE_ID}.js`}
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/js/PSp0viuQwClK.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/js/8LKIzST87WPJ.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/js/j4KiEknB06Rx.js"
        strategy="afterInteractive"
      />
    </>
  );
}
