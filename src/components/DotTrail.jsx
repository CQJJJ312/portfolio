import React, { useEffect, useRef } from 'react';

// The CSS grid remains the static background. This viewport-sized canvas only
// recolors active dots, using the same page-relative grid coordinates.
export default function DotTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const page = canvas.closest('.page');
    const context = canvas.getContext('2d');
    if (!context) return;
    const input = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const dots = new Map();
    const radius = 100, duration = 800;
    let frame = null, width = 0, height = 0, dpr = 1;
    let stepX = 24, stepY = 24, originX = 0, originY = 0;
    let color = '#f14632';
    let pointer = null;
    const enabled = () => input.matches && !reduced.matches;

    const draw = now => {
      frame = null;
      context.clearRect(0, 0, width, height);
      if (!enabled()) { dots.clear(); return; }
      const rect = page.getBoundingClientRect();
      if (pointer) stamp(pointer.x - rect.left, pointer.y - rect.top, now, rect);
      context.fillStyle = color;
      for (const [key, dot] of dots) {
        const age = (now - dot.time) / duration;
        if (age >= 1) { dots.delete(key); continue; }
        const y = rect.top + originY + dot.row * stepY;
        const x = originX + dot.col * stepX;
        if (y < -2 || y > height + 2) continue;
        const rise = Math.min(1, (now - dot.born) / 160);
        const easedRise = rise * rise * (3 - 2 * rise);
        const activity = dot.strength * (1 - age) ** 2 * easedRise;
        // Only a small size change; every dot stays on its original coordinate.
        context.globalAlpha = activity;
        context.beginPath();
        context.arc(x, y, .9 + 1.2 * activity, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      if (dots.size || pointer) frame = requestAnimationFrame(draw);
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(draw); };
    const resize = () => {
      const rect = page.getBoundingClientRect();
      const style = getComputedStyle(page);
      const size = style.backgroundSize.split(' ').map(parseFloat);
      const offset = style.backgroundPosition.split(' ').map(parseFloat);
      stepX = size[0]; stepY = size[1] || size[0];
      originX = offset[0] + stepX / 2;
      originY = offset[1] + stepY / 2;
      color = style.getPropertyValue('--red').trim();
      width = rect.width; height = innerHeight; dpr = devicePixelRatio || 1;
      canvas.style.left = `${rect.left}px`;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };
    const stamp = (x, y, now, rect) => {
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      for (let col = Math.max(0, Math.ceil((x-radius-originX)/stepX)); col <= Math.floor((x+radius-originX)/stepX); col++) {
        for (let row = Math.max(0, Math.ceil((y-radius-originY)/stepY)); row <= Math.floor((y+radius-originY)/stepY); row++) {
          const px = originX + col*stepX, py = originY + row*stepY;
          if (px > rect.width || py > rect.height) continue;
          const distance = Math.hypot(px-x, py-y) / radius;
          if (distance >= 1) continue;
          const strength = (1-distance*distance) ** 2;
          const key = `${col}:${row}`, old = dots.get(key);
          const remaining = old ? old.strength * Math.max(0, 1-(now-old.time)/duration) ** 2 : 0;
          dots.set(key, {col, row, time: now, born: old?.born ?? now, strength: Math.max(strength, remaining)});
        }
      }
    };
    const move = event => {
      if (!enabled() || event.pointerType !== 'mouse') return;
      if (dpr !== (devicePixelRatio || 1)) resize();
      const rect = page.getBoundingClientRect();
      pointer = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom ? {x:event.clientX,y:event.clientY} : null;
      schedule();
    };
    const leave = () => { pointer = null; schedule(); };
    const reset = () => { pointer = null; dots.clear(); schedule(); };
    const visibility = () => { if (document.hidden) reset(); };
    const observer = new ResizeObserver(resize);
    observer.observe(page);
    window.addEventListener('pointermove', move, {passive:true});
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    input.addEventListener('change', reset);
    reduced.addEventListener('change', reset);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      window.visualViewport?.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      input.removeEventListener('change', reset);
      reduced.removeEventListener('change', reset);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-trail" aria-hidden="true"/>;
}
