import { useState } from 'react'
import Layout from '../components/Layout'
import { ArrowLeft } from 'lucide-react'

export default function ContentOptimizer() {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const analyzeContent = () => {
    if (!content.trim()) return
    setAnalyzing(true)
    
    // Simulated analysis - in production this would call an API
    setTimeout(() => {
      const words = content.trim().split(/\s+/).length
      const chars = content.length
      const hasHeaders = /^#{1,6}\s/m.test(content)
      const hasLists = /^[-*]\s/m.test(content) || /^\d+\.\s/m.test(content)
      const hasBold = /\*\*[^*]+\*\*/.test(content) || /__[^_]+__/.test(content)
      const hasLinks = /\[.+?\]\(.+?\)/.test(content)
      
      // Calculate GEO score
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
    if (!hasHeaders) suggestions.push('添加标题标签（H1/H2/H3）以提升内容结构化程度')
    if (!hasLists) suggestions.push('使用列表格式（项目符号或编号）增强可读性')
    if (!hasBold) suggestions.push('使用加粗文本强调关键信息')
    if (!hasLinks) suggestions.push('添加内部链接和外部权威来源引用')
    if (words < 300) suggestions.push('建议内容至少达到300字以上以获得更好的AI理解')
    if (chars < 1500) suggestions.push('更长的内容通常能获得更高的AI引用率')
    return suggestions
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回首页
        </a>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">内容优化工具</h2>
        <p className="text-gray-600 mb-8">分析并优化你的内容，提升在AI搜索引擎中的可见性</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入你的内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="粘贴你想要分析的文章或内容..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={analyzeContent}
            disabled={analyzing || !content.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {analyzing ? '分析中...' : '开始分析'}
          </button>

          {result && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{result.score}</div>
                <p className="text-gray-600">GEO 优化得分</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{result.wordCount}</div>
                  <p className="text-sm text-gray-600">字数</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{result.charCount}</div>
                  <p className="text-sm text-gray-600">字符数</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${result.hasHeaders ? 'text-green-600' : 'text-red-500'}`}>
                    {result.hasHeaders ? '✓' : '✗'}
                  </div>
                  <p className="text-sm text-gray-600">标题结构</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${result.hasLinks ? 'text-green-600' : 'text-red-500'}`}>
                    {result.hasLinks ? '✓' : '✗'}
                  </div>
                  <p className="text-sm text-gray-600">链接</p>
                </div>
              </div>

              {result.suggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">优化建议</h4>
                  <ul className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
