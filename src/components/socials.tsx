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
            <Icons.linkedin className="social-svg" />
          </a>
          <div className="social-text">LinkedIn</div>
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
            <Icons.youtube className="social-svg" />
          </a>
          <div className="social-text">YouTube</div>
        </li>
      </ul>
    </div>
  );
}
