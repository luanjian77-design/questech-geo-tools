import { useState } from 'react'
import Layout from '../components/Layout'
import { ArrowLeft, Search, BarChart3, Lightbulb, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function ContentAnalyzer() {
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const analyzeUrl = () => {
    if (!url.trim()) return
    setAnalyzing(true)
    
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 60
      const readabilityScore = Math.floor(Math.random() * 40) + 50
      const authorityScore = Math.floor(Math.random() * 35) + 55
      const freshnessScore = Math.floor(Math.random() * 30) + 70
      
      setResult({
        overall: score,
        metrics: {
          readability: readabilityScore,
          authority: authorityScore,
          freshness: freshnessScore,
          structure: Math.floor(Math.random() * 30) + 65,
          keywords: Math.floor(Math.random() * 35) + 55,
        },
        factors: [
          { name: '内容长度', status: score > 75 ? 'good' : 'warning', desc: '内容字数适中' },
          { name: '标题结构', status: 'good', desc: '使用了多层级的标题标签' },
          { name: '关键词密度', status: 'warning', desc: '建议增加2-3个相关关键词' },
          { name: '引用来源', status: score > 80 ? 'good' : 'warning', desc: '添加更多权威来源可提升可信度' },
          { name: '更新频率', status: 'good', desc: '内容保持最新状态' },
        ],
        aiCompatibility: Math.floor(Math.random() * 25) + 70,
        recommendations: [
          '建议添加 FAQ 部分以增加被 "People Also Ask" 引用的机会',
          '使用更多结构化数据（Schema Markup）增强AI理解',
          '增加具体数据和统计数字以提升内容权威性',
        ]
      })
      setAnalyzing(false)
    }, 2000)
  }

  const getScoreColor = (value) => {
    if (value > 80) return 'text-green-600'
    if (value > 60) return 'text-blue-600'
    return 'text-yellow-600'
  }

  const getScoreBg = (value) => {
    if (value > 80) return 'bg-green-50 border-green-200'
    if (value > 60) return 'bg-blue-50 border-blue-200'
    return 'bg-yellow-50 border-yellow-200'
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">返回首页</span>
        </a>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg mb-6">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">内容分析工具</h2>
          <p className="text-xl text-gray-500">分析网页内容在 GEO 时代的表现，评估AI亲和度</p>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              输入目标 URL
            </label>
            <div className="flex gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="flex-1 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition-all duration-300"
              />
              <button
                onClick={analyzeUrl}
                disabled={analyzing || !url.trim()}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:-translate-y-0.5"
              >
                {analyzing ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    分析中...
                  </span>
                ) : '分析'}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Overall Score */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 opacity-50" />
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br ${result.overall > 80 ? 'from-green-500 to-emerald-600' : result.overall > 60 ? 'from-purple-500 to-pink-600' : 'from-yellow-500 to-orange-500'} shadow-2xl mb-6`}>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">{result.overall}</div>
                    <div className="text-xs text-white/80">综合评分</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">综合 GEO 评分</h3>
                <p className="text-gray-500 mb-6">基于 AI 搜索引擎算法的综合评估</p>
                
                {/* AI Compatibility Badge */}
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${result.aiCompatibility > 85 ? 'bg-green-100 text-green-700' : result.aiCompatibility > 70 ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  <span className={`w-3 h-3 rounded-full ${result.aiCompatibility > 85 ? 'bg-green-500 animate-pulse' : result.aiCompatibility > 70 ? 'bg-purple-500 animate-pulse' : 'bg-yellow-500 animate-pulse'}`} />
                  <span className="font-semibold">AI 兼容性指数: {result.aiCompatibility}%</span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(result.metrics).map(([key, value]) => {
                const labels = {
                  readability: '可读性',
                  authority: '权威性',
                  freshness: '新鲜度',
                  structure: '结构化',
                  keywords: '关键词'
                }
                return (
                  <div key={key} className={`bg-white rounded-2xl p-5 shadow-lg border text-center card-hover metric-glow`}>
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(value)}`}>
                      {value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{labels[key]}</div>
                  </div>
                )
              })}
            </div>

            {/* Factors */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h4 className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-6">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                关键因素评估
              </h4>
              <div className="space-y-4">
                {result.factors.map((factor, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-semibold text-gray-900">{factor.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({factor.desc})</span>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                      factor.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {factor.status === 'good' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      {factor.status === 'good' ? '良好' : '待优化'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <h4 className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-6">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                  <Lightbulb className="w-5 h-5" />
                </div>
                优化建议
              </h4>
              <ul className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-700 bg-white rounded-xl p-5 shadow-sm">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600 flex-shrink-0">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <span className="leading-relaxed pt-0.5">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}