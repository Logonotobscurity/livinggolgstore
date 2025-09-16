import { Facebook } from 'lucide-react';

function InstagramIcon() {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="social-svg"
    >
      <g>
        <path
          id="instagram"
          d="M13.88 13.88c-1.04 1.04-2.72 1.04-3.76 0.01 0 0-.01-.01-.01-.01-1.04-1.04-1.04-2.72-0.01-3.76 0 0 .01-.01 .01-.01 1.04-1.04 2.72-1.04 3.76-0.01 0 0 .01.01 .01.01C14.83 11.13 14.74 12.78 13.88 13.88zM14.88 9.09c-.76-.77-1.8-1.2-2.88-1.19-2.26-.01-4.09 1.82-4.1 4.08 0 .01 0 .01 0 .02-.01 2.26 1.82 4.09 4.08 4.1.01 0 .01 0 .02 0c2.26.01 4.09-1.82 4.1-4.08 0-.01 0-.01 0-.02.01-1.09-.42-2.14-1.2-2.9L14.88 9.09zM16.88 7.09c-.38-.4-1.02-.41-1.41-.03s-.41 1.02-.03 1.41 1.02.41 1.41.03c.2-.19.31-.46.31-.73.04-.26-.04-.52-.21-.72L16.88 7.09zM12.8 5.44h1.1h1c.36.01.72.04 1.07.1.25.04.5.1.74.19.69.28 1.24.83 1.52 1.52.09.24.15.49.19.74.06.35.09.71.1 1.07 0 .42 0 .75 0 1s0 .61 0 1.1c0 .48 0 .75 0 .8 0 .08 0 .31 0 .8s0 .85 0 1.1s0 .58 0 1c-.01.36-.04.72-.1 1.07-.04.25-.1.5-.19.74-.28.69-.83 1.24-1.52 1.52-.24.09-.49.15-.74.19-.35.06-.71.09-1.07.1h-1h-3.79h-1c-1.47-.07-2.92-.61-4-1.72-1.08-1.1-1.62-2.55-1.52-4C5.48 9.31 5.51 8.37 5.57 8c.04-.25.1-.5.19-.74.28-.69.83-1.23 1.52-1.5C7.51 5.68 7.75 5.61 8 5.57c.35-.06.71-.09 1.07-.1h1h2.73V5.44zM19.94 8.7c.01-1.24-.45-2.44-1.29-3.35-.91-.84-2.11-1.3-3.35-1.29-0.61-.03-1.71-.05-3.3-.05s-2.69.02-3.3.05c-1.24-.01-2.44.46-3.35 1.3C4.51 6.26 4.05 7.46 4.06 8.7c-.04.61-.06 1.71-.06 3.3s.02 2.69.05 3.3c-.01 1.24.45 2.44 1.29 3.35.91.84 2.12 1.3 3.36 1.29.61.03 1.71.05 3.3.05s2.69-.02 3.3-.05c1.24.01 2.44-.45 3.35-1.29.84-.91 1.3-2.11 1.29-3.35C19.98 14.69 20 13.59 20 12S19.98 9.31 19.94 8.7z"
          style={{ fill: 'currentColor' }}
        ></path>
      </g>
    </svg>
  );
}

function TwitterIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      height="23"
      viewBox="0 0 1200 1227"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
      />
    </svg>
  );
}


function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288 512"
      className="social-svg"
    >
      <path d="M288 152.2v50.93c-49.33-2.22-87-34.42-87-73.43 0-41.21 34.42-78.33 87-80.54V0C190.2.73 151.8 33.38 116.8 34.42 50.31 36.31 0 91.23 0 161.8c0 99.89 80.69 176.4 176.4 176.4 78.34 0 120.1-53.13 120.1-120.1-.81-8.82-1.9-17.4-3.5-25.9z" />
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
            <Facebook className="social-svg"/>
          </a>
          <div className="social-text">Facebook</div>
        </li>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <TwitterIcon className="social-svg"/>
          </a>
          <div className="social-text">Twitter</div>
        </li>
        <li className="iso-pro">
          <span></span>
          <span></span>
          <span></span>
          <a href="#">
            <InstagramIcon />
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
