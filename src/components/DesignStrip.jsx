import React, { useLayoutEffect, useRef } from 'react';

export default function DesignStrip({items,variant}) {
  const stripRef = useRef(null);
  useLayoutEffect(() => {
    const strip = stripRef.current, group = strip.querySelector('.strip-group');
    const measure = () => {
      const distance = group.getBoundingClientRect().width;
      strip.style.setProperty('--strip-distance', `${distance}px`);
      strip.style.setProperty('--strip-duration', `${distance/30}s`);
    };
    const observer = new ResizeObserver(measure); observer.observe(group); measure();
    // Both copies play independently; moving the track does not restart their videos.
    strip.querySelectorAll('video').forEach(video => {video.muted=true;video.load();video.play().catch(()=>{});});
    return () => observer.disconnect();
  }, []);
  return <div ref={stripRef} className={`design-strip strip-${variant}`} aria-label={`${variant === 'new-balance' ? 'New Balance' : variant === 'skp' ? 'SKP' : 'Barbour'} design work`}>
    <div className="strip-track">{[0,1].map(copy=><div className="strip-group" key={copy} aria-hidden={copy===1?true:undefined}>
      {items.map((item,index)=>item.type==='video' ? <video className="strip-item" key={item.src} src={item.src} autoPlay muted loop playsInline preload="auto" onLoadedData={event=>event.currentTarget.play().catch(()=>{})} width={item.width} height={item.height} style={{'--item-width':`${item.width}px`,'--item-height':`${item.height}px`}} aria-label={`Design work ${index+1}`}/> : <img className="strip-item" key={item.src} src={item.src} width={item.width} height={item.height} style={{'--item-width':`${item.width}px`,'--item-height':`${item.height}px`}} alt={`Design work ${index+1}`} decoding="async"/>)}
    </div>)}</div>
  </div>;
}
