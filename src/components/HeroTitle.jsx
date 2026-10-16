import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
const names=['Scarlett','Chen'];
const colors=['#FF48B0','#2454FF','#00A95C','#FF6A00','#F5D000'];
export default function HeroTitle(){
  const [frame,setFrame]=useState(null),[slots,setSlots]=useState(null);const bases=useRef([]),glyphPools=useRef(null);
  useLayoutEffect(()=>{
    const measure=()=>{const context=document.createElement('canvas').getContext('2d');const style=getComputedStyle(bases.current[0]);context.font=style.font||`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/?';
      const metrics=bases.current.map(base=>{
      const origin=base.getBoundingClientRect();
      return [...base.textContent].map((_,i)=>{const range=document.createRange();range.setStart(base.firstChild,i);range.setEnd(base.firstChild,i+1);const r=range.getBoundingClientRect();return {left:r.left-origin.left,width:r.width};});
    });
      glyphPools.current=metrics.map((line,i)=>line.map((slot,j)=>[...alphabet].filter(c=>context.measureText(c).width<=slot.width+1.5).join('')||names[i][j]));
      setSlots(metrics);};
    measure();document.fonts.ready.then(measure);window.addEventListener('resize',measure);
    return()=>window.removeEventListener('resize',measure);
  },[]);
  useEffect(()=>{
    const motion=matchMedia('(prefers-reduced-motion: reduce)');if(motion.matches)return;
    let raf,start,last=-100;const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const tick=now=>{
      start??=now;const progress=Math.min(1,(now-start)/800);
      if(progress===1){setFrame(null);return;}
      if(now-last>=42){last=now;setFrame(names.map((name,lineIndex)=>[...name].map((letter,i)=>{
        const decoded=progress>.12+(i/name.length)*.76;
        const pool=glyphPools.current?.[lineIndex]?.[i]||alphabet;
        return {letter:decoded?letter:pool[Math.floor(Math.random()*pool.length)],color:decoded||Math.random()>.72?'#10151d':colors[Math.floor(Math.random()*colors.length)]};
      })));}
      raf=requestAnimationFrame(tick);
    };
    const stop=()=>{if(motion.matches){cancelAnimationFrame(raf);setFrame(null);}};
    motion.addEventListener('change',stop);raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);motion.removeEventListener('change',stop);};
  },[]);
  const active=frame&&slots;
  return <h1 aria-label="Scarlett Chen">{names.map((line,i)=><React.Fragment key={line}><span className="decode-line"><span ref={el=>bases.current[i]=el} style={{visibility:active?'hidden':'visible'}}>{line}</span>{active&&frame[i].map((char,j)=><span className="decode-frame" key={j} style={{color:char.color,left:slots[i][j].left,width:slots[i][j].width,textAlign:'center'}} aria-hidden="true">{char.letter}</span>)}</span>{i===0&&<br/>}</React.Fragment>)}</h1>;
}
