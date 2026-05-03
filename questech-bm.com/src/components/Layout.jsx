export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Questech <span className="text-blue-600">GEO Tools</span>
          </h1>
          <nav className="flex gap-6">
            <a href="#tools" className="text-gray-600 hover:text-blue-600 transition">工具</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition">关于</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 Questech BM · GEO Tools Platform</p>
        </div>
      </footer>
    </div>
  )
}
