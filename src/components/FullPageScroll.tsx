"use client";

import { ReactNode, useEffect, useRef } from "react";

const SCROLL_EDGE_EPS = 2;
const WHEEL_THRESHOLD = 8;
const TOUCH_THRESHOLD = 28;
const SNAP_DURATION = 620;

export default function FullPageScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchLastYRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;

    const getSections = () =>
      Array.from(el.querySelectorAll<HTMLElement>("[data-snap]"));

    const getCurrentIndex = (sections: HTMLElement[]) => {
      if (!sections.length) return 0;

      const current = el.scrollTop;
      let nearestIdx = 0;
      let nearestDist = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const dist = Math.abs(sections[i].offsetTop - current);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      }

      return nearestIdx;
    };

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateTo = (targetTop: number, duration = SNAP_DURATION) => {
      const startTop = el.scrollTop;
      const delta = targetTop - startTop;

      if (Math.abs(delta) < 1) {
        lockRef.current = false;
        return;
      }

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(p);

        el.scrollTop = startTop + delta * eased;

        if (p < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          el.scrollTop = targetTop;
          lockRef.current = false;
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const findScrollableParent = (
      target: EventTarget | null,
      root: HTMLElement
    ): HTMLElement | null => {
      let node = target instanceof HTMLElement ? target : null;

      while (node && node !== root) {
        const style = window.getComputedStyle(node);
        const canScrollY =
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight + 1;

        if (canScrollY) return node;
        node = node.parentElement;
      }

      return null;
    };

    const shouldLetInnerScrollHandle = (
      target: EventTarget | null,
      deltaY: number
    ) => {
      const scroller = findScrollableParent(target, el);
      if (!scroller) return false;

      const top = scroller.scrollTop;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const atTop = top <= SCROLL_EDGE_EPS;
      const atBottom = top >= max - SCROLL_EDGE_EPS;

      if (deltaY > 0 && !atBottom) return true; // scroll down inside
      if (deltaY < 0 && !atTop) return true;    // scroll up inside

      return false;
    };

    const goOnePage = (dir: "down" | "up") => {
      if (lockRef.current) return;

      const sections = getSections();
      if (!sections.length) return;

      const currentIdx = getCurrentIndex(sections);
      const nextIdx =
        dir === "down"
          ? Math.min(currentIdx + 1, sections.length - 1)
          : Math.max(currentIdx - 1, 0);

      if (nextIdx === currentIdx) return;

      lockRef.current = true;
      animateTo(sections[nextIdx].offsetTop, SNAP_DURATION);
    };

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      if (shouldLetInnerScrollHandle(e.target, e.deltaY)) return;

      e.preventDefault();
      goOnePage(e.deltaY > 0 ? "down" : "up");
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const y = e.touches[0].clientY;
      touchStartYRef.current = y;
      touchLastYRef.current = y;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;

      if (lockRef.current) {
        e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      const lastY = touchLastYRef.current ?? currentY;
      const deltaY = lastY - currentY; // >0 means swipe up => go down

      touchLastYRef.current = currentY;

      if (shouldLetInnerScrollHandle(e.target, deltaY)) return;

      // block native page bounce when we plan to snap
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (lockRef.current) return;
      if (touchStartYRef.current == null) return;
      if (!e.changedTouches.length) return;

      const endY = e.changedTouches[0].clientY;
      const dy = touchStartYRef.current - endY;

      touchStartYRef.current = null;
      touchLastYRef.current = null;

      if (Math.abs(dy) < TOUCH_THRESHOLD) return;
      if (shouldLetInnerScrollHandle(e.target, dy)) return;

      goOnePage(dy > 0 ? "down" : "up");
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-svh w-full overflow-y-auto scrollbar-none"
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "none",
        touchAction: "pan-y",
      }}
    >
      {children}
    </div>
  );
}
