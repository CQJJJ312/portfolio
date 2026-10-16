import React,{useEffect,useRef,useState} from 'react';
import {contactProgress} from './routeMotion';
const colors=['#FF6A00','#FF48B0','#2454FF','#00A95C','#F5D000','#9B51E0','#00B8C4','#FF4B3A'];
export default function Route(){
  const [geometry,setGeometry]=useState({d:'',stops:[],height:0,start:null});
  const pathRef=useRef(null),tipRef=useRef(null);
  useEffect(()=>{
    const page=document.querySelector('.page');let frame;
    const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
      const rect=page.getBoundingClientRect(),compact=innerWidth<=700;
      const x1=compact?28:46,x2=compact?32:104;
      const stops=[...page.querySelectorAll('[data-route-stop]')].map((el,i)=>({x:i%2===0?x2:x1,y:el.getBoundingClientRect().top-rect.top+(compact?18:24),label:el.dataset.routeLabel,number:el.dataset.routeNumber,color:colors[i]}));
      if(!stops.length)return;
      const start=stops[0];let d=`M ${start.x} ${start.y}`,previous=start;
      stops.slice(1).forEach(stop=>{const span=stop.y-previous.y;d+=` C ${previous.x} ${previous.y+span*.7}, ${stop.x} ${stop.y-span*.3}, ${stop.x} ${stop.y}`;previous=stop;});
      setGeometry({d,stops,start,height:page.scrollHeight});
    });};
    const observer=new ResizeObserver(measure);observer.observe(page);window.addEventListener('resize',measure);measure();document.fonts.ready.then(measure);
    return()=>{observer.disconnect();window.removeEventListener('resize',measure);cancelAnimationFrame(frame);};
  },[]);
  useEffect(()=>{
    const path=pathRef.current;if(!path||!geometry.d)return;
    const length=path.getTotalLength(),reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame;
    const paint=()=>{
      frame=null;const page=document.querySelector('.page'),rect=page.getBoundingClientRect();
      const last=geometry.stops.at(-1),probeY=innerHeight*.70-rect.top;
      const revealY=Math.max(geometry.start.y,Math.min(last.y,probeY));let low=0,high=length;
      for(let i=0;i<16;i++){const mid=(low+high)/2;if(path.getPointAtLength(mid).y<revealY)low=mid;else high=mid;}
      if(revealY>=last.y)low=length;else if(revealY<=geometry.start.y)low=0;
      path.style.strokeDasharray=length;path.style.strokeDashoffset=reduced.matches?0:length-low;
      const tip=low===length?last:low===0?geometry.start:path.getPointAtLength(low);
      tipRef.current.setAttribute('cx',tip.x);tipRef.current.setAttribute('cy',tip.y);
      tipRef.current.style.opacity=reduced.matches||low<1||low>length-1?'0':'1';
      const target=page.querySelector('[data-contact-flower-target]');let contact=null;
      if(target){const box=target.getBoundingClientRect();contact={start:{x:rect.left+last.x,y:rect.top+last.y},end:{x:box.left+box.width/2,y:box.top+box.height/2},progress:contactProgress(-rect.top,last.y-innerHeight*.70,document.documentElement.scrollHeight-innerHeight,innerHeight)};}
      window.dispatchEvent(new CustomEvent('portfolio-route-progress',{detail:{x:rect.left+tip.x,y:rect.top+tip.y,contact}}));
      document.querySelectorAll('.route-stop').forEach((element,index)=>{const stop=geometry.stops[index];element.dataset.flowerOverlap=String(Math.hypot(stop.x-tip.x,stop.y-tip.y)<28);});
    };
    const update=()=>{if(frame==null)frame=requestAnimationFrame(paint);};window.addEventListener('scroll',update,{passive:true});reduced.addEventListener('change',update);paint();
    return()=>{window.removeEventListener('scroll',update);reduced.removeEventListener('change',update);cancelAnimationFrame(frame);};
  },[geometry]);
  return <div className="route-layer" aria-hidden="true"><svg width="100%" height={geometry.height} className="route-svg"><path className="route-base" d={geometry.d}/><path ref={pathRef} className="route-progress" d={geometry.d}/><circle ref={tipRef} className="route-tip" r="3.2"/></svg>{geometry.stops.map((stop,i)=><div className={`route-stop stop-${i}`} style={{left:stop.x,top:stop.y}} key={stop.number}><span className="stop-shape" style={{backgroundColor:stop.color}}/><span className="stop-label"><b>{stop.number}</b><span>{stop.label}</span></span></div>)}</div>;
}
