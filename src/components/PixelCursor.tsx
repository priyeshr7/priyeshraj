import { useEffect, useRef } from "react";

type TrailPixel = {
  kind: "trail";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  born: number;
  life: number;
};

type BurstPixel = {
  kind: "burst";
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  born: number;
  scatterTime: number;
  holdTime: number;
  returnTime: number;
};

type Pixel = TrailPixel | BurstPixel;

const colors = ["#660066", "#d9ff43", "#f3f0e8", "#13120f", "#b14bb1"];
const pickColor = () => colors[Math.floor(Math.random() * colors.length)];
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
const easeInOut = (value: number) => value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

const PixelCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const lens = lensRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!canvas || !lens || reducedMotion || coarsePointer) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pixels: Pixel[] = [];
    let frame = 0;
    let lastFrame = performance.now();
    let lastTrail = 0;
    let lastX = -100;
    let lastY = -100;
    let lensTimer = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const addTrail = (x: number, y: number, now: number) => {
      const distance = Math.hypot(x - lastX, y - lastY);
      if (now - lastTrail < 22 || distance < 4) return;

      const count = Math.min(3, Math.max(1, Math.floor(distance / 16)));
      for (let index = 0; index < count; index += 1) {
        pixels.push({
          kind: "trail",
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: 2 + Math.random() * 6,
          color: pickColor(),
          born: now,
          life: 420 + Math.random() * 260,
        });
      }

      lastTrail = now;
      lastX = x;
      lastY = y;
      if (!frame) {
        lastFrame = now;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const addBurst = (x: number, y: number, now: number) => {
      for (let index = 0; index < 48; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 28 + Math.random() * 105;
        pixels.push({
          kind: "burst",
          originX: x + (Math.random() - 0.5) * 28,
          originY: y + (Math.random() - 0.5) * 28,
          targetX: x + Math.cos(angle) * distance,
          targetY: y + Math.sin(angle) * distance,
          size: 3 + Math.random() * 9,
          color: pickColor(),
          born: now,
          scatterTime: 240 + Math.random() * 160,
          holdTime: 1700 + Math.random() * 350,
          returnTime: 650,
        });
      }
      lens.classList.add("cursor-pixel-lens--burst");
      window.setTimeout(() => lens.classList.remove("cursor-pixel-lens--burst"), 420);
      if (!frame) {
        lastFrame = now;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      lens.classList.add("cursor-pixel-lens--visible", "cursor-pixel-lens--moving");
      lens.style.setProperty("--cursor-x", `${event.clientX - 24}px`);
      lens.style.setProperty("--cursor-y", `${event.clientY - 24}px`);
      window.clearTimeout(lensTimer);
      lensTimer = window.setTimeout(() => lens.classList.remove("cursor-pixel-lens--moving"), 90);
      addTrail(event.clientX, event.clientY, now);
    };

    const onPointerLeave = () => lens.classList.remove("cursor-pixel-lens--visible");

    const onDoubleClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button, input, textarea, select, label, [role='button']")) return;
      addBurst(event.clientX, event.clientY, performance.now());
    };

    const draw = (now: number) => {
      const delta = Math.min(now - lastFrame, 32);
      lastFrame = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = pixels.length - 1; index >= 0; index -= 1) {
        const pixel = pixels[index];
        const age = now - pixel.born;
        let x = 0;
        let y = 0;
        let opacity = 1;

        if (pixel.kind === "trail") {
          if (age >= pixel.life) {
            pixels.splice(index, 1);
            continue;
          }
          pixel.x += pixel.vx * delta;
          pixel.y += pixel.vy * delta;
          x = pixel.x;
          y = pixel.y;
          opacity = 1 - age / pixel.life;
        } else {
          const returnStart = pixel.scatterTime + pixel.holdTime;
          const total = returnStart + pixel.returnTime;
          if (age >= total) {
            pixels.splice(index, 1);
            continue;
          }

          if (age < pixel.scatterTime) {
            const progress = easeOut(age / pixel.scatterTime);
            x = mix(pixel.originX, pixel.targetX, progress);
            y = mix(pixel.originY, pixel.targetY, progress);
          } else if (age < returnStart) {
            x = pixel.targetX;
            y = pixel.targetY;
          } else {
            const progress = easeInOut((age - returnStart) / pixel.returnTime);
            x = mix(pixel.targetX, pixel.originX, progress);
            y = mix(pixel.targetY, pixel.originY, progress);
            opacity = 1 - progress;
          }
        }

        context.globalAlpha = opacity;
        context.fillStyle = pixel.color;
        context.fillRect(Math.round(x), Math.round(y), pixel.size, pixel.size);
      }

      context.globalAlpha = 1;
      frame = pixels.length ? window.requestAnimationFrame(draw) : 0;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("dblclick", onDoubleClick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(lensTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("dblclick", onDoubleClick);
    };
  }, []);

  return (
    <div className="pixel-effects" aria-hidden="true">
      <canvas ref={canvasRef} className="pixel-effects__canvas" />
      <div ref={lensRef} className="cursor-pixel-lens" />
    </div>
  );
};

export default PixelCursor;
