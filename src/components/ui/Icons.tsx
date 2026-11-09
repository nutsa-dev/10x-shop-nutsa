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
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    {...props}
  >
    <defs>
      <pattern
        id="bellWoodPatternOn"
        patternUnits="userSpaceOnUse"
        width="24"
        height="24"
      >
        <image
          href="/nordic-wood.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      <pattern
        id="bellWoodPatternOnDark"
        patternUnits="userSpaceOnUse"
        width="24"
        height="24"
      >
        <image
          href="/nordic-wood-dark.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      <linearGradient id="woodBellBevelOn" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#FFF7EB" stopOpacity="0.45" />
        <stop offset="45%" stopColor="#D4B58E" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#4A2C11" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="woodBellBevelOnDark" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#5F3C22" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#140B05" stopOpacity="0.58" />
      </linearGradient>
    </defs>

    {/* Ringing sound arcs */}
    <path
      d="M4 2.5C2.8 4.2 2 6.2 2 8.5"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <path
      d="M20 2.5c1.2 1.7 2 3.7 2 6"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
    />

    {/* Light Mode Oak Bell */}
    <g className="transition-opacity duration-500 dark:opacity-0">
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#bellWoodPatternOn)"
        stroke="#6E4B2A"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#woodBellBevelOn)"
        stroke="#6E4B2A"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 7.5c0-2.2 1.4-3.8 3.3-4.2"
        stroke="#FFF9F0"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <path
        d="M9.8 17.5a2.2 2.2 0 0 0 4.4 0H9.8Z"
        fill="url(#bellWoodPatternOn)"
        stroke="#6E4B2A"
        strokeWidth="1"
      />
    </g>

    {/* Dark Mode Walnut Bell (matching .dark .wood-btn) */}
    <g className="opacity-0 transition-opacity duration-500 dark:opacity-100">
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#bellWoodPatternOnDark)"
        stroke="#7A5030"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#woodBellBevelOnDark)"
        stroke="#7A5030"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 7.5c0-2.2 1.4-3.8 3.3-4.2"
        stroke="#F3DFC3"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <path
        d="M9.8 17.5a2.2 2.2 0 0 0 4.4 0H9.8Z"
        fill="url(#bellWoodPatternOnDark)"
        stroke="#7A5030"
        strokeWidth="1"
      />
    </g>
  </svg>
);

