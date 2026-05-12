import { useRef, useEffect, useCallback } from 'react';
import './RouletteWheel.css';

const TAU = Math.PI * 2;
const SLOTS = 37;
const SEG = TAU / SLOTS;

// Standard European wheel order (clockwise from 0)
const WHEEL_ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
  11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
  22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const RED = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

function segColor(n) {
  if (n === 0) return '#1c6e3d';
  return RED.has(n) ? '#b52525' : '#1a1a1a';
}

function drawWheel(ctx, S, wheelAngle, ballAngle, ballR, winNum) {
  const cx = S / 2;
  const cy = S / 2;
  const OR = S * 0.44;   // outer radius of number segments
  const TRACK = S * 0.48; // ball track outer radius
  const HUB = S * 0.085;

  ctx.clearRect(0, 0, S, S);

  // ── Wood outer rim ──────────────────────────────────────────
  ctx.beginPath();
  ctx.arc(cx, cy, TRACK * 1.1, 0, TAU);
  const woodGrad = ctx.createRadialGradient(cx, cy, OR, cx, cy, TRACK * 1.1);
  woodGrad.addColorStop(0, '#4a2800');
  woodGrad.addColorStop(0.5, '#6b3a10');
  woodGrad.addColorStop(1, '#3a1e00');
  ctx.fillStyle = woodGrad;
  ctx.fill();

  // Outer gold ring
  ctx.beginPath();
  ctx.arc(cx, cy, TRACK * 1.07, 0, TAU);
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = S * 0.006;
  ctx.stroke();

  // ── Ball track (metallic grey band) ────────────────────────
  ctx.beginPath();
  ctx.arc(cx, cy, TRACK * 1.0, 0, TAU);
  const trackGrad = ctx.createRadialGradient(cx, cy, OR * 0.97, cx, cy, TRACK);
  trackGrad.addColorStop(0, '#666');
  trackGrad.addColorStop(0.5, '#999');
  trackGrad.addColorStop(1, '#555');
  ctx.fillStyle = trackGrad;
  ctx.fill();

  // Inner track edge
  ctx.beginPath();
  ctx.arc(cx, cy, OR * 0.985, 0, TAU);
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = S * 0.006;
  ctx.stroke();

  // ── Number segments ─────────────────────────────────────────
  WHEEL_ORDER.forEach((num, i) => {
    const a0 = wheelAngle + i * SEG - SEG / 2;
    const a1 = a0 + SEG;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, OR * 0.96, a0, a1);
    ctx.closePath();

    const isWin = winNum !== null && winNum !== undefined && num === winNum;
    ctx.fillStyle = isWin ? '#ffd700' : segColor(num);
    ctx.fill();
    ctx.strokeStyle = '#c8a84b';
    ctx.lineWidth = 0.7;
    ctx.stroke();
  });

  // ── Fret dividers ───────────────────────────────────────────
  WHEEL_ORDER.forEach((_, i) => {
    const a = wheelAngle + i * SEG - SEG / 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * HUB * 2, cy + Math.sin(a) * HUB * 2);
    ctx.lineTo(cx + Math.cos(a) * OR * 0.96, cy + Math.sin(a) * OR * 0.96);
    ctx.strokeStyle = '#c8a84b';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // ── Numbers ──────────────────────────────────────────────────
  const textR = HUB * 2 + (OR * 0.96 - HUB * 2) * 0.62;
  ctx.font = `bold ${Math.round(S * 0.027)}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  WHEEL_ORDER.forEach((num, i) => {
    const a = wheelAngle + i * SEG;
    ctx.save();
    ctx.translate(cx + Math.cos(a) * textR, cy + Math.sin(a) * textR);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillStyle = '#fff';
    ctx.fillText(String(num), 0, 0);
    ctx.restore();
  });

  // ── Inner gold ring (border between numbers & hub) ──────────
  ctx.beginPath();
  ctx.arc(cx, cy, HUB * 2, 0, TAU);
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = S * 0.01;
  ctx.stroke();

  // ── Hub ──────────────────────────────────────────────────────
  const hubGrad = ctx.createRadialGradient(
    cx - HUB * 0.3, cy - HUB * 0.3, HUB * 0.05,
    cx, cy, HUB,
  );
  hubGrad.addColorStop(0, '#fff5a0');
  hubGrad.addColorStop(0.35, '#d4af37');
  hubGrad.addColorStop(1, '#7a5200');
  ctx.beginPath();
  ctx.arc(cx, cy, HUB, 0, TAU);
  ctx.fillStyle = hubGrad;
  ctx.fill();
  ctx.strokeStyle = '#c8a84b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Hub spokes
  for (let i = 0; i < 8; i++) {
    const a = wheelAngle + (i * TAU) / 8;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * HUB, cy + Math.sin(a) * HUB);
    ctx.lineTo(cx + Math.cos(a) * HUB * 1.9, cy + Math.sin(a) * HUB * 1.9);
    ctx.strokeStyle = 'rgba(200,168,75,0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ── Ball ─────────────────────────────────────────────────────
  if (ballR > 0) {
    const bx = cx + Math.cos(ballAngle) * ballR;
    const by = cy + Math.sin(ballAngle) * ballR;
    const BR = S * 0.024;

    // Shadow
    ctx.beginPath();
    ctx.arc(bx + 1.5, by + 2, BR, 0, TAU);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fill();

    // Glossy ball
    const bg = ctx.createRadialGradient(
      bx - BR * 0.35, by - BR * 0.38, BR * 0.04,
      bx, by, BR,
    );
    bg.addColorStop(0, '#ffffff');
    bg.addColorStop(0.45, '#e8e8e8');
    bg.addColorStop(1, '#999999');
    ctx.beginPath();
    ctx.arc(bx, by, BR, 0, TAU);
    ctx.fillStyle = bg;
    ctx.fill();

    // Shine dot
    ctx.beginPath();
    ctx.arc(bx - BR * 0.3, by - BR * 0.32, BR * 0.22, 0, TAU);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();
  }
}

export default function RouletteWheel({ spinning, result, onAnimationEnd }) {
  const canvasRef = useRef(null);
  const wheelAngle = useRef(0);
  const ballAngle = useRef(0);
  const ballR = useRef(0);
  const winNum = useRef(null);
  const rafRef = useRef(null);
  const idleRaf = useRef(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawWheel(ctx, canvas.width, wheelAngle.current, ballAngle.current, ballR.current, winNum.current);
  }, []);

  // Idle slow rotation
  useEffect(() => {
    if (spinning) return;
    winNum.current = null;

    const tick = () => {
      wheelAngle.current += 0.004;
      redraw();
      idleRaf.current = requestAnimationFrame(tick);
    };
    idleRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(idleRaf.current);
  }, [spinning, redraw]);

  // Spin animation
  useEffect(() => {
    if (!spinning || result === null || result === undefined) return;
    cancelAnimationFrame(idleRaf.current);
    cancelAnimationFrame(rafRef.current);

    const S = canvasRef.current?.width ?? 400;
    const TRACK_R = S * 0.472;
    const POCKET_R = S * 0.375;
    const DURATION = 5200;

    const startWheelAngle = wheelAngle.current;
    const startBallAngle = ballAngle.current || 0;

    // Final wheel angle — land result at top (−π/2)
    const resultIdx = WHEEL_ORDER.indexOf(result);
    const MARKER = -Math.PI / 2;
    const normCurrent = ((startWheelAngle % TAU) + TAU) % TAU;
    const normTarget = ((MARKER - resultIdx * SEG) % TAU + TAU) % TAU;
    let delta = normTarget - normCurrent;
    if (delta <= 0) delta += TAU;
    const finalWheelAngle = startWheelAngle + delta + 6 * TAU;

    // Final ball angle — land on the winning pocket
    const finalBallTarget = finalWheelAngle + resultIdx * SEG;
    const rawDiff = finalBallTarget - startBallAngle;
    const normDiff = ((rawDiff % TAU) + TAU) % TAU;
    const ccwDist = TAU - normDiff; // counter-clockwise distance to target
    const totalBallRot = -(ccwDist + 9 * TAU); // go CCW 9+ laps

    ballR.current = TRACK_R;
    const startTime = performance.now();

    const frame = (now) => {
      const raw = Math.min((now - startTime) / DURATION, 1);
      // Wheel: ease-out cubic
      const wEase = 1 - Math.pow(1 - raw, 3);
      // Ball: slightly faster ease-out so it slows before wheel
      const bEase = 1 - Math.pow(1 - raw, 2.2);

      wheelAngle.current = startWheelAngle + (finalWheelAngle - startWheelAngle) * wEase;
      ballAngle.current = startBallAngle + totalBallRot * bEase;
      ballR.current = TRACK_R - (TRACK_R - POCKET_R) * Math.pow(raw, 1.8);

      if (raw >= 1) {
        winNum.current = result;
        ballAngle.current = finalWheelAngle + resultIdx * SEG;
        ballR.current = POCKET_R;
        redraw();
        onAnimationEnd?.();
        return;
      }

      redraw();
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spinning, result, redraw, onAnimationEnd]);

  return (
    <div className="wheel-perspective">
      <div className="wheel-tilt">
        <canvas ref={canvasRef} width={400} height={400} className="wheel-canvas" />
      </div>
      <div className="wheel-table-surface" />
    </div>
  );
}
