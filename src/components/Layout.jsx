export default function Layout({ children }) {
  const scrollToSection = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="mx-auto px-4 py-3">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-sky-100 shadow-lg" style={{
            boxShadow: '0 4px 30px rgba(14,165,233,0.08)'
          }}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                  style={{
                    background: 'linear-gradient(145deg, #0ea5e9, #6366f1)',
                    boxShadow: '0 4px 12px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Questech</h1>
                  <p className="text-xs text-sky-600 font-medium -mt-0.5">GEO Tools</p>
                </div>
              </div>
              <nav className="flex items-center gap-2">
                <a 
                  href="#tools" 
                  onClick={(e) => scrollToSection(e, 'tools')}
                  className="px-4 py-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                  工具
                </a>
                <a 
                  href="#geo-intro" 
                  onClick={(e) => scrollToSection(e, 'geo-intro')}
                  className="px-4 py-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all duration-300 font-medium text-sm"
                >
                  什么是GEO
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-sky-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #0ea5e9, #6366f1)',
                  boxShadow: '0 4px 12px rgba(14,165,233,0.3)'
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">Questech GEO Tools</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              专注于 AI 搜索引擎内容优化与分析
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <a href="#tools" onClick={(e) => scrollToSection(e, 'tools')} className="hover:text-white transition">工具</a>
              <a href="#geo-intro" onClick={(e) => scrollToSection(e, 'geo-intro')} className="hover:text-white transition">什么是GEO</a>
              <span>·</span>
              <span>© 2026 Questech BM</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}