import React from 'react';
import { assetPath } from '../assetPath';
const root=assetPath('/media/3d-works/');
function Render({file,alt,label,className=''}){
 return <figure className={`collection-media ${className}`}><img src={root+file} alt={alt} width={file==='sake-house-front.png'?2560:3840} height={file==='sake-house-front.png'?1440:2160} loading="lazy" decoding="async"/>{label&&<figcaption>{label}</figcaption>}</figure>;
}
function ModelStudy({id,title,main,views}){
 return <section className={`collection-work ${id}`} aria-labelledby={`${id}-label`}><h3 className="collection-heading" id={`${id}-label`}>{title}</h3>
  <Render file={main} alt={`${title} — perspective render`} className="spaceship-hero"/>
  <div className="orthographic-views">{[['side','SIDE VIEW'],['front','FRONT VIEW'],['back','BACK VIEW']].map(([view,label],i)=><Render key={view} file={views[i]} alt={`${title} — ${view} orthographic view`} label={label}/>)}</div>
 </section>;
}
export default function ThreeDGallery(){
 return <div className="three-d-collection">
  <ModelStudy id="spaceship" title="01 / Spaceship" main="vehicle.png" views={['spaceship-side.png','spaceship-front.png','spaceship-back.png']}/>
  <ModelStudy id="sake-house" title="02 / Sake House" main="pavilion.png" views={['sake-house-side.png','sake-house-front.png','sake-house-back.png']}/>
 </div>;
}
