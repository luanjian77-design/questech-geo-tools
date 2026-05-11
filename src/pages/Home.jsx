import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import ContentOptimizerIcon from '../components/icons/ContentOptimizer'
import ContentAnalyzerIcon from '../components/icons/ContentAnalyzer'

const tools = [
  {
    id: 'content-optimizer',
    title: '内容优化工具',
    description: '优化内容以提升AI搜索可见性，增加被Gemini、ChatGPT等抓取和引用的机会',
    category: '内容优化',
    Icon: ContentOptimizerIcon,
  },
  {
    id: 'content-analyzer',
    title: '内容分析工具',
    description: '分析内容在GEO时代的AI亲和度，评估SEO表现与内容质量',
    category: '内容分析',
    Icon: ContentAnalyzerIcon,
  },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background mesh gradient */}
        <div 
          className="absolute inset-0 hero-mesh"
          style={{ backgroundImage: 'radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.08) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(236, 72, 153, 0.08) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.12) 0px, transparent 50%)' }}
        />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }} />
        
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-32">
          <div className="text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">GEO 时代内容优化利器</span>
            </div>
            
            {/* Main heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">让 AI 看见你的内容</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Questech GEO Tools 专注于帮助内容创作者和营销人员优化内容，
              提升在 <span className="text-blue-600 font-semibold">Gemini</span>、<span className="text-blue-600 font-semibold">ChatGPT</span> 等 AI 搜索引擎中的可见性与引用率
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#tools" 
                onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-primary px-8 py-4 text-lg font-semibold text-white rounded-2xl"
              >
                开始使用 →
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-8 py-4 text-lg font-medium text-gray-700 bg-white/80 hover:bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
              >
                了解更多
              </a>
            </div>
            
            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">99%</div>
                <div className="text-sm text-gray-500 mt-1">AI 识别准确率</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">10x</div>
                <div className="text-sm text-gray-500 mt-1">内容可见性提升</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">5s</div>
                <div className="text-sm text-gray-500 mt-1">快速分析响应</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">工具箱</span>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">选择合适的工具</h3>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              专业的 GEO 优化工具，帮助你提升内容在 AI 搜索引擎中的表现
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <div key={tool.id} className={`animate-fade-in-up stagger-${index + 1}`}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">核心优势</span>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">为什么选择我们</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: '快速分析',
                desc: '5秒内完成内容分析，即时获取优化建议',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: '数据驱动',
                desc: '基于最新 AI 搜索引擎算法，实时更新优化策略',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: '智能建议',
                desc: 'AI 驱动的个性化优化建议，直接提升内容质量',
                gradient: 'from-pink-500 to-pink-600'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover border border-gray-100 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-6`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30" />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">关于 GEO</span>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">什么是 GEO？</h3>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                <strong className="text-gray-900">GEO（Generative Engine Optimization）</strong> 是一种新兴的内容优化策略，
                旨在提升内容在 AI 生成搜索引擎（如 Gemini、ChatGPT Search、Perplexity）中的可见性。
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                通过<strong className="text-blue-600">结构化数据</strong>、<strong className="text-purple-600">质量信号</strong>和<strong className="text-pink-600">引用优化</strong>，
                让 AI 更愿意引用你的内容，在 AI 时代获得更多曝光机会。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}