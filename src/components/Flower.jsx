import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { contactCurve } from './routeMotion';

const originalNodes = [[120,130],[75,65],[140,65],[165,115],[135,155],[112,250],[180,190]];
const expressions = ['symbol-smile', ':)', ':|', '-_-', ':o', ';)', ':P', 'x_x', '^_^'];

export default function Flower() {
  const sheetRef = useRef(null), headRef = useRef(null), faceRef = useRef(null);
  const geometryRef = useRef(null), triggerRef = useRef(() => {});
  const [geometry, setGeometry] = useState(null);
  const [face, setFace] = useState('symbol-smile'), [gone, setGone] = useState(false);
  const mode = useRef('home');
  useLayoutEffect(() => {
    const sheet = sheetRef.current, page = sheet.closest('.page');
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = sheet.getBoundingClientRect(), pageRect = page.getBoundingClientRect();
        const style = getComputedStyle(page);
        const [sx, sy] = style.backgroundSize.split(' ').map(parseFloat);
        const [bx, by] = style.backgroundPosition.split(' ').map(parseFloat);
        const ox = rect.left - pageRect.left, oy = rect.top - pageRect.top;
        const scale = rect.width / 240;
        const nodes = originalNodes.map(([x,y]) => [
          Math.round((ox+x*scale-bx-sx/2)/sx)*sx+bx+sx/2-ox,
          Math.round((oy+y*scale-by-sy/2)/sy)*sy+by+sy/2-oy,
        ]);
        const p = (x,y) => `${x*scale} ${y*scale}`, n = i => nodes[i].join(' ');
        const head = `M${n(0)} C${p(20,140)} ${p(20,60)} ${n(1)} C${p(45,0)} ${p(140,0)} ${n(2)} C${p(200,5)} ${p(235,95)} ${n(3)} C${p(230,160)} ${p(160,210)} ${n(4)} C${p(80,215)} ${p(35,160)} ${n(0)}Z`;
        const body = `M${n(0)} Q${p(145,200)} ${n(5)} M${p(125,195)} Q${p(175,165)} ${n(6)} Q${p(160,217)} ${p(125,211)}`;
        const [stem,leaf]=body.split(' M');
        const next = {width:rect.width,height:260*scale,nodes,head,body,stem,leaf:'M'+leaf,scale};
        geometryRef.current = next; setGeometry(next);
        window.dispatchEvent(new Event('portfolio-flower-measure'));
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(sheet); observer.observe(page);
    window.addEventListener('resize', measure); measure();
    return () => {observer.disconnect();window.removeEventListener('resize',measure);cancelAnimationFrame(frame);};
  }, []);

  useEffect(() => {
    let timer, burst = 0, hold = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const tick = () => {
      if (!reduced.matches && mode.current === 'home') {
        setFace(previous => {
          const choices = expressions.filter(value => value !== previous);
          return choices[Math.floor(Math.random()*choices.length)];
        });
      }
      if (!burst && Math.random() < .15) burst = 2;
      const delay = burst ? (burst--, hold = burst === 0, 170) : hold ? (hold = false, 3400) : 1300 + Math.random()*700;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!geometry || !headRef.current) return;
    const page = sheetRef.current.closest('.page');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame, animation = null, consumed = false, workZone = false, tip = null;
    let pose = null, spinStarted = 0, bounds = null, swayAngle=0, homeSwayStarted=performance.now();
    let contactData=null,contactMix=0,lastContactFrame=0;
    const headBounds = () => bounds ||= headRef.current.querySelector('.flower-hit').getBBox();
    const center = () => {const b=headBounds();return {x:b.x+b.width/2,y:b.y+b.height/2};};
    const home = () => {
      const rect = sheetRef.current.getBoundingClientRect(), c = center();
      return {x:rect.left+c.x,y:rect.top+c.y,k:1,a:0};
    };
    const dock = () => ({x:tip.x,y:tip.y,k:(innerWidth<=700?40:48)/headBounds().width,a:360});
    // Keep the original home contour; the small marker uses five gently varied, hand-drawn lobes.
    let markerContour;
    const markerShape = () => {
      if (markerContour) return markerContour;
      // Restore the original asymmetric five-lobe contour, retained in the home SVG.
      return markerContour={d:geometryRef.current.head,points:geometryRef.current.nodes.slice(0,5)};
    };
    const paint = value => {
      pose = value;
      const c = center(), element = headRef.current;
      element.style.transformOrigin = `${c.x}px ${c.y}px`;
      element.style.transform = `translate3d(${value.x-c.x}px,${value.y-c.y}px,0) rotate(${value.a}deg) scale(${value.k})`;
      element.style.visibility = mode.current === 'away' ? 'hidden' : 'visible';
      element.dataset.state = mode.current;
      element.setAttribute('tabindex', mode.current === 'home' ? '0' : '-1');
      element.setAttribute('aria-hidden', mode.current === 'home' ? 'false' : 'true');
      element.dataset.centerX = value.x; element.dataset.centerY = value.y;
      element.dataset.contactProgress=contactMix;
      page.dataset.flowerOffRoute=String(workZone&&contactMix>.025);
      // Grow the stationary planter only as the same travelling head approaches it.
      const growth=Math.max(0,Math.min(1,(contactMix-.72)/.28));
      page.querySelector('[data-contact-plant]')?.style?.setProperty('--plant-growth',growth);
      element.style.pointerEvents = 'none';
      element.classList.toggle('flower-mini', workZone);
      const g=geometryRef.current, shape=workZone?markerShape():null;
      const phase=(performance.now()-homeSwayStarted)*Math.PI*2/3100;
      const homeActive=mode.current==='home'&&!reduced.matches;
      swayAngle=value.sway ?? (homeActive?5*Math.sin(phase)+.65*Math.sin(2*phase):0);
      const stemAngle=homeActive?1.1*Math.sin(phase-.18):0;
      const joint=g.nodes?.[0], base=g.nodes?.[5];
      const sway=element.querySelector('.flower-sway');
      if(sway&&joint&&base){
        const r=stemAngle*Math.PI/180, dx=joint[0]-base[0],dy=joint[1]-base[1];
        const tx=base[0]+dx*Math.cos(r)-dy*Math.sin(r)-joint[0];
        const ty=base[1]+dx*Math.sin(r)+dy*Math.cos(r)-joint[1];
        sway.setAttribute('transform',`translate(${tx} ${ty}) rotate(${swayAngle} ${joint[0]} ${joint[1]})`);
        sheetRef.current.querySelector('.flower-stem')?.setAttribute('transform',`rotate(${stemAngle} ${base[0]} ${base[1]})`);
        sheetRef.current.querySelector('.flower-leaf')?.setAttribute('transform',`rotate(${homeActive?3.8*Math.sin(phase-.7)+.4*Math.sin(2*phase-1):0} ${125*g.scale} ${195*g.scale})`);
      }
      element.querySelector('.flower-hit').setAttribute('d', shape?shape.d:g.head);
      element.querySelectorAll('.flower-node circle').forEach((circle,i)=>{
        const point=shape?shape.points[i]:g.nodes[i];
        circle.setAttribute('cx',point[0]);circle.setAttribute('cy',point[1]);
      });
      element.querySelector('.flower-hit').setAttribute('stroke-width', String(1.15 / Math.min(1,value.k)));
      element.querySelectorAll('.flower-node circle').forEach(circle=>circle.setAttribute('r',String(Math.max(3.65,1/value.k))));
      const ascii=element.querySelector('.flower-ascii');if(ascii)ascii.style.fontSize = `${Math.max(18*geometryRef.current.scale,7/value.k)}px`;
      const symbol=element.querySelector('.flower-symbol');if(symbol)symbol.setAttribute('transform',`translate(${112*geometryRef.current.scale} ${96*geometryRef.current.scale}) scale(${Math.max(geometryRef.current.scale,8/(24*value.k))})`); 
      faceRef.current?.setAttribute('transform', `${workZone?`translate(${c.x-112*g.scale} ${c.y-96*g.scale}) `:''}rotate(${-value.a} ${112*g.scale} ${96*g.scale})`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const finish = state => {
      mode.current = state; animation = null;
      page.dataset.flowerDocked = state === 'docked' ? 'true' : 'false';
      if (state === 'docked') {spinStarted = performance.now();lastContactFrame=0;}
      if (state === 'home') {homeSwayStarted=performance.now();setGone(false);setFace('symbol-smile');}
    };
    const travel = (state, destination, finalState, duration, bend) => {
      cancelAnimationFrame(frame); frame = null;
      mode.current = state;
      page.dataset.flowerDocked = finalState === 'docked' ? 'true' : 'false';
      if (reduced.matches) {finish(finalState);paint(destination());schedule();return;}
      animation = {from:{...pose},swayFrom:swayAngle,destination,finalState,start:performance.now(),duration,bend};
      schedule();
    };
    function draw(now) {
      frame = null;
      if (animation) {
        const flight = animation, t = Math.min(1,(now-flight.start)/flight.duration);
        const u = t*t*(3-2*t), target = flight.destination(), from = flight.from;
        // A quadratic Bezier arc; the destination is remeasured during scrolling.
        const control = {x:(from.x+target.x)/2 + flight.bend, y:Math.min(from.y,target.y)-120};
        const v = 1-u;
        paint({sway:flight.swayFrom*(1-u),x:v*v*from.x+2*v*u*control.x+u*u*target.x,y:v*v*from.y+2*v*u*control.y+u*u*target.y,k:from.k+(target.k-from.k)*u,a:mode.current === 'escaping' ? (t < .13 ? from.a+5*(t/.13) : 5+(target.a-5)*((t-.13)/.87)) : from.a+(target.a-from.a)*u});
        if (t === 1) {finish(flight.finalState);paint(target);}
        schedule();
      } else if (['docked','contact-flight','contact-docked'].includes(mode.current) && tip) {
        const goal=contactData?.progress||0,elapsed=lastContactFrame?Math.min(64,now-lastContactFrame):16;
        lastContactFrame=now;
        contactMix=reduced.matches?(goal>=.5?1:0):contactMix+(goal-contactMix)*(1-Math.exp(-elapsed/140));
        if(Math.abs(contactMix-goal)<.0005)contactMix=goal;
        const value=dock();
        if(contactData&&contactMix>0){
          Object.assign(value,contactCurve(contactData.start,contactData.end,contactMix));
          mode.current=contactMix===1?'contact-docked':'contact-flight';
        }else mode.current='docked';
        value.a=reduced.matches?0:360+(now-spinStarted)*360/15000;
        paint(value); if(!reduced.matches)schedule();
      } else if (mode.current === 'home') {paint(home());if(!reduced.matches)schedule();}
    }
    const checkZone = () => {
      const work = document.getElementById('work').getBoundingClientRect();
      const hero = document.getElementById('home').getBoundingClientRect();
      // Separate entry and return boundaries prevent reversals around the Work edge.
      const localCenter = home().y-hero.top;
      const entry = Math.max(64,localCenter-innerHeight*.48), exit = Math.max(16,entry-72);
      if (!workZone && (hero.top < -entry || work.top < innerHeight*.65) && tip) {
        workZone = true;
        if (mode.current === 'away' || pose.y < -geometryRef.current.height) {
          pose = {x:-geometryRef.current.width,y:-geometryRef.current.height,k:1,a:-360};
        }
        travel('to-route',dock,'docked',1100,-90);
      } else if (workZone && hero.top > -exit) {
        workZone = false;contactMix=0;contactData=null;
        travel('to-home',home,'home',1200,100);
      } else schedule();
    };
    const onRoute = event => {
      tip = event.detail;contactData=event.detail.contact||null;
      checkZone();
    };
    const escape = () => {
      if (consumed || mode.current !== 'home') return;
      consumed = true; setGone(true);
      const offscreen = () => ({x:-geometryRef.current.width,y:-geometryRef.current.height,k:1,a:-540});
      travel('escaping',offscreen,'away',1300,80);
    };
    triggerRef.current = escape;
    const onMotion = () => { if (animation) {const pending=animation;finish(pending.finalState);paint(pending.destination());} schedule(); };
    const onMeasure = () => {bounds=null;markerContour=null;headRef.current.querySelector('.flower-hit').setAttribute('d',geometryRef.current.head);schedule();};
    pose = home(); paint(pose);
    const circle = page.querySelector('.route-tip');
    if (circle) {
      const rect = page.getBoundingClientRect();
      tip = {x:rect.left+Number(circle.getAttribute('cx')),y:rect.top+Number(circle.getAttribute('cy'))};
    }
    window.addEventListener('portfolio-route-progress',onRoute);
    window.addEventListener('scroll',checkZone,{passive:true});
    window.addEventListener('portfolio-flower-measure',onMeasure);
    reduced.addEventListener('change',onMotion); checkZone();
    return () => {
      cancelAnimationFrame(frame);window.removeEventListener('portfolio-route-progress',onRoute);
      window.removeEventListener('scroll',checkZone);window.removeEventListener('portfolio-flower-measure',onMeasure);
      reduced.removeEventListener('change',onMotion);delete page.dataset.flowerDocked;delete page.dataset.flowerOffRoute;
    };
  }, [Boolean(geometry)]);

  const nodes = (start,end) => geometry.nodes.slice(start,end).map(([x,y],i)=><g className="flower-node" key={start+i}><circle cx={x} cy={y} r="3.65" fill="currentColor"/><text x={x+9} y={y-7}>{String(start+i+1).padStart(2,'0')}</text></g>);
  return <div ref={sheetRef} className="flower-sheet">{geometry && <>
    <svg viewBox={`0 0 ${geometry.width} ${geometry.height}`} className="dot-flower" aria-hidden="true"><g className="flower-stem"><path d={geometry.stem} fill="none" stroke="currentColor" strokeWidth="1.15"/>{nodes(5,6)}<g className="flower-leaf"><path d={geometry.leaf} fill="none" stroke="currentColor" strokeWidth="1.15"/>{nodes(6,7)}</g></g></svg>
    <p className="flower-hint">{gone ? 'Oh. There it goes.' : <>Don't touch me.<br/>Actually... try it.</>}</p>
    {createPortal(<svg ref={headRef} className="flower-head" width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} role="button" tabIndex="0" aria-label="Touch the flower" onPointerEnter={event=>{if(event.pointerType==='mouse')triggerRef.current();}} onClick={()=>triggerRef.current()} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();triggerRef.current();}}}>
      <g className="flower-sway"><path d={geometry.head} fill="transparent" stroke="currentColor" strokeWidth="1.15" className="flower-hit"/>{nodes(0,5)}
      <g ref={faceRef} className="flower-face-group"><circle className="flower-heart" cx={112*geometry.scale} cy={96*geometry.scale} r={31*geometry.scale}/>{face === 'symbol-smile' ? <g className="flower-symbol" transform={`translate(${112*geometry.scale} ${96*geometry.scale}) scale(${geometry.scale})`} fill="#10151d" stroke="#10151d" strokeWidth="1.4" strokeLinecap="round"><circle cx="-9" cy="-5" r="1.4" stroke="none"/><circle cx="-9" cy="5" r="1.4" stroke="none"/><path d="M-3 0 H2 M6 -9 Q16 0 6 9" fill="none"/></g> : <text className="flower-ascii" x={112*geometry.scale} y={96*geometry.scale} textAnchor="middle" dominantBaseline="middle" style={{fontSize:18*geometry.scale}}>{face}</text>}</g></g>
    </svg>,document.body)}
  </>}</div>;
}
