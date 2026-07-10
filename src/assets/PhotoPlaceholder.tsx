export default function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Frame */}
      <rect x="1" y="1" width="398" height="298" stroke="#5a3535" strokeWidth="1.5" />

      {/* Sun */}
      <circle cx="298" cy="88" r="42" stroke="#6a3838" strokeWidth="1.5" />

      {/* Mountains */}
      <polyline
        points="1,298 110,148 188,210 268,108 348,190 399,155 399,298"
        stroke="#5a3030" strokeWidth="1.75" strokeLinejoin="round"
      />
    </svg>
  )
}
