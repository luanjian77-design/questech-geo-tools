export default function ToolCard({ id, title, description, category, Icon }) {
  const handleClick = () => {
    window.location.hash = id
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return (
    <button
      onClick={handleClick}
      className="group relative w-full bg-white rounded-3xl p-9 shadow-md hover:shadow-2xl transition-all duration-500 border border-sky-100 overflow-hidden text-left card-hover flex flex-col"
      style={{
        boxShadow: '0 4px 20px rgba(14,165,233,0.06), 0 2px 8px rgba(0,0,0,0.04)',
        minHeight: '240px',
      }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-400 rounded-full filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      <div className="relative flex flex-col h-full">
        {/* Icon container - iPhone style with 3D effect */}
        <div className="relative flex-shrink-0">
          <div 
            className="p-5 rounded-2xl text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, #0ea5e9, #6366f1)',
              boxShadow: '0 4px 12px rgba(14,165,233,0.25), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.05)'
            }}
          >
            <Icon />
          </div>
          {/* Category badge */}
          <div 
            className="absolute -bottom-2 -right-2 px-3 py-1 bg-white rounded-full shadow-md border border-sky-100"
            style={{ boxShadow: '0 2px 8px rgba(14,165,233,0.1)' }}
          >
            <span className="text-xs font-semibold text-sky-600">{category}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between mt-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">{description}</p>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex items-center gap-2 text-sky-500 font-medium mt-5">
            <span className="text-sm">立即使用</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  )
}