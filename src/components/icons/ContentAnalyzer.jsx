export default function ContentAnalyzerIcon() {
  return (
    <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
      {/* Chart background panel */}
      <rect x="4" y="6" width="28" height="24" rx="3" fill="currentColor" fillOpacity="0.3" />
      {/* Bars */}
      <rect x="8" y="20" width="5" height="8" rx="1.5" fill="white" fillOpacity="0.6" />
      <rect x="15" y="14" width="5" height="14" rx="1.5" fill="white" fillOpacity="0.8" />
      <rect x="22" y="10" width="5" height="18" rx="1.5" fill="white" />
      {/* Trend arrow */}
      <path 
        d="M10 18L16 12L22 16L28 8" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fillOpacity="0.7"
      />
    </svg>
  )
}