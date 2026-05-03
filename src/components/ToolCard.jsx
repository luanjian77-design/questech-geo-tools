export default function ToolCard({ id, title, description, category, Icon }) {
  const handleClick = () => {
    window.location.hash = id
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return (
    <button
      onClick={handleClick}
      className="text-left w-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition">
          <Icon />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{category}</span>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </button>
  )
}
