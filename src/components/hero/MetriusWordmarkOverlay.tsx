
"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface Props {
  text?: string;
  textColor?: string;
  shade?: string;
  accent?: string;
  reach?: number;
  speed?: number;
  damping?: number;
  background?: string;
  font?: CSSProperties;
  handles?: {
    size?: number;
    spread?: number;
    labels?: boolean;
  };
  style?: CSSProperties;
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * t;

export default function MetriusWordmarkOverlay({
  text = "METRIUS",
  textColor = "#FFFFFF",
  shade = "#FFFFFF",
  accent = "rgba(255,255,255,0.55)",
  reach = 220,
  speed = 24,
  damping = 60,
  background = "transparent",
  font,
  handles,
  style,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const propsRef = useRef({
    text,
    textColor,
    shade,
    accent,
    reach,
    speed,
    damping,
    font,
    handles,
  });

  propsRef.current = {
    text,
    textColor,
    shade,
    accent,
    reach,
    speed,
    damping,
    font,
    handles,
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;

    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let lastTime = 0;
    let elapsed = 0;
    let disposed = false;

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    let pointerInside = false;

    // The tracking boxes are initialized immediately.
    // They do not depend on a mouse hover to appear.
    const nodes = [
      { x: 0.44, y: 0.40, tx: 0.44, ty: 0.40 },
      { x: 0.55, y: 0.63, tx: 0.55, ty: 0.63 },
      { x: 0.69, y: 0.61, tx: 0.69, ty: 0.61 },
    ];

    const resize = () => {
      width = Math.max(1, host.clientWidth);
      height = Math.max(1, host.clientHeight);

      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();

      pointerInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!pointerInside) return;

      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = (event.clientY - rect.top) / rect.height;
    };

    const onPointerLeave = () => {
      pointerInside = false;
    };

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });

    window.addEventListener("blur", onPointerLeave);

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    function drawDashedLine(
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "rgba(255,255,255,0.40)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.restore();
    }

    function drawBox(
      cx: number,
      cy: number,
      size: number,
      label: string
    ) {
      const x = cx - size / 2;
      const y = cy - size / 2;

      ctx.save();

      // Main tracking rectangle.
      ctx.strokeStyle = "rgba(255,255,255,0.52)";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.strokeRect(x, y, size, size);

      // Small technical corner marks.
      const corner = Math.min(10, size * 0.12);

      const corners = [
        [x, y, 1, 1],
        [x + size, y, -1, 1],
        [x, y + size, 1, -1],
        [x + size, y + size, -1, -1],
      ];

      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1;

      for (const [px, py, dx, dy] of corners) {
        ctx.beginPath();
        ctx.moveTo(px, py + dy * corner);
        ctx.lineTo(px, py);
        ctx.lineTo(px + dx * corner, py);
        ctx.stroke();
      }

      // Coordinate labels remain visible at rest.
      if (propsRef.current.handles?.labels !== false) {
        ctx.font = '10px "SFMono-Regular", Consolas, monospace';
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fillText(label, x + 4, y - 4);
      }

      ctx.restore();
    }

    function render(now: number) {
      if (disposed) return;

      raf = requestAnimationFrame(render);

      const dt = lastTime
        ? Math.min((now - lastTime) / 1000, 0.05)
        : 0;

      lastTime = now;
      elapsed += dt * (Math.max(0, propsRef.current.speed) / 50);

      const opts = propsRef.current;

      mouse.x = lerp(mouse.x, targetMouse.x, 0.12);
      mouse.y = lerp(mouse.y, targetMouse.y, 0.12);

      ctx.clearRect(0, 0, width, height);

      // Responsive type size: considerably smaller than the
      // original template's 200px default.
      const requestedFont = opts.font?.fontSize
        ? parseFloat(String(opts.font.fontSize))
        : width * 0.105;

      const fontSize = clamp(
        Math.min(requestedFont, width * 0.13, height * 0.42),
        24,
        150
      );

      const family =
        opts.font?.fontFamily ||
        '"Helvetica Neue", Helvetica, Arial, sans-serif';

      const weight = opts.font?.fontWeight ?? 300;
      const letterSpacing =
        opts.font?.letterSpacing ?? "-0.035em";

      ctx.save();

      ctx.font = `${weight} ${fontSize}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if ("letterSpacing" in ctx) {
        try {
          (
            ctx as CanvasRenderingContext2D & {
              letterSpacing: string;
            }
          ).letterSpacing = String(letterSpacing);
        } catch {
          // Letter spacing is optional on older browsers.
        }
      }

      const centerX = width * 0.48;
      const centerY = height * 0.48;

      // Measure the complete wordmark for accurate centering.
      const metrics = ctx.measureText(opts.text);
      const wordWidth = metrics.width;

      // A subtle cursor distortion, without changing the
      // wordmark's base color.
      const glyphs = Array.from(opts.text);
      const glyphWidth = wordWidth / Math.max(glyphs.length, 1);

      let cursorX = centerX - wordWidth / 2;

      ctx.textAlign = "left";
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      for (const glyph of glyphs) {
        let offsetY = 0;

        if (pointerInside) {
          const gx = cursorX + glyphWidth / 2;
          const dx = gx - mouse.x * width;
          const dy = centerY - mouse.y * height;
          const distance = Math.hypot(dx, dy);

          const influence = Math.exp(
            -(distance * distance) /
              Math.max(1, opts.reach * opts.reach)
          );

          offsetY =
            Math.sin(distance * 0.04 - elapsed * 2) *
            influence *
            5;
        }

        ctx.fillText(glyph, cursorX, centerY + offsetY);
        cursorX += glyphWidth;
      }

      ctx.restore();

      // Keep the wordmark pure white even when custom
      // colors are passed by the parent component.
      // shade and accent control the technical box styling.

      const boxSize = clamp(
        (opts.handles?.size ?? 109) * (width / 1200),
        54,
        110
      );

      const boxPositions = [
        { x: 0.44, y: 0.40 },
        { x: 0.55, y: 0.63 },
        { x: 0.69, y: 0.61 },
      ];

      const spread = (opts.handles?.spread ?? 27) / 100;

      boxPositions.forEach((anchor, i) => {
        const node = nodes[i];

        // Gentle motion is always running.
        const phase = elapsed * 0.18 + i * 2.0;

        let tx = anchor.x + Math.sin(phase) * 0.004;
        let ty = anchor.y + Math.cos(phase * 0.8) * 0.005;

        // Cursor attraction/distortion only affects positions,
        // not the visibility of the boxes.
        if (pointerInside) {
          const dx = anchor.x - mouse.x;
          const dy = anchor.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          const influence = Math.exp(
            -(dist * dist) / Math.max(0.01, spread * spread)
          );

          tx += dx * influence * 0.035;
          ty += dy * influence * 0.035;
        }

        node.tx = tx;
        node.ty = ty;

        const smoothing = clamp(
          (opts.damping / 100) * 0.12,
          0.02,
          0.2
        );

        node.x = lerp(node.x, node.tx, smoothing);
        node.y = lerp(node.y, node.ty, smoothing);
      });

      const points = nodes.map((node) => ({
        x: node.x * width,
        y: node.y * height,
      }));

      // Draw connections before rectangles so the lines
      // pass underneath the tracking boxes.
      drawDashedLine(
        points[0].x,
        points[0].y,
        points[1].x,
        points[1].y
      );

      drawDashedLine(
        points[1].x,
        points[1].y,
        points[2].x,
        points[2].y
      );

      drawDashedLine(
        points[2].x,
        points[2].y,
        points[0].x,
        points[0].y
      );

      points.forEach((point, index) => {
        const label =
          `${Math.round((point.x / width) * 100)}, ` +
          `${Math.round((point.y / height) * 100)}`;

        drawBox(point.x, point.y, boxSize, label);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      });
    }

    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        background,
        pointerEvents: "none",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
