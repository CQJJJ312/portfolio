import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function Chair() {
  const [state, setState] = useState('quiet');
  const [hover, setHover] = useState(false);
  const timer = useRef(null), buttonRef = useRef(null);
  useLayoutEffect(() => {
    const button = buttonRef.current, svg = button.querySelector('svg'), page = button.closest('.page');
    let frame;
    const align = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        svg.style.translate = '';
        const rect = svg.getBoundingClientRect(), origin = page.getBoundingClientRect();
        const style = getComputedStyle(page), step = parseFloat(style.backgroundSize);
        const phase = parseFloat(style.backgroundPosition) + step / 2;
        const snap = coordinate => Math.round((coordinate-phase)/step)*step+phase-coordinate;
        svg.style.translate = `${snap(rect.left-origin.left)}px ${snap(rect.top-origin.top)}px`;
      });
    };
    const observer = new ResizeObserver(align); observer.observe(button); observer.observe(page);
    window.addEventListener('resize',align); align();
    return () => {observer.disconnect();window.removeEventListener('resize',align);cancelAnimationFrame(frame);};
  }, []);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let idle, settle;
    const schedule = () => { idle = setTimeout(() => {
      if (!reduced.matches && !hover) {
        setState(previous => previous === 'click' ? previous : 'idle');
        settle = setTimeout(() => { setState(previous => previous === 'click' ? previous : 'quiet'); schedule(); }, 1800);
      } else schedule();
    }, 8000 + Math.random() * 4000); };
    schedule();
    return () => { clearTimeout(idle); clearTimeout(settle); };
  }, [hover]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const click = () => {
    clearTimeout(timer.current); setState('click');
    timer.current = setTimeout(() => setState('quiet'), 1000);
  };
  const mode = state === 'click' ? 'click' : hover ? 'hover' : state;
  return <button ref={buttonRef} className={`chair chair-${mode}`} aria-label="Say hello to the chair" onPointerEnter={() => {setHover(true);setState('quiet');}} onPointerLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} onClick={click}>
    <svg viewBox="0 0 288 312" fill="none" aria-hidden="true">
      <g className="chair-frame" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <g className="chair-back"><path d="M72 168 C62 116 60 65 72 48 Q125 34 192 48 C203 73 195 118 192 144"/><path d="M72 168 Q129 176 192 144"/><circle cx="72" cy="48" r="2.7" fill="currentColor"/><circle cx="192" cy="48" r="2.7" fill="currentColor"/></g>
        <path d="M72 168 Q118 193 168 192 L216 168 Q209 153 192 144"/>
        <path className="chair-leg" d="M168 192 Q179 241 168 288"/>
        <path d="M72 168 Q70 229 48 264 M216 168 Q212 220 240 264 M120 186 Q115 230 120 264"/>
        <circle cx="72" cy="168" r="2.7" fill="currentColor"/><circle cx="168" cy="192" r="2.7" fill="currentColor"/><circle cx="216" cy="168" r="2.7" fill="currentColor"/>
      </g>
      <text x="132" y="109" textAnchor="middle" className="chair-face">{mode === 'click' ? ':D' : mode === 'hover' ? ':)' : mode === 'idle' ? ':|' : '-_-'}</text>
    </svg>
  </button>;
}
