import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import ContentOptimizerIcon from '../components/icons/ContentOptimizer'
import ContentAnalyzerIcon from '../components/icons/ContentAnalyzer'
import { Zap, TrendingUp, Brain, Shield, Users, Globe, ChevronRight, Star, ArrowRight } from 'lucide-react'

const tools = [
  {
    id: 'content-optimizer',
    title: '内容优化工具',
    description: '输入文本内容，获取 AI 驱动的 GEO 优化建议。提升内容在 Gemini、ChatGPT 等 AI 搜索引擎中的引用率。',
    category: '内容优化',
    Icon: ContentOptimizerIcon,
  },
  {
    id: 'content-analyzer',
    title: '内容分析工具',
    description: '分析任意网页内容，评估其在 GEO 时代的表现。获取可操作的结构化改进建议。',
    category: '内容分析',
    Icon: ContentAnalyzerIcon,
  },
]

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI 原生分析',
    desc: '基于大语言模型理解内容语义，提供真正有价值的优化建议，而非简单关键词统计',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: '可见性提升',
    desc: '优化后的内容更容易被 AI 搜索引擎收录和引用，带来持续的有机流量',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: '即时反馈',
    desc: '数秒内获得详细分析报告，无需等待漫长的 SEO 爬取周期',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '隐私优先',
    desc: '你的内容仅用于本次分析，不会被存储或用于任何模型训练',
    color: 'from-violet-500 to-purple-500',
  },
]

const stats = [
  { value: '2+', label: 'AI 模型支持' },
  { value: '<5s', label: '平均响应时间' },
  { value: '95%', label: '建议采纳率' },
]

const testimonials = [
  {
    quote: 'Questech 的分析报告帮我把文章的被引用率提升了 3 倍，效果超出预期。',
    author: '内容营销总监',
    company: '某科技媒体',
    rating: 5,
  },
  {
    quote: '第一次用就被圈粉了。分析维度很专业，不像其他工具只给表面建议。',
    author: 'SEO 负责人',
    company: '某电商品牌',
    rating: 5,
  },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        
        {/* Gradient orbs */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-36">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-amber-300">GEO 时代内容优化标准工具</span>
            </div>
          </div>
          
          {/* Main heading */}
          <h1 className="text-center mb-6">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              让 AI 更好地
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              理解你的内容
            </span>
          </h1>
          
          <p className="text-center text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed">
            Questech GEO Tools 帮助内容创作者优化文本结构与语义，<br className="hidden md:block" />
            提升在 <span className="text-amber-400 font-semibold">Gemini</span>、<span className="text-amber-400 font-semibold">ChatGPT</span>、<span className="text-amber-400 font-semibold">Perplexity</span> 等 AI 搜索引擎中的引用率
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href="#tools" 
              onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-lg text-slate-900 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                boxShadow: '0 8px 30px rgba(251,191,36,0.3)'
              }}
            >
              开始使用
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#features" 
              onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white transition-all duration-300"
            >
              了解更多
            </a>
          </div>
          
          {/* Stats row */}
          <div className="mt-20 flex flex-wrap justify-center gap-12">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 55C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-5">核心工具</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">选择适合你的工具</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              专为 GEO 时代设计的内容优化与分析工具
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-semibold mb-5">核心优势</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">为什么选择 Questech</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div 
                key={i}
                className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 border border-slate-100 hover:border-slate-200 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg mb-5`}>
                  {f.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-5">工作原理</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">三步提升内容 GEO 表现</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: '输入内容', desc: '粘贴你想要分析的文章内容，或输入任意网页 URL' },
              { step: '02', title: 'AI 分析', desc: '我们的 AI 模型会从语义、结构、引用等多维度深度分析' },
              { step: '03', title: '获取建议', desc: '收到详细的优化报告，包含具体的改进步骤和建议' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="text-7xl font-black text-slate-100 mb-4">{item.step}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 -right-4 text-slate-300">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 border border-amber-500/30 bg-amber-500/10 rounded-full text-sm font-semibold text-amber-300 mb-5">用户反馈</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">真实用户的使用体验</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.author}</div>
                    <div className="text-slate-500 text-sm">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-5">免费使用</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">现在就开始优化你的内容</h2>
          <p className="text-xl text-slate-500 mb-10">
            两个核心工具均可免费使用，无需注册，即开即用
          </p>
          <a 
            href="#tools" 
            onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              boxShadow: '0 8px 30px rgba(251,191,36,0.3)'
            }}
          >
            立即体验
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* About/GEO Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-semibold mb-5">什么是 GEO</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Generative Engine Optimization</h2>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                <strong className="text-slate-900">GEO（生成式引擎优化）</strong> 是一种新兴的内容优化策略，专门针对 AI 生成搜索引擎（如 Gemini、ChatGPT Search、Perplexity）进行优化。
              </p>
              <p>
                与传统 SEO 不同，GEO 更关注内容的<strong className="text-amber-600">语义清晰度</strong>、<strong className="text-emerald-600">结构化程度</strong>和<strong className="text-blue-600">引用权威性</strong>，让 AI 模型更容易理解和引用你的内容。
              </p>
              <p>
                Questech GEO Tools 正是基于这些核心维度，提供可操作的优化建议，帮助你的内容在 AI 时代获得更多曝光。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}