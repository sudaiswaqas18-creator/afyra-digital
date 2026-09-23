import type { ReactNode } from 'react'

type InlineSvgIconProps = { name: string; size?: number; className?: string }

function glyph(name: string): ReactNode {
  switch (name) {
    case 'menu': return <><path d="M4 6h16M4 12h16M4 18h16" /></>
    case 'close':
    case 'cross': return <><path d="M6 6l12 12M18 6 6 18" /></>
    case 'chevron': return <path d="m8 10 4 4 4-4" />
    case 'arrowRight': return <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>
    case 'check': return <path d="m5 12.5 4.2 4.2L19 7.5" />
    case 'quote': return <><path d="M9.5 11H5.8A2.8 2.8 0 0 0 3 13.8V18h6.5v-7Z" /><path d="M21 11h-3.7a2.8 2.8 0 0 0-2.8 2.8V18H21v-7Z" /><path d="M5 11c.2-2.2 1.4-4 3.7-5M16.5 11c.2-2.2 1.4-4 3.7-5" /></>
    case 'spark': return <><path d="m12 3 1.5 4.2L18 9l-4.5 1.8L12 15l-1.5-4.2L6 9l4.5-1.8L12 3Z" /><path d="m18.5 15.5.8 2.1 2.2.9-2.2.9-.8 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" /></>
    case 'play': return <path d="m9 7 8 5-8 5V7Z" />
    case 'pen': return <><path d="m4 20 4.4-1 9.8-9.8a2 2 0 0 0 0-2.8l-.8-.8a2 2 0 0 0-2.8 0L5 15.4 4 20Z" /><path d="m13.5 6.5 4 4" /><path d="M3.5 20.5h5" /></>
    case 'strategy': return <><path d="M4 18 9 13l4 3 7-9" /><path d="M15 7h5v5" /><circle cx="6" cy="7" r="2" /><circle cx="10" cy="11" r="2" /></>
    case 'growth': return <><path d="M4 19h16" /><path d="M7 19v-5M12 19V9M17 19v-8" /><path d="m5 11 4-4 4 2 6-5" /></>
    case 'brand': return <><circle cx="12" cy="12" r="8" /><path d="M9 16 12 8l3 8M10.2 13h3.6" /></>
    case 'content': return <><path d="M5 4h10l4 4v12H5V4Z" /><path d="M15 4v5h5M8 12h8M8 16h5" /></>
    case 'social': return <><circle cx="8" cy="8" r="2.5" /><circle cx="16" cy="8" r="2.5" /><path d="M3.8 18c.7-3 2.1-4.5 4.2-4.5s3.5 1.5 4.2 4.5M11.8 18c.7-3 2.1-4.5 4.2-4.5s3.5 1.5 4.2 4.5" /></>
    case 'leads': return <><circle cx="8" cy="7.5" r="2.5" /><path d="M4 16c.7-2.8 2-4.2 4-4.2s3.3 1.4 4 4.2" /><path d="M15 8h6M18 5v6M14 17h7M18 14l3 3-3 3" /></>
    case 'search': return <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m14.5 14.5 5 5" /></>
    case 'website': return <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8M12 18v3" /></>
    case 'seed': return <><path d="M12 20c-4.5-1.2-7-4-7-7.5C8.6 11 11 8.7 12 5c1 3.7 3.4 6 7 7.5 0 3.5-2.5 6.3-7 7.5Z" /><path d="M12 20V9" /></>
    case 'authority':
    case 'trust': return <><path d="m12 3 7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-5" /></>
    case 'program': return <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /><path d="m8 15 2 2 4-4" /></>
    case 'insights': return <><path d="M8.5 15.5C7 14.3 6 12.5 6 10.3A6 6 0 1 1 18 10.3c0 2.2-1 4-2.5 5.2-.8.7-1.2 1.2-1.5 2h-4c-.3-.8-.7-1.3-1.5-2Z" /><path d="M9.5 21h5M10 18h4" /></>
    case 'doctor': return <><path d="M8 4v4a4 4 0 0 0 8 0V4" /><path d="M12 12v2a5 5 0 0 0 5 5h1" /><circle cx="19" cy="19" r="2" /></>
    case 'clinic': return <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M12 8v6M9 11h6M8 20v-4h8v4" /></>
    case 'hospital': return <><path d="M5 21V5h14v16M9 8h6M12 5v6M9 11h6M8 21v-5h8v5" /></>
    case 'aesthetic': return <><path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" /><path d="M7 15c.7 2.8 2.4 4.6 5 6" /></>
    case 'cosmetic': return <><path d="M12 4c2.7 3.1 4.5 5.8 4.5 8.4a4.5 4.5 0 1 1-9 0C7.5 9.8 9.3 7.1 12 4Z" /><path d="m18 15 .8 2 2.2 1-2.2 1-.8 2-.8-2-2.2-1 2.2-1 .8-2Z" /></>
    case 'location': return <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>
    case 'calendar': return <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /><path d="m9 15 2 2 4-4" /></>
    case 'message': return <><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><path d="M8 10h8M8 13h5" /></>
    case 'analytics': return <><path d="M4 20V10M10 20V5M16 20v-8M22 20H2" /><path d="m4 9 5-4 4 3 7-5" /></>
    case 'settings': return <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>
    case 'video': return <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3v-4Z" /></>
    case 'target': return <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><path d="M17.5 6.5 21 3M17 3h4v4" /></>
    case 'reels': return <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="m4 9 4-5M10 9l4-5M16 9l4-5" /><path d="m10 12 5 3-5 3v-6Z" /></>
    case 'reports': return <><path d="M5 20V9M10 20V5M15 20v-7M20 20H3" /><path d="m5 8 4-4 4 3 6-4" /></>
    case 'document': return <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>
    case 'palette': return <><path d="M12 4a8 8 0 1 0 0 16h1.6a1.8 1.8 0 0 0 1.6-2.6c-.3-.6.1-1.4.8-1.4h1A3 3 0 0 0 20 13c0-5-3.6-9-8-9Z" /><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" /><circle cx="11" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" /></>
    case 'compass': return <><circle cx="12" cy="12" r="8" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>
    case 'headset': return <><path d="M5 13v-2a7 7 0 0 1 14 0v2" /><path d="M5 13h2v5H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2ZM19 13h-2v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" /><path d="M17 19c-1 1.3-2.6 2-5 2" /></>
    case 'facebook': return <path fill="currentColor" stroke="none" d="M13.7 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6H17V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21z" />
    case 'instagram': return <><rect x="5" y="5" width="14" height="14" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="16.2" cy="7.8" r=".65" fill="currentColor" stroke="none" /></>
    case 'x': return <path d="M5 4h4l10 16h-4L5 4Zm14 0L5 20" />
    case 'tiktok': return <path d="M14 3v12a4 4 0 1 1-4-4M14 3c1 4 3 5 6 5" />
    case 'cart': return <><path d="M3 4h2l3 11h10l3-8H6"/><circle cx="9" cy="19" r="1"/><circle cx="18" cy="19" r="1"/></>
    case 'globe': return <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>
    case 'send': return <path d="m3 3 18 9-18 9 4-9-4-9Zm4 9h14"/>
    case 'card': return <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></>
    case 'lock': return <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>
    case 'linkedin': return <><rect x="5" y="5" width="14" height="14" rx="2.5" /><path d="M8.3 10.5V16M11.5 16v-3.3c0-1.4.8-2.3 2-2.3s2 .8 2 2.3V16M8.3 8.2h.01" /></>
    case 'whatsapp': return <><path d="M20 11.7a8 8 0 0 1-11.8 7l-4.7 1.2 1.3-4.5A8 8 0 1 1 20 11.7Z" /><path fill="currentColor" stroke="none" d="M8.2 7.5c-.5 0-1.2.7-1.2 1.7 0 2.7 3.8 6.3 6.7 6.3 1 0 2-.8 2-1.5 0-.3-1.8-1.2-2-1.1l-.9.9c-1.6-.6-2.7-1.6-3.4-3.1l.8-1c.1-.2-.7-2.2-1-2.2Z" /></>
    default: return <><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></>
  }
}

export default function InlineSvgIcon({ name, size = 24, className = '' }: InlineSvgIconProps) {
  return (
    <span className={`af-inline-svg-icon af-inline-svg-icon--${name} ${className}`.trim()} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {glyph(name)}
      </svg>
    </span>
  )
}
