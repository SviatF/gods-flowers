"use client";

import { useEffect } from "react";
import Script from "next/script";
import brandLogo from "@/public/gods-flowers-logo.png";

const SITE_ID = "6883334a2c2e5c0d3344a5e4";
const BRAND_LOGO = brandLogo.src;

export function WebflowRuntime() {
  useEffect(() => {
    const selectors = [".navbar-logo", ".menu-logo", ".footer-logo"];

    const applyBranding = () => {
      document.querySelectorAll<HTMLElement>(selectors.join(",")).forEach((slot) => {
        slot.style.setProperty("background-image", "none", "important");
        slot.style.setProperty("background", "none", "important");

        // Remove the exported Freesia logo image from the old footer/logo slots.
        slot.querySelectorAll("img:not(.gods-brand-image)").forEach((image) => image.remove());

        let logo = slot.querySelector<HTMLImageElement>("img.gods-brand-image");
        if (!logo) {
          logo = document.createElement("img");
          logo.className = "gods-brand-image";
          logo.alt = "God's Flowers";
          logo.decoding = "async";
          slot.prepend(logo);
        }

        // Use the Next.js-bundled repository asset so the logo cannot break because of a root URL/path issue.
        if (logo.getAttribute("src") !== BRAND_LOGO) {
          logo.setAttribute("src", BRAND_LOGO);
        }
      });
    };

    applyBranding();

    const observer = new MutationObserver(() => applyBranding());
    observer.observe(document.body, { childList: true, subtree: true });

    const timer = window.setTimeout(applyBranding, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

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
