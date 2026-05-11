import { useState } from 'react'
import Layout from '../components/Layout'
import { ArrowLeft, Sparkles, FileText, Link2, List, Bold, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContentOptimizer() {
  const [content, setContent] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const analyzeContent = () => {
    if (!content.trim()) return
    setAnalyzing(true)
    
    setTimeout(() => {
      const words = content.trim().split(/\s+/).length
      const chars = content.length
      const hasHeaders = /^#{1,6}\s/m.test(content)
      const hasLists = /^[-*]\s/m.test(content) || /^\d+\.\s/m.test(content)
      const hasBold = /\*\*[^*]+\*\*/.test(content) || /__[^_]+__/.test(content)
      const hasLinks = /\[.+?\]\(.+?\)/.test(content)
      
      let score = 60
      if (hasHeaders) score += 10
      if (hasLists) score += 8
      if (hasBold) score += 7
      if (hasLinks) score += 10
      if (words > 300) score += 10
      if (chars > 1500) score += 5
      
      setResult({
        score: Math.min(score, 100),
        wordCount: words,
        charCount: chars,
        hasHeaders,
        hasLists,
        hasBold,
        hasLinks,
        suggestions: generateSuggestions({ hasHeaders, hasLists, hasBold, hasLinks, words, chars })
      })
      setAnalyzing(false)
    }, 1500)
  }

  const generateSuggestions = ({ hasHeaders, hasLists, hasBold, hasLinks, words, chars }) => {
    const suggestions = []
    if (!hasHeaders) suggestions.push({ icon: <FileText className="w-5 h-5" />, text: '添加标题标签（H1/H2/H3）以提升内容结构化程度' })
    if (!hasLists) suggestions.push({ icon: <List className="w-5 h-5" />, text: '使用列表格式（项目符号或编号）增强可读性' })
    if (!hasBold) suggestions.push({ icon: <Bold className="w-5 h-5" />, text: '使用加粗文本强调关键信息' })
    if (!hasLinks) suggestions.push({ icon: <Link2 className="w-5 h-5" />, text: '添加内部链接和外部权威来源引用' })
    if (words < 300) suggestions.push({ icon: <AlertCircle className="w-5 h-5" />, text: '建议内容至少达到300字以上以获得更好的AI理解' })
    if (chars < 1500) suggestions.push({ icon: <AlertCircle className="w-5 h-5" />, text: '更长的内容通常能获得更高的AI引用率' })
    return suggestions
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-blue-500 to-indigo-600'
    return 'from-yellow-500 to-orange-500'
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">内容优化工具</h2>
          <p className="text-xl text-gray-500">分析并优化你的内容，提升在AI搜索引擎中的可见性</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              输入你的内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="粘贴你想要分析的文章或内容..."
              className="w-full h-72 p-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed placeholder:text-gray-400 transition-all duration-300"
            />
          </div>
          
          <div className="px-8 pb-8">
            <button
              onClick={analyzeContent}
              disabled={analyzing || !content.trim()}
              className="w-full btn-primary py-4 rounded-2xl font-semibold text-lg text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none transition-all duration-300"
            >
              {analyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  分析中...
                </span>
              ) : '开始分析'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Score Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${getScoreColor(result.score)} opacity-5`} />
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br ${getScoreColor(result.score)} shadow-2xl mb-6`}>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">{result.score}</div>
                    <div className="text-xs text-white/80">GEO得分</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">GEO 优化得分</h3>
                <p className="text-gray-500">
                  {result.score >= 80 ? '优秀！你的内容已经具备良好的 AI 亲和度' :
                   result.score >= 60 ? '良好！按照以下建议可以进一步优化' :
                   '需要优化，建议参考以下改进建议'}
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '字数', value: result.wordCount, color: 'blue' },
                { label: '字符数', value: result.charCount, color: 'purple' },
                { label: '标题结构', value: result.hasHeaders ? '✓' : '✗', color: result.hasHeaders ? 'green' : 'red' },
                { label: '链接', value: result.hasLinks ? '✓' : '✗', color: result.hasLinks ? 'green' : 'red' },
              ].map((metric, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center card-hover metric-glow">
                  <div className={`text-3xl font-bold mb-2 text-${metric.color}-600`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
                <h4 className="flex items-center gap-2 font-bold text-xl text-gray-900 mb-6">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  优化建议
                </h4>
                <ul className="space-y-4">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-700 bg-white rounded-xl p-4 shadow-sm">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-600 flex-shrink-0">
                        {s.icon}
                      </div>
                      <span className="leading-relaxed pt-1">{s.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}