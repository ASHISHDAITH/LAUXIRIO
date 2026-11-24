"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const BeautyScene = dynamic(() => import("@/components/BeautyScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" aria-hidden="true" />,
});

let webGLAvailable: boolean | undefined;

function getSnapshot() {
  if (typeof window === "undefined") return false;
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 700px)").matches
  ) return false;
  if (webGLAvailable === undefined) {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      webGLAvailable = Boolean(context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webGLAvailable = false;
    }
  }
  return webGLAvailable;
}

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const smallScreen = window.matchMedia("(max-width: 700px)");
  reducedMotion.addEventListener("change", onChange);
  smallScreen.addEventListener("change", onChange);
  window.addEventListener("resize", onChange, { passive: true });
  return () => {
    reducedMotion.removeEventListener("change", onChange);
    smallScreen.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export default function HeroScene() {
  const canRender = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (!canRender) {
    return <div className="scene-fallback" aria-hidden="true"><span /></div>;
  }
  return <BeautyScene />;
}
