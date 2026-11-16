/**
 * VancoBiz Club card tilt + light. Plain JS, no dependencies (WordPress: load it in the footer
 * and call vbcCardTilt()).
 *
 * The card leans toward the pointer and a set of CSS variables drives the light:
 *   --vbc-rx / --vbc-ry  tilt in degrees
 *   --vbc-mx / --vbc-my  pointer position on the card, 0%..100% (glare follows it)
 *   --vbc-angle          direction of the light, used by the frame rim glint
 *   --vbc-ring           0..1, how close the pointer is to the medallion (ring brightens)
 *   --vbc-on             0..1, fades every light layer in and out
 * Skipped for touch screens and when the visitor prefers reduced motion.
 */
export function vbcCardTilt(root = document) {
  if (typeof window === "undefined") return () => {};
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduced) return () => {};

  const MAX_TILT = 9; // degrees, close to the main site's service cards
  const cleanups = [];

  root.querySelectorAll(".vbc-card").forEach((card) => {
    const cur = { x: 0.5, y: 0.5, on: 0 };
    const tgt = { x: 0.5, y: 0.5, on: 0 };
    let raf = 0;

    const render = () => {
      // Ease toward the target every frame (frame-rate independent enough for UI).
      cur.x += (tgt.x - cur.x) * 0.14;
      cur.y += (tgt.y - cur.y) * 0.14;
      cur.on += (tgt.on - cur.on) * 0.12;

      const dx = cur.x - 0.5;
      const dy = cur.y - 0.5;
      const s = card.style;
      s.setProperty("--vbc-ry", `${(dx * 2 * MAX_TILT * cur.on).toFixed(2)}deg`);
      s.setProperty("--vbc-rx", `${(-dy * 2 * MAX_TILT * cur.on).toFixed(2)}deg`);
      s.setProperty("--vbc-mx", `${(cur.x * 100).toFixed(1)}%`);
      s.setProperty("--vbc-my", `${(cur.y * 100).toFixed(1)}%`);
      s.setProperty("--vbc-angle", `${((Math.atan2(dy, dx) * 180) / Math.PI + 90).toFixed(1)}deg`);
      // Medallion sits at 50% / ~30% of the card height (centre of the plate).
      const ring = Math.max(0, 1 - Math.hypot(dx, cur.y - 0.3) * 2.6);
      s.setProperty("--vbc-ring", (ring * cur.on).toFixed(3));
      s.setProperty("--vbc-on", cur.on.toFixed(3));

      const settled =
        Math.abs(tgt.x - cur.x) < 0.001 && Math.abs(tgt.y - cur.y) < 0.001 && Math.abs(tgt.on - cur.on) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      tgt.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      tgt.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      tgt.on = 1;
      kick();
    };
    const onLeave = () => {
      tgt.x = 0.5;
      tgt.y = 0.5;
      tgt.on = 0;
      kick();
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
