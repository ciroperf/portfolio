"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll() {
  return <ReactLenis root options={{ anchors: true, lerp: 0.09 }} />;
}
