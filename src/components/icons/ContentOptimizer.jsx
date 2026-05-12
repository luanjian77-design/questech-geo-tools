export default function ContentOptimizerIcon() {
  return (
    <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
      {/* Document base */}
      <rect x="6" y="4" width="24" height="28" rx="3" fill="currentColor" fillOpacity="0.3" />
      <rect x="6" y="4" width="24" height="8" rx="3" fill="currentColor" fillOpacity="0.5" />
      {/* Lines representing text */}
      <rect x="10" y="16" width="16" height="2.5" rx="1" fill="white" fillOpacity="0.9" />
      <rect x="10" y="20.5" width="12" height="2.5" rx="1" fill="white" fillOpacity="0.7" />
      <rect x="10" y="25" width="14" height="2.5" rx="1" fill="white" fillOpacity="0.7" />
      {/* Sparkle / optimization indicator */}
      <circle cx="28" cy="9" r="5" fill="white" />
      <path 
        d="M28 6.5v5M25.5 9h5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round"
        fillOpacity="0.5"
      />
    </svg>
  )
}