import { 
  Landmark, 
  Verified, 
  School, 
  Award, 
  Download, 
  LineChart, 
  BarChart3, 
  Layers, 
  Globe, 
  Users2, 
  Share2, 
  Mail, 
  FileText,
  FlaskConical,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Landmark className="text-primary w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">睿典股票工作室</h2>
                <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-semibold">精品资产管理</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#">首页</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#about">关于我们</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#strategies">投资策略</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#contact">联系我们</a>
              <button className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95">
                立即投资
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1611974717483-360058e55611?q=80&w=2070&auto=format&fit=crop" 
              alt="股票市场数据" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Verified className="w-4 h-4" /> 专业管理
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                张岩：<br/><span className="text-primary">专业股票投资工作室</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 font-light">
                硕士，CFA | 美股与A股市场专家 <br className="hidden md:block"/>
                睿典股票工作室负责人。在全求股票市场提供数据驱动的卓越投资表现。
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-primary/20">
                  探索策略
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-bold backdrop-blur-sm transition-all">
                  查看业绩
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-background-light dark:bg-background-dark border-y border-primary/5" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    alt="张岩, CFA" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMTrPTbX711lOR4sTYS1MQkJX2PFTdX-txQiswAbJ6KgmEoed6vfwFKvyyl9e2I62JfZ_K4F4m5tbUV-wWO-EFvfNmoj6clrFTBShF9bUXJw6_2j_axOh8ebziHYb8QvJ3OgzJqu-k_md1ov8VFkFEyjdG0zt34S9QbQyJHQRNgiGkPWav_rIMaVDLi55exIpGkPXsUp-RnpcefmgHJFWoatwL7nSspng8hr2KQGabf91g5QuLC7uwZj4tD021PVdlu2aIqXVZcnFo"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">关于负责人</h2>
                  <h3 className="text-4xl font-bold text-white mb-6">张岩，硕士 & CFA</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    张岩常驻深圳金融枢纽，以严谨的数据驱动方法深耕美股和A股市场。凭借硕士学位和全球公认的特许金融分析师（CFA）资格，他将定量精准度与定性洞察力完美结合。
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                    <School className="text-primary w-8 h-8 mb-3" />
                    <h4 className="text-white font-bold text-lg mb-1">硕士学位</h4>
                    <p className="text-slate-500 text-sm">卓越的学术背景</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                    <Award className="text-primary w-8 h-8 mb-3" />
                    <h4 className="text-white font-bold text-lg mb-1">CFA 持证人</h4>
                    <p className="text-slate-500 text-sm">金融行业黄金标准</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  下载专业简历 <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="py-24 bg-[#1a1710]" id="strategies">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">投资框架</h2>
              <h3 className="text-4xl font-bold text-white">先进投资策略</h3>
            </div>
            
            {/* Live Strategies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 border-l-4 border-primary pl-4">
                <TrendingUp className="text-primary w-6 h-6" />
                <h4 className="text-2xl font-bold text-white uppercase tracking-tight">实盘（Live）投资组合</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Strategy 1 */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-panel p-8 rounded-2xl hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">量化低波动策略</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">通过统计套利模型，利用算法管理选股，专注于稳定性和下行保护。</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="text-slate-500">风险等级</span>
                    <span className="text-emerald-500">中低风险</span>
                  </div>
                </motion.div>
                {/* Strategy 2 */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-panel p-8 rounded-2xl hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">主观多头 + 量化增强</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">将深度基本面研究与量化优化相结合，在核心股票持仓中创造超额收益。</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="text-slate-500">风险等级</span>
                    <span className="text-primary">中高风险</span>
                  </div>
                </motion.div>
                {/* Strategy 3 */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-panel p-8 rounded-2xl hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">ETF 轮动策略</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">利用动量轮动模型，在全球不同行业和资产类别之间进行战术性资产配置。</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="text-slate-500">风险等级</span>
                    <span className="text-primary">中等风险</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Simulated Strategies */}
            <div>
              <div className="flex items-center gap-3 mb-8 border-l-4 border-slate-500 pl-4">
                <FlaskConical className="text-slate-500 w-6 h-6" />
                <h4 className="text-2xl font-bold text-white uppercase tracking-tight">模拟模型 (R&D)</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-panel p-8 rounded-2xl border-dashed border-slate-700 hover:border-slate-500 transition-all opacity-80">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">全球全天候配置</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">风险平价方法，旨在通胀、紧缩和增长等不同经济周期中均能稳健表现。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Future Fund Section */}
        <section className="py-24 relative overflow-hidden" id="contact">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="现代建筑" 
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-12 md:p-20 rounded-3xl border-primary/20 shadow-2xl"
            >
              <Users2 className="text-primary w-16 h-16 mx-auto mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">共创未来增长</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                睿典股票工作室目前正在筹备推出专业的私募基金产品。我们诚邀志同道合、拥有长期愿景的专业投资者与我们建立联系。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-background-dark px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 transition-all">
                  咨询私募基金详情
                </button>
                <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl text-lg font-bold backdrop-blur-sm transition-all">
                  联系办公室
                </button>
              </div>
              <p className="mt-12 text-slate-500 text-xs uppercase tracking-[0.2em] font-medium">
                仅限合格机构投资者及专业投资者
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <Landmark className="text-primary w-6 h-6" />
              <span className="text-white font-bold text-lg">睿典股票工作室</span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2024 张岩, CFA. 保留所有权利。专业投资组合管理。
            </div>
            <div className="flex gap-6">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Share2 className="w-5 h-5" /></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Mail className="w-5 h-5" /></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><FileText className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="mt-12 text-center text-[10px] text-slate-700 leading-relaxed max-w-3xl mx-auto uppercase tracking-wider">
            免责声明：股票市场投资涉及风险。过往业绩不代表未来表现。所提供信息仅用于专业教育及工作室组合跟踪，不构成财务建议。
          </div>
        </div>
      </footer>
    </div>
  );
}
