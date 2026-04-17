import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  Camera,
  Upload,
  Table,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import BlogPage from './BlogPage';
import principalImage from './assets/principal.jpg';

const StrategyCard = ({ 
  title, 
  description, 
  icon: Icon, 
  riskLevel, 
  riskColor,
  details,
  chartData,
  metrics,
  liveUrl,
  isDashboard,
  dashboardData
}: { 
  title: string, 
  description: string, 
  icon: any, 
  riskLevel: string, 
  riskColor: string,
  details: string,
  chartData: { name: string, value: number, benchmark?: number, a500?: number, alpha?: number }[],
  liveUrl?: string,
  isDashboard?: boolean,
  dashboardData?: {
    returnsStats: { label: string; value: string }[];
    tradingStats: { label: string; value: string }[];
    annualReturns: { year: string; strategy: string; benchmark: string; alpha: string; maxDrawdown: string }[];
    tradeDistribution: { range: string; count: number }[];
  },
  metrics?: {
    totalReturn: string,
    ytdReturn: string,
    nav: string,
    annualizedReturn: string,
    sharpeRatio: string,
    maxDrawdown?: string,
    volatility?: string,
    inceptionDate: string,
    alphaTotal?: string,
    alphaYtd?: string,
    periodReturns?: { period: string, fund: string, benchmark: string }[],
    monthlyReturns?: { year: string, months: (string | null)[] }[],
    riskAnalysis?: { label: string, value: string }[]
  }
}) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'drawdown'>('performance');
  const [timeRange, setTimeRange] = useState('since_inception');
  const [topTab, setTopTab] = useState<'returns' | 'trading'>('returns');
  const [bottomTab, setBottomTab] = useState<'curve' | 'annual' | 'monthly' | 'distribution'>('curve');
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
    { id: '2025', label: '2025' },
    { id: '2026', label: '2026' },
    { id: 'custom', label: '自定义' },
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
              {liveUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[11px] font-black text-primary hover:bg-primary/20 transition-all uppercase tracking-[0.15em] shadow-lg shadow-primary/5 active:scale-95"
                >
                  查看实盘 <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <h5 className="text-3xl font-bold text-white mb-6 tracking-tight leading-tight">{title}</h5>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">{description}</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-base font-bold uppercase tracking-[0.2em]">
                <span className="text-slate-500">风险等级:</span>
                <span className={`${riskColor} px-3 py-1 rounded-full bg-current/10 border border-current/20`}>{riskLevel}</span>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <h6 className="text-white font-bold text-base mb-4 flex items-center gap-2 uppercase tracking-widest opacity-60">
                  <FileText className="w-4 h-4 text-primary" />
                  策略核心逻辑
                </h6>
                <div className="space-y-3">
                  {details.split('\n').map((line, i) => (
                    <p key={i} className="text-slate-400 text-base leading-relaxed flex gap-3">
                      <span className="text-slate-400 font-bold">{i + 1}.</span>
                      {line.replace(/^\d+\.\s*/, '')}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Metrics Side */}
        <div className="lg:col-span-8 p-6 md:p-10 bg-[#0c0e12] flex flex-col gap-8">
          {isDashboard ? (
            <>
              {/* Part 1: Top Section (收益统计 / 交易统计) */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-6 border-b border-white/5">
                  {[
                    { id: 'returns', label: '收益统计' },
                    { id: 'trading', label: '交易统计' }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setTopTab(tab.id as any)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all relative pb-3 ${topTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                    >
                      {tab.label}
                      {topTab === tab.id && <motion.div layoutId="topTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                  ))}
                </div>

                {topTab === 'returns' ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {dashboardData?.returnsStats.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{item.label}</p>
                        <p className="text-white text-lg font-black tracking-tight">{item.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {dashboardData?.tradingStats.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{item.label}</p>
                        <p className="text-primary text-lg font-black tracking-tight">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Part 2: Bottom Section (4 Tabs) */}
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-wrap gap-6 border-b border-white/5">
                  {[
                    { id: 'curve', label: '收益曲线' },
                    { id: 'annual', label: '年度收益统计' },
                    { id: 'monthly', label: '月度收益统计' },
                    { id: 'distribution', label: '交易收益分布' }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setBottomTab(tab.id as any)}
                      className={`text-xs font-bold uppercase tracking-widest transition-all relative pb-3 ${bottomTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                    >
                      {tab.label}
                      {bottomTab === tab.id && <motion.div layoutId="bottomTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                  ))}
                </div>

                <div className="min-h-[400px]">
                  {bottomTab === 'curve' && (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#475569', fontSize: 10 }}
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
                            shared={true}
                          />
                          <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold' }} />
                          <Line name="本策略" type="monotone" dataKey="value" stroke="#F27D26" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
                          <Line name="沪深300" type="monotone" dataKey="benchmark" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="3 3" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {bottomTab === 'annual' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] uppercase tracking-widest">
                        <thead>
                          <tr className="text-slate-500 border-b border-white/5">
                            <th className="text-left py-4 font-bold">年份</th>
                            <th className="text-right py-4 font-bold">策略收益</th>
                            <th className="text-right py-4 font-bold">基准收益</th>
                            <th className="text-right py-4 font-bold">超额收益</th>
                            <th className="text-right py-4 font-bold">最大回撤</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {dashboardData?.annualReturns.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 text-slate-300 font-bold">{row.year}</td>
                              <td className={`text-right py-4 font-bold ${parseFloat(row.strategy) >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.strategy}</td>
                              <td className={`text-right py-4 font-bold ${parseFloat(row.benchmark) >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.benchmark}</td>
                              <td className="text-right py-4 font-bold text-primary">{row.alpha}</td>
                              <td className="text-right py-4 font-bold text-emerald-500">{row.maxDrawdown}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {bottomTab === 'monthly' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px] uppercase tracking-widest">
                        <thead>
                          <tr className="text-slate-500">
                            <th className="text-left py-2 font-bold">年份</th>
                            {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map(m => (
                              <th key={m} className="text-center py-2 font-bold">{m}</th>
                            ))}
                            <th className="text-right py-2 font-bold">年度</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {metrics?.monthlyReturns?.map((yearRow, idx) => {
                            const total = yearRow.months.reduce((acc, m) => acc + (m ? parseFloat(m) : 0), 0);
                            return (
                              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 text-slate-300 font-bold">{yearRow.year}</td>
                                {yearRow.months.map((m, midx) => {
                                  const val = m ? parseFloat(m) : null;
                                  return (
                                    <td key={midx} className="text-center py-3">
                                      {m ? (
                                        <span className={`font-bold ${val! >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                          {m}
                                        </span>
                                      ) : (
                                        <span className="text-slate-700">--</span>
                                      )}
                                    </td>
                                  );
                                })}
                                <td className={`text-right py-3 font-black ${total >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                  {total.toFixed(2)}%
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {bottomTab === 'distribution' && (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dashboardData?.tradeDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
                          <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10 }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                          <Bar dataKey="count" fill="#F27D26" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-white/5 pb-4">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="opacity-60">单位净值:</span>
                <span className="text-white">{metrics?.nav || '--'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="opacity-60">成立日期:</span>
                <span className="text-white">{metrics?.inceptionDate || '--'}</span>
              </div>
            </div>
            <div className="flex gap-6">
              {metrics?.alphaTotal && (
                <div className="flex items-center gap-2">
                  <span className="opacity-60">累计超额:</span>
                  <span className="text-red-500">{metrics.alphaTotal}</span>
                </div>
              )}
              {metrics?.alphaYtd && (
                <div className="flex items-center gap-2">
                  <span className="opacity-60">今年超额:</span>
                  <span className="text-red-500">{metrics.alphaYtd}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Summary Header (Guorn Style) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '累计收益', value: metrics?.totalReturn, color: 'text-primary' },
              { label: '年化收益', value: metrics?.annualizedReturn, color: 'text-red-500' },
              { label: '夏普比率', value: metrics?.sharpeRatio, color: 'text-white' },
              { label: '最大回撤', value: metrics?.maxDrawdown, color: 'text-emerald-500' }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">{item.label}</p>
                <p className={`${item.color} text-2xl md:text-3xl font-black tracking-tight`}>{item.value || '--'}</p>
              </div>
            ))}
          </div>

          {/* Section 2: Performance Chart */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex gap-4">
                {[
                  { id: 'performance', label: '业绩走势' },
                  { id: 'drawdown', label: '动态回撤' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-xs font-bold uppercase tracking-widest transition-all relative pb-2 ${activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {timeRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                      timeRange === range.id 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[300px] w-full mb-4">
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
                    <Line name="本策略" type="monotone" dataKey="value" stroke="#F27D26" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
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
                    <Line name="本策略回撤" type="stepAfter" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 3: Period Returns Table */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h6 className="text-white font-bold text-[10px] uppercase tracking-widest opacity-60 mb-6 flex items-center gap-2">
              <BarChart3 className="w-3 h-3 text-primary" />
              区间涨幅
            </h6>
            <div className="grid grid-cols-5 gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">
              <div className="col-span-1">区间</div>
              <div className="text-right">区间涨幅</div>
              <div className="text-right">基准收益</div>
              <div className="text-right">同类平均</div>
              <div className="text-right">同类排行</div>
            </div>
            <div className="space-y-2">
              {(metrics?.periodReturns || []).map((row, idx) => {
                const fundVal = parseFloat(row.fund);
                const benchVal = parseFloat(row.benchmark);
                return (
                  <div key={idx} className="grid grid-cols-5 gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 items-center hover:bg-white/[0.04] transition-colors">
                    <div className="text-[11px] text-slate-300 font-medium">{row.period}</div>
                    <div className={`text-right text-[11px] font-bold ${fundVal >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.fund}</div>
                    <div className={`text-right text-[11px] font-bold ${benchVal >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>{row.benchmark}</div>
                    <div className="text-right text-[11px] font-bold text-slate-400">--</div>
                    <div className="text-right text-[11px] font-bold text-slate-400">--</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Monthly Returns Grid (Heatmap Style) */}
          {metrics?.monthlyReturns && (
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h6 className="text-white font-bold text-[10px] uppercase tracking-widest opacity-60 mb-6 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-primary" />
                月度收益
              </h6>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] uppercase tracking-widest">
                  <thead>
                    <tr className="text-slate-500">
                      <th className="text-left py-2 font-bold">年份</th>
                      {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map(m => (
                        <th key={m} className="text-center py-2 font-bold">{m}</th>
                      ))}
                      <th className="text-right py-2 font-bold">年度</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {metrics.monthlyReturns.map((yearRow, idx) => {
                      const total = yearRow.months.reduce((acc, m) => acc + (m ? parseFloat(m) : 0), 0);
                      return (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 text-slate-300 font-bold">{yearRow.year}</td>
                          {yearRow.months.map((m, midx) => {
                            const val = m ? parseFloat(m) : null;
                            return (
                              <td key={midx} className="text-center py-3">
                                {m ? (
                                  <span className={`font-bold ${val! >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {m}
                                  </span>
                                ) : (
                                  <span className="text-slate-700">--</span>
                                )}
                              </td>
                            );
                          })}
                          <td className={`text-right py-3 font-black ${total >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                            {total.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 5: Risk Analysis Table */}
          {metrics?.riskAnalysis && (
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h6 className="text-white font-bold text-[10px] uppercase tracking-widest opacity-60 mb-6 flex items-center gap-2">
                <Layers className="w-3 h-3 text-primary" />
                风险指标
              </h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.riskAnalysis.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                    <span className="text-white text-sm font-black">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Using the imported image from assets
  const profileImage = principalImage;

  // Handle hash scroll on mount and hash change
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Small delay to ensure content is rendered
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '关于主理人', href: '#principal-page' },
    { name: '策略研究', href: '#strategy-research-page' },
  ];

  return (
    <div id="home" className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Landmark className="text-primary w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">锐典</h2>
                <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-semibold">锐取有道，典致投资</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" 
                  href={link.href}
                >
                  {link.name}
                </a>
              ))}
              <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" to="/blog">研究博客</Link>
              <a 
                href="#discussion-page"
                className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95 inline-flex items-center justify-center"
              >
                联系交流
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Table className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background-dark border-b border-primary/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-slate-300 hover:text-primary text-lg font-medium py-2"
                  >
                    {link.name}
                  </a>
                ))}
                <Link 
                  to="/blog" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-300 hover:text-primary text-lg font-medium py-2"
                >
                  研究博客
                </Link>
                <a 
                  href="#discussion-page"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-primary text-background-dark text-center py-3 rounded-xl font-bold mt-4"
                >
                  联系交流
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/10 border border-red-900/20 text-red-800 dark:text-red-700 text-sm md:text-base font-bold mb-8 tracking-wide shadow-lg shadow-red-900/5">
                <span className="w-2 h-2 rounded-full bg-red-800 animate-pulse" />
                个人投资策略展示 / 教育交流，不提供个性化建议，用户独立决策自担风险
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                锐典：<br/><span className="text-primary text-4xl md:text-5xl">股票投资研究室</span>
              </h1>
              <div className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10 font-light">
                专注于全球股票市场的数据驱动研究与策略探索
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-base md:text-lg">
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs md:text-sm font-bold uppercase tracking-widest border border-primary/30">主理人</span>
                  <div className="flex flex-wrap items-center gap-x-2 text-slate-100 font-normal">
                    <span>硕士, CFA, 深圳高材</span>
                    <span className="text-slate-600 font-thin">/</span>
                    <span>A股与美股研究人</span>
                    <span className="text-slate-600 font-thin">/</span>
                    <span>操盘实战者</span>
                    <span className="text-slate-600 font-thin">/</span>
                    <span>专业和交易力保持者</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/#strategy-research-page"
                  className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-primary/20 inline-flex items-center justify-center whitespace-nowrap"
                >
                  探索策略研究
                </a>
                <a 
                  href="/#principal-page" 
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-base font-bold backdrop-blur-sm transition-all inline-flex items-center justify-center"
                >
                  关于 锐典
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-background-light dark:bg-background-dark border-y border-primary-dim/5 scroll-mt-20" id="principal-page">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-primary-dim font-bold uppercase tracking-widest text-base mb-3">主理人页面</h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-primary-dim mb-6 leading-tight">
                    主理人：硕士, CFA, 深圳高材
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                    锐典 致力于将严谨的数据驱动方法与深入的基本面研究相结合。主理人常驻深圳金融枢纽，深耕美股和A股市场，拥有硕士学位和特许金融分析师（CFA）资格。作为操盘实战者，致力于将专业研究与交易实战相结合，保持卓越的交易力。
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-primary-dim/5 border border-primary-dim/10">
                    <School className="text-primary-dim w-8 h-8 mb-3" />
                    <h4 className="text-slate-700 dark:text-white font-bold text-xl mb-1">硕士学位</h4>
                    <p className="text-slate-400 dark:text-slate-400 text-base">卓越的学术背景</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary-dim/5 border border-primary-dim/10">
                    <Award className="text-primary-dim w-8 h-8 mb-3" />
                    <h4 className="text-slate-700 dark:text-white font-bold text-xl mb-1">CFA 持证人</h4>
                    <p className="text-slate-400 dark:text-slate-400 text-base">金融行业黄金标准</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary-dim/5 border border-primary-dim/10">
                    <Zap className="text-primary-dim w-8 h-8 mb-3" />
                    <h4 className="text-slate-700 dark:text-white font-bold text-xl mb-1">实战交易</h4>
                    <p className="text-slate-400 dark:text-slate-400 text-base">卓越的实盘执行能力</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-primary-dim font-bold hover:underline text-lg">
                  下载专业简历 <Download className="w-4 h-4" />
                </button>
                <div className="mt-6 pt-6 border-t border-primary-dim/10">
                  <p className="text-slate-400 text-xs leading-relaxed italic">
                    * 注：主理人所持有的 CFA 资格及硕士学位仅作为专业背景证明。本页面所有内容仅作为个人投资研究心得分享，不构成任何形式的投资建议或证券咨询服务。
                  </p>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-primary-dim/20 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-primary-dim/10 flex items-center justify-center">
                  <img 
                    alt="主理人" 
                    className="w-full h-full object-cover" 
                    src={profileImage}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="py-24 bg-[#1a1710] scroll-mt-20" id="strategy-research-page">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-primary font-bold uppercase tracking-widest text-base mb-3">研究框架</h2>
              <h3 className="text-5xl font-bold text-white">个人策略研究页面</h3>
            </div>
            
            {/* Live Strategies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 border-l-4 border-primary pl-4">
                <TrendingUp className="text-primary w-6 h-6" />
                <h4 className="text-3xl font-bold text-white uppercase tracking-tight">实盘策略模型</h4>
              </div>
              <div className="flex flex-col gap-8">
                <StrategyCard 
                  title="量化低波动套利策略"
                  description="通过统计套利模型，利用算法选股/买卖股票，在流动性较低的市场长期有效。专注于稳定性低波和下行保护。"
                  icon={ArrowUpDown}
                  riskLevel="中高风险"
                  riskColor="text-primary"
                  liveUrl="https://guorn.com/stock/strategy?sid=2249594.R.281232719094904&category=stock"
                  isDashboard={true}
                  dashboardData={{
                    returnsStats: [
                      { label: '投资组合', value: '167.57%' },
                      { label: '年化收益', value: '55.59%' },
                      { label: '夏普比率', value: '1.59' },
                      { label: '最大回撤', value: '48.12%' },
                      { label: '波动率', value: '32.47%' },
                      { label: '信息比率', value: '1.42' },
                      { label: 'Beta', value: '0.85' },
                      { label: 'Alpha', value: '52.27%' },
                      { label: '交易天数', value: '924' },
                      { label: '累计收益', value: '167.57%' },
                    ],
                    tradingStats: [
                      { label: '年换手率', value: '1058%' },
                      { label: '平均持仓天数', value: '23.6' },
                      { label: '平均持仓股票数', value: '7.2' },
                      { label: '平均交易收益', value: '5.56%' },
                      { label: '交易胜率', value: '66.41%' },
                      { label: '盈亏比', value: '1.85' },
                      { label: '最大单笔盈利', value: '42.1%' },
                      { label: '最大单笔亏损', value: '-12.4%' },
                    ],
                    annualReturns: [
                      { year: '2023', strategy: '12.5%', benchmark: '2.1%', alpha: '10.4%', maxDrawdown: '-3.2%' },
                      { year: '2024', strategy: '78.2%', benchmark: '15.4%', alpha: '62.8%', maxDrawdown: '-12.5%' },
                      { year: '2025', strategy: '45.6%', benchmark: '8.2%', alpha: '37.4%', maxDrawdown: '-8.4%' },
                      { year: '2026', strategy: '1.94%', benchmark: '-4.09%', alpha: '6.03%', maxDrawdown: '-5.5%' },
                    ],
                    tradeDistribution: [
                      { range: '< -10%', count: 5 },
                      { range: '-10% to -5%', count: 12 },
                      { range: '-5% to 0%', count: 28 },
                      { range: '0% to 5%', count: 45 },
                      { range: '5% to 10%', count: 32 },
                      { range: '10% to 20%', count: 18 },
                      { range: '> 20%', count: 8 },
                    ]
                  }}
                  details={`1. 交易特征：高频换手（年化1058%），平均持仓仅23.6天，捕捉微观波动。
2. 赢率表现：交易胜率达66.41%，平均交易收益5.56%，具备极强的统计优势。
3. 组合构建：平均持仓约7只股票，高度集中且动态调整，追求极致的超额收益。`}
                  chartData={[
                    { name: '2023-09-21', value: 100, benchmark: 100 },
                    { name: '2023-12-31', value: 112.5, benchmark: 102.1 },
                    { name: '2024-03-31', value: 125.4, benchmark: 105.8 },
                    { name: '2024-06-30', value: 148.2, benchmark: 108.5 },
                    { name: '2024-09-30', value: 172.6, benchmark: 112.4 },
                    { name: '2024-12-31', value: 200.5, benchmark: 117.8 },
                    { name: '2025-03-31', value: 225.8, benchmark: 120.5 },
                    { name: '2025-06-30', value: 245.2, benchmark: 124.2 },
                    { name: '2025-09-30', value: 262.4, benchmark: 126.8 },
                    { name: '2025-12-31', value: 268.5, benchmark: 128.5 },
                    { name: '2026-03-31', value: 272.4, benchmark: 130.2 },
                    { name: '2026-04-03', value: 267.57, benchmark: 129.4 },
                  ]}
                  metrics={{
                    totalReturn: "167.57%",
                    ytdReturn: "1.94%",
                    nav: "2.6757",
                    annualizedReturn: "55.59%",
                    sharpeRatio: "1.59",
                    maxDrawdown: "48.12%",
                    volatility: "32.47%",
                    inceptionDate: "2023-09-21",
                    alphaTotal: "+52.27%",
                    alphaYtd: "+5.86%",
                    monthlyReturns: [
                      { year: "2023", months: [null, null, null, null, null, null, null, null, "1.2%", "4.5%", "3.2%", "2.8%"] },
                      { year: "2024", months: ["4.2%", "5.8%", "2.1%", "-1.5%", "3.4%", "2.8%", "4.5%", "1.2%", "8.5%", "5.2%", "4.8%", "6.2%"] },
                      { year: "2025", months: ["3.1%", "2.5%", "4.8%", "1.2%", "5.6%", "3.4%", "4.2%", "2.8%", "5.1%", "4.5%", "3.2%", "2.1%"] },
                      { year: "2026", months: ["1.2%", "0.8%", "1.5%", "-5.5%", null, null, null, null, null, null, null, null] }
                    ]
                  }}
                />
                <StrategyCard 
                  title="主观多头 + 量化增强"
                  description="通过多元化的主观交易手法（基本面趋势持有/题材热点龙头补涨挖掘/情绪博弈），并行ai算法对持有的股票做t增强持仓收益，创造超额收益。"
                  icon={Brain}
                  riskLevel="中高风险"
                  riskColor="text-primary"
                  details={`1. 主观部分：深耕基本面研究，捕捉行业趋势及题材热点。
2. 量化部分：AI算法辅助日内交易（做T），优化买卖点，提升持仓收益。
3. 核心优势：结合人的洞察力与机器的执行力，实现超额收益最大化。`}
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
                      { period: "成立来", fund: "125.00%", benchmark: "43.40%" },
                      { period: "今年来", fund: "11.40%", benchmark: "3.73%" },
                      { period: "近一月", fund: "-0.50%", benchmark: "1.01%" },
                      { period: "近三月", fund: "8.20%", benchmark: "5.90%" },
                      { period: "近半年", fund: "18.50%", benchmark: "8.82%" },
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
                  details={`1. 轮动模型：基于动量、估值及宏观指标的多维打分系统；
2. 资产配置：在全球及行业ETF间进行动态切换，规避弱势资产；
3. 收益目标：通过赛道优选，在不同市场环境下获取稳健的超额收益。`}
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
                      { period: "成立来", fund: "110.00%", benchmark: "43.40%" },
                      { period: "今年来", fund: "2.80%", benchmark: "3.73%" },
                      { period: "近一月", fund: "-1.20%", benchmark: "1.01%" },
                      { period: "近三月", fund: "3.50%", benchmark: "5.90%" },
                      { period: "近半年", fund: "7.80%", benchmark: "8.82%" },
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
                  details={`1. 核心理念：基于Ray Dalio的风险平价理论，不预测市场，而是平衡不同经济环境下的资产风险。
2. 资产类别：涵盖全球股票、长期国债、中期国债、黄金及大宗商品。
3. 模拟表现：在历史极端市场环境下表现出极强的韧性，回撤控制在极低水平。`}
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
                      { period: "模拟来", fund: "3.20%", benchmark: "2.80%" },
                      { period: "今年来", fund: "1.50%", benchmark: "1.30%" },
                      { period: "近一月", fund: "0.40%", benchmark: "0.30%" },
                      { period: "近三月", fund: "1.20%", benchmark: "1.00%" },
                      { period: "近半年", fund: "2.50%", benchmark: "2.10%" },
                      { period: "近一年", fund: "3.20%", benchmark: "2.80%" }
                    ]
                  }}
                />
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
                  <span className="text-red-800 dark:text-red-700 font-bold mr-2">风险提示：</span>
                  上述策略模型及业绩表现仅基于历史实盘数据或模拟回测展示，过往业绩不预示其未来表现，也不构成对未来收益的任何保证。市场有风险，投资需谨慎。本站不提供任何代客理财或承诺收益的金融服务。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-[#1a1710]" id="team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">核心团队</h2>
              <h3 className="text-4xl font-bold text-white">团队介绍</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "林博士 (Dr. Lin)",
                  role: "量化研究主管",
                  bio: "数学博士，拥有深厚的统计建模背景。负责开发低波动套利模型与AI增强算法，致力于通过数据挖掘发现市场Alpha。"
                },
                {
                  name: "陈分析师 (Analyst Chen)",
                  role: "行业研究员",
                  bio: "专注科技与新能源赛道研究。通过深入的产业链调研，为策略提供核心标的池，捕捉行业爆发性机会。"
                },
                {
                  name: "AI Agent 研报解读专员",
                  role: "AI Agent Specialist",
                  bio: "利用先进的AI技术实时处理海量研报信息，提取核心逻辑与关键数据，提升研究效率。"
                },
                {
                  name: "AI 宏观分析师",
                  role: "AI Macro Analyst",
                  bio: "基于大数据与机器学习算法，构建宏观经济预测模型，为资产配置提供前瞻性指引。"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel overflow-hidden rounded-2xl border border-white/5 hover:border-primary/30 transition-all group p-8"
                >
                  <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-4">{member.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Future Fund Section */}
        <section className="py-12 relative overflow-hidden scroll-mt-20" id="discussion-page">
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
              <h2 className="text-2xl md:text-3xl font-black text-white mb-1">投资研究交流页面</h2>
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-5">锐取有道，典致投资</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                锐典 致力于探索长期稳健的投资逻辑。欢迎志同道合、对低频量化研究与基本面分析感兴趣，尤其对交易本身感兴趣的朋友进行学术探讨与经验交流。
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
              <span className="text-white font-bold text-lg">锐典</span>
            </div>
            <div className="text-slate-500 text-base">
              © 2024 锐典. 保留所有权利。
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-primary text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex gap-6">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Share2 className="w-5 h-5" /></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Mail className="w-5 h-5" /></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><FileText className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h4 className="text-red-800 dark:text-red-700 text-xs font-bold uppercase tracking-[0.3em] mb-4 text-center">法律声明与风险披露</h4>
            <div className="text-center text-xs text-slate-600 leading-relaxed max-w-4xl mx-auto space-y-2">
              <p>1. 本网站“锐典交易室”所载之全部内容（包括但不限于文字、图表、策略模型、研究报告等）仅供学习交流及个人投资记录之用，不构成任何意义上的投资建议、要约或承诺。</p>
              <p>2. 证券市场投资具有极高风险。过往业绩（无论是实盘还是回测）均不代表未来表现。投资者应根据自身的风险承受能力、财务状况及投资目标独立作出决策，并自行承担全部风险。</p>
              <p>3. 主理人展示的专业资格（如CFA）仅代表其个人专业素养，不代表受任何金融监管机构授权提供投资咨询服务。本站不从事任何非法证券业务，不提供保本收益承诺。</p>
              <p>4. 访问本网站即视为您已阅读并同意上述条款。如您无法接受，请立即停止访问。</p>
            </div>
          </div>
        </div>
      </footer>

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
                <p className="text-slate-500 dark:text-slate-400 text-base">扫描下方二维码添加微信进行探讨</p>
                <div className="mt-2 text-xs text-amber-600 dark:text-amber-500/80 font-medium">
                  * 仅限学术探讨与研究交流，不提供个股咨询
                </div>
              </div>
              <div className="aspect-square bg-white p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner mb-6">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}`} 
                  alt="联系二维码" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">锐典</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
