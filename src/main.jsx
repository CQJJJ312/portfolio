import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { projects, contact, clients } from './content';
import Route from './components/Route';
import DotTrail from './components/DotTrail';
import Flower from './components/Flower';
import Contact from './components/Contact';
import HeroTitle from './components/HeroTitle';
import ThreeDGallery from './components/ThreeDGallery';
import useScrollReveal from './components/useScrollReveal';
import DesignStrip from './components/DesignStrip';
import './styles.css';
import { assetPath } from './assetPath';

function Sidebar() {
  const [active, setActive] = useState('work');
  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-route-stop]')];
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = 'work';
        sections.forEach(section => { if(section.getBoundingClientRect().top < innerHeight * .55) current = ['about','contact'].includes(section.id) ? section.id : 'work'; });
        setActive(current);
      });
    };
    window.addEventListener('scroll',update,{passive:true}); update();
    return () => { window.removeEventListener('scroll',update); cancelAnimationFrame(frame); };
  }, []);
  return <aside className="sidebar" aria-label="Portfolio navigation"><div className="sidebar-nav">
    <a href="#home" className="rail-home" aria-label="Back to introduction"><span/><span/><span/></a>
    <nav>{[['about','About'],['work','Work'],['contact','Contact']].map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined}>{label}<span className="nav-dot"/></a>)}</nav>
    <a className="rail-plus" href="#contact" aria-label="Get in touch">+</a>
    </div><div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1].map(copy=><div className="ticker-copy" key={copy}>{[0,1,2,3].map(i=><span key={i}>Scarlett Chen · Multidisciplinary Visual Designer <b/></span>)}</div>)}</div></div></aside>;
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-meta"><svg className="header-flower" viewBox="0 0 36 36" aria-hidden="true"><g fill="currentColor"><ellipse cx="18" cy="11" rx="7" ry="7.5"/><ellipse cx="18" cy="25" rx="7" ry="7.5"/><ellipse cx="11" cy="18" rx="7.5" ry="7"/><ellipse cx="25" cy="18" rx="7.5" ry="7"/><circle cx="18" cy="18" r="2"/></g></svg><div><p>PORTFOLIO — 2026</p><p>VISUAL DESIGN / CREATIVE</p></div></div>
    <div className="hero-copy"><HeroTitle/><div className="hero-intro"><p>Welcome to my portfolio.<br/>Take a look around.</p><a href="#work">Scroll to explore <span>↓</span></a></div></div>
    <Flower/>
  </section>;
}

function Media({item}) {
  const [ratio,setRatio]=useState(item.ratio || '16 / 9');
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .05 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <figure className={`media ${item.type}`}>{item.type==='video'?<>
    <video ref={videoRef} controls autoPlay muted loop playsInline preload="metadata" poster={item.poster} style={{aspectRatio:ratio}} aria-label={item.label} onLoadedMetadata={event=>{const video=event.currentTarget;if(video.videoWidth&&video.videoHeight)setRatio(`${video.videoWidth} / ${video.videoHeight}`);}}><source src={item.src} type="video/mp4"/></video>
    {!item.hideCaption&&<figcaption><span>{item.label}</span></figcaption>}
    {item.note&&<p className="media-note">{item.note}</p>}
  </>:<img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async"/>}{item.caption&&<figcaption>{item.caption}</figcaption>}</figure>;
}

function Project({project,index}) {
  return <section id={project.id} className={`project ${project.layout}`} data-route-stop data-route-label={project.name} data-route-number={String(index+1).padStart(2,'0')}>
    <div className="project-overview"><div className="project-copy"><div className="section-heading"><h2>{project.name}</h2><h3>{project.subtitle}</h3></div><div className="project-description" lang="zh-CN">{project.description.zh.map(p=><p key={p}>{p}</p>)}</div><div className="project-description english" lang="en">{project.description.en.map(p=><p key={p}>{p}</p>)}</div></div><dl className="project-details">{project.client&&<div><dt>Client</dt><dd>{project.client}</dd></div>}<div><dt>Role</dt><dd>{project.roles.map(role=><span key={role}>{role}</span>)}</dd></div>{project.year&&<div><dt>Year</dt><dd>{project.year}</dd></div>}</dl></div>
    {project.designFiles&&<DesignStrip items={project.designFiles} variant={project.id}/>}
    {project.id==='a-day-in-barbour'&&<div className="guideline-gallery">{[...project.videos,...project.images].map(item=><Media item={item} key={item.src}/>)}</div>}
    {project.id!=='a-day-in-barbour'&&!project.videosAfterImages&&project.videos.length>0&&<div className="project-videos">{project.videos.map(item=><Media item={item} key={item.src}/>)}</div>}
    {project.id==='3d-works'?<ThreeDGallery/>:project.id!=='a-day-in-barbour'&&project.images.length>0&&<div className="project-images">{project.images.map((item,i)=><div className={`image-position image-${i}`} key={item.src}><Media item={item}/></div>)}</div>}
    {project.videosAfterImages&&project.videos.length>0&&<div className="project-videos">{project.videos.map(item=><Media item={item} key={item.src}/>)}</div>}
  </section>;
}

function ContactLink({label,value,email}) {
  return value?<a href={email?`mailto:${value}`:value} target={email?undefined:'_blank'} rel="noreferrer">{label}<span>↗</span></a>:<div className="pending-link"><span>{label}</span><small>To be added</small></div>;
}

function App() {
  useScrollReveal();
  return <><Sidebar/><main className="page"><DotTrail/><Hero/><Route/>
    <section className="about text-section" id="about" data-route-stop data-route-label="About" data-route-number="00"><h2>About</h2><p>Hello, I'm Scarlett — a visual designer working on creative projects for brands, with an interest in exploring different forms of visual expression.</p><div className="about-information"><div className="education"><h3>EDUCATION</h3><p>University of Utah<br/>B.S. in Entertainment Arts &amp; Engineering<br/>Minor in Animation</p></div><div className="software"><h3>SOFTWARE</h3><div className="software-columns"><p>Photoshop<br/>Illustrator<br/>Premiere Pro<br/>After Effects</p><p>Maya<br/>3ds Max<br/>Blender<br/>C4D</p></div></div></div><div className="about-clients-row"><div className="selected-clients"><h3>SELECTED CLIENTS</h3><div className="client-logos">{clients.map(client=><div className="client-logo" key={client.name} style={{'--logo-width':`${client.width}px`}}>{client.file?<img src={assetPath(`/logos/${client.file}`)} alt={client.name} loading="lazy"/>:<span className="logo-pending" aria-label={`${client.name} logo awaiting supplied file`} title={`${client.name} — logo file needed`}/>}</div>)}</div></div></div></section>
    <div className="work" id="work">{projects.map((project,index)=><Project project={project} index={index} key={project.id}/>)}</div>
    <Contact/>
    <footer><span>© {new Date().getFullYear()} Scarlett Chen</span><a href="#home">Back to top ↑</a></footer></main></>;
}
createRoot(document.getElementById('root')).render(<App/>);


