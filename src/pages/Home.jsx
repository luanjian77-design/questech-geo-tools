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
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            让你的内容被 AI 看见
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Questech GEO Tools 专注于帮助内容创作者和营销人员优化内容，
            提升在 AI 搜索引擎中的可见性与引用率
          </p>
          <a href="#tools" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            开始使用
          </a>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">工具箱</h3>
          <p className="text-gray-600 mb-8">选择合适的工具开始优化你的内容</p>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">关于 GEO</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            GEO（Generative Engine Optimization）是一种新兴的内容优化策略，
            旨在提升内容在 AI 生成搜索引擎（如 Gemini、ChatGPT Search、Perplexity）中的可见性。
            通过结构化数据、质量信号和引用优化，让 AI 更愿意引用你的内容。
          </p>
        </div>
      </section>
    </Layout>
  )
}
