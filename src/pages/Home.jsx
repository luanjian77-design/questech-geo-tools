import { useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import ContentOptimizerIcon from '../components/icons/ContentOptimizer'
import ContentAnalyzerIcon from '../components/icons/ContentAnalyzer'
import { 
  Zap, TrendingUp, Brain, Shield, 
  ChevronRight, Star, ArrowRight, 
  BarChart3, Target, Sparkles,
  Search, FileText, Quote
} from 'lucide-react'

const tools = [
  {
    id: 'content-optimizer',
    title: '内容优化工具',
    description: '输入文本内容，获取 AI 驱动的 GEO 优化建议。提升内容在 豆包、通义千问、Kimi、元宝、Gemini、ChatGPT 等 AI 搜索引擎中的引用率。',
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

// iPhone-style icon component with soft 3D effect
const FeatureIcon = ({ icon, color }) => (
  <div 
    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
    style={{
      background: `linear-gradient(145deg, ${color} 0%, ${color}dd 100%)`,
      boxShadow: `
        0 4px 12px rgba(0,0,0,0.1),
        0 2px 4px rgba(0,0,0,0.08),
        inset 0 1px 0 rgba(255,255,255,0.4),
        inset 0 -1px 0 rgba(0,0,0,0.05)
      `,
    }}
  >
    <div className="text-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))' }}>
      {icon}
    </div>
  </div>
)

const features = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: 'AI 原生分析',
    desc: '基于大语言模型理解内容语义，提供真正有价值的优化建议，而非简单关键词统计',
    color: '#6366f1',
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: '可见性提升',
    desc: '优化后的内容更容易被 AI 搜索引擎收录和引用，带来持续的有机流量',
    color: '#10b981',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: '即时反馈',
    desc: '数秒内获得详细分析报告，无需等待漫长的 SEO 爬取周期',
    color: '#0ea5e9',
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: '隐私优先',
    desc: '你的内容仅用于本次分析，不会被存储或用于任何模型训练',
    color: '#8b5cf6',
  },
]

const stats = [
  { value: '2+', label: 'AI 模型支持' },
  { value: '<5s', label: '平均响应时间' },
  { value: '95%', label: '建议采纳率' },
]

const testimonials = [
  {
    quote: '用了三个月，GEO评分从55提升到82。客户文章的AI引用率提升了4倍，真的很神奇。',
    author: '张明',
    role: '内容运营总监',
    company: '华邦科技',
    avatar: 'ZM',
    avatarBg: 'from-sky-400 to-blue-500',
  },
  {
    quote: '作为一个技术博客主，以前SEO全靠关键词堆砌。Questech让我第一次真正理解什么叫「AI友好的内容」。',
    author: '李晓峰',
    role: '独立博主',
    company: '「前端进化论」主理人',
    avatar: 'LX',
    avatarBg: 'from-violet-400 to-purple-500',
  },
  {
    quote: '我们团队用它分析竞品内容策略，发现了很多之前忽视的GEO优化机会。报告的可操作性很强。',
    author: '王芳',
    role: '数字营销经理',
    company: '云起数据',
    avatar: 'WF',
    avatarBg: 'from-emerald-400 to-teal-500',
  },
  {
    quote: 'Perplexity 上原来搜不到我们的内容，用了优化建议后现在能稳定出现在引用源里。流量有明显增长。',
    author: '陈志远',
    role: '增长负责人',
    company: '听见科技',
    avatar: 'CZ',
    avatarBg: 'from-amber-400 to-orange-500',
  },
  {
    quote: '分析维度比其他工具细致太多，不只是SEO那套东西。能看出AI模型真正看重什么。',
    author: '刘婷',
    role: 'SEO Lead',
    company: '麦奇数字',
    avatar: 'LT',
    avatarBg: 'from-rose-400 to-pink-500',
  },
  {
    quote: '一键生成优化清单，照着改就行。节省了我大量的内容迭代时间，终于不用凭感觉写文章了。',
    author: '赵磊',
    role: '内容主编',
    company: '新潮传媒',
    avatar: 'ZL',
    avatarBg: 'from-cyan-400 to-sky-500',
  },
]

const geoSeoComparison = [
  { aspect: '目标', seo: '提升网页在传统搜索引擎的排名', geo: '提升内容被 AI 模型引用的概率' },
  { aspect: '核心指标', seo: '点击率 (CTR)、跳出率、停留时间', geo: '引用率、答案收录率、品牌提及度' },
  { aspect: '优化重点', seo: '关键词密度、反向链接、元标签', geo: '语义清晰度、结构化程度、引用权威性' },
  { aspect: '内容评估', seo: '基于爬虫规则和排名因素', geo: '基于大语言模型的理解偏好' },
  { aspect: '适用场景', seo: 'Google、Bing 传统搜索', geo: '豆包、通义千问、Kimi 等 AI 搜索' },
]

// Section label component - consistent across all sections
const SectionLabel = ({ children }) => (
  <span className="inline-block px-4 py-1.5 bg-slate-100 text-sky-600 rounded-full text-sm font-semibold">
    {children}
  </span>
)

// Section header component - left-aligned, consistent
const SectionHeader = ({ label, title, subtitle, align = 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <div className={`mb-5 ${align === 'center' ? 'flex justify-center' : ''}`}>
      <SectionLabel>{label}</SectionLabel>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{title}</h2>
    {subtitle && (
      <p className={`text-xl text-slate-500 ${align === 'center' ? 'max-w-2xl mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
  </div>
)

export default function Home() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    
    let scrollPos = 0
    const speed = 0.4
    
    const rafId = requestAnimationFrame(function step() {
      if (!el) return
      const maxScroll = el.scrollWidth / 2
      scrollPos += speed
      if (scrollPos >= maxScroll) scrollPos = 0
      el.scrollLeft = scrollPos
      requestAnimationFrame(step)
    })
    
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <Layout>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
      }}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full" style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
          }} />
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full" style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          }} />
          <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full" style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-28">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-sky-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-sky-700">GEO 时代内容优化标准工具</span>
            </div>
          </div>
          
          <h1 className="text-center mb-6">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-4 tracking-tight">
              让 AI 更好地
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              理解你的内容
            </span>
          </h1>
          
          <p className="text-center text-xl md:text-2xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed">
            Questech GEO Tools 帮助内容创作者优化文本结构与语义，<br className="hidden md:block" />
            提升在 <span className="text-sky-600 font-semibold">Gemini</span>、<span className="text-indigo-600 font-semibold">ChatGPT</span>、<span className="text-violet-600 font-semibold">Perplexity</span>、<span className="text-amber-600 font-semibold">豆包</span>、<span className="text-emerald-600 font-semibold">通义千问</span>、<span className="text-pink-600 font-semibold">Kimi</span>、<span className="text-orange-600 font-semibold">元宝</span> 等 AI 搜索引擎中的引用率
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href="#tools" 
              onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                boxShadow: '0 8px 30px rgba(14,165,233,0.35)',
              }}
            >
              开始使用
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#geo-intro" 
              onClick={(e) => { e.preventDefault(); document.getElementById('geo-intro')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-slate-600 bg-white/80 hover:bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-300"
            >
              了解更多
            </a>
          </div>
          
          <div className="mt-20 flex flex-wrap justify-center gap-12">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text" style={{
                  backgroundImage: 'linear-gradient(135deg, #0ea5e9, #6366f1)'
                }}>{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 30 720 35C840 40 960 50 1080 55C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ========== GEO INTRO SECTION ========== */}
      <section id="geo-intro" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            label="核心概念" 
            title="什么是 GEO？" 
            subtitle="Generative Engine Optimization — AI 时代的内容优化新范式"
          />
          
          <div className="max-w-4xl mx-auto mb-14">
            <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 rounded-3xl p-10 border border-sky-100">
              <div className="flex items-start gap-5 mb-6">
                <div className="p-4 rounded-2xl bg-white shadow-md flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">生成式引擎优化</h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    GEO 是一种针对 AI 生成搜索引擎的内容优化策略。与传统 SEO 不同，GEO 不再专注于关键词排名，而是让内容更容易被 <strong className="text-sky-600">大语言模型（LLM）</strong> 理解和引用，从而在 AI 生成的答案中获得曝光。
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-white/80 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-bold text-slate-900 mb-1">核心目标</h4>
                  <p className="text-sm text-slate-600">成为 AI 回答中的引用来源，提升品牌在 AI 搜索中的可见性</p>
                </div>
                <div className="bg-white/80 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-3xl mb-2">🧠</div>
                  <h4 className="font-bold text-slate-900 mb-1">优化逻辑</h4>
                  <p className="text-sm text-slate-600">适配大语言模型的「理解方式」，而非爬虫的「抓取规则」</p>
                </div>
                <div className="bg-white/80 rounded-xl p-5 backdrop-blur-sm">
                  <div className="text-3xl mb-2">📈</div>
                  <h4 className="font-bold text-slate-900 mb-1">效果指标</h4>
                  <p className="text-sm text-slate-600">引用率、答案收录率、品牌提及率，而非传统排名</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              GEO vs 传统 SEO：核心差异
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-6 bg-slate-50 rounded-tl-xl text-slate-600 font-semibold">优化维度</th>
                    <th className="text-center py-4 px-6 bg-slate-50 text-slate-600 font-semibold">传统 SEO</th>
                    <th className="text-center py-4 px-6 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-tr-xl text-sky-700 font-semibold">GEO（AI 搜索）</th>
                  </tr>
                </thead>
                <tbody>
                  {geoSeoComparison.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 font-semibold text-slate-700">{row.aspect}</td>
                      <td className="py-5 px-6 text-slate-600 text-center">
                        <span className="inline-flex items-center gap-2 text-sm">
                          <Search className="w-4 h-4 text-slate-400" />
                          {row.seo}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-center" style={{ background: 'rgba(14,165,233,0.04)' }}>
                        <span className="inline-flex items-center gap-2 text-sm text-sky-700 font-medium">
                          <Target className="w-4 h-4 text-sky-500" />
                          {row.geo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-14">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">GEO 优化的四大核心要素</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { num: '01', title: '语义清晰度', desc: '使用自然流畅的语言表达核心观点，让 AI 能准确理解内容意图', color: '#0ea5e9' },
                { num: '02', title: '结构化程度', desc: '合理使用标题层级、列表、表格等格式，帮助 AI 解析内容层次', color: '#6366f1' },
                { num: '03', title: '引用权威性', desc: '引用权威来源和数据，增强内容可信度，提升被引用概率', color: '#8b5cf6' },
                { num: '04', title: '实体关联', desc: '与领域内知名实体建立联系，帮助 AI 建立内容知识图谱', color: '#0ea5e9' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text mb-3" style={{
                    backgroundImage: `linear-gradient(135deg, ${item.color}, ${item.color}88)`
                  }}>{item.num}</div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TOOLS SECTION ========== */}
      <section id="tools" className="py-24" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            label="核心工具" 
            title="选择适合你的工具" 
            subtitle="专为 GEO 时代设计的内容优化与分析工具"
          />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            label="核心优势" 
            title="为什么选择 Questech" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div 
                key={i}
                className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 border border-slate-100 hover:border-slate-200 hover:-translate-y-1"
              >
                <div className="mb-5">
                  <FeatureIcon icon={f.icon} color={f.color} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader 
            label="工作原理" 
            title="三步提升内容 GEO 表现" 
          />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', icon: <FileText className="w-8 h-8" />, title: '输入内容', desc: '粘贴你想要分析的文章内容，或输入任意网页 URL' },
              { step: '02', icon: <Brain className="w-8 h-8" />, title: 'AI 分析', desc: '我们的 AI 模型会从语义、结构、引用等多维度深度分析' },
              { step: '03', icon: <Target className="w-8 h-8" />, title: '获取建议', desc: '收到详细的优化报告，包含具体的改进步骤和建议' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white shadow-lg flex items-center justify-center" style={{
                  boxShadow: '0 8px 30px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}>
                  <div className="text-sky-600">{item.icon}</div>
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-100 mb-3">{item.step}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-sky-300 z-10">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="flex items-center gap-3">
            <SectionLabel>用户反馈</SectionLabel>
            <span className="text-slate-400 text-sm">真实用户使用体验</span>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-7 shadow-lg border border-slate-100"
              style={{
                boxShadow: '0 4px 20px rgba(14,165,233,0.08), 0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <div className="relative mb-5">
                <Quote className="absolute -top-1 -left-1 w-5 h-5 text-sky-200" />
                <p className="text-slate-700 leading-relaxed pl-4 text-[15px]">"{t.quote}"</p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.author}</div>
                  <div className="text-slate-500 text-xs">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 text-slate-400 text-sm">
          ← 自动循环滚动 · 可左右拖动 →
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-5">
            <span className="inline-block px-4 py-1.5 bg-slate-100 text-sky-600 rounded-full text-sm font-semibold">免费使用</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">现在就开始优化你的内容</h2>
          <p className="text-xl text-slate-500 mb-10">
            两个核心工具均可免费使用，无需注册，即开即用
          </p>
          <a 
            href="#tools" 
            onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2.5 px-10 py-5 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              boxShadow: '0 8px 30px rgba(14,165,233,0.35)',
            }}
          >
            立即体验
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </Layout>
  )
}