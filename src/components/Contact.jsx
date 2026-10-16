import React from 'react';
import { contact } from '../content';

function PlatformIcon({name}) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">{name==='LinkedIn'?<><path d="M3 8h4v13H3zM3 3h4v4H3zM10 8h4v2c1-2 7-3 7 4v7h-4v-7c0-3-3-3-3 0v7h-4z"/></>:name==='ArtStation'?<><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></>:<><circle cx="6" cy="12" r="5"/><circle cx="18" cy="12" r="5"/></>}</svg>;
}

export default function Contact() {
  const elsewhere=[['LinkedIn',contact.linkedin],['ArtStation',contact.artstation],['Flickr',contact.flickr]];
  return <section className="contact text-section" id="contact" data-route-stop data-route-label="Contact" data-route-number="07">
    <div className="contact-heading"><div><h2>Contact</h2><p>Feel free to get in touch.</p></div><span className="contact-flower-target" data-contact-flower-target aria-hidden="true">
      <svg className="contact-plant" data-contact-plant viewBox="0 0 58 90" fill="none" stroke="currentColor" strokeWidth="1.1">
        <g className="contact-plant-growth"><g className="contact-plant-sway">
          <path d="M29 30 C24 43 33 52 29 67"/>
          <path d="M29 54 C21 54 16 49 16 45 C24 45 28 48 29 54 M30 60 C37 61 43 55 43 51 C36 51 31 55 30 60"/>
        </g></g>
        <path className="contact-plant-pot" d="M17 67 Q29 66 41 67 L40 71 Q29 72 18 71 Z M19 72 L22 84 Q29 85 36 84 L39 72"/>
      </svg>
    </span></div>
    <div className="contact-columns"><div><h3>EMAIL</h3><a href={`mailto:${contact.email}`}>{contact.email}</a></div><div><h3>PHONE</h3><a href={`tel:${contact.phone.replace(/\s/g,'')}`}>{contact.phone}</a></div><div><h3>WECHAT</h3><p>{contact.wechat}</p></div></div>
    <div className="elsewhere"><h3>ELSEWHERE</h3><div className="elsewhere-links">{elsewhere.map(([name,url])=>url?<a key={name} href={url} target="_blank" rel="noopener noreferrer"><PlatformIcon name={name}/><span>{name}</span></a>:<span className="elsewhere-unconfigured" key={name} aria-disabled="true"><PlatformIcon name={name}/><span>{name}</span></span>)}</div></div>
  </section>;
}
