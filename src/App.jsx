import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Database,
    BarChart3,
    ShieldCheck,
    Lock,
    FileText,
    Search,
    Bell,
    User,
    Download,
    Filter,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Server,
    RefreshCw,
    Eye,
    Settings,
    MoreVertical,
    Activity,
    Globe,
    FileSpreadsheet,
    Calendar,
    Layers,
    CheckCircle2,
    FileJson,
    PieChart,
    TrendingUp,
    LogOut,
    Building2,
    Shield,
    LogIn,
    Fingerprint,
    ClipboardCheck,
    History,
    HardDrive,
    Users,
    DatabaseZap,
    BrainCircuit,
    Sparkles,
    MessageSquare,
    AlertTriangle,
    Zap,
    Target,
    HelpCircle,
    PlayCircle,
    BookOpen,
    LifeBuoy,
    Clock,
    FilePlus,
    ShieldQuestion,
    CheckSquare,
    Printer,
    FileCheck,
    Sticker,
    Lightbulb,
    Compass,
    Flag,
    LineChart
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, variant = "default" }) => {
    const styles = {
        default: "bg-slate-100 text-slate-700",
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        danger: "bg-rose-100 text-rose-700",
        info: "bg-blue-100 text-blue-700",
        purple: "bg-purple-100 text-purple-700",
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>{children}</span>;
};

// --- Main App Component ---

export default function App() {
    // --- Authentication State ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loginProcess, setLoginProcess] = useState(null); // null, 'checking', 'success'
    const [authError, setAuthError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // --- Authentication Logic (Simulated AD) ---
    const handleLogin = (e) => {
        if (e) e.preventDefault();
        setAuthError('');
        
        // For standard simulation logic, we can still require username/password if needed, 
        // but since demo-signin has an 'AD SSO' button that doesn't use the form fields directly, 
        // we'll simulate a 1-click SSO login just like demo-signin does.
        
        setLoginProcess('checking');

        // Simulate network request to AD Server
        setTimeout(() => {
            setLoginProcess('success');
            setTimeout(() => {
                // Success
                setUser({
                    name: 'Chalermpol C.',
                    role: 'Administrator',
                    department: 'Department of Foreign Trade',
                    id: 'DFT-' + Math.floor(Math.random() * 10000)
                });
                setIsLoggedIn(true);
                setLoginProcess(null);
            }, 800);
        }, 1500);
    };

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoggedIn(false);
            setUser(null);
            setUsername('');
            setPassword('');
            setIsLoading(false);
        }, 800);
    };

    // ข้อมูลสถิติย้อนหลัง 10 ปี (Section 3.2.1)
    const stats10Years = [
        { year: 2015, export: 45.2, utilization: 28.1, pct: 62.1 },
        { year: 2016, export: 48.5, utilization: 30.4, pct: 62.7 },
        { year: 2017, export: 52.1, utilization: 35.8, pct: 68.7 },
        { year: 2018, export: 55.4, utilization: 38.2, pct: 68.9 },
        { year: 2019, export: 54.8, utilization: 37.5, pct: 68.4 },
        { year: 2020, export: 50.2, utilization: 32.1, pct: 63.9 },
        { year: 2021, export: 58.7, utilization: 42.4, pct: 72.2 },
        { year: 2022, export: 65.4, utilization: 50.8, pct: 77.6 },
        { year: 2023, export: 72.9, utilization: 58.2, pct: 79.8 },
        { year: 2024, export: 84.2, utilization: 52.1, pct: 61.9 },
    ];

    const handleTabChange = (tabId) => {
        setIsLoading(true);
        setActiveTab(tabId);
        setTimeout(() => setIsLoading(false), 400);
    };

    // --- Views ---

    // 1. Dashboard View (Section 3.2.1)
    const DashboardView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Intelligence Dashboard</h1>
                    <p className="text-slate-500 text-sm">ข้อมูลสรุปภาพรวมการใช้สิทธิประโยชน์ทางการค้า (FTA & GSP)</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded-lg border flex shadow-sm">
                        <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-900 text-white">รายปี</button>
                        <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-slate-600 hover:bg-slate-50">รายไตรมาส</button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-200">
                        <Download size={16} /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'มูลค่าการส่งออก (Eligible)', val: '$84,250M', trend: '+12.5%', isUp: true, icon: Globe, color: 'text-blue-600' },
                    { title: 'มูลค่าการใช้สิทธิฯ (Actual)', val: '$52,140M', trend: '+8.2%', isUp: true, icon: Activity, color: 'text-emerald-600' },
                    { title: 'สัดส่วนการใช้สิทธิ (%)', val: '61.89%', trend: '-2.1%', isUp: false, icon: BarChart3, color: 'text-amber-600' },
                    { title: 'จำนวนหนังสือรับรอง (ฉบับ)', val: '142,508', trend: '+15.4%', isUp: true, icon: FileText, color: 'text-indigo-600' },
                ].map((kpi, i) => (
                    <Card key={i} className="p-5 hover:border-blue-300 transition-all cursor-default group">
                        <div className="flex justify-between items-start mb-3">
                            <div className={`p-2.5 rounded-xl bg-slate-50 ${kpi.color} group-hover:scale-110 transition-transform`}>
                                <kpi.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {kpi.trend}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{kpi.val}</h3>
                        <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-tight">{kpi.title}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* กราฟสถิติ 10 ปี */}
                <Card className="lg:col-span-2 p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500" /> สถิติการใช้สิทธิประโยชน์ย้อนหลัง 10 ปี (2015 - 2024)
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                <span className="text-[10px] font-bold text-slate-500">Utilization</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-slate-100 rounded-sm border"></div>
                                <span className="text-[10px] font-bold text-slate-500">Eligible Export</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="relative h-64 w-full flex items-end justify-between gap-3 px-2">
                        {/* Grid Lines */}
                        <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-50">
                            {[1, 2, 3, 4, 5].map(line => <div key={line} className="border-t border-slate-100 w-full"></div>)}
                        </div>

                        {/* Bars */}
                        {stats10Years.map((data, i) => (
                            <div key={data.year} className="flex-1 group h-full relative flex flex-col items-center justify-end z-10 w-full px-1">
                                {/* Tooltip */}
                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20 whitespace-nowrap shadow-2xl scale-90 group-hover:scale-100">
                                    <p className="font-bold text-blue-400 mb-0.5">{data.year}</p>
                                    <p>Export: ${data.export}M</p>
                                    <p>Util: ${data.utilization}M ({data.pct}%)</p>
                                </div>

                                {/* Legend Bar (Export) */}
                                <div
                                    className="w-full bg-slate-50 border border-slate-100 rounded-t-lg absolute bottom-0 transition-all duration-700"
                                    style={{ height: `${data.export}%` }}
                                ></div>

                                {/* Utilization Bar */}
                                <div
                                    className="w-[80%] bg-blue-500 group-hover:bg-blue-600 rounded-t-lg absolute bottom-0 z-10 transition-all duration-500"
                                    style={{ height: `${data.utilization}%` }}
                                >
                                    {/* Percentage label on top of bar */}
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {data.pct}%
                                    </div>
                                </div>

                                {/* X-Axis Label */}
                                <div className="absolute -bottom-8 text-[10px] font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                                    {data.year}
                                </div>
                            </div>
                        ))}

                        {/* Trend Line Overlay (Decorative SVG) */}
                        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none opacity-20" preserveAspectRatio="none">
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                points={stats10Years.map((d, i) => `${(i * 11)} ${100 - d.pct}`).join(', ')}
                                className="transition-all duration-1000"
                            />
                        </svg>
                    </div>

                    <div className="mt-14 pt-6 border-t border-slate-50 flex justify-between items-center">
                        <div className="flex gap-4">
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Avg. Utilization</p>
                                <p className="text-lg font-black text-slate-800">68.7%</p>
                            </div>
                            <div className="text-center border-l pl-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Highest Year</p>
                                <p className="text-lg font-black text-emerald-600">2023</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">แหล่งข้อมูล: กองสิทธิประโยชน์ทางการค้า (Data Warehouse)</p>
                    </div>
                </Card>

                {/* Top 5 HS Codes */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Filter size={18} className="text-emerald-500" /> Top 5 HS Codes (Export)
                    </h3>
                    <div className="space-y-5">
                        {[
                            { code: '870323', name: 'รถยนต์นั่ง', val: '$12.5B', pct: 85 },
                            { code: '841510', name: 'เครื่องปรับอากาศ', val: '$8.2B', pct: 72 },
                            { code: '400122', name: 'ยางธรรมชาติ', val: '$6.7B', pct: 60 },
                            { code: '080450', name: 'มะม่วงสด', val: '$4.1B', pct: 45 },
                            { code: '160414', name: 'ปลาทูน่ากระป๋อง', val: '$3.8B', pct: 38 },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="font-bold text-blue-600">{item.code} <span className="text-slate-500 font-normal ml-1 truncate max-w-[100px] inline-block align-bottom">{item.name}</span></span>
                                    <span className="font-bold text-slate-700">{item.val}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div style={{ width: `${item.pct}%` }} className="h-full bg-emerald-500 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-2.5 text-xs font-bold text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 uppercase tracking-widest">
                        View All Categories
                    </button>
                </Card>
            </div>
        </div>
    );

    // New Operations View (Section 3.3.1.4-5)
    const OperationsView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Operation Monitoring</h1>
                    <p className="text-slate-500 text-sm">ติดตามสถิติการออกหนังสือสำคัญและถิ่นกำเนิดสินค้า (Section 3.3.1.4)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">FOB Total Value</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">$12,450.8 M</h3>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="info">USD</Badge>
                        <Badge variant="info">THB 452.1 B</Badge>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-emerald-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Net Weight</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">85,240.5</h3>
                    <p className="text-xs text-slate-500 font-bold mt-2">Metric Tons (KGs)</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-indigo-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total CO Pages</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">452,108</h3>
                    <p className="text-xs text-slate-500 font-bold mt-2">Pages Issued</p>
                </Card>
            </div>

            <Card>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center font-bold text-slate-800">
                    <h3 className="flex items-center gap-2"><ClipboardCheck size={18} /> CO Issuance Detail (Section 3.3.1.5)</h3>
                    <Badge variant="success">Real-time Sync</Badge>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50/50 border-b text-slate-400 font-bold text-[11px]">
                            <tr>
                                <th className="p-4 text-left">เลขอ้างอิง (Ref No.)</th>
                                <th className="p-4 text-left">ประเภทหนังสือสำคัญ</th>
                                <th className="p-4 text-right">FOB Value</th>
                                <th className="p-4 text-right">Net Weight</th>
                                <th className="p-4 text-center">e-CO Status</th>
                                <th className="p-4 text-center">Print Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {[
                                { id: 'DFT2024-00142', type: 'Form D (ASEAN)', val: '$45,200', weight: '1,200 kg', eco: 'Electronic', print: 'Printed (2)' },
                                { id: 'DFT2024-00143', type: 'Form E (ASEAN-China)', val: '$120,450', weight: '8,500 kg', eco: 'Electronic', print: 'Unprinted' },
                                { id: 'DFT2024-00144', type: 'Form AK (ASEAN-Korea)', val: '$12,800', weight: '450 kg', eco: 'Manual', print: 'Printed (1)' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-4 font-mono font-bold text-blue-600">{row.id}</td>
                                    <td className="p-4 font-medium">{row.type}</td>
                                    <td className="p-4 text-right font-bold">{row.val}</td>
                                    <td className="p-4 text-right">{row.weight}</td>
                                    <td className="p-4 text-center"><Badge variant={row.eco === 'Electronic' ? 'success' : 'default'}>{row.eco}</Badge></td>
                                    <td className="p-4 text-center text-xs font-bold text-slate-400">{row.print}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );

    // New Policy & Impact View (Section 15: Expected Results)
    const PolicyImpactView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <Target className="text-blue-600" size={32} /> Policy & Impact Analytics
                    </h1>
                    <p className="text-slate-500 text-sm">การวิเคราะห์ผลลัพธ์เชิงยุทธศาสตร์และศักยภาพสินค้า (TOR Section 15)</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="success">Data Freshness: 99.8%</Badge>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
                        <LineChart size={16} /> Strategy Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Market Expansion Tracking (Section 15.3) */}
                <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-white to-blue-50/20">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Globe size={18} className="text-blue-500" /> Market Expansion Tracking (Post-FTA Growth)
                        </h3>
                        <select className="bg-white border rounded-lg px-2 py-1 text-xs font-bold outline-none cursor-pointer">
                            <option>RCEP Market</option>
                            <option>ASEAN Market</option>
                            <option>China Market</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-4 px-2 border-b border-l border-slate-100 relative">
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none opacity-40">
                            {[1, 2, 3, 4].map(l => <div key={l} className="border-t border-slate-100 w-full h-px"></div>)}
                        </div>
                        {[
                            { m: 'Jan', pre: 40, post: 65 },
                            { m: 'Feb', pre: 38, post: 72 },
                            { m: 'Mar', pre: 45, post: 85 },
                            { m: 'Apr', pre: 42, post: 78 },
                            { m: 'May', pre: 48, post: 92 },
                            { m: 'Jun', pre: 50, post: 110 },
                        ].map((d, i) => (
                            <div key={i} className="flex-1 h-full flex items-end gap-1.5 z-10 group">
                                <div className="flex-1 bg-slate-200 rounded-t-sm transition-all" style={{ height: `${d.pre}%` }}></div>
                                <div className="flex-1 bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700 relative" style={{ height: `${Math.min(d.post, 100)}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                        Growth: +{((d.post - d.pre) / d.pre * 100).toFixed(0)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center gap-8">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <div className="w-3 h-3 bg-slate-200 rounded-full"></div> Pre-FTA Expansion
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div> Post-FTA Expansion
                        </div>
                    </div>
                </Card>

                {/* Opportunity Finder (Section 15.1) */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Lightbulb size={18} className="text-amber-500" /> Opportunity Finder
                        </h3>
                        <Badge variant="purple">AI Suggest</Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-medium italic underline">รายการสินค้าที่มีศักยภาพสูง (High Export) แต่สัดส่วนการใช้สิทธิยังต่ำ</p>
                    <div className="space-y-5">
                        {[
                            { hs: '0810.90', name: 'Mangosteens', gap: '42%', val: '$850M' },
                            { hs: '4001.22', name: 'Rubber TSR 20', gap: '35%', val: '$1,200M' },
                            { hs: '1604.14', name: 'Canned Tuna', gap: '28%', val: '$650M' },
                            { hs: '8415.10', name: 'Air Conditioners', gap: '22%', val: '$2,100M' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-blue-600">{item.hs}</span>
                                        <h4 className="text-xs font-black text-slate-800 mt-0.5">{item.name}</h4>
                                    </div>
                                    <span className="text-xs font-black text-rose-500">Gap: {item.gap}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase mt-2">
                                    <span>Potential Value: <span className="text-slate-800">{item.val}</span></span>
                                    <button className="text-blue-600 hover:underline">Analysis Plan</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Policy Support Insight (Section 15.2) */}
                <Card className="p-6 border-l-4 border-l-indigo-600">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Compass size={20} className="text-indigo-600" /> Policy Support Insight (Negotiation Prep)
                    </h3>
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-white text-indigo-600 rounded-xl shadow-sm"><Sparkles size={24} /></div>
                            <div>
                                <p className="text-sm font-bold text-indigo-900 leading-tight">FTA Negotiation Simulation (Thai-EU)</p>
                                <p className="text-[11px] text-indigo-600 mt-2 leading-relaxed font-medium">หากมีการลดภาษีกลุ่มยานยนต์ไฟฟ้า (EV) ลงเหลือ 0% คาดการณ์ว่าจะเพิ่มมูลค่าการใช้สิทธิได้อีก <span className="font-bold text-indigo-900">$450M ต่อปี</span> และสร้างงานในไทยเพิ่มขึ้น 12%</p>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 py-2.5 bg-indigo-600 text-white text-[11px] font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700">Explore Simulation</button>
                            <button className="px-4 py-2.5 bg-white text-indigo-600 border border-indigo-200 text-[11px] font-bold rounded-xl">Download Scenario</button>
                        </div>
                    </div>
                </Card>

                {/* Strategic KPI Tracking */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Flag size={20} className="text-emerald-500" /> Strategic Success Tracking (Section 14-15)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'User Satisfaction', kpi: '84.5%', target: '80%', status: 'success' },
                            { label: 'SME Participation', kpi: '4,250', target: '4,000', status: 'success' },
                            { label: 'CO Processing Time', kpi: '1.2h', target: '<2h', status: 'success' },
                            { label: 'Export Competitiveness', kpi: '+15%', target: '+10%', status: 'success' },
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.label}</p>
                                <div className="flex justify-between items-end mt-2">
                                    <span className="text-2xl font-black text-slate-900">{item.kpi}</span>
                                    <Badge variant={item.status === 'success' ? 'success' : 'warning'}>v Target</Badge>
                                </div>
                                <div className="h-1 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );

    // Service Portal View (End-to-End Workflow)
    const ServicesView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <ClipboardCheck className="text-blue-600" size={32} /> Service Hub: End-to-End Workflow
                    </h1>
                    <p className="text-slate-500 text-sm">การให้บริการครบวงจร: ยื่นคำขอ {'→'} ตรวจสอบ {'→'} อนุมัติ {'→'} ออกเอกสาร e-CO</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105">
                    <FilePlus size={20} /> Create New Application
                </button>
            </div>

            {/* Workflow Progress Bar */}
            <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl">
                <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
                    {[
                        { step: 1, label: 'Submission', icon: FilePlus, status: 'Completed' },
                        { step: 2, label: 'Smart Verification', icon: ShieldQuestion, status: 'In-Progress' },
                        { step: 3, label: 'Official Approval', icon: CheckSquare, status: 'Pending' },
                        { step: 4, label: 'e-Issuance', icon: Printer, status: 'Pending' },
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-3 group cursor-pointer">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${item.status === 'Completed' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' :
                                    item.status === 'In-Progress' ? 'bg-blue-600 text-white animate-pulse shadow-[0_0_20px_rgba(37,99,235,0.4)]' :
                                        'bg-slate-800 text-slate-500'
                                }`}>
                                <item.icon size={28} />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Step {item.step}</p>
                                <p className="text-xs font-bold">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Applications List */}
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center font-bold text-slate-800">
                        <h3 className="flex items-center gap-2"><Activity size={18} className="text-blue-500" /> Active Applications Pipeline</h3>
                        <div className="flex gap-2">
                            <Badge variant="info">Total: 128</Badge>
                            <Badge variant="warning">Urgent: 5</Badge>
                        </div>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-slate-100">
                            {[
                                { ref: 'REQ-2024-8842', company: 'Thai Agri Export Co.', agreement: 'ASEAN-China (ACFTA)', status: 'Verifying', time: '2 ชม. ที่แล้ว', risk: 'Low' },
                                { ref: 'REQ-2024-8843', company: 'Pacific Motors Ltd.', agreement: 'RCEP', status: 'Pending Approval', time: '4 ชม. ที่แล้ว', risk: 'Med' },
                                { ref: 'REQ-2024-8844', company: 'Global Food Solutions', agreement: 'GSP (USA)', status: 'Approved', time: '6 ชม. ที่แล้ว', risk: 'Low' },
                                { ref: 'REQ-2024-8845', company: 'Siam Electronics', agreement: 'ASEAN-Korea (AKFTA)', status: 'Issued', time: '1 วันที่แล้ว', risk: 'Low' },
                            ].map((req, i) => (
                                <div key={i} className="p-5 hover:bg-slate-50 flex items-center justify-between group transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className={`p-3 rounded-2xl ${req.status === 'Issued' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                            <FileCheck size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-mono font-black text-slate-900">{req.ref}</p>
                                                <Badge variant={req.status === 'Issued' ? 'success' : req.status === 'Approved' ? 'info' : 'warning'}>{req.status}</Badge>
                                            </div>
                                            <p className="text-sm font-bold text-slate-600 mt-0.5">{req.company}</p>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter"><Globe size={10} /> {req.agreement}</span>
                                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter"><Clock size={10} /> {req.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Risk Score</p>
                                            <span className={`text-xs font-black ${req.risk === 'Med' ? 'text-amber-500' : 'text-emerald-500'}`}>{req.risk}</span>
                                        </div>
                                        <button className="p-2 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 rounded-xl transition-all">
                                            <ChevronRight size={20} className="text-slate-300" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t bg-slate-50/50 text-center">
                        <button className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest">View All Workflows</button>
                    </div>
                </Card>

                {/* Issuance & e-Signature Section */}
                <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-white to-blue-50/50 border-blue-100">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Printer size={18} className="text-blue-500" /> e-Issuance Center</h3>
                        <div className="p-4 bg-white border border-blue-100 rounded-2xl shadow-sm relative overflow-hidden group cursor-pointer">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600 text-white rounded-bl-3xl flex items-center justify-center translate-x-1 -translate-y-1 group-hover:scale-110 transition-transform">
                                <Sticker size={24} />
                            </div>
                            <p className="text-[10px] font-bold text-blue-600 uppercase">Latest Issued e-CO</p>
                            <p className="text-lg font-black text-slate-900 mt-1">DFT-CN-2024012</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">Status: Secured by Digital Signature</p>
                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl shadow-lg">Download PDF</button>
                                <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl"><Eye size={14} /></button>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between items-center text-[11px] font-bold">
                                <span className="text-slate-500 uppercase">Daily Issuance Limit</span>
                                <span className="text-slate-900">452 / 1000</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-emerald-500">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckSquare size={18} className="text-emerald-500" /> Smart Approval Check</h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-medium italic underline">ระบบประมวลผลกฎถิ่นกำเนิดสินค้าเบื้องต้นเพื่อช่วยเหลือเจ้าหน้าที่ (ROVERS PLUS Integration)</p>
                        <div className="space-y-4">
                            {[
                                { label: 'Origin Criteria (RVC 40%)', status: 'Passed', color: 'bg-emerald-500' },
                                { label: 'HS Code Consistency', status: 'Passed', color: 'bg-emerald-500' },
                                { label: 'Exporter History Audit', status: 'Passed', color: 'bg-emerald-500' },
                                { label: 'Supporting Documents', status: 'Warning', color: 'bg-amber-500' },
                            ].map((check, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-700">{check.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${check.color}`}></div>
                                        <span className="text-[10px] font-black uppercase text-slate-400">{check.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    // New Support & Help View (Section 2.11 & 11.5)
    const SupportHelpView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <LifeBuoy className="text-blue-600" size={32} /> Help & Support Center
                    </h1>
                    <p className="text-slate-500 text-sm">ศูนย์ช่วยเหลือ คู่มือการใช้งาน และการติดตาม SLA (Section 2.11 & 11.5)</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-200">
                    <HelpCircle size={18} /> แจ้งปัญหาการใช้งาน (Helpdesk)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Health & SLA Tracking (Section 11.5) */}
                <Card className="p-6 border-t-4 border-t-emerald-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Zap size={18} className="text-emerald-500" /> System Health & SLA
                    </h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime Score</p>
                                <p className="text-3xl font-black text-slate-800">99.98%</p>
                            </div>
                            <Badge variant="success">Pass SLA</Badge>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-slate-500">Response Time (Avg.)</span>
                                <span className="text-emerald-600">12 Mins</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock size={16} className="text-blue-500" />
                                <span className="text-xs font-bold text-slate-700">Maintenance Window</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">รอบการปรับปรุงถัดไป: 15 เม.ย. 2567 (02:00 - 04:00 น.)<br />ระบบจะไม่สามารถใช้งานได้ชั่วคราวในช่วงเวลาดังกล่าว</p>
                        </div>
                    </div>
                </Card>

                {/* Training Materials (Section 2.11) */}
                <Card className="lg:col-span-2 p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <BookOpen size={18} className="text-blue-500" /> Training Materials & Manuals
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: 'คู่มือสำหรับผู้ใช้งานทั่วไป (Front Office)', type: 'PDF / E-Book', icon: <FileText className="text-blue-500" />, size: '4.5 MB' },
                            { title: 'การใช้งาน Dashboard เบื้องต้น', type: 'Video Tutorial', icon: <PlayCircle className="text-rose-500" />, duration: '12:45' },
                            { title: 'คู่มือสำหรับผู้ใช้งาน (Admin)', type: 'PDF / E-Book', icon: <Settings className="text-slate-500" />, size: '8.2 MB' },
                            { title: 'การบริหารจัดการ Data Catalog', type: 'Video Tutorial', icon: <PlayCircle className="text-rose-500" />, duration: '08:20' },
                        ].map((item, i) => (
                            <div key={i} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-4 group">
                                <div className="p-3 bg-slate-100 rounded-xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-tight">{item.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-blue-600 uppercase">{item.type}</span>
                                        <span className="text-[10px] text-slate-400 font-medium">• {item.size || item.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm"><HelpCircle size={20} className="text-blue-600" /></div>
                            <p className="text-xs font-bold text-blue-900">ต้องการความช่วยเหลือเพิ่มเติม? ติดต่อศูนย์ไอที โทร. 1234 หรือ Line: @DFT_Support</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white font-bold text-[10px] rounded-xl shadow-lg">Chat Live</button>
                    </div>
                </Card>
            </div>
        </div>
    );

    // 2. ETL View
    const ETLView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Data Integration Center</h1>
                    <p className="text-slate-500 text-sm">จัดการการนำเข้าข้อมูลและการเชื่อมโยง API (Section 3.1)</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200">
                    <RefreshCw size={18} /> Sync All Data Source
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { name: 'DFT SMART-I', type: 'Database', status: 'Online', lastSync: '10 นาทีที่แล้ว' },
                    { name: 'ROVERS PLUS', type: 'Database', status: 'Online', lastSync: '1 ชม. ที่แล้ว' },
                    { name: 'DBD Registration', type: 'API', status: 'Maintenance', lastSync: 'เมื่อวานนี้' },
                    { name: 'USA GSP Data', type: 'Web Scraping', status: 'Online', lastSync: '3 ชม. ที่แล้ว' },
                ].map((s, i) => (
                    <Card key={i} className="p-4 border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-start mb-2">
                            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Server size={18} /></span>
                            <Badge variant={s.status === 'Online' ? 'success' : 'warning'}>{s.status}</Badge>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">{s.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Last Sync: {s.lastSync}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 flex items-center gap-2"><DatabaseZap size={18} className="text-amber-500" /> Data Cleansing & Transformation Log</div>
                    <div className="p-4 space-y-4">
                        {[
                            { file: 'TRS_China_2024.xlsx', task: 'HS Mapping', status: 'Completed', error: 0, date: '20/05/2024' },
                            { file: 'GSP_Stats_USA.csv', task: 'Currency Transform', status: 'Warning', error: 12, date: '19/05/2024' },
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                                <div className="flex items-center gap-4"><div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm"><FileSpreadsheet size={20} className="text-emerald-500" /></div><div><p className="text-sm font-bold text-slate-800">{log.file}</p><p className="text-[10px] text-slate-400 font-bold uppercase">{log.task}</p></div></div>
                                <div className="text-right"><Badge variant={log.status === 'Completed' ? 'success' : 'warning'}>{log.status}</Badge><p className="text-[10px] text-slate-400 mt-1 font-bold">{log.error} Errors Found</p></div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-6 bg-slate-900 text-white">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-300"><HardDrive size={20} /> Data Warehouse (Section 3.4)</h3>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">โมเดลโครงสร้างข้อมูล (Star Schema) สำหรับการประมวลผลสถิติย้อนหลัง 10 ปี ครอบคลุม Tables, Views และ Materialized Views</p>
                    <div className="space-y-3">
                        {['FACT_UTILIZATION', 'DIM_HS_CODE', 'DIM_COUNTRY', 'DIM_AGREEMENT'].map(tbl => (
                            <div key={tbl} className="p-2 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] text-indigo-200"># {tbl}</div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card>
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">การนำเข้าไฟล์ข้อมูลแบบ Manual (Bulk Upload)</h3>
                </div>
                <div className="p-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 m-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group cursor-pointer">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Download size={32} />
                    </div>
                    <p className="text-slate-700 font-bold">เลือกไฟล์เพื่อนำเข้าข้อมูล</p>
                    <p className="text-slate-400 text-xs mt-2">รองรับไฟล์ *.xlsx, *.csv, *.pdf, *.xml (Section 3.1.3.2)</p>
                    <div className="flex gap-2 mt-6">
                        <Badge>Eligible List</Badge>
                        <Badge>TRS Schedule</Badge>
                        <Badge>Custom Statistics</Badge>
                    </div>
                </div>
            </Card>
        </div>
    );

    // New AI Intelligence View (Extended Concepts - Section 12.3.3)
    const AIIntelligenceView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <BrainCircuit className="text-purple-600" size={32} /> AI Intelligence Portal
                    </h1>
                    <p className="text-slate-500 text-sm">การประยุกต์ใช้เทคโนโลยีปัญญาประดิษฐ์เพื่อการวิเคราะห์ข้อมูลเชิงรุก (Section 12.3.3.5)</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="purple">AI Engine: GPT-4o Enhanced</Badge>
                    <Badge variant="success">Model Updated: 12/03/2026</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Predictive Analytics Section */}
                <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-white to-purple-50/30">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={20} className="text-purple-500" /> Export & Utilization Prediction (Next 6 Months)
                        </h3>
                        <button className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg border border-purple-100 flex items-center gap-1">
                            <Zap size={12} /> Run Forecasting
                        </button>
                    </div>
                    <div className="h-60 flex items-end justify-between gap-3 px-2 border-b border-l border-slate-100">
                        {[
                            { month: 'เม.ย.', val: 65, export: 1250 },
                            { month: 'พ.ค.', val: 72, export: 1480 },
                            { month: 'มิ.ย.', val: 68, export: 1320 },
                            { month: 'ก.ค.', val: 85, export: 1780 },
                            { month: 'ส.ค.', val: 92, export: 1950 },
                            { month: 'ก.ย.', val: 98, export: 2100 }
                        ].map((data, i) => (
                            <div key={i} className="flex-1 h-full group relative flex flex-col items-end justify-end">
                                <div className="absolute -top-14 bg-purple-900 text-white text-[9px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl whitespace-nowrap">
                                    <p className="font-bold">Export: ${data.export}M</p>
                                    <p>Utilization: {data.val}%</p>
                                </div>
                                <div
                                    className="w-full bg-purple-500/80 group-hover:bg-purple-600 rounded-t-lg transition-all duration-500 relative shadow-lg shadow-purple-200"
                                    style={{ height: `${data.val}%` }}
                                >
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-white font-bold">{data.val}%</div>
                                </div>
                                <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400">{data.month}</div>
                            </div>
                        ))}
                    </div>

                    {/* Data Summary Table */}
                    <div className="mt-10 overflow-hidden rounded-xl border border-slate-100">
                        <table className="w-full text-[11px]">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                    <th className="py-2.5 px-3 text-left">เดือน</th>
                                    <th className="py-2.5 px-3 text-right">มูลค่าส่งออก (USD)</th>
                                    <th className="py-2.5 px-3 text-right">อัตราการใช้สิทธิ</th>
                                    <th className="py-2.5 px-3 text-right">แนวโน้ม</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { month: 'เม.ย. 2567', export: '$1,250M', rate: '65%', trend: '+3.2%', up: true },
                                    { month: 'พ.ค. 2567', export: '$1,480M', rate: '72%', trend: '+7.0%', up: true },
                                    { month: 'มิ.ย. 2567', export: '$1,320M', rate: '68%', trend: '-4.0%', up: false },
                                    { month: 'ก.ค. 2567', export: '$1,780M', rate: '85%', trend: '+17.0%', up: true },
                                    { month: 'ส.ค. 2567', export: '$1,950M', rate: '92%', trend: '+7.0%', up: true },
                                    { month: 'ก.ย. 2567', export: '$2,100M', rate: '98%', trend: '+6.0%', up: true },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-purple-50/30 transition-colors">
                                        <td className="py-2.5 px-3 font-bold text-slate-700">{row.month}</td>
                                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">{row.export}</td>
                                        <td className="py-2.5 px-3 text-right">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">{row.rate}</span>
                                        </td>
                                        <td className="py-2.5 px-3 text-right">
                                            <span className={`inline-flex items-center gap-1 font-bold ${row.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                {row.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                {row.trend}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex items-start gap-4 p-4 bg-white border border-purple-100 rounded-2xl">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Sparkles size={20} /></div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">AI Insights:</p>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">คาดการณ์แนวโน้มการใช้สิทธิในกรอบ <span className="font-bold text-purple-600">RCEP</span> จะเพิ่มขึ้น <span className="font-bold text-emerald-600">14.2%</span> ในไตรมาสถัดไป เนื่องจากเทศกาลในจีนและเกาหลีใต้ แนะนำให้กองสิทธิฯ เตรียมมาตรการสนับสนุนผู้ประกอบการกลุ่มสินค้าเกษตร</p>
                        </div>
                    </div>
                </Card>

                {/* Anomaly Detection Section */}
                <Card className="p-6 border-l-4 border-l-purple-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-amber-500" /> Smart Anomaly Detection
                    </h3>
                    <div className="space-y-4">
                        {[
                            { id: 'ANM-084', desc: 'พฤติกรรมขอ CO ผิดปกติ', risk: 'High', msg: 'มูลค่า FOB เกินค่าเฉลี่ย 300%' },
                            { id: 'ANM-082', desc: 'การใช้สิทธิซ้ำซ้อน', risk: 'Med', msg: 'เลขที่ Invoice ซ้ำในระบบ GSP' },
                            { id: 'ANM-079', desc: 'HS Code ไม่สอดคล้อง', risk: 'Low', msg: 'คำอธิบายสินค้าไม่ตรงกับพิกัด' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-amber-50 hover:border-amber-200 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-mono font-bold text-purple-600">{item.id}</span>
                                    <Badge variant={item.risk === 'High' ? 'danger' : 'warning'}>{item.risk} Risk</Badge>
                                </div>
                                <p className="text-xs font-bold text-slate-800">{item.desc}</p>
                                <p className="text-[10px] text-slate-400 mt-1">{item.msg}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 text-[10px] font-bold text-slate-400 hover:text-purple-600 border border-dashed rounded-xl transition-all uppercase tracking-widest">
                        Scan All Transactions
                    </button>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Smart HS Classifier */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Target size={20} className="text-indigo-500" /> Smart HS Classifier (Auto Suggestion)
                    </h3>
                    <p className="text-xs text-slate-500 mb-6 font-medium">ช่วยเจ้าหน้าที่จำแนกพิกัดสินค้าจากชื่อสินค้าด้วย AI Natural Language Processing</p>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="พิมพ์ชื่อสินค้าเพื่อแนะนำพิกัด... (เช่น มะม่วงน้ำดอกไม้แช่เย็น)"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-4 pr-12 text-sm focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200 hover:bg-purple-700">
                                <Target size={18} />
                            </button>
                        </div>
                        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase">AI Suggestion (98% Confidence)</p>
                                <p className="text-lg font-black text-indigo-900 mt-0.5">0804.50.20</p>
                                <p className="text-[11px] text-indigo-600">Fresh Guavas, Mangoes and Mangosteens</p>
                            </div>
                            <button className="px-4 py-2 bg-white text-indigo-600 font-bold text-xs rounded-xl shadow-sm border border-indigo-100 hover:bg-indigo-100">Apply Code</button>
                        </div>
                    </div>
                </Card>

                {/* AI Trade Assistant Chatbot */}
                <Card className="p-6 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl pointer-events-none"></div>
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-purple-300">
                        <MessageSquare size={20} /> AI Trade Policy Assistant
                    </h3>
                    <div className="space-y-4 h-48 overflow-y-auto mb-4 scrollbar-hide pr-2">
                        <div className="flex justify-start">
                            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] border border-slate-700">
                                <p className="text-xs leading-relaxed text-slate-300">สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะ วันนี้ต้องการข้อมูลด้านกฎถิ่นกำเนิดสินค้าในกรอบความตกลงใดครับ?</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-purple-600 p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg shadow-purple-900/20">
                                <p className="text-xs leading-relaxed">สรุปกฎ ROO ของสินค้าพิกัด 8703 ภายใต้ RCEP ให้หน่อย</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%] border border-slate-700">
                                <p className="text-xs leading-relaxed text-slate-300 italic animate-pulse">AI กำลังประมวลผลข้อมูลความตกลงล่าสุด...</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="พิมพ์คำถามของคุณ..." className="flex-1 bg-white/10 border border-white/10 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-purple-500 outline-none" />
                        <button className="p-2 bg-purple-600 rounded-xl hover:bg-purple-500 transition-colors"><ChevronRight size={18} /></button>
                    </div>
                </Card>
            </div>
        </div>
    );

    // 3. Analytics View
    const AnalyticsView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Advanced Analytics</h1>
                    <p className="text-slate-500 text-sm">วิเคราะห์ข้อมูลการค้าระหว่างประเทศเชิงลึกแบบกำหนดเงื่อนไข (Section 3.2.1)</p>
                </div>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">กรอบความตกลง (FTA/GSP)</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>อาเซียน-จีน (ACFTA)</option>
                            <option>RCEP</option>
                            <option>ไทย-ออสเตรเลีย</option>
                            <option>GSP (USA)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">พิกัดศุลกากร (HS Code)</label>
                        <input type="text" placeholder="เช่น 080450" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">ช่วงเวลา</label>
                        <div className="flex gap-2">
                            <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm"><option>2024</option></select>
                            <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm"><option>ไตรมาส 1</option></select>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                            <Search size={16} /> ประมวลผลข้อมูล
                        </button>
                    </div>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b text-slate-500 font-bold">
                            <tr>
                                <th className="p-3 text-left">ประเทศคู่ค้า</th>
                                <th className="p-3 text-right">มูลค่าส่งออก (Eligible)</th>
                                <th className="p-3 text-right">มูลค่าขอใช้สิทธิ (Actual)</th>
                                <th className="p-3 text-center">สัดส่วนการใช้สิทธิ</th>
                                <th className="p-3 text-center">แนวโน้ม (YoY)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {[
                                { country: 'จีน', exp: '4,520.5', act: '3,842.1', util: '84.99%', trend: '+12.4%', color: 'text-emerald-600' },
                                { country: 'ญี่ปุ่น', exp: '2,145.2', act: '1,520.8', util: '70.89%', trend: '+5.1%', color: 'text-emerald-600' },
                                { country: 'ออสเตรเลีย', exp: '1,840.0', act: '1,650.4', util: '89.70%', trend: '-2.3%', color: 'text-rose-600' },
                                { country: 'อินโดนีเซีย', exp: '950.4', act: '620.1', util: '65.25%', trend: '+18.7%', color: 'text-emerald-600' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3 font-bold text-slate-800">{row.country}</td>
                                    <td className="p-3 text-right">${row.exp}M</td>
                                    <td className="p-3 text-right">${row.act}M</td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full" style={{ width: row.util }}></div>
                                            </div>
                                            <span className="text-[10px] font-bold">{row.util}</span>
                                        </div>
                                    </td>
                                    <td className={`p-3 text-center font-bold text-xs ${row.color}`}>{row.trend}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );

    // 4. Governance View
    const GovernanceView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Data Governance & Catalog</h1>
                    <p className="text-slate-500 text-sm">การกำกับดูแลข้อมูลและบัญชีข้อมูลภาครัฐ (Section 3.5)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileJson size={18} /> Data Catalog Explorer</h3>
                        <div className="relative">
                            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="ค้นหาชุดข้อมูล..." className="bg-white border border-slate-100 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-slate-100">
                            {[
                                { name: 'TB_FTA_UTILIZATION_STATS', desc: 'ข้อมูลสถิติการใช้สิทธิรายเดือน จำแนกตามพิกัดและประเทศ', owner: 'กองสิทธิฯ', level: 'Public', rows: '1.2M' },
                                { name: 'TB_HS_CODE_MASTER', desc: 'ข้อมูลรหัสพิกัดศุลกากร 2-11 หลัก ปี 2012-2024', owner: 'ศูนย์ไอที', level: 'Public', rows: '45K' },
                                { name: 'TB_CERT_ORIGIN_ISSUE', desc: 'ข้อมูลประวัติการออกหนังสือรับรองถิ่นกำเนิดสินค้า', owner: 'กองบริหาร', level: 'Internal', rows: '8.5M' },
                                { name: 'TB_COMPANY_PDPA_DATA', desc: 'ข้อมูลทะเบียนผู้ประกอบการและข้อมูลส่วนบุคคล', owner: 'ศูนย์ไอที', level: 'Confidential', rows: '120K' },
                            ].map((cat, i) => (
                                <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-slate-100 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                            <Layers size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 font-mono">{cat.name}</p>
                                            <p className="text-xs text-slate-500">{cat.desc}</p>
                                            <div className="flex gap-4 mt-1">
                                                <span className="text-[10px] text-slate-400 font-medium">เจ้าของ: {cat.owner}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">จำนวน: {cat.rows} rows</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={cat.level === 'Public' ? 'success' : cat.level === 'Internal' ? 'info' : 'warning'}>{cat.level}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-blue-500" /> Data Quality Assessment</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'ความถูกต้อง (Accuracy)', pct: 98 },
                                { label: 'ความสมบูรณ์ (Completeness)', pct: 95 },
                                { label: 'ความทันสมัย (Timeliness)', pct: 92 },
                            ].map((q, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span className="text-slate-600">{q.label}</span>
                                        <span className="text-emerald-600">{q.pct}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${q.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-5 bg-blue-900 text-white shadow-xl shadow-blue-200">
                        <h4 className="font-bold text-blue-200 flex items-center gap-2 mb-2"><FileSpreadsheet size={16} /> Metadata Standard</h4>
                        <p className="text-xs text-blue-100 leading-relaxed mb-4">จัดทำคำอธิบายชุดข้อมูลเชิงเทคนิค (Technical Metadata) และเชิงธุรกิจ (Business Metadata) อ้างอิงมาตรฐาน สพร.</p>
                        <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                            <code className="text-[10px] text-blue-200 block">
                                {`{ "field": "UTIL_VALUE", "type": "DECIMAL(18,2)", "desc": "มูลค่าการใช้สิทธิประโยชน์ (USD)" }`}
                            </code>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    // 5. Reports View
    const ReportsView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports & Documents</h1>
                    <p className="text-slate-500 text-sm">รายงานสถานการณ์การใช้สิทธิประโยชน์ทางการค้าสำเร็จรูป (Section 3.3.2)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'สรุปภาพรวม FTA & GSP รายปี', period: 'ปีงบประมาณ 2567', type: 'Annual Report', icon: <PieChart size={20} className="text-indigo-500" /> },
                    { title: 'กลุ่มสินค้าศักยภาพ Top 20', period: 'ไตรมาส 1/2567', type: 'Analysis Report', icon: <BarChart3 size={20} className="text-emerald-500" /> },
                    { title: 'รายงานสถานการณ์รายความตกลง', period: 'อัปเดตล่าสุด: เม.ย. 67', type: 'Agreement Focus', icon: <Globe size={20} className="text-blue-500" /> },
                    { title: 'สถิติการออกหนังสือรับรองถิ่นกำเนิด', period: 'สะสมตั้งแต่ต้นปี (YTD)', type: 'Operations Log', icon: <FileText size={20} className="text-amber-500" /> },
                    { title: 'รายงานการส่งออกรายประเทศสมาชิก', period: 'เปรียบเทียบ 3 ปี ย้อนหลัง', type: 'Comparative', icon: <Activity size={20} className="text-rose-500" /> },
                ].map((rep, i) => (
                    <Card key={i} className="hover:shadow-lg transition-all cursor-pointer group">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">{rep.icon}</div>
                                <Badge variant="info">{rep.type}</Badge>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-1 leading-tight">{rep.title}</h4>
                            <p className="text-xs text-slate-400 font-medium">{rep.period}</p>
                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[10px] font-bold rounded-lg border border-slate-100 transition-colors flex items-center justify-center gap-1.5 uppercase">
                                    <Eye size={12} /> Preview
                                </button>
                                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase shadow-md shadow-blue-100">
                                    <Download size={12} /> Download
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );

    const SecurityAdminView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Security & Administration</h1>
                    <p className="text-slate-500 text-sm">การควบคุมสิทธิ์ ประวัติการแก้ไข และความปลอดภัย (Section 2.8, 2.12, 3.6)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Users size={18} className="text-blue-600" /> User Roles & Group (Section 2.12)</h3>
                    <div className="space-y-4">
                        {[
                            { role: 'Administrator', users: 3, color: 'border-blue-500' },
                            { role: 'DFT Officer', users: 45, color: 'border-emerald-500' },
                            { role: 'Executive', users: 12, color: 'border-amber-500' },
                        ].map((r, i) => (
                            <div key={i} className={`p-4 bg-slate-50 border-l-4 ${r.color} rounded-r-xl flex justify-between items-center`}><span className="font-bold text-sm text-slate-800">{r.role}</span><span className="text-xs font-bold text-slate-500">{r.users} Users</span></div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3"><Fingerprint className="text-blue-600" size={24} /><div><p className="text-[11px] font-bold text-blue-900 uppercase">AD Status</p><p className="text-[10px] text-blue-600">Connected to Microsoft AD</p></div></div>
                </Card>

                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 flex justify-between items-center">
                        <h3 className="flex items-center gap-2"><History size={18} className="text-rose-500" /> Audit Trail & Data Correction (Section 3.2.2)</h3>
                        <button className="text-[10px] text-blue-600 font-black uppercase">View Full Logs</button>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-slate-100">
                            {[
                                { user: 'Chalermpol.C (Admin)', action: 'Data Correction: Ref. DFT2024-00142', target: 'Utilization Value', time: '10:45:12' },
                                { user: 'Manager.01', action: 'Update TRS Schedule', target: 'ASEAN-China TRS', time: '09:30:10' },
                                { user: 'System (Auto)', action: 'System Hardening Check', target: 'Security Baseline', time: '03:00:00' },
                                { user: 'Unknown IP', action: 'Unauthorized Access Blocked', target: 'Firewall Alert', time: 'เมื่อคืนนี้ 22:15' },
                            ].map((log, i) => (
                                <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${log.action.includes('Blocked') ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}`}><Activity size={16} /></div>
                                        <div><p className="font-bold text-slate-800">{log.user}</p><p className="text-[11px] text-slate-500 font-medium">{log.action}</p></div>
                                    </div>
                                    <div className="text-right"><p className="text-[11px] font-bold text-slate-400">{log.time}</p><span className="text-[9px] font-bold uppercase text-blue-600">{log.target}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );

    // --- 7. Sign-In View (Simulated AD SSO from demo) ---
    const SignInView = () => (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] opacity-30 translate-y-1/2 -translate-x-1/2"></div>

            <div className="w-full max-w-[440px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-[28px] shadow-2xl shadow-blue-200 mb-6 group cursor-default">
                        <BarChart3 size={40} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">FTA-GSP</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[11px] mt-1">Intelligence Portal</p>
                    <div className="h-1 w-12 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                </div>

                <Card className="p-8 shadow-2xl shadow-slate-200 border-white/50 backdrop-blur-sm bg-white/90">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-800">เข้าสู่ระบบเจ้าหน้าที่</h2>
                            <p className="text-sm text-slate-400 mt-1">กรมการค้าต่างประเทศ (DFT)</p>
                        </div>

                        {/* SSO Button Section */}
                        <button
                            onClick={handleLogin}
                            disabled={loginProcess !== null}
                            className={`w-full group relative overflow-hidden flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg border-2 ${loginProcess === 'success'
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            {loginProcess === 'checking' ? (
                                <RefreshCw className="animate-spin" size={20} />
                            ) : loginProcess === 'success' ? (
                                <CheckCircle2 className="animate-bounce" size={20} />
                            ) : (
                                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            )}

                            <span>
                                {loginProcess === 'checking' ? 'กำลังตรวจสอบสิทธิ์ AD...' :
                                    loginProcess === 'success' ? 'สำเร็จ! กำลังนำเข้าสู่ระบบ' :
                                        'Sign in with Active Directory'}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="h-[1px] flex-1 bg-slate-100"></div>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">OR</span>
                            <div className="h-[1px] flex-1 bg-slate-100"></div>
                        </div>

                        {/* Standard Login Option */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Username / Email</label>
                                <input
                                    type="text"
                                    disabled={loginProcess !== null}
                                    placeholder="dft_official@dft.go.th"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all disabled:opacity-50"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase">Password</label>
                                    <button className="text-[10px] font-bold text-blue-600 hover:underline">Forgot?</button>
                                </div>
                                <input
                                    type="password"
                                    disabled={loginProcess !== null}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all disabled:opacity-50"
                                />
                            </div>
                            <button
                                disabled={loginProcess !== null}
                                className="w-full py-3.5 text-slate-400 hover:text-slate-600 font-bold text-xs transition-colors disabled:opacity-0"
                            >
                                Sign in with Standard Account
                            </button>
                        </div>
                    </div>
                </Card>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6 opacity-40">
                        <img src="https://www.dft.go.th/Portals/0/logo-dft.png" alt="DFT" className="h-8 grayscale hover:grayscale-0 transition-all cursor-help" />
                        <div className="h-6 w-[1px] bg-slate-300"></div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <ShieldCheck size={14} /> SECURED BY MOI SSO
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium text-center leading-relaxed">
                        การเข้าสู่ระบบต้องเป็นไปตามนโยบายความมั่นคงปลอดภัยไซเบอร์<br />
                        ของกรมการค้าต่างประเทศ (Section 3.6)
                    </p>
                </div>
            </div>
        </div>
    );

    // If not logged in, render only the Sign-in view
    if (!isLoggedIn) {
        return <SignInView />;
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-900">

            {/* Sidebar Navigation */}
            <aside className={`bg-slate-900 transition-all duration-300 flex flex-col z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-6 mb-4 flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 shrink-0">
                        <BarChart3 size={24} strokeWidth={2.5} />
                    </div>
                    {isSidebarOpen && (
                        <div className="overflow-hidden">
                            <h1 className="text-white font-black text-lg leading-tight tracking-tighter">FTA-GSP</h1>
                            <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Intelligence Portal</p>
                        </div>
                    )}
                </div>

                <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                        { id: 'services', label: 'Service Portal', icon: FileCheck },
                        { id: 'operations', label: 'Operations/CO', icon: ClipboardCheck },
                        { id: 'data', label: 'Data Integration', icon: Database },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                        { id: 'governance', label: 'Governance', icon: ShieldCheck },
                        { id: 'reports', label: 'Reports', icon: FileText },
                        { id: 'security', label: 'Admin & Logs', icon: Lock },
                        { id: 'support', label: 'Help & Support', icon: LifeBuoy },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                            {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                            {!isSidebarOpen && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-white/10 whitespace-nowrap">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}

                    <div className="my-6">
                        <div className="border-t border-white/10 mx-2"></div>
                        <div className="mt-4 px-4 text-[10px] font-black text-slate-500 tracking-widest leading-loose">
                            INNOVATION & PROPOSALS
                        </div>
                    </div>

                    {[
                        { id: 'policy', label: 'Policy & Impact', icon: Target },
                        { id: 'ai', label: 'AI Intelligence', icon: BrainCircuit },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group ${activeTab === item.id
                                    ? (item.id === 'ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30')
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                            {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                            {!isSidebarOpen && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-white/10 whitespace-nowrap">
                                    {item.label}
                                </div>
                            )}
                            {item.id === 'ai' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-white/5 shrink-0 flex flex-col gap-2">
                    <button 
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 group ${!isSidebarOpen && 'justify-center px-0'}`}
                        title="Logout"
                    >
                        <LogOut size={18} className="group-hover:text-rose-400" />
                        {isSidebarOpen && <span className="text-sm font-bold tracking-tight">Sign Out</span>}
                    </button>

                    <div className="flex items-center gap-4 mt-2 px-2">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold ring-2 ring-blue-500/20 shrink-0 text-xs">
                            {user?.name?.substring(0, 2).toUpperCase() || 'DFT'}
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-white text-sm font-bold truncate">{user?.name || 'Department of Foreign Trade'}</p>
                                <p className="text-[10px] text-slate-500 font-medium truncate">{user?.role || 'Digital Government v2.5'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                    >
                        <MoreVertical size={20} className={isSidebarOpen ? "" : "rotate-90"} />
                    </button>

                    <div className="flex-1 max-w-xl mx-8 relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="ค้นหาเลขอ้างอิง, พิกัด, หรือขอความช่วยเหลือจาก AI..."
                            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-100 rounded-lg transition-colors group">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                {user?.name?.charAt(0).toUpperCase() || 'J'}
                            </div>
                            <div className="text-left hidden lg:block">
                                <p className="text-[11px] font-extrabold text-slate-900 leading-none truncate max-w-[100px]">{user?.name || 'Jane Doe'}</p>
                                <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-none truncate max-w-[100px]">{user?.role || 'Intelligence Officer'}</p>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Dynamic Content View */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-[2px] z-50 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <RefreshCw className="animate-spin text-blue-600 mb-3" size={32} />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processing...</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'dashboard' && <DashboardView />}
                    {activeTab === 'policy' && <PolicyImpactView />}
                    {activeTab === 'services' && <ServicesView />}
                    {activeTab === 'operations' && <OperationsView />}
                    {activeTab === 'ai' && <AIIntelligenceView />}
                    {activeTab === 'data' && <ETLView />}
                    {activeTab === 'analytics' && <AnalyticsView />}
                    {activeTab === 'governance' && <GovernanceView />}
                    {activeTab === 'reports' && <ReportsView />}
                    {activeTab === 'security' && <SecurityAdminView />}
                    {activeTab === 'support' && <SupportHelpView />}
                </div>

                {/* Footer Status Bar */}
                <footer className="h-8 bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> System Normal
                        </div>
                        <span className="text-[10px] text-slate-300">|</span>
                        <span className="text-[10px] font-medium text-slate-400">MFEC Public Company Limited</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Build Version 1.0.2-PLATINUM • {new Date().toLocaleDateString()}
                    </div>
                </footer>

            </main>
        </div>
    );
}