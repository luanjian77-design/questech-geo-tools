export default function ContentAnalyzerIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      {/* Bar chart base */}
      <rect x="6" y="20" width="4" height="8" rx="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="12" y="14" width="4" height="14" rx="1" fill="currentColor" fillOpacity="0.75" />
      <rect x="18" y="8" width="4" height="20" rx="1" fill="currentColor" fillOpacity="0.85" />
      <rect x="24" y="5" width="4" height="23" rx="1" fill="currentColor" />
      {/* Trend line */}
      <path 
        d="M8 18L14 12L20 15L26 7" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Dot on trend */}
      <circle cx="26" cy="7" r="2" fill="white" />
    </svg>
  )
}