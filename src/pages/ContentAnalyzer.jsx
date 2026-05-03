import { useState } from 'react'
import Layout from '../components/Layout'
import { ArrowLeft } from 'lucide-react'

export default function ContentAnalyzer() {
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const analyzeUrl = () => {
    if (!url.trim()) return
    setAnalyzing(true)
    
    // Simulated analysis
    setTimeout(() => {
      // Generate simulated metrics
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
          '建议添加 FAQ 部分以增加被 \"People Also Ask\" 引用的机会',
          '使用更多结构化数据（Schema Markup）增强AI理解',
          '增加具体数据和统计数字以提升内容权威性',
        ]
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回首页
        </a>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">内容分析工具</h2>
        <p className="text-gray-600 mb-8">分析网页内容在 GEO 时代的表现，评估AI亲和度</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入目标 URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={analyzeUrl}
                disabled={analyzing || !url.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                {analyzing ? '分析中...' : '分析'}
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-7xl font-bold text-blue-600 mb-2">{result.overall}</div>
                <p className="text-gray-600">综合 GEO 评分</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <span className={`w-3 h-3 rounded-full ${result.aiCompatibility > 85 ? 'bg-green-500' : result.aiCompatibility > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-blue-700">AI 兼容性指数: {result.aiCompatibility}%</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(result.metrics).map(([key, value]) => (
                  <div key={key} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      value > 80 ? 'text-green-600' : value > 60 ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                      {value}
                    </div>
                    <p className="text-xs text-gray-600 capitalize">{key === 'readability' ? '可读性' : 
                      key === 'authority' ? '权威性' : 
                      key === 'freshness' ? '新鲜度' : 
                      key === 'structure' ? '结构化' : '关键词'}</p>
                  </div>
                ))}
              </div>

              {/* Factors */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">关键因素评估</h4>
                <div className="space-y-3">
                  {result.factors.map((factor, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <span className="font-medium text-gray-900">{factor.name}</span>
                        <span className="text-gray-500 text-sm ml-2">({factor.desc})</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        factor.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {factor.status === 'good' ? '良好' : '待优化'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">优化建议</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-blue-800">
                      <span className="text-blue-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
