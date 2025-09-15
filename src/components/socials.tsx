import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Socials() {
  return (
    <div className="socials-card">
      <ul>
        <li className="social-item">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Facebook className="social-svg"/>
          </a>
          <div className="social-text">Facebook</div>
        </li>
        <li className="social-item">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Twitter className="social-svg"/>
          </a>
          <div className="social-text">Twitter</div>
        </li>
        <li className="social-item">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Instagram className="social-svg"/>
          </a>
          <div className="social-text">Instagram</div>
        </li>
      </ul>
    </div>
  );
}
