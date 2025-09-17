import { Icons } from './icons';

export function Socials() {
  return (
    <div className="socials-card">
      <ul>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Icons.facebook className="social-svg" />
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
            <Icons.instagram className="social-svg" />
          </a>
          <div className="social-text">Instagram</div>
        </li>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <Icons.tiktok className="social-svg" />
          </a>
          <div className="social-text">TikTok</div>
        </li>
      </ul>
    </div>
  );
}
