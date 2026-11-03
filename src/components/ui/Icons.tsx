import type { SVGProps } from "react";

export const IconBulbOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    {...props}
  >
    <defs>
      {/* Ambient outer aura */}
      <radialGradient id="bulbAura" cx="50%" cy="42%" r="50%">
        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.65" />
        <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
      {/* Realistic 3D lit glass globe */}
      <radialGradient id="bulbGlassOn" cx="44%" cy="38%" r="52%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="28%" stopColor="#FEF08A" />
        <stop offset="68%" stopColor="#F59E0B" />
        <stop offset="92%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>
      {/* Filament core glow */}
      <radialGradient id="filamentGlow" cx="50%" cy="44%" r="28%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#FDE047" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
      {/* Realistic metallic brass screw base */}
      <linearGradient id="brassBaseOn" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#78531A" />
        <stop offset="28%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#FEF08A" />
        <stop offset="75%" stopColor="#B48327" />
        <stop offset="100%" stopColor="#5C3D10" />
      </linearGradient>
    </defs>

    {/* Warm ambient glow */}
    <circle cx="16" cy="13.5" r="13.5" fill="url(#bulbAura)" />

    {/* Main glass Edison pear-shaped globe */}
    <path
      d="M16 3.5C10.75 3.5 6.5 7.6 6.5 12.7c0 3.15 1.65 5.65 3.2 7.55.85 1.05 1.45 2.15 1.6 3.25h9.4c.15-1.1.75-2.2 1.6-3.25 1.55-1.9 3.2-4.4 3.2-7.55 0-5.1-4.25-9.2-9.5-9.2Z"
      fill="url(#bulbGlassOn)"
      stroke="#B45309"
      strokeWidth="0.6"
    />

    {/* Inner filament hot core glow */}
    <circle cx="16" cy="13.5" r="6" fill="url(#filamentGlow)" />

    {/* Glass stem mount at bottom of globe */}
    <path
      d="M14.3 23.5v-4.2h3.4v4.2"
      fill="#D97706"
      fillOpacity="0.35"
      stroke="#92400E"
      strokeWidth="0.6"
    />

    {/* Glowing tungsten Edison filament coil */}
    <path
      d="M14.5 19.5L13.2 12.8c-.15-.8.45-1.5 1.25-1.5.55 0 1.05.35 1.2.9l.35 1.1.35-1.1c.15-.55.65-.9 1.2-.9.8 0 1.4.7 1.25 1.5L17.5 19.5"
      stroke="#FFFFFF"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Specular curved glass highlight (top-left) */}
    <path
      d="M9.2 11.8c0-3.3 2.5-6.1 5.8-6.6"
      stroke="#FFFFFF"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeOpacity="0.85"
    />
    <circle cx="9.3" cy="14.2" r="0.7" fill="#FFFFFF" fillOpacity="0.75" />

    {/* Brass screw base collar & threads */}
    <rect
      x="11.3"
      y="23.2"
      width="9.4"
      height="4.8"
      rx="1.2"
      fill="url(#brassBaseOn)"
      stroke="#5C3D10"
      strokeWidth="0.5"
    />
    <path
      d="M11.4 24.8h9.2M11.6 26.4h8.8"
      stroke="#5C3D10"
      strokeWidth="0.65"
      strokeLinecap="round"
    />

    {/* Electrical bottom contact */}
    <path
      d="M13.2 28h5.6l-1.1 1.7c-.3.45-.8.7-1.35.7h-.7c-.55 0-1.05-.25-1.35-.7L13.2 28Z"
      fill="#1F1610"
    />
  </svg>
);

export const IconBulbOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    {...props}
  >
    <defs>
      {/* Realistic unlit smoked glass gradient */}
      <radialGradient id="bulbGlassOff" cx="38%" cy="32%" r="60%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
        <stop offset="45%" stopColor="#D6C7B2" stopOpacity="0.14" />
        <stop offset="85%" stopColor="#5C4938" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#2A1E14" stopOpacity="0.45" />
      </radialGradient>
      {/* Unlit antique brass screw base */}
      <linearGradient id="brassBaseOff" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3E3023" />
        <stop offset="30%" stopColor="#8C7355" />
        <stop offset="50%" stopColor="#B89F7D" />
        <stop offset="75%" stopColor="#6E583F" />
        <stop offset="100%" stopColor="#2E2218" />
      </linearGradient>
    </defs>

    {/* Unlit glass Edison pear-shaped globe */}
    <path
      d="M16 3.5C10.75 3.5 6.5 7.6 6.5 12.7c0 3.15 1.65 5.65 3.2 7.55.85 1.05 1.45 2.15 1.6 3.25h9.4c.15-1.1.75-2.2 1.6-3.25 1.55-1.9 3.2-4.4 3.2-7.55 0-5.1-4.25-9.2-9.5-9.2Z"
      fill="url(#bulbGlassOff)"
      stroke="#9C8770"
      strokeWidth="0.8"
      strokeOpacity="0.7"
    />

    {/* Internal glass stem mount */}
    <path
      d="M14.3 23.5v-4.2h3.4v4.2"
      fill="#8C7355"
      fillOpacity="0.2"
      stroke="#8C7355"
      strokeWidth="0.6"
      strokeOpacity="0.6"
    />

    {/* Cold unlit tungsten wire coil */}
    <path
      d="M14.5 19.5L13.2 12.8c-.15-.8.45-1.5 1.25-1.5.55 0 1.05.35 1.2.9l.35 1.1.35-1.1c.15-.55.65-.9 1.2-.9.8 0 1.4.7 1.25 1.5L17.5 19.5"
      stroke="#8C7355"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.65"
    />

    {/* Subtle curved glass reflection on unlit glass */}
    <path
      d="M9.2 11.8c0-3.3 2.5-6.1 5.8-6.6"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="9.3" cy="14.2" r="0.6" fill="#FFFFFF" fillOpacity="0.35" />

    {/* Antique brass screw base */}
    <rect
      x="11.3"
      y="23.2"
      width="9.4"
      height="4.8"
      rx="1.2"
      fill="url(#brassBaseOff)"
      stroke="#2E2218"
      strokeWidth="0.5"
    />
    <path
      d="M11.4 24.8h9.2M11.6 26.4h8.8"
      stroke="#2E2218"
      strokeWidth="0.65"
      strokeLinecap="round"
    />

    {/* Electrical bottom contact */}
    <path
      d="M13.2 28h5.6l-1.1 1.7c-.3.45-.8.7-1.35.7h-.7c-.55 0-1.05-.25-1.35-.7L13.2 28Z"
      fill="#140E0A"
    />
  </svg>
);

export const IconSoundOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const IconSoundOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);

export const IconSun = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
  </svg>
);

export const IconMoon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const IconCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const IconUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

export const IconSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const IconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const IconLeaf = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const IconTruck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export const IconShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

export const IconPackage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export const IconArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const IconArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

