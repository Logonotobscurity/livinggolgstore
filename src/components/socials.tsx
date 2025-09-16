import { Facebook, Instagram } from 'lucide-react';
import { Icons } from './icons';

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288 512"
      className="social-svg"
    >
      <path
        fill="currentColor"
        d="M288 152.2v50.93c-49.33-2.22-87-34.42-87-73.43 0-41.21 34.42-78.33 87-80.54V0C190.2.73 151.8 33.38 116.8 34.42 50.31 36.31 0 91.23 0 161.8c0 99.89 80.69 176.4 176.4 176.4 78.34 0 120.1-53.13 120.1-120.1-.81-8.82-1.9-17.4-3.5-25.9z"
      />
    </svg>
  );
}

export function Socials() {
  return (
    <div className="socials-card">
      <ul>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Facebook className="social-svg" />
          </a>
          <div className="social-text">Facebook</div>
        </li>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Icons.twitter className="social-svg" />
          </a>
          <div className="social-text">Twitter</div>
        </li>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Instagram className="social-svg" />
          </a>
          <div className="social-text">Instagram</div>
        </li>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <TikTokIcon />
          </a>
          <div className="social-text">TikTok</div>
        </li>
      </ul>
    </div>
  );
}
