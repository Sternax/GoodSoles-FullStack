import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <a href="#" className="footerLink">
        <img className="footerImg" src="/facebook.png" alt="facebook link" />
      </a>
      <a href="#" className="footerLink">
        <img className="footerImg" src="/instagram.png" alt="instagram link" />
      </a>
      <a href="#" className="footerLink">
        <img className="footerImg" src="/twitter.png" alt="twitter link" />
      </a>
    </footer>
  );
};

export default Footer;
