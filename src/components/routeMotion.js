export function contactProgress(scroll,start,maxScroll,viewport){
  const span=Math.max(1,Math.min(viewport*.36,maxScroll-start));
  const p=Math.max(0,Math.min(1,(scroll-start)/span));
  return p<.015?0:p>.985?1:p;
}
export function contactCurve(start,end,p){
  const u=1-p,control={x:start.x+(end.x-start.x)*.46,y:Math.min(start.y,end.y)-Math.min(90,Math.abs(end.x-start.x)*.16)};
  return {x:u*u*start.x+2*u*p*control.x+p*p*end.x,y:u*u*start.y+2*u*p*control.y+p*p*end.y};
}
