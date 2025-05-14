import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div id="footer">
      <a href="#" className="footerLink">
        <img className="footerImg" src="/facebook.png" alt="facebook link" />
      </a>
      <a href="#" className="footerLink">
        <img className="footerImg" src="/instagram.png" alt="instagram link" />
      </a>
      <a href="#" className="footerLink">
        <img className="footerImg" src="/twitter.png" alt="twitter link" />
      </a>
    </div>
  );
};

export default Footer;
