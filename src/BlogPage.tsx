import { motion } from 'motion/react';
import { 
  Landmark, 
  FileText, 
  Users2, 
  LineChart as LineChartIcon,
  ArrowLeft,
  Search,
  Calendar,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  const posts = [
    {
      date: "2024.03.11",
      readTime: "12 min read",
      tag: "研报分析",
      title: "半导体设备行业深度：先进制程国产化加速的逻辑与空间",
      excerpt: "通过对核心设备厂商订单及技术路径的拆解，分析当前国产替代在刻蚀、薄膜沉积环节的确定性机会。重点关注先进制程节点的突破进度及供应链重塑背景下的份额提升。",
      icon: FileText
    },
    {
      date: "2024.03.10",
      readTime: "8 min read",
      tag: "会议纪要",
      title: "【纪要】某头部光伏组件厂专家交流：N型电池溢价与排产趋势",
      excerpt: "专家指出当前TOPCon排产持续超预期，海外订单占比提升明显。单瓦盈利有望在二季度迎来拐点，核心逻辑在于技术迭代带来的溢价空间及成本端的快速下降。",
      icon: Users2
    },
    {
      date: "2024.03.08",
      readTime: "15 min read",
      tag: "市场复盘",
      title: "周度策略：高股息红利风格的拥挤度度量与切换风险评估",
      excerpt: "利用量化指标监测当前红利资产的交易拥挤度，结合宏观流动性环境，探讨风格切换的潜在触发点。在低增长环境下，红利资产的长期配置价值依然显著。",
      icon: LineChartIcon
    },
    {
      date: "2024.03.05",
      readTime: "10 min read",
      tag: "宏观思考",
      title: "论当前流动性环境下的资产定价逻辑：从分母端到分子端的博弈",
      excerpt: "在全球降息预期反复的背景下，如何重新审视成长股与价值股的估值锚点？本文尝试从流动性周期出发，探讨不同宏观象限下的最优资产配置路径。",
      icon: Landmark
    },
    {
      date: "2024.03.02",
      readTime: "14 min read",
      tag: "研报分析",
      title: "算力基建系列研究：从光模块到液冷散热的价值量拆解",
      excerpt: "AI浪潮下，算力基建的瓶颈正在发生转移。本文重点分析液冷散热方案的渗透率提升路径及核心标的，并对光模块环节的迭代周期进行深度复盘。",
      icon: FileText
    },
    {
      date: "2024.02.28",
      readTime: "6 min read",
      tag: "会议纪要",
      title: "【纪要】算力租赁行业专家访谈：算力缺口与租金价格走势",
      excerpt: "访谈纪要显示，目前国产算力卡租赁需求旺盛，大模型厂商订单排期已至下半年。租金价格维持高位，行业进入从规模扩张向效率提升的转折点。",
      icon: Users2
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">主页</span>
            </Link>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-slate-900" />
              <span className="font-serif italic text-lg tracking-tight">锐典</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="/#principal-page" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">关于主理人</a>
              <a href="/#strategy-research-page" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">策略研究</a>
              <a 
                href="/#discussion-page"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all"
              >
                联系交流
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tight text-slate-900 mb-8">
              Insights & <br />
              Market Analysis.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              沉淀日常的深度研报分析、行业专家纪要以及市场复盘。
              致力于通过严谨的研究，探索投资的本质与长期的确定性。
            </p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16 pb-6 border-b border-slate-200">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {['全部文章', '研报分析', '会议纪要', '市场复盘', '宏观思考'].map((tag, i) => (
              <button 
                key={tag}
                className={`text-sm font-medium whitespace-nowrap transition-colors relative py-2 ${
                  i === 0 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {tag}
                {i === 0 && (
                  <motion.div 
                    layoutId="blogActiveTab" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" 
                  />
                )}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Showing {posts.length} Articles
          </div>
        </div>

        {/* Blog List */}
        <div className="grid gap-16">
          {posts.map((post, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group grid md:grid-cols-[1fr_2fr] gap-8 items-start"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <div className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                  {post.tag}
                </div>
              </div>

              <div className="space-y-4">
                <Link to="#" className="block group-hover:text-blue-600 transition-colors">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium leading-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-500 leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
                <Link 
                  to="#" 
                  className="inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors pt-2"
                >
                  阅读全文 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-24 pt-12 border-t border-slate-200 flex justify-center">
          <button className="px-10 py-4 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all active:scale-95">
            Load More Articles
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6 text-slate-900" />
                <span className="font-serif italic text-xl">锐典</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                锐取有道，典致投资。
                本站仅作为个人投资记录与研究展示，不构成任何投资建议。
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Navigation</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/" className="hover:text-blue-600 transition-colors">主页</Link></li>
                  <li><Link to="/blog" className="hover:text-blue-600 transition-colors">研究博客</Link></li>
                  <li><a href="/#strategy-research-page" className="hover:text-blue-600 transition-colors">策略研究</a></li>
                  <li><a href="/#principal-page" className="hover:text-blue-600 transition-colors">关于主理人</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Connect</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">WeChat</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Email</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-[10px] uppercase tracking-widest font-medium">
              © 2024 锐典. All rights reserved.
            </div>
            <div className="text-slate-300 text-[10px] uppercase tracking-widest font-medium">
              Designed for Clarity & Precision
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
