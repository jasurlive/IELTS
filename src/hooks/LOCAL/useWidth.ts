import { useEffect, useRef, useState } from "react";

// live pixel width of an element, so SVG charts draw at real size (text stays readable on phones)
export function useWidth<T extends HTMLElement = HTMLDivElement>(fallback = 640, min = 280) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(min, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [min]);
  return [ref, width] as const;
}
