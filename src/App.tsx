import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Landmark, 
  Verified, 
  School, 
  Award, 
  Zap,
  Download, 
  LineChart as LineChartIcon, 
  BarChart3, 
  Layers, 
  Globe, 
  Users2, 
  Share2, 
  Mail, 
  FileText,
  FlaskConical,
  TrendingUp,
  Brain,
  RefreshCw,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  X,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import BlogPage from './BlogPage';

const StrategyCard = ({ 
  title, 
  description, 
  icon: Icon, 
  riskLevel, 
  riskColor,
  details,
  chartData,
  metrics
}: { 
  title: string, 
  description: string, 
  icon: any, 
  riskLevel: string, 
  riskColor: string,
  details: string,
  chartData: { name: string, value: number, benchmark?: number, a500?: number, alpha?: number }[],
  metrics?: {
    totalReturn: string,
    ytdReturn: string,
    nav: string,
    annualizedReturn: string,
    sharpeRatio: string,
    inceptionDate: string,
    alphaTotal?: string,
    alphaYtd?: string,
    periodReturns: { period: string, fund: string, benchmark: string }[]
  }
}) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'drawdown'>('performance');
  const [timeRange, setTimeRange] = useState('since_inception');
  const [showMore, setShowMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  
  // Helper to filter data based on selected time range
  const getFilteredData = (data: any[]) => {
    if (timeRange === 'since_inception') return data;
    
    // Handle custom range
    if (timeRange === 'custom' && customRange.start && customRange.end) {
      return data.filter(d => {
        const date = `20${d.name}`; // "24-07" -> "2024-07"
        return date >= customRange.start && date <= customRange.end;
      });
    }

    // Handle specific years
    if (['2024', '2025', '2026'].includes(timeRange)) {
      const yearPrefix = timeRange.slice(2); // "24", "25", "26"
      return data.filter(d => d.name.startsWith(yearPrefix));
    }
    
    // Handle relative ranges (3m, 6m, 1y)
    const countMap: Record<string, number> = { '3m': 3, '6m': 6, '1y': 12 };
    if (countMap[timeRange]) {
      return data.slice(-countMap[timeRange]);
    }
    
    return data;
  };

  const filteredChartData = getFilteredData(chartData);
  const filteredDrawdownData = getFilteredData(chartData.map(d => ({
    name: d.name,
    value: Math.max(-15, -Math.random() * 10 - (d.value < 105 ? 5 : 0)),
    benchmark: Math.max(-20, -Math.random() * 12),
    a500: Math.max(-18, -Math.random() * 11)
  })));

  // Custom Tick component for multiline X-axis
  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    if (!payload || !payload.value) return null;
    
    const parts = payload.value.split('-');
    if (parts.length < 2) {
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#475569" fontSize={10} fontWeight="bold">
            {payload.value}
          </text>
        </g>
      );
    }
    
    const [year, month] = parts;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#475569" fontSize={10} fontWeight="bold">
          <tspan x={0} dy="0">20{year}</tspan>
          <tspan x={0} dy="12">{month}</tspan>
        </text>
      </g>
    );
  };

  const timeRanges = [
    { id: 'since_inception', label: '成立以来' },
    { id: '3m', label: '近3月' },
    { id: '6m', label: '近6月' },
    { id: '1y', label: '近1年' },
  ];

  const moreRanges = [
    { id: '2024', label: '2024' },
    { id: '2025', label: '2025' },
    { id: '2026', label: '2026' },
    { id: 'custom', label: '自定义区间' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel overflow-hidden rounded-3xl border border-white/5 hover:border-primary/30 transition-all group mb-12"
    >
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Info Side */}
        <div className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02]">
          <div>
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-7 h-7" />
              </div>
            </div>
            <h5 className="text-3xl font-bold text-white mb-6 tracking-tight leading-tight">{title}</h5>
            <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">{description}</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em]">
                <span className="text-slate-500">风险等级:</span>
                <span className={`${riskColor} px-3 py-1 rounded-full bg-current/10 border border-current/20`}>{riskLevel}</span>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <h6 className="text-white font-bold text-sm mb-4 flex items-center gap-2 uppercase tracking-widest opacity-60">
                  <FileText className="w-4 h-4 text-primary" />
                  策略核心逻辑
                </h6>
                <div className="space-y-3">
                  {details.split('\n').map((line, i) => (
                    <p key={i} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                      <span className="text-primary font-bold">{i + 1}.</span>
                      {line.replace(/^\d+\.\s*/, '')}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Metrics Side */}
        <div className="lg:col-span-8 p-6 md:p-10 bg-black/40 flex flex-col">
          {/* Top Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center lg:text-left">
              <p className="text-primary text-2xl md:text-3xl font-black mb-1">{metrics?.totalReturn || "106.90%"}</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">
                成立以来收益 ({(metrics?.inceptionDate || "2024-07-03").split('-')[0]}-2026)
              </p>
              {metrics?.alphaTotal && (
                <div className="flex items-center gap-1 justify-center lg:justify-start">
                  <span className="text-[10px] text-slate-600 uppercase tracking-widest">超额(A500):</span>
                  <span className="text-[11px] font-bold text-primary">{metrics.alphaTotal}</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-red-500 text-2xl md:text-3xl font-black mb-1">{metrics?.ytdReturn || "9.59%"}</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">今年以来收益</p>
              {metrics?.alphaYtd && (
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-[10px] text-slate-600 uppercase tracking-widest">超额(A500):</span>
                  <span className="text-[11px] font-bold text-primary">{metrics.alphaYtd}</span>
                </div>
              )}
            </div>
            <div className="text-center lg:text-right">
              <p className="text-white text-2xl md:text-3xl font-black mb-1">{metrics?.nav || "2.0690"}</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest">单位净值 (03-06)</p>
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 py-6 border-y border-white/5">
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">成立来年化</p>
              <p className="text-red-500 font-bold">{metrics?.annualizedReturn || "54.44%"}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">份额设立日</p>
              <p className="text-white font-bold">{metrics?.inceptionDate || "2024-07-03"}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">累计净值</p>
              <p className="text-white font-bold">{metrics?.nav || "2.0690"}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">成立来夏普</p>
              <p className="text-white font-bold">{metrics?.sharpeRatio || "2.04"}</p>
            </div>
          </div>

          {/* Chart Tabs */}
          <div className="flex gap-8 mb-8 border-b border-white/5">
            {[
              { id: 'performance', label: '业绩走势' },
              { id: 'drawdown', label: '动态回撤' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
              >
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </div>
          
          <div className="flex-grow min-h-[250px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'performance' ? (
                <LineChart data={filteredChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={<CustomizedAxisTick />}
                    height={50}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 10 }}
                    tickFormatter={(val) => `${val}%`}
                    domain={['auto', 'auto']}
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ fontSize: '10px' }}
                    formatter={(val: any) => [`${val}%`]}
                    shared={true}
                  />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold' }}
                  />
                  <Line name="本基金" type="monotone" dataKey="value" stroke="#F27D26" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
                  {chartData[0].a500 !== undefined && (
                    <Line name="A500" type="monotone" dataKey="a500" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="3 3" />
                  )}
                </LineChart>
              ) : (
                <LineChart data={filteredDrawdownData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={<CustomizedAxisTick />}
                    height={50}
                  />
                  <YAxis 
                    domain={[-25, 0]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 10 }} 
                    tickFormatter={(val) => `${val}%`}
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                    formatter={(val: any) => [`${val}%`]}
                    shared={true}
                  />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold' }}
                  />
                  <Line name="本基金回撤" type="stepAfter" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mb-6">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-[11px] font-black text-sky-400 hover:bg-sky-500/20 transition-all uppercase tracking-[0.15em] shadow-lg shadow-sky-500/5 active:scale-95"
            >
              策略详情
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {/* Time Range Selectors */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {timeRanges.map(range => (
                    <button
                      key={range.id}
                      onClick={() => setTimeRange(range.id)}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                        timeRange === range.id 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                  <div className="relative">
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                        moreRanges.some(r => r.id === timeRange)
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      更多
                      <ChevronDown className={`w-3 h-3 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {showMore && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full mb-2 left-0 w-32 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                          {moreRanges.map(range => (
                            <button
                              key={range.id}
                              onClick={() => {
                                setTimeRange(range.id);
                                setShowMore(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
                            >
                              {range.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Custom Date Inputs */}
                <AnimatePresence>
                  {timeRange === 'custom' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 mb-10 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">起始</span>
                        <input 
                          type="month" 
                          value={customRange.start}
                          onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                          className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="h-px w-4 bg-white/10" />
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">结束</span>
                        <input 
                          type="month" 
                          value={customRange.end}
                          onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                          className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <Calendar className="w-4 h-4 text-primary ml-auto opacity-50" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Period Returns Table */}
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="text-white font-bold text-[10px] uppercase tracking-widest opacity-60">区间涨幅对比</h6>
                    <span className="text-[10px] text-slate-600 uppercase tracking-widest">数据更新于 2026-03-06</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-2">
                    <div className="col-span-1">区间</div>
                    <div className="text-right">本基金</div>
                    <div className="text-right">中证1000</div>
                    <div className="text-right">超额收益</div>
                  </div>
                  <div className="space-y-1">
                    {(metrics?.periodReturns || [
                      { period: "成立以来", fund: "106.90%", benchmark: "43.40%" },
                      { period: "今年以来", fund: "9.59%", benchmark: "3.73%" },
                      { period: "近一年", fund: "43.98%", benchmark: "23.60%" }
                    ]).map((row, idx) => {
                      const fundVal = parseFloat(row.fund);
                      const benchVal = parseFloat(row.benchmark);
                      const alphaValue = fundVal - benchVal;
                      const alpha = (alphaValue > 0 ? "+" : "") + alphaValue.toFixed(2) + "%";
                      
                      return (
                        <div key={idx} className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 items-center">
                          <div className="text-[11px] text-slate-300 font-medium">{row.period}</div>
                          <div className={`text-right text-[11px] font-bold ${fundVal >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.fund}</div>
                          <div className="text-right text-[11px] font-bold text-slate-400">{row.benchmark}</div>
                          <div className={`text-right text-[11px] font-bold ${alphaValue >= 0 ? 'text-primary' : 'text-slate-500'}`}>{alpha}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
}

function LandingPage() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div id="home" className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQR(false)}
              className="absolute inset-0 bg-background-dark/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-primary/20"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Landmark className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">联系交流</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">扫描下方二维码添加微信进行探讨</p>
              </div>
              <div className="aspect-square bg-white p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner mb-6">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://ais-pre-lt6hbn46plprmskx2d2bgp-613917986540.asia-southeast1.run.app" 
                  alt="联系二维码" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">睿典投资研究工作室</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Landmark className="text-primary w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">睿典：个人投资研究工作室</h2>
                <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-semibold">个人投资研究展示</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#home">首页</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#about">关于主理人</a>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#strategies">策略研究</a>
              <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" to="/blog" target="_blank">研究博客</Link>
              <a className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="#contact">交流探讨</a>
              <button 
                onClick={() => setShowQR(true)}
                className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95 inline-flex items-center justify-center"
              >
                联系交流
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold mb-8 tracking-wide shadow-lg shadow-primary/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                个人投资策略展示 / 教育交流，不提供个性化建议，用户独立决策自担风险
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                睿典：<br/><span className="text-primary">个人投资研究工作室</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 font-light">
                专注于全球股票市场的数据驱动研究与策略探索 <br className="hidden md:block"/>
                <span className="text-primary font-medium">主理人：硕士，CFA | 美股与A股市场研究者 | 操盘实战者</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#strategies"
                  className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-primary/20 inline-flex items-center justify-center whitespace-nowrap"
                >
                  探索策略研究
                </a>
                <a 
                  href="#team" 
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-bold backdrop-blur-sm transition-all inline-flex items-center justify-center"
                >
                  关于睿典
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-background-light dark:bg-background-dark border-y border-primary-dim/5" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-primary-dim/20 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    alt="张岩, CFA" 
                    className="w-full h-full object-cover" 
                    src="/张岩.jpg"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-primary-dim font-bold uppercase tracking-widest text-sm mb-3">关于主理人</h2>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary-dim mb-6 leading-tight">
                    主理人：硕士 & CFA
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                    睿典投资研究工作室致力于将严谨的数据驱动方法与深入的基本面研究相结合。主理人常驻深圳金融枢纽，深耕美股和A股市场，凭借硕士学位和特许金融分析师（CFA）资格，致力于将定量精准度与定性洞察力应用于个人投资实践与策略探索。
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-primary-dim/5 border border-primary-dim/10">
                    <School className="text-primary-dim w-8 h-8 mb-3" />
                    <h4 className="text-slate-700 dark:text-white font-bold text-lg mb-1">硕士学位</h4>
                    <p className="text-slate-400 dark:text-slate-400 text-sm">卓越的学术背景</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary-dim/5 border border-primary-dim/10">
                    <Award className="text-primary-dim w-8 h-8 mb-3" />
                    <h4 className="text-slate-700 dark:text-white font-bold text-lg mb-1">CFA 持证人</h4>
                    <p className="text-slate-400 dark:text-slate-400 text-sm">金融行业黄金标准</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary-dim/5 border border-primary-dim/10">
                    <Zap className="text-primary-dim w-8 h-8 mb-3" />
                    <h4 className="text-slate-700 dark:text-white font-bold text-lg mb-1">实战交易</h4>
                    <p className="text-slate-400 dark:text-slate-400 text-sm">卓越的实盘执行能力</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-primary-dim font-bold hover:underline">
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
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">研究框架</h2>
              <h3 className="text-4xl font-bold text-white">个人策略研究展示</h3>
            </div>
            
            {/* Live Strategies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 border-l-4 border-primary pl-4">
                <TrendingUp className="text-primary w-6 h-6" />
                <h4 className="text-2xl font-bold text-white uppercase tracking-tight">实盘策略模型</h4>
              </div>
              <div className="flex flex-col gap-8">
                <StrategyCard 
                  title="量化低波动套利策略"
                  description="通过统计套利模型，利用算法选股/买卖股票，在流动性较低的市场长期有效。专注于稳定性低波和下行保护。"
                  icon={ArrowUpDown}
                  riskLevel="中高风险"
                  riskColor="text-primary"
                  details="1. 策略逻辑：基于统计套利原理，捕捉市场微观结构中的定价偏差。\n2. 选股模型：多因子量化选股，重点关注流动性、波动率及反转因子。\n3. 风险控制：严格的下行保护机制，通过动态对冲降低组合波动。"
                  chartData={[
                    { name: '24-07', value: 100, benchmark: 100, a500: 100, alpha: 0 },
                    { name: '24-08', value: 102.5, benchmark: 101.2, a500: 100.8, alpha: 1.3 },
                    { name: '24-09', value: 105.8, benchmark: 103.5, a500: 102.5, alpha: 2.3 },
                    { name: '24-10', value: 108.2, benchmark: 104.8, a500: 103.2, alpha: 3.4 },
                    { name: '24-11', value: 112.5, benchmark: 106.2, a500: 105.5, alpha: 6.3 },
                    { name: '24-12', value: 115.8, benchmark: 108.5, a500: 107.2, alpha: 7.3 },
                    { name: '25-01', value: 122.5, benchmark: 112.2, a500: 110.5, alpha: 10.3 },
                    { name: '25-02', value: 128.5, benchmark: 115.5, a500: 113.2, alpha: 13.0 },
                    { name: '25-03', value: 135.8, benchmark: 118.8, a500: 116.5, alpha: 17.0 },
                    { name: '25-04', value: 142.5, benchmark: 122.2, a500: 119.8, alpha: 20.3 },
                    { name: '25-05', value: 155.8, benchmark: 128.5, a500: 125.5, alpha: 27.3 },
                    { name: '25-06', value: 168.5, benchmark: 135.5, a500: 132.0, alpha: 33.0 },
                    { name: '25-07', value: 175.8, benchmark: 138.8, a500: 135.5, alpha: 37.0 },
                    { name: '25-08', value: 182.5, benchmark: 142.2, a500: 138.8, alpha: 40.3 },
                    { name: '25-09', value: 195.8, benchmark: 148.5, a500: 144.5, alpha: 47.3 },
                    { name: '25-10', value: 206.9, benchmark: 153.4, a500: 149.2, alpha: 53.5 },
                  ]}
                  metrics={{
                    totalReturn: "106.90%",
                    ytdReturn: "9.59%",
                    nav: "2.0690",
                    annualizedReturn: "54.44%",
                    sharpeRatio: "2.04",
                    inceptionDate: "2024-07-03",
                    alphaTotal: "+57.70%",
                    alphaYtd: "+5.86%",
                    periodReturns: [
                      { period: "成立以来", fund: "106.90%", benchmark: "43.40%" },
                      { period: "今年以来", fund: "9.59%", benchmark: "3.73%" },
                      { period: "近一月", fund: "-0.81%", benchmark: "1.01%" },
                      { period: "近三月", fund: "7.65%", benchmark: "5.90%" },
                      { period: "近半年", fund: "15.26%", benchmark: "8.82%" },
                      { period: "近一年", fund: "43.98%", benchmark: "23.60%" }
                    ]
                  }}
                />
                <StrategyCard 
                  title="主观多头 + 量化增强"
                  description="通过多元化的主观交易手法（基本面趋势持有/题材热点龙头补涨挖掘/情绪博弈），并行ai算法对持有的股票做t增强持仓收益，创造超额收益。"
                  icon={Brain}
                  riskLevel="中高风险"
                  riskColor="text-primary"
                  details="1. 主观部分：深耕基本面研究，捕捉行业趋势及题材热点。\n2. 量化部分：AI算法辅助日内交易（做T），优化买卖点，提升持仓收益。\n3. 核心优势：结合人的洞察力与机器的执行力，实现超额收益最大化。"
                  chartData={[
                    { name: '24-07', value: 100, benchmark: 100, a500: 100, alpha: 0 },
                    { name: '24-08', value: 105, benchmark: 101.2, a500: 100.5, alpha: 3.8 },
                    { name: '24-09', value: 103, benchmark: 103.5, a500: 102.2, alpha: -0.5 },
                    { name: '24-10', value: 108, benchmark: 104.8, a500: 103.5, alpha: 3.2 },
                    { name: '24-11', value: 112, benchmark: 106.2, a500: 105.2, alpha: 5.8 },
                    { name: '24-12', value: 110, benchmark: 108.5, a500: 107.5, alpha: 1.5 },
                    { name: '25-01', value: 118, benchmark: 112.2, a500: 110.8, alpha: 5.8 },
                    { name: '25-02', value: 125, benchmark: 115.5, a500: 113.5, alpha: 9.5 },
                  ]}
                  metrics={{
                    totalReturn: "125.00%",
                    ytdReturn: "11.40%",
                    nav: "2.2500",
                    annualizedReturn: "62.10%",
                    sharpeRatio: "1.85",
                    inceptionDate: "2024-07-15",
                    alphaTotal: "+81.60%",
                    alphaYtd: "+7.67%",
                    periodReturns: [
                      { period: "成立以来", fund: "125.00%", benchmark: "43.40%" },
                      { period: "今年以来", fund: "11.40%", benchmark: "3.73%" },
                      { period: "近一年", fund: "58.20%", benchmark: "23.60%" }
                    ]
                  }}
                />
                <StrategyCard 
                  title="ETF 轮动策略"
                  description="利用多维打分算法模型，选择赛道ETF配置，获取超额收益"
                  icon={RefreshCw}
                  riskLevel="中低风险"
                  riskColor="text-emerald-500"
                  details="1. 轮动模型：基于动量、估值及宏观指标的多维打分系统。\n2. 资产配置：在全球及行业ETF间进行动态切换，规避弱势资产。\n3. 收益目标：通过赛道优选，在不同市场环境下获取稳健的超额收益。"
                  chartData={[
                    { name: '24-07', value: 100, benchmark: 100, a500: 100, alpha: 0 },
                    { name: '24-08', value: 102, benchmark: 101.2, a500: 100.8, alpha: 0.8 },
                    { name: '24-09', value: 104, benchmark: 103.5, a500: 102.5, alpha: 0.5 },
                    { name: '24-10', value: 103, benchmark: 104.8, a500: 103.2, alpha: -1.8 },
                    { name: '24-11', value: 106, benchmark: 106.2, a500: 105.5, alpha: -0.2 },
                    { name: '24-12', value: 108, benchmark: 108.5, a500: 107.2, alpha: -0.5 },
                    { name: '25-01', value: 107, benchmark: 112.2, a500: 110.5, alpha: -5.2 },
                    { name: '25-02', value: 110, benchmark: 115.5, a500: 113.2, alpha: -5.5 },
                  ]}
                  metrics={{
                    totalReturn: "110.00%",
                    ytdReturn: "2.80%",
                    nav: "1.1000",
                    annualizedReturn: "18.50%",
                    sharpeRatio: "1.20",
                    inceptionDate: "2024-08-01",
                    alphaTotal: "-3.20%",
                    alphaYtd: "-0.93%",
                    periodReturns: [
                      { period: "成立以来", fund: "110.00%", benchmark: "43.40%" },
                      { period: "今年以来", fund: "2.80%", benchmark: "3.73%" },
                      { period: "近一年", fund: "15.40%", benchmark: "23.60%" }
                    ]
                  }}
                />
              </div>
            </div>

            {/* Simulated Strategies */}
            <div>
              <div className="flex items-center gap-3 mb-8 border-l-4 border-slate-500 pl-4">
                <FlaskConical className="text-slate-500 w-6 h-6" />
                <h4 className="text-2xl font-bold text-white uppercase tracking-tight">模拟模型 (R&D)</h4>
              </div>
              <div className="flex flex-col gap-8">
                <StrategyCard 
                  title="全球全天候配置"
                  description="风险平价方法，旨在通胀、紧缩和增长等不同经济周期中均能稳健表现。通过跨资产类别对冲实现长期低回撤。"
                  icon={Globe}
                  riskLevel="低风险"
                  riskColor="text-emerald-400"
                  details="1. 核心理念：基于Ray Dalio的风险平价理论，不预测市场，而是平衡不同经济环境下的资产风险。\n2. 资产类别：涵盖全球股票、长期国债、中期国债、黄金及大宗商品。\n3. 模拟表现：在历史极端市场环境下表现出极强的韧性，回撤控制在极低水平。"
                  chartData={[
                    { name: 'M1', value: 100, benchmark: 100, a500: 100 }, { name: 'M2', value: 100.5, benchmark: 100.2, a500: 100.3 }, 
                    { name: 'M3', value: 101.2, benchmark: 100.8, a500: 101.0 }, { name: 'M4', value: 100.8, benchmark: 101.5, a500: 101.2 },
                    { name: 'M5', value: 101.5, benchmark: 102.1, a500: 101.8 }, { name: 'M6', value: 102.1, benchmark: 102.5, a500: 102.2 }, 
                    { name: 'M7', value: 102.5, benchmark: 103.2, a500: 102.8 }, { name: 'M8', value: 103.2, benchmark: 103.8, a500: 103.5 },
                  ]}
                  metrics={{
                    totalReturn: "3.20%",
                    ytdReturn: "1.50%",
                    nav: "1.0320",
                    annualizedReturn: "4.80%",
                    sharpeRatio: "1.10",
                    inceptionDate: "2025-01-01",
                    alphaTotal: "+0.40%",
                    alphaYtd: "+0.20%",
                    periodReturns: [
                      { period: "模拟以来", fund: "3.20%", benchmark: "2.80%" },
                      { period: "今年以来", fund: "1.50%", benchmark: "1.30%" }
                    ]
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-[#1a1710]" id="team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">核心团队</h2>
              <h3 className="text-4xl font-bold text-white">睿典研究团队介绍</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  name: "睿典主理人",
                  role: "创始人 / 首席策略师",
                  bio: "硕士学位，CFA持证人。深耕美股与A股市场多年，擅长将宏观基本面研究与量化模型相结合，构建稳健的投资组合。",
                  image: "https://picsum.photos/seed/leader/400/500"
                },
                {
                  name: "林博士",
                  role: "量化研究主管",
                  bio: "数学博士，拥有深厚的统计建模背景。负责开发低波动套利模型与AI增强算法，致力于通过数据挖掘发现市场Alpha。",
                  image: "https://picsum.photos/seed/quant/400/500"
                },
                {
                  name: "陈分析师",
                  role: "行业研究员",
                  bio: "专注科技与新能源赛道研究。通过深入的产业链调研，为“主观多头”策略提供核心标的池，捕捉行业爆发性机会。",
                  image: "https://picsum.photos/seed/analyst/400/500"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel overflow-hidden rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-white mb-2">{member.name}</h4>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">{member.role}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Future Fund Section */}
        <section className="py-12 relative overflow-hidden" id="contact">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="现代建筑" 
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-10 rounded-3xl border-primary/20 shadow-2xl"
            >
              <Users2 className="text-primary w-10 h-10 mx-auto mb-5" />
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">投资研究交流</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                睿典：个人投资研究工作室致力于探索长期稳健的投资逻辑。欢迎志同道合、对低频量化研究与基本面分析感兴趣，尤其对交易本身感兴趣的朋友进行学术探讨与经验交流。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={() => setShowQR(true)}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-primary/20 transition-all"
                >
                  联系交流
                </button>
                <Link 
                  to="/blog"
                  target="_blank"
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/20 px-6 py-2.5 rounded-xl text-sm font-bold backdrop-blur-sm transition-all inline-flex items-center justify-center"
                >
                  查看研究博客
                </Link>
              </div>
              <p className="mt-8 text-slate-500 text-[9px] uppercase tracking-[0.2em] font-medium">
                本站仅作为个人投资记录与研究展示，不构成任何投资建议
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
              <span className="text-white font-bold text-lg">睿典：个人投资研究工作室</span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2024 睿典：个人投资研究工作室. 保留所有权利。
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
