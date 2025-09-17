import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export const Icons = {
  search: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  user: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  shoppingCart: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  menu: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 1200 1227"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
        fill="currentColor"
      />
    </svg>
  ),
  arrow: (props: IconProps) => (
     <svg
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
        >
        <path
            d='M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z'
            fillRule='evenodd'
            clipRule='evenodd'
            fill='currentColor'
        ></path>
    </svg>
  ),
  plus: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  minus: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/></svg>
  ),
  trash: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  ),
  heart: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  star: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  arrowRight: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  chevronRight: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
  ),
  lightbulb: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
  ),
  lamp: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2h8l4 10H4L8 2Z"/><path d="M12 12v6"/><path d="M8 22v-2h8v2"/></svg>
  ),
  lampCeiling: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v5"/><path d="M6 7h12l4 9H2l4-9Z"/><path d="M9.17 16a3 3 0 1 0 5.66 0"/></svg>
  ),
  lampWallUp: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4h6l3 7H8l3-7Z"/><path d="M14 11v5a2 2 0 0 1-2 2H8"/><path d="M4 15h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6Z"/></svg>
  ),
  loader: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  facebook: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  instagram: (props: IconProps) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  tiktok: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 288 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M288 152.2v50.93c-49.33-2.22-87-34.42-87-73.43 0-41.21 34.42-78.33 87-80.54V0C190.2.73 151.8 33.38 116.8 34.42 50.31 36.31 0 91.23 0 161.8c0 99.89 80.69 176.4 176.4 176.4 78.34 0 120.1-53.13 120.1-120.1-.81-8.82-1.9-17.4-3.5-25.9z"
      />
    </svg>
  ),
  instagramFeed: (props: IconProps) => (
     <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="28"
      height="30"
      {...props}
    >
      <g>
        <path
          id="instagram"
          d="M13.88 13.88c-1.04 1.04-2.72 1.04-3.76 0.01 0 0-.01-.01-.01-.01-1.04-1.04-1.04-2.72-0.01-3.76 0 0 .01-.01 .01-.01 1.04-1.04 2.72-1.04 3.76-0.01 0 0 .01.01 .01.01C14.83 11.13 14.74 12.78 13.88 13.88zM14.88 9.09c-.76-.77-1.8-1.2-2.88-1.19-2.26-.01-4.09 1.82-4.1 4.08 0 .01 0 .01 0 .02-.01 2.26 1.82 4.09 4.08 4.1.01 0 .01 0 .02 0c2.26.01 4.09-1.82 4.1-4.08 0-.01 0-.01 0-.02.01-1.09-.42-2.14-1.2-2.9L14.88 9.09zM16.88 7.09c-.38-.4-1.02-.41-1.41-.03s-.41 1.02-.03 1.41 1.02.41 1.41.03c.2-.19.31-.46.31-.73.04-.26-.04-.52-.21-.72L16.88 7.09zM12.8 5.44h1.1h1c.36.01.72.04 1.07.1.25.04.5.1.74.19.69.28 1.24.83 1.52 1.52.09.24.15.49.19.74.06.35.09.71.1 1.07 0 .42 0 .75 0 1s0 .61 0 1.1c0 .48 0 .75 0 .8 0 .08 0 .31 0 .8s0 .85 0 1.1s0 .58 0 1c-.01.36-.04.72-.1 1.07-.04.25-.1.5-.19.74-.28.69-.83 1.24-1.52 1.52-.24.09-.49.15-.74.19-.35.06-.71.09-1.07.1h-1h-3.79h-1c-1.47-.07-2.92-.61-4-1.72-1.08-1.1-1.62-2.55-1.52-4C5.48 9.31 5.51 8.37 5.57 8c.04-.25.1-.5.19-.74.28-.69.83-1.23 1.52-1.5C7.51 5.68 7.75 5.61 8 5.57c.35-.06.71-.09 1.07-.1h1h2.73V5.44zM19.94 8.7c.01-1.24-.45-2.44-1.29-3.35-.91-.84-2.11-1.3-3.35-1.29-0.61-.03-1.71-.05-3.3-.05s-2.69.02-3.3.05c-1.24-.01-2.44.46-3.35 1.3C4.51 6.26 4.05 7.46 4.06 8.7c-.04.61-.06 1.71-.06 3.3s.02 2.69.05 3.3c-.01 1.24.45 2.44 1.29 3.35.91.84 2.12 1.3 3.36 1.29.61.03 1.71.05 3.3.05s2.69-.02 3.3-.05c1.24.01 2.44-.45 3.35-1.29.84-.91 1.3-2.11 1.29-3.35C19.98 14.69 20 13.59 20 12S19.98 9.31 19.94 8.7z"
          style={{ fill: 'currentColor' }}
        ></path>
      </g>
    </svg>
  )
};
