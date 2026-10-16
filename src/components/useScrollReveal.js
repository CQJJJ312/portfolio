import { useEffect } from 'react';

// Visual transforms never determine the trigger bounds: use the untransformed box.
export function revealDecision(state,top,bottom,height){
  if(bottom < -12 || top > height+12) return 'pending';
  if(state!=='shown' && top<=height*.9 && bottom>0) return 'shown';
  return state;
}
export default function useScrollReveal(){
  useEffect(()=>{
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    if(motion.matches || !('IntersectionObserver' in window))return;
    const specs=[
      ['.hero-intro p','body',0],['.hero-intro>a','body',60],
      ['.about>h2,.section-heading,.contact-heading h2,.collection-heading','title',0],
      ['.about>p,.education,.software,.selected-clients,.contact-heading p','body',40],
      ['.project-description:not(.english)','body',60],['.project-description.english','body',120],
      ['.project-details','body',180],['.image-position,.collection-media','image',0],
      ['.project-videos>.media,.guideline-gallery>.video','video',0],['.guideline-gallery>.image','image',0],['.design-strip','marquee',0],
      ['.contact-columns>div,.elsewhere','body',40],
    ];
    const nodes=[];let enter,exit,frame,watchdog,failed=false;
    const showAll=()=>nodes.forEach(el=>el.dataset.revealState='shown');
    const failOpen=()=>{failed=true;showAll();enter?.disconnect();exit?.disconnect();};
    const update=()=>{
      frame=null;if(failed||motion.matches){showAll();return;}
      try{for(const el of nodes){
        const box=el.getBoundingClientRect(), transform=getComputedStyle(el).transform;
        const ty=transform&&transform!=='none'?new DOMMatrixReadOnly(transform).m42:0;
        const state=revealDecision(el.dataset.revealState,box.top-ty,box.bottom-ty,innerHeight);
        if(state!==el.dataset.revealState)el.dataset.revealState=state;
      }}catch{failOpen();}
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observe=()=>{
      enter?.disconnect();exit?.disconnect();
      // Separate entry and full-viewport exit observers provide hysteresis.
      enter=new IntersectionObserver(schedule,{threshold:0,rootMargin:`0px 0px -${Math.round(innerHeight*.1)}px 0px`});
      exit=new IntersectionObserver(schedule,{threshold:0,rootMargin:'12px 0px 12px 0px'});
      nodes.forEach(el=>{enter.observe(el);exit.observe(el);});schedule();
    };
    const resize=()=>{try{observe();}catch{failOpen();}};
    const onMotion=()=>{if(motion.matches)showAll();else schedule();};
    try{
      for(const [selector,type,delay] of specs){document.querySelectorAll(selector).forEach((el,index)=>{
        if(!el.textContent.trim()&&!el.querySelector('img,video'))return;
        const stagger=type==='image'||type==='video'?index%2*60:selector.startsWith('.contact-columns')?index%3*60:0;
        el.dataset.reveal=type;el.style.setProperty('--reveal-delay',`${delay+stagger}ms`);
        nodes.push(el);el.dataset.revealState='pending';
      });}
      observe();watchdog=setInterval(schedule,1600);
    }catch{failOpen();}
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize);
    motion.addEventListener('change',onMotion);
    return()=>{enter?.disconnect();exit?.disconnect();cancelAnimationFrame(frame);clearInterval(watchdog);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',resize);motion.removeEventListener('change',onMotion);nodes.forEach(el=>{delete el.dataset.revealState;delete el.dataset.reveal;});};
  },[]);
}

