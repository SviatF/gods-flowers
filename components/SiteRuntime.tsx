"use client";

import { useEffect } from "react";

function setupMenus() {
  const cleanups: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>(".navbar-container").forEach((container) => {
    const openButton = container.querySelector<HTMLElement>(".menu-button");
    const closeButton = container.querySelector<HTMLElement>(".menu-button-close");
    const menu = container.querySelector<HTMLElement>(".nav-menu");
    const blur = container.querySelector<HTMLElement>(".navbar-bg-blur");
    if (!openButton || !closeButton || !menu || !blur) return;

    const setOpen = (isOpen: boolean) => {
      menu.classList.toggle("gf-open", isOpen);
      blur.classList.toggle("gf-open", isOpen);
      document.documentElement.style.overflow = isOpen ? "hidden" : "";
      openButton.setAttribute("aria-expanded", String(isOpen));
    };
    const open = () => setOpen(true);
    const close = () => setOpen(false);

    openButton.setAttribute("role", "button");
    openButton.setAttribute("tabindex", "0");
    openButton.setAttribute("aria-label", "Відкрити меню");
    openButton.setAttribute("aria-expanded", "false");
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("aria-label", "Закрити меню");

    const onOpenKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") open();
    };
    const onCloseKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") close();
    };

    openButton.addEventListener("click", open);
    openButton.addEventListener("keydown", onOpenKey);
    closeButton.addEventListener("click", close);
    closeButton.addEventListener("keydown", onCloseKey);
    blur.addEventListener("click", close);

    cleanups.push(() => {
      openButton.removeEventListener("click", open);
      openButton.removeEventListener("keydown", onOpenKey);
      closeButton.removeEventListener("click", close);
      closeButton.removeEventListener("keydown", onCloseKey);
      blur.removeEventListener("click", close);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupSliders() {
  const cleanups: Array<() => void> = [];

  document.querySelectorAll<HTMLElement>(".w-slider").forEach((slider) => {
    const mask = slider.querySelector<HTMLElement>(".w-slider-mask");
    const slides = Array.from(mask?.children ?? []).filter(
      (node): node is HTMLElement => node instanceof HTMLElement && node.classList.contains("w-slide"),
    );
    const prev = slider.querySelector<HTMLElement>(".w-slider-arrow-left");
    const next = slider.querySelector<HTMLElement>(".w-slider-arrow-right");
    const nav = slider.querySelector<HTMLElement>(".w-slider-nav");
    if (!mask || slides.length === 0 || !prev || !next) return;

    let index = 0;
    let startX: number | null = null;
    const duration = Number(slider.dataset.duration || "500");

    mask.classList.add("gf-slider-mask");
    mask.style.transitionDuration = `${duration}ms`;
    slides.forEach((slide) => slide.classList.add("gf-slider-slide"));

    const dots: HTMLElement[] = [];
    if (nav) {
      nav.innerHTML = "";
      slides.forEach((_, dotIndex) => {
        const dot = document.createElement("div");
        dot.className = "w-slider-dot";
        dot.setAttribute("role", "button");
        dot.setAttribute("tabindex", "0");
        dot.setAttribute("aria-label", `Слайд ${dotIndex + 1}`);
        dot.addEventListener("click", () => goTo(dotIndex));
        dot.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") goTo(dotIndex);
        });
        nav.appendChild(dot);
        dots.push(dot);
      });
    }

    const render = () => {
      mask.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("w-active", active);
        dot.classList.toggle("gf-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    function goTo(target: number) {
      const count = slides.length;
      index = (target + count) % count;
      render();
    }

    const goPrev = () => goTo(index - 1);
    const goNext = () => goTo(index + 1);
    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? null;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (startX == null) return;
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const delta = endX - startX;
      startX = null;
      if (Math.abs(delta) > 45) delta < 0 ? goNext() : goPrev();
    };

    prev.addEventListener("click", goPrev);
    next.addEventListener("click", goNext);
    mask.addEventListener("touchstart", onTouchStart, { passive: true });
    mask.addEventListener("touchend", onTouchEnd, { passive: true });
    render();

    cleanups.push(() => {
      prev.removeEventListener("click", goPrev);
      next.removeEventListener("click", goNext);
      mask.removeEventListener("touchstart", onTouchStart);
      mask.removeEventListener("touchend", onTouchEnd);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupAnchorScrolling() {
  const handler = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}

export function SiteRuntime() {
  useEffect(() => {
    const cleanups = [setupMenus(), setupSliders(), setupAnchorScrolling()];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