export const IconSoundOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    {...props}
  >
    <defs>
      <pattern
        id="bellWoodPatternOff"
        patternUnits="userSpaceOnUse"
        width="24"
        height="24"
      >
        <image
          href="/nordic-wood.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      <pattern
        id="bellWoodPatternOffDark"
        patternUnits="userSpaceOnUse"
        width="24"
        height="24"
      >
        <image
          href="/nordic-wood-dark.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      <linearGradient id="woodBellBevelOff" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#FFF7EB" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#3B230E" stopOpacity="0.65" />
      </linearGradient>
      <linearGradient id="woodBellBevelOffDark" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#5F3C22" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#140B05" stopOpacity="0.62" />
      </linearGradient>
    </defs>

    {/* Light Mode Oak Muted Bell */}
    <g className="transition-opacity duration-500 dark:opacity-0">
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#bellWoodPatternOff)"
        stroke="#6E4B2A"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#woodBellBevelOff)"
        stroke="#6E4B2A"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 17.5a2.2 2.2 0 0 0 4.4 0H9.8Z"
        fill="url(#bellWoodPatternOff)"
        stroke="#6E4B2A"
        strokeWidth="1"
      />
      <line
        x1="3"
        y1="3"
        x2="21"
        y2="21"
        stroke="#5E3D20"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>

    {/* Dark Mode Walnut Muted Bell */}
    <g className="opacity-0 transition-opacity duration-500 dark:opacity-100">
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#bellWoodPatternOffDark)"
        stroke="#7A5030"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z"
        fill="url(#woodBellBevelOffDark)"
        stroke="#7A5030"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 17.5a2.2 2.2 0 0 0 4.4 0H9.8Z"
        fill="url(#bellWoodPatternOffDark)"
        stroke="#7A5030"
        strokeWidth="1"
      />
      <line
        x1="3"
        y1="3"
        x2="21"
        y2="21"
        stroke="#F3DFC3"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
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
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    {...props}
  >
    <defs>
      {/* Real wood texture pattern matching .wood-btn */}
      <pattern
        id="userWoodPattern"
        patternUnits="userSpaceOnUse"
        width="24"
        height="24"
      >
        <image
          href="/nordic-wood.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      <pattern
        id="userWoodPatternDark"
        patternUnits="userSpaceOnUse"
        width="24"
        height="24"
      >
        <image
          href="/nordic-wood-dark.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
      {/* 3D Turned Oak Shading Overlay */}
      <linearGradient id="woodUserBevel" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#FFF7EB" stopOpacity="0.45" />
        <stop offset="45%" stopColor="#D4B58E" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#4A2C11" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="woodUserBevelDark" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#5F3C22" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#140B05" stopOpacity="0.58" />
      </linearGradient>
    </defs>

    {/* Light Mode Oak User Figurine */}
    <g className="transition-opacity duration-500 dark:opacity-0">
      <circle
        cx="12"
        cy="7.5"
        r="4.5"
        fill="url(#userWoodPattern)"
        stroke="#6E4B2A"
        strokeWidth="1.1"
      />
      <circle
        cx="12"
        cy="7.5"
        r="4.5"
        fill="url(#woodUserBevel)"
        stroke="#6E4B2A"
        strokeWidth="0.9"
      />
      <path
        d="M9.5 5.6A3.1 3.1 0 0 1 13.5 4.6"
        stroke="#FFF9F0"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <path
        d="M4.2 20.2c0-3.8 3.5-6.6 7.8-6.6s7.8 2.8 7.8 6.6c0 .65-.5 1.15-1.15 1.15h-13.3c-.65 0-1.15-.5-1.15-1.15Z"
        fill="url(#userWoodPattern)"
        stroke="#6E4B2A"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 20.2c0-3.8 3.5-6.6 7.8-6.6s7.8 2.8 7.8 6.6c0 .65-.5 1.15-1.15 1.15h-13.3c-.65 0-1.15-.5-1.15-1.15Z"
        fill="url(#woodUserBevel)"
        stroke="#6E4B2A"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M6.8 17.2c1.5-1.6 3.8-2.3 6.4-2.1"
        stroke="#FFF9F0"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
    </g>

    {/* Dark Mode Walnut User Figurine (matching .dark .wood-btn) */}
    <g className="opacity-0 transition-opacity duration-500 dark:opacity-100">
      <circle
        cx="12"
        cy="7.5"
        r="4.5"
        fill="url(#userWoodPatternDark)"
        stroke="#7A5030"
        strokeWidth="1.1"
      />
      <circle
        cx="12"
        cy="7.5"
        r="4.5"
        fill="url(#woodUserBevelDark)"
        stroke="#7A5030"
        strokeWidth="0.9"
      />
      <path
        d="M9.5 5.6A3.1 3.1 0 0 1 13.5 4.6"
        stroke="#F3DFC3"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <path
        d="M4.2 20.2c0-3.8 3.5-6.6 7.8-6.6s7.8 2.8 7.8 6.6c0 .65-.5 1.15-1.15 1.15h-13.3c-.65 0-1.15-.5-1.15-1.15Z"
        fill="url(#userWoodPatternDark)"
        stroke="#7A5030"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 20.2c0-3.8 3.5-6.6 7.8-6.6s7.8 2.8 7.8 6.6c0 .65-.5 1.15-1.15 1.15h-13.3c-.65 0-1.15-.5-1.15-1.15Z"
        fill="url(#woodUserBevelDark)"
        stroke="#7A5030"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M6.8 17.2c1.5-1.6 3.8-2.3 6.4-2.1"
        stroke="#F3DFC3"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </g>
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

export const IconEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconEyeOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    {...props}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);
