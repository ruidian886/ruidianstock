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
                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Ruidian Stock Studio</h2>
                <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-semibold">Boutique Asset Management</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#">Home</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#about">About</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#strategies">Strategies</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#contact">Contact</a>
              <button className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95">
                Invest Now
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
              alt="Stock market data" 
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
                <Verified className="w-4 h-4" /> Professional Management
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Zhang Yan: <br/><span className="text-primary">Professional Stock Investment Studio</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 font-light">
                Master, CFA | US & A-Share Market Specialist <br className="hidden md:block"/>
                Principal of Ruidian Stock Studio. Delivering data-driven excellence in global equity markets.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-primary/20">
                  Explore Strategies
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-bold backdrop-blur-sm transition-all">
                  View Performance
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
                    alt="Zhang Yan, CFA" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMTrPTbX711lOR4sTYS1MQkJX2PFTdX-txQiswAbJ6KgmEoed6vfwFKvyyl9e2I62JfZ_K4F4m5tbUV-wWO-EFvfNmoj6clrFTBShF9bUXJw6_2j_axOh8ebziHYb8QvJ3OgzJqu-k_md1ov8VFkFEyjdG0zt34S9QbQyJHQRNgiGkPWav_rIMaVDLi55exIpGkPXsUp-RnpcefmgHJFWoatwL7nSspng8hr2KQGabf91g5QuLC7uwZj4tD021PVdlu2aIqXVZcnFo"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">About the Principal</h2>
                  <h3 className="text-4xl font-bold text-white mb-6">Zhang Yan, Master & CFA</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Based in the financial hub of Shenzhen, Zhang Yan brings a rigorous, data-driven approach to the US and A-share markets. With a Master's degree and the globally recognized Chartered Financial Analyst (CFA) designation, he blends quantitative precision with qualitative insight.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                    <School className="text-primary w-8 h-8 mb-3" />
                    <h4 className="text-white font-bold text-lg mb-1">Master's Degree</h4>
                    <p className="text-slate-500 text-sm">Advanced Academic Excellence</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                    <Award className="text-primary w-8 h-8 mb-3" />
                    <h4 className="text-white font-bold text-lg mb-1">CFA Charter</h4>
                    <p className="text-slate-500 text-sm">Gold Standard of Finance</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  Download Professional CV <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="py-24 bg-[#1a1710]" id="strategies">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Investment Framework</h2>
              <h3 className="text-4xl font-bold text-white">Advanced Investment Strategies</h3>
            </div>
            
            {/* Live Strategies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 border-l-4 border-primary pl-4">
                <TrendingUp className="text-primary w-6 h-6" />
                <h4 className="text-2xl font-bold text-white uppercase tracking-tight">Real-Money (Live) Portfolios</h4>
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
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">Quantitative Low-Volatility</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">Algorithmically managed selection focusing on stability and downside protection through statistical arbitrage models.</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="text-slate-500">Risk Profile</span>
                    <span className="text-emerald-500">Low-Medium</span>
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
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">Subjective Long + Quant Enhanced</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">Combining deep fundamental research with quantitative optimization for alpha generation in core equity holdings.</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="text-slate-500">Risk Profile</span>
                    <span className="text-primary">Medium-High</span>
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
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">ETF Rotation Strategy</h5>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">Tactical asset allocation across global sectors and asset classes using momentum-based rotation models.</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    <span className="text-slate-500">Risk Profile</span>
                    <span className="text-primary">Medium</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Simulated Strategies */}
            <div>
              <div className="flex items-center gap-3 mb-8 border-l-4 border-slate-500 pl-4">
                <FlaskConical className="text-slate-500 w-6 h-6" />
                <h4 className="text-2xl font-bold text-white uppercase tracking-tight">Simulated Models (R&D)</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-panel p-8 rounded-2xl border-dashed border-slate-700 hover:border-slate-500 transition-all opacity-80">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3 tracking-tight">Global All-Weather Allocation</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">Risk-parity approach designed to thrive across inflationary, deflationary, and growth economic cycles globally.</p>
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
              alt="Modern building" 
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
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Future Growth Together</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Ruidian Stock Studio is currently preparing for the launch of specialized private fund products. We invite sophisticated investors who share our long-term vision to connect with us.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-background-dark px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 transition-all">
                  Enquire About Private Funds
                </button>
                <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl text-lg font-bold backdrop-blur-sm transition-all">
                  Contact Office
                </button>
              </div>
              <p className="mt-12 text-slate-500 text-xs uppercase tracking-[0.2em] font-medium">
                Strictly for Qualified Institutional and Sophisticated Investors
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
              <span className="text-white font-bold text-lg">Ruidian Stock Studio</span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2024 Zhang Yan, CFA. All Rights Reserved. Specialized Portfolio Management.
            </div>
            <div className="flex gap-6">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Share2 className="w-5 h-5" /></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Mail className="w-5 h-5" /></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><FileText className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="mt-12 text-center text-[10px] text-slate-700 leading-relaxed max-w-3xl mx-auto uppercase tracking-wider">
            Disclaimer: Stock market investment involves risk. Past performance is not indicative of future results. Information provided is for professional educational and studio portfolio tracking purposes only and does not constitute financial advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
