export function SampaguitaStar({
  size = 16,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`sampaguita-star ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2 C13.2 5.5, 13.2 8.5, 12 10.5 C10.8 8.5, 10.8 5.5, 12 2 Z" />
      <path d="M21.5 8.9 C18.3 10.2, 15.6 11.2, 13.5 11.2 C15 9.8, 17.8 8.5, 21.5 8.9 Z" />
      <path d="M17.9 20 C15.8 17.8, 14.1 15.3, 12.9 13.4 C14.6 14.3, 17.3 16.5, 17.9 20 Z" />
      <path d="M6.1 20 C6.7 16.5, 9.4 14.3, 11.1 13.4 C9.9 15.3, 8.2 17.8, 6.1 20 Z" />
      <path d="M2.5 8.9 C6.2 8.5, 9 9.8, 10.5 11.2 C8.4 11.2, 5.7 10.2, 2.5 8.9 Z" />
      <circle cx="12" cy="11.8" r="1.4" fill="currentColor" />
    </svg>
  )
}

export function LilyPetal({
  size = 16,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lily-petal ${className}`}
      aria-hidden="true"
    >
      <path d="M12 22 C12 16, 6 12, 5 5 C10 7, 15 12, 15 18" />
      <path d="M12 22 C12 15, 18 11, 19 4 C15 7, 10 12, 9 17" />
      <path d="M12 22 V11" strokeDasharray="1.5 2" />
    </svg>
  )
}

export function PetalBadgeIcon({
  size = 13,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`petal-badge-icon ${className}`}
      aria-hidden="true"
    >
      <path d="M8 1.8 C12 4.5, 12 11, 8 14.2 C4 11, 4 4.5, 8 1.8 Z" />
      <path d="M8 5 V11" strokeDasharray="1 1.5" />
    </svg>
  )
}

export function FloralWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`floral-watermark ${className}`}
      aria-hidden="true"
    >
      <path d="M30 290 C90 250, 140 180, 160 80" />
      <path d="M140 190 C180 160, 230 170, 260 200" />
      <path d="M100 230 C70 200, 45 170, 30 130" />
      <path d="M160 80 C155 65, 150 55, 160 45 C170 55, 165 65, 160 80 Z" />
      <path d="M160 65 C146 61, 137 66, 132 58 C144 54, 153 58, 160 65 Z" />
      <path d="M160 65 C174 61, 183 66, 188 58 C176 54, 167 58, 160 65 Z" />
      <circle cx="160" cy="65" r="2.5" />
      <path d="M260 200 C278 180, 296 150, 300 120 C280 135, 262 165, 260 200 Z" />
      <path d="M260 200 C286 210, 304 230, 310 250 C290 235, 272 220, 260 200 Z" />
    </svg>
  )
}

export function WaveDivider({
  colorClass = 'fill-offwhite',
  flip = false,
  className = '',
}: {
  colorClass?: string
  flip?: boolean
  className?: string
}) {
  return (
    <div
      className={`organic-wave-divider ${flip ? 'wave-flip' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 70"
        fill="none"
        preserveAspectRatio="none"
        className={`wave-svg ${colorClass}`}
      >
        <path
          d="M0,24 C280,68 480,12 720,40 C960,68 1160,16 1440,36 L1440,70 L0,70 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export function ScallopDivider({
  colorClass = 'wave-fill-surface',
  flip = false,
  className = '',
}: {
  colorClass?: string
  flip?: boolean
  className?: string
}) {
  return (
    <div
      className={`organic-wave-divider scallop-divider ${flip ? 'wave-flip' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 50"
        fill="none"
        preserveAspectRatio="none"
        className={`wave-svg ${colorClass}`}
      >
        <path
          d="M0,12 C90,44 150,44 240,12 C330,44 390,44 480,12 C570,44 630,44 720,12 C810,44 870,44 960,12 C1050,44 1110,44 1200,12 C1290,44 1350,44 1440,12 L1440,50 L0,50 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
