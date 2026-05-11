export default function ToolCard({ id, title, description, category, Icon }) {
  const handleClick = () => {
    window.location.hash = id
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return (
    <button
      onClick={handleClick}
      className="group relative w-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden text-left card-hover"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      <div className="relative flex items-start gap-6">
        {/* Icon container */}
        <div className="relative flex-shrink-0">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <Icon />
          </div>
          {/* Category badge */}
          <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-white rounded-full shadow-md border border-gray-100">
            <span className="text-xs font-semibold text-gray-600">{category}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          
          {/* Arrow indicator */}
          <div className="flex items-center gap-2 text-blue-600 font-medium">
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