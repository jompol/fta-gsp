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
    LineChart,
    ArrowLeft,
    ChevronDown,
    UploadCloud,
    X
} from 'lucide-react';

import dftLogo from './assets/logo-dft.png';

// --- UI Components ---

const Tooltip = ({ children, text, position = "top" }) => {
    const [show, setShow] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const ref = React.useRef(null);

    const handleMouseEnter = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        let top, left;
        switch (position) {
            case 'bottom':
                top = rect.bottom + 8;
                left = rect.left + rect.width / 2;
                break;
            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - 8;
                break;
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + 8;
                break;
            default: // top
                top = rect.top - 8;
                left = rect.left + rect.width / 2;
        }
        setCoords({ top, left });
        setShow(true);
    };

    const transformMap = {
        top: 'translate(-50%, -100%)',
        bottom: 'translate(-50%, 0)',
        left: 'translate(-100%, -50%)',
        right: 'translate(0, -50%)',
    };

    const arrowMap = {
        top: { bottom: -9, left: '50%', transform: 'translateX(-50%)', borderColor: '#1e293b transparent transparent transparent' },
        bottom: { top: -9, left: '50%', transform: 'translateX(-50%)', borderColor: 'transparent transparent #1e293b transparent' },
        left: { right: -9, top: '50%', transform: 'translateY(-50%)', borderColor: 'transparent transparent transparent #1e293b' },
        right: { left: -9, top: '50%', transform: 'translateY(-50%)', borderColor: 'transparent #1e293b transparent transparent' },
    };

    return (
        <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setShow(false)}
            style={{ position: 'relative', display: 'inline-flex' }}
        >
            {children}
            {show && (
                <div style={{
                    position: 'fixed',
                    top: coords.top,
                    left: coords.left,
                    transform: transformMap[position],
                    padding: '8px 14px',
                    backgroundColor: '#1e293b',
                    color: '#fff',
                    fontSize: 12,
                    lineHeight: 1.5,
                    borderRadius: 8,
                    zIndex: 9999,
                    whiteSpace: 'normal',
                    pointerEvents: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                    maxWidth: 280,
                    width: 'max-content',
                }}>
                    {text}
                    <div style={{ position: 'absolute', ...arrowMap[position], width: 0, height: 0, borderStyle: 'solid', borderWidth: 5 }}></div>
                </div>
            )}
        </div>
    );
};

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

    // State for Application Form
    const [isCreatingApp, setIsCreatingApp] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [reportPreview, setReportPreview] = useState(null);

    // --- Dashboard Multi-Criteria Search State ---
    const [dashSearch, setDashSearch] = useState({
        agreement: '',
        yearFrom: '',
        yearTo: '',
        country: '',
        hsCode: '',
        minValue: '',
    });
    const [isDashSearchOpen, setIsDashSearchOpen] = useState(false);
    const [dashSearchApplied, setDashSearchApplied] = useState(false);

    const agreementOptions = [
        { value: '', label: 'ทั้งหมด' },
        { value: 'AFTA', label: 'AFTA (ASEAN)' },
        { value: 'ACFTA', label: 'ACFTA (จีน)' },
        { value: 'AJCEP', label: 'AJCEP (ญี่ปุ่น-อาเซียน)' },
        { value: 'JTEPA', label: 'JTEPA (ญี่ปุ่น)' },
        { value: 'TAFTA', label: 'TAFTA (ออสเตรเลีย)' },
        { value: 'TNZFTA', label: 'TNZFTA (นิวซีแลนด์)' },
        { value: 'AKFTA', label: 'AKFTA (เกาหลี)' },
        { value: 'AIFTA', label: 'AIFTA (อินเดีย)' },
        { value: 'RCEP', label: 'RCEP' },
        { value: 'GSP', label: 'GSP (สิทธิพิเศษ)' },
    ];

    const countryOptions = [
        { value: '', label: 'ทั้งหมด' },
        { value: 'CN', label: 'จีน' },
        { value: 'JP', label: 'ญี่ปุ่น' },
        { value: 'US', label: 'สหรัฐอเมริกา' },
        { value: 'AU', label: 'ออสเตรเลีย' },
        { value: 'KR', label: 'เกาหลีใต้' },
        { value: 'IN', label: 'อินเดีย' },
        { value: 'VN', label: 'เวียดนาม' },
        { value: 'MY', label: 'มาเลเซีย' },
        { value: 'ID', label: 'อินโดนีเซีย' },
        { value: 'EU', label: 'สหภาพยุโรป' },
    ];

    const activeFilterCount = Object.values(dashSearch).filter(v => v !== '').length;

    const handleDashSearchApply = () => {
        setDashSearchApplied(true);
        setIsDashSearchOpen(false);
    };

    const handleDashSearchReset = () => {
        setDashSearch({ agreement: '', yearFrom: '', yearTo: '', country: '', hsCode: '', minValue: '' });
        setDashSearchApplied(false);
    };

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
        setIsCreatingApp(false); // Reset form state when changing tabs
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
                    <Tooltip text="สลับมุมมองระหว่างรายปีและรายไตรมาส" position="bottom">
                        <div className="bg-white p-1 rounded-lg border flex shadow-sm">
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-900 text-white">รายปี</button>
                            <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-slate-600 hover:bg-slate-50">รายไตรมาส</button>
                        </div>
                    </Tooltip>
                    <Tooltip text="ดาวน์โหลดรายงานสรุปในรูปแบบ Excel / PDF" position="bottom">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-200">
                            <Download size={16} /> Export Report
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Multi-Criteria Search Toggle Bar */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsDashSearchOpen(!isDashSearchOpen)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border shadow-sm ${isDashSearchOpen
                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200'
                        : activeFilterCount > 0
                            ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-purple-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300'
                        }`}
                >
                    <Filter size={16} />
                    ค้นหาหลายเงื่อนไข (Multi-Criteria Search)
                    {activeFilterCount > 0 && (
                        <span className="bg-purple-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ml-1">
                            {activeFilterCount}
                        </span>
                    )}
                    <ChevronDown size={16} className={`transition-transform ${isDashSearchOpen ? 'rotate-180' : ''}`} />
                </button>
                {dashSearchApplied && activeFilterCount > 0 && !isDashSearchOpen && (
                    <span className="text-xs text-purple-600 font-bold">กำลังกรอง {activeFilterCount} เงื่อนไข</span>
                )}
            </div>

            {/* Multi-Criteria Search Panel */}
            {isDashSearchOpen && (
                <Card className="p-0 border-purple-200 shadow-lg shadow-purple-100/50 animate-in">
                    <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                <Filter size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">ค้นหาหลายเงื่อนไข (Multi-Criteria Search)</h3>
                                <p className="text-[11px] text-slate-500">กรองข้อมูลตามความตกลง, ช่วงเวลา, ประเทศ, พิกัดสินค้า และมูลค่า</p>
                            </div>
                        </div>
                        <button onClick={() => setIsDashSearchOpen(false)} className="p-1.5 hover:bg-purple-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* ความตกลง */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">ความตกลง FTA / GSP</label>
                                <select
                                    value={dashSearch.agreement}
                                    onChange={(e) => setDashSearch({ ...dashSearch, agreement: e.target.value })}
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all outline-none"
                                >
                                    {agreementOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* ช่วงปี */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">ช่วงปี (จาก - ถึง)</label>
                                <div className="flex gap-2">
                                    <select
                                        value={dashSearch.yearFrom}
                                        onChange={(e) => setDashSearch({ ...dashSearch, yearFrom: e.target.value })}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all outline-none"
                                    >
                                        <option value="">ปีเริ่มต้น</option>
                                        {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                    <span className="self-center text-slate-400 font-bold">–</span>
                                    <select
                                        value={dashSearch.yearTo}
                                        onChange={(e) => setDashSearch({ ...dashSearch, yearTo: e.target.value })}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all outline-none"
                                    >
                                        <option value="">ปีสิ้นสุด</option>
                                        {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* ประเทศคู่ค้า */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">ประเทศคู่ค้า</label>
                                <select
                                    value={dashSearch.country}
                                    onChange={(e) => setDashSearch({ ...dashSearch, country: e.target.value })}
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all outline-none"
                                >
                                    {countryOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* พิกัดสินค้า */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">พิกัดสินค้า (HS Code)</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="เช่น 870323, 8415, 40"
                                        value={dashSearch.hsCode}
                                        onChange={(e) => setDashSearch({ ...dashSearch, hsCode: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* มูลค่าขั้นต่ำ */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">มูลค่าขั้นต่ำ (USD)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
                                    <input
                                        type="text"
                                        placeholder="เช่น 1,000,000"
                                        value={dashSearch.minValue}
                                        onChange={(e) => setDashSearch({ ...dashSearch, minValue: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-8 pr-3 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-end gap-2">
                                <button
                                    onClick={handleDashSearchApply}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-purple-200"
                                >
                                    <Search size={16} /> ค้นหา
                                </button>
                                <button
                                    onClick={handleDashSearchReset}
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-all"
                                >
                                    ล้าง
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Applied Filters Tags */}
            {dashSearchApplied && activeFilterCount > 0 && !isDashSearchOpen && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ตัวกรอง:</span>
                    {dashSearch.agreement && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                            {agreementOptions.find(o => o.value === dashSearch.agreement)?.label}
                            <button onClick={() => setDashSearch({ ...dashSearch, agreement: '' })} className="hover:text-purple-900"><X size={12} /></button>
                        </span>
                    )}
                    {(dashSearch.yearFrom || dashSearch.yearTo) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                            <Calendar size={12} /> {dashSearch.yearFrom || '...'} – {dashSearch.yearTo || '...'}
                            <button onClick={() => setDashSearch({ ...dashSearch, yearFrom: '', yearTo: '' })} className="hover:text-blue-900"><X size={12} /></button>
                        </span>
                    )}
                    {dashSearch.country && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                            <Globe size={12} /> {countryOptions.find(o => o.value === dashSearch.country)?.label}
                            <button onClick={() => setDashSearch({ ...dashSearch, country: '' })} className="hover:text-emerald-900"><X size={12} /></button>
                        </span>
                    )}
                    {dashSearch.hsCode && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                            HS: {dashSearch.hsCode}
                            <button onClick={() => setDashSearch({ ...dashSearch, hsCode: '' })} className="hover:text-amber-900"><X size={12} /></button>
                        </span>
                    )}
                    {dashSearch.minValue && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">
                            ≥ ${dashSearch.minValue}
                            <button onClick={() => setDashSearch({ ...dashSearch, minValue: '' })} className="hover:text-rose-900"><X size={12} /></button>
                        </span>
                    )}
                    <button onClick={handleDashSearchReset} className="text-[11px] text-slate-400 hover:text-rose-500 font-bold ml-2 transition-colors">
                        ล้างทั้งหมด
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'มูลค่าการส่งออก (Eligible)', val: '$84,250M', trend: '+12.5%', isUp: true, icon: Globe, color: 'text-blue-600', tip: 'มูลค่าสินค้าส่งออกที่สามารถใช้สิทธิประโยชน์ FTA/GSP ได้' },
                    { title: 'มูลค่าการใช้สิทธิฯ (Actual)', val: '$52,140M', trend: '+8.2%', isUp: true, icon: Activity, color: 'text-emerald-600', tip: 'มูลค่าที่ผู้ส่งออกใช้สิทธิประโยชน์จริง เทียบกับมูลค่าที่มีสิทธิ' },
                    { title: 'สัดส่วนการใช้สิทธิ (%)', val: '61.89%', trend: '-2.1%', isUp: false, icon: BarChart3, color: 'text-amber-600', tip: 'อัตราส่วนการใช้สิทธิ = Actual ÷ Eligible × 100' },
                    { title: 'จำนวนหนังสือรับรอง (ฉบับ)', val: '142,508', trend: '+15.4%', isUp: true, icon: FileText, color: 'text-indigo-600', tip: 'จำนวนหนังสือรับรองถิ่นกำเนิดสินค้า (CO) ที่ออกในช่วงเวลานี้' },
                ].map((kpi, i) => (
                    <Card key={i} className="p-5 hover:border-blue-300 transition-all cursor-default group">
                        <div className="flex justify-between items-start mb-3">
                            <Tooltip text={kpi.tip} position="right">
                                <div className={`p-2.5 rounded-xl bg-slate-50 ${kpi.color} group-hover:scale-110 transition-transform`}>
                                    <kpi.icon size={20} />
                                </div>
                            </Tooltip>
                            <Tooltip text={`เปลี่ยนแปลง ${kpi.trend} จากช่วงเดียวกันปีก่อน`} position="left">
                                <div className={`flex items-center gap-1 text-xs font-bold ${kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {kpi.trend}
                                </div>
                            </Tooltip>
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
                            <Tooltip text="มูลค่าที่ใช้สิทธิจริง — แท่งสีน้ำเงิน" position="bottom">
                                <div className="flex items-center gap-1.5 cursor-help">
                                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                    <span className="text-[10px] font-bold text-slate-500">Utilization</span>
                                </div>
                            </Tooltip>
                            <Tooltip text="มูลค่าส่งออกที่มีสิทธิ — แท่งสีเทา" position="bottom">
                                <div className="flex items-center gap-1.5 cursor-help">
                                    <div className="w-3 h-3 bg-slate-100 rounded-sm border"></div>
                                    <span className="text-[10px] font-bold text-slate-500">Eligible Export</span>
                                </div>
                            </Tooltip>
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
                        <Filter size={18} className="text-emerald-500" /> <Tooltip text="5 อันดับพิกัดสินค้าที่มีมูลค่าส่งออกสูงสุด" position="right"><span className="cursor-help">Top 5 HS Codes (Export)</span></Tooltip>
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
                    <Tooltip text="ดูรายการพิกัดสินค้าทั้งหมดพร้อมสถิติการใช้สิทธิ" position="top">
                        <button className="w-full mt-8 py-2.5 text-xs font-bold text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 uppercase tracking-widest">
                            View All Categories
                        </button>
                    </Tooltip>
                </Card>
            </div>

            {/* Row 3: FTA Agreement Breakdown + Top Trading Partners (TOR 3.2.1-5) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* สถิติจำแนกตามความตกลง */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Layers size={18} className="text-indigo-500" />
                        <Tooltip text="มูลค่าการใช้สิทธิจำแนกตามกรอบความตกลง FTA และ GSP" position="right"><span className="cursor-help">สถิติจำแนกตามความตกลง (FTA/GSP)</span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'AFTA (ASEAN)', actual: 18200, pct: 63.9, color: 'bg-blue-500' },
                            { name: 'ACFTA (จีน)', actual: 14800, pct: 78.3, color: 'bg-rose-500' },
                            { name: 'JTEPA (ญี่ปุ่น)', actual: 8900, pct: 71.8, color: 'bg-amber-500' },
                            { name: 'RCEP', actual: 5800, pct: 69.1, color: 'bg-purple-500' },
                            { name: 'TAFTA (ออสเตรเลีย)', actual: 4200, pct: 61.8, color: 'bg-emerald-500' },
                            { name: 'GSP (สิทธิพิเศษ)', actual: 1940, pct: 47.9, color: 'bg-slate-400' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-[11px] font-bold text-slate-600 w-36 truncate">{item.name}</span>
                                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                </div>
                                <span className="text-[11px] font-bold text-slate-700 w-12 text-right">{item.pct}%</span>
                                <span className="text-[10px] text-slate-400 w-16 text-right">${(item.actual).toLocaleString()}M</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ประเทศคู่ค้าสำคัญ */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Globe size={18} className="text-blue-500" />
                        <Tooltip text="ประเทศที่มีมูลค่าการใช้สิทธิประโยชน์ FTA/GSP สูงสุด" position="right"><span className="cursor-help">ประเทศคู่ค้าสำคัญ Top 5</span></Tooltip>
                    </h3>
                    <div className="space-y-4">
                        {[
                            { country: 'จีน', flag: '🇨🇳', val: '$14,800M', share: '28.4%', trend: '+12.4%', isUp: true },
                            { country: 'ญี่ปุ่น', flag: '🇯🇵', val: '$8,900M', share: '17.1%', trend: '+5.1%', isUp: true },
                            { country: 'สหรัฐอเมริกา', flag: '🇺🇸', val: '$5,200M', share: '10.0%', trend: '-3.2%', isUp: false },
                            { country: 'ออสเตรเลีย', flag: '🇦🇺', val: '$4,200M', share: '8.1%', trend: '+8.7%', isUp: true },
                            { country: 'เกาหลีใต้', flag: '🇰🇷', val: '$3,100M', share: '5.9%', trend: '+15.2%', isUp: true },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{item.flag}</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{item.country}</p>
                                        <p className="text-[10px] text-slate-400">ส่วนแบ่ง {item.share}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-900">{item.val}</p>
                                    <p className={`text-[11px] font-bold flex items-center justify-end gap-0.5 ${item.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                                        {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{item.trend}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Row 4: CO by Form Type + Product Group + Region (TOR 3.2.1-6, 3.2.1-5) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* สถิติการออก CO จำแนกตามประเภทฟอร์ม */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <FileCheck size={18} className="text-emerald-500" />
                        <Tooltip text="จำนวนหนังสือรับรองถิ่นกำเนิดสินค้าจำแนกตามประเภทฟอร์ม" position="right"><span className="cursor-help">CO จำแนกตามประเภทฟอร์ม</span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { form: 'Form D (ASEAN)', count: 52400, pct: 36.8, color: 'bg-blue-500' },
                            { form: 'Form E (ACFTA)', count: 35200, pct: 24.7, color: 'bg-rose-500' },
                            { form: 'Form JTEPA', count: 18500, pct: 13.0, color: 'bg-amber-500' },
                            { form: 'Form RCEP', count: 11200, pct: 7.9, color: 'bg-purple-500' },
                            { form: 'Form AK (เกาหลี)', count: 8900, pct: 6.2, color: 'bg-emerald-500' },
                            { form: 'Form AI (อินเดีย)', count: 6100, pct: 4.3, color: 'bg-cyan-500' },
                            { form: 'อื่นๆ (FTA/GSP)', count: 10208, pct: 7.1, color: 'bg-slate-300' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`}></div>
                                <span className="text-[11px] font-medium text-slate-600 flex-1 truncate">{item.form}</span>
                                <span className="text-[11px] font-bold text-slate-800">{item.count.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400 w-10 text-right">{item.pct}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs font-bold">
                        <span className="text-slate-500">รวมทั้งหมด</span>
                        <span className="text-slate-900">142,508 ฉบับ</span>
                    </div>
                </Card>

                {/* กลุ่มสินค้าเกษตร vs อุตสาหกรรม */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <PieChart size={18} className="text-amber-500" />
                        <Tooltip text="สัดส่วนการใช้สิทธิระหว่างกลุ่มสินค้าเกษตร (พิกัด 01-24) และอุตสาหกรรม (พิกัด 25-97)" position="right"><span className="cursor-help">กลุ่มสินค้า: เกษตร vs อุตสาหกรรม</span></Tooltip>
                    </h3>
                    <div className="flex items-center justify-center gap-6 mb-6">
                        {/* Simple Donut visual */}
                        <div className="relative w-32 h-32">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4"></circle>
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="62 38" strokeLinecap="round"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-lg font-black text-slate-900">62%</span>
                                <span className="text-[9px] text-slate-400 font-bold">อุตสาหกรรม</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-blue-800">อุตสาหกรรม (พิกัด 25-97)</span>
                                <span className="text-xs font-black text-blue-900">$32,327M</span>
                            </div>
                            <div className="flex justify-between text-[10px] text-blue-600">
                                <span>62% ของมูลค่าใช้สิทธิ</span>
                                <span className="font-bold">88,552 ฉบับ CO</span>
                            </div>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-emerald-800">เกษตรและเกษตรแปรรูป (พิกัด 01-24)</span>
                                <span className="text-xs font-black text-emerald-900">$19,813M</span>
                            </div>
                            <div className="flex justify-between text-[10px] text-emerald-600">
                                <span>38% ของมูลค่าใช้สิทธิ</span>
                                <span className="font-bold">53,956 ฉบับ CO</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* สถิติจำแนกตามภูมิภาค */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Compass size={18} className="text-purple-500" />
                        <Tooltip text="มูลค่าการใช้สิทธิจำแนกตามภูมิภาค/กลุ่มประเทศ" position="left"><span className="cursor-help">จำแนกตามภูมิภาค</span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { region: 'อาเซียน (ASEAN)', val: '$18,200M', pct: 34.9, color: 'bg-blue-500', trend: '+8.5%' },
                            { region: 'เอเชียตะวันออก', val: '$16,900M', pct: 32.4, color: 'bg-rose-500', trend: '+10.2%' },
                            { region: 'โอเชียเนีย', val: '$5,100M', pct: 9.8, color: 'bg-emerald-500', trend: '+6.1%' },
                            { region: 'เอเชียใต้', val: '$4,800M', pct: 9.2, color: 'bg-amber-500', trend: '+18.4%' },
                            { region: 'อเมริกา', val: '$3,940M', pct: 7.6, color: 'bg-indigo-500', trend: '-5.1%' },
                            { region: 'ยุโรป', val: '$3,200M', pct: 6.1, color: 'bg-purple-500', trend: '+3.8%' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className={`w-2 h-8 rounded-full ${item.color} shrink-0`}></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-slate-700 truncate">{item.region}</span>
                                        <span className="text-[11px] font-black text-slate-900">{item.val}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-0.5">
                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden mr-3">
                                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold">{item.trend}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );

    // New Operations View (Section 3.3.1.4-5)
    const OperationsView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Tooltip text="ติดตามการออกหนังสือรับรองถิ่นกำเนิดสินค้าแบบเรียลไทม์" position="bottom"><h1 className="text-2xl font-extrabold text-slate-900 tracking-tight cursor-help">Operation Monitoring</h1></Tooltip>
                    <p className="text-slate-500 text-sm">ติดตามสถิติการออกหนังสือสำคัญและถิ่นกำเนิดสินค้า (Section 3.3.1.4)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <Tooltip text="มูลค่ารวมส่งออก ณ ท่าเรือต้นทาง (Free On Board)" position="right"><p className="text-[10px] font-bold text-slate-400 uppercase cursor-help">FOB Total Value</p></Tooltip>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">$12,450.8 M</h3>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="info">USD</Badge>
                        <Badge variant="info">THB 452.1 B</Badge>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-emerald-500">
                    <Tooltip text="น้ำหนักสุทธิรวมของสินค้าที่ส่งออก" position="right"><p className="text-[10px] font-bold text-slate-400 uppercase cursor-help">Total Net Weight</p></Tooltip>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">85,240.5</h3>
                    <p className="text-xs text-slate-500 font-bold mt-2">Metric Tons (KGs)</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-indigo-500">
                    <Tooltip text="จำนวนหน้ารวมของหนังสือรับรองถิ่นกำเนิดสินค้าที่ออก" position="right"><p className="text-[10px] font-bold text-slate-400 uppercase cursor-help">Total CO Pages</p></Tooltip>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">452,108</h3>
                    <p className="text-xs text-slate-500 font-bold mt-2">Pages Issued</p>
                </Card>
            </div>

            <Card>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center font-bold text-slate-800">
                    <h3 className="flex items-center gap-2"><ClipboardCheck size={18} /> <Tooltip text="รายละเอียดการออกหนังสือรับรองถิ่นกำเนิดสินค้า" position="bottom"><span className="cursor-help">CO Issuance Detail (Section 3.3.1.5)</span></Tooltip></h3>
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
                            <Globe size={18} className="text-blue-500" /> <Tooltip text="ติดตามการขยายตลาดหลังมี FTA — เปรียบเทียบก่อนและหลัง" position="bottom"><span className="cursor-help">Market Expansion Tracking (Post-FTA Growth)</span></Tooltip>
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
                            <Lightbulb size={18} className="text-amber-500" /> <Tooltip text="ค้นหาโอกาส — สินค้าศักยภาพสูงที่ใช้สิทธิยังต่ำ" position="bottom"><span className="cursor-help">Opportunity Finder</span></Tooltip>
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
                        <Compass size={20} className="text-indigo-600" /> <Tooltip text="ข้อมูลสนับสนุนนโยบาย — เตรียมข้อมูลสำหรับการเจรจา FTA" position="right"><span className="cursor-help">Policy Support Insight (Negotiation Prep)</span></Tooltip>
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
                        <Flag size={20} className="text-emerald-500" /> <Tooltip text="ติดตามตัวชี้วัดความสำเร็จเชิงยุทธศาสตร์" position="right"><span className="cursor-help">Strategic Success Tracking (Section 14-15)</span></Tooltip>
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
    // New Application Form View (Realistic CO Application)
    const ApplicationFormView = () => (
        <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setIsCreatingApp(false)}
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Hub
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {formStep} of 3</span>
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(s => <div key={s} className={`h-1.5 w-8 rounded-full ${s <= formStep ? 'bg-blue-600' : 'bg-slate-200'}`}></div>)}
                    </div>
                </div>
            </div>

            <Card className="shadow-2xl border-white/40">
                <div className="p-8 border-b bg-slate-900 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">New Certificate of Origin Request</h2>
                        <p className="text-blue-300 text-sm font-medium mt-1 uppercase tracking-wider">ระบบยื่นคำขอรับหนังสือรับรองถิ่นกำเนิดสินค้าอิเล็กทรอนิกส์</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                        <ClipboardCheck size={32} />
                    </div>
                </div>

                <div className="p-8">
                    {formStep === 1 && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <section className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-4">
                                    1. ข้อมูลความตกลงและประเทศปลายทาง
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">กรอบความตกลง (Select FTA/GSP)</label>
                                        <div className="relative">
                                            <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 appearance-none focus:border-blue-500 outline-none transition-all">
                                                <option>อาเซียน-จีน (ACFTA) - Form E</option>
                                                <option>อาเซียน (ATIGA) - Form D</option>
                                                <option>RCEP - Form RCEP</option>
                                                <option>ไทย-ญี่ปุ่น (JTEPA)</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">ประเทศปลายทาง (Destination)</label>
                                        <div className="relative">
                                            <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 appearance-none focus:border-blue-500 outline-none transition-all">
                                                <option>China</option>
                                                <option>Japan</option>
                                                <option>South Korea</option>
                                                <option>Australia</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-4">
                                    2. ข้อมูลผู้ส่งออก (Exporter Information)
                                </h3>
                                <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Users size={24} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-blue-400 uppercase">Linked with DBD API</p>
                                            <p className="font-black text-slate-900">บริษัท ไทย อะกริ เอ็กซ์ปอร์ต จำกัด</p>
                                            <p className="text-xs text-slate-500">เลขประจำตัวผู้เสียภาษี: 0105560001234</p>
                                        </div>
                                    </div>
                                    <Badge variant="success">Verified</Badge>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">ที่อยู่ภาษาอังกฤษ (Exporter's Address in English)</label>
                                        <textarea className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 focus:border-blue-500 outline-none transition-all min-h-[80px]" placeholder="123 Sukhumvit Rd, Khlong Toei, Bangkok 10110, Thailand"></textarea>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <section className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 underline decoration-emerald-500 decoration-4 underline-offset-4">
                                    3. รายละเอียดสินค้า (Product Details)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">พิกัดศุลกากร (HS Code - 8 หรือ 11 หลัก)</label>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" size={18} />
                                            <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-800 focus:border-blue-500 outline-none transition-all" placeholder="พิมพ์เพื่อค้นหาพิกัด... เช่น 0804.50.20" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">เกณฑ์ถิ่นกำเนิด (Origin Criteria)</label>
                                        <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 transition-all">
                                            <option>WO (Wholly Obtained)</option>
                                            <option>RVC 40% (Regional Value Content)</option>
                                            <option>CTC (Change in Tariff Classification)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">น้ำหนักสุทธิ (Net Weight in KGs)</label>
                                        <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500" placeholder="0.00" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-tighter ml-1">มูลค่า FOB (FOB Value in USD)</label>
                                        <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500" placeholder="0.00" />
                                    </div>
                                </div>
                            </section>

                            <div className="p-6 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-3xl flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-3 shadow-lg shadow-emerald-200">
                                    <BrainCircuit size={24} />
                                </div>
                                <p className="text-sm font-black text-emerald-800 uppercase tracking-tight">AI Assessment: High Probability</p>
                                <p className="text-xs text-emerald-600 mt-1">รายการนี้สอดคล้องกับพฤติกรรมการส่งออกเดิมและกฎ ROO ในกรอบ ACFTA</p>
                            </div>
                        </div>
                    )}

                    {formStep === 3 && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <section className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 underline decoration-indigo-500 decoration-4 underline-offset-4">
                                    4. แนบเอกสารประกอบ (Supporting Documents)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    {[
                                        { title: 'Commercial Invoice', status: 'Mandatory' },
                                        { title: 'Packing List', status: 'Mandatory' },
                                        { title: 'Bill of Lading (B/L)', status: 'Optional' },
                                        { title: 'Origin Declaration (Self)', status: 'Optional' },
                                    ].map((doc, i) => (
                                        <div key={i} className="p-4 border-2 border-slate-50 rounded-2xl flex items-center justify-between hover:border-blue-100 hover:bg-blue-50/20 transition-all group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><FileText size={18} /></div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-700">{doc.title}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">{doc.status}</p>
                                                </div>
                                            </div>
                                            <UploadCloud size={18} className="text-slate-300 group-hover:text-blue-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="flex gap-3">
                                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-2 border-blue-500" />
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">ข้าพเจ้าขอรับรองว่าข้อมูลข้างต้นเป็นความจริงทุกประการ และสินค้ามีคุณสมบัติถูกต้องตามกฎว่าด้วยถิ่นกำเนิดสินค้าภายใต้ความตกลงที่ระบุไว้ หากตรวจพบว่าข้อมูลเป็นเท็จ ข้าพเจ้ายินยอมรับโทษตามกฎหมายที่เกี่ยวข้อง</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 bg-slate-50 border-t flex justify-between items-center">
                    <button
                        onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                        disabled={formStep === 1}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-0"
                    >
                        Previous Step
                    </button>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">Save Draft</button>
                        {formStep < 3 ? (
                            <button
                                onClick={() => setFormStep(prev => prev + 1)}
                                className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                            >
                                Next Step <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        setIsCreatingApp(false);
                                        setFormStep(1);
                                    }, 1000);
                                }}
                                className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-300 hover:bg-slate-800 transition-all flex items-center gap-2"
                            >
                                Submit Application <Zap size={18} className="text-amber-400" />
                            </button>
                        )}
                    </div>
                </div>
            </Card>

            <div className="flex items-center justify-center gap-8 opacity-50">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Lock size={12} /> SSL Encrypted</div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><ShieldCheck size={12} /> Smart Verification Enabled</div>
            </div>
        </div>
    );

    const ServicesView = () => (
        <div className="space-y-6">
            {isCreatingApp ? (
                <ApplicationFormView />
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                <ClipboardCheck className="text-blue-600" size={32} /> Service Hub: End-to-End Workflow
                            </h1>
                            <p className="text-slate-500 text-sm">การให้บริการครบวงจร: ยื่นคำขอ {'→'} ตรวจสอบ {'→'} อนุมัติ {'→'} ออกเอกสาร e-CO</p>
                        </div>
                        <button
                            onClick={() => setIsCreatingApp(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105"
                        >
                            <FilePlus size={20} /> Create New Application
                        </button>
                    </div>

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

                    {/* Service Hub KPI Summary (TOR Section 3.3.1) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'คำขอทั้งหมด (YTD)', val: '1,248', sub: 'ปีงบประมาณ 2567', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
                            { title: 'อนุมัติแล้ว', val: '1,089', sub: '87.3% ของคำขอทั้งหมด', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                            { title: 'รอดำเนินการ', val: '142', sub: 'เฉลี่ย 1.8 ชม./คำขอ', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                            { title: 'เวลาเฉลี่ยออก CO', val: '2.4 ชม.', sub: 'เป้าหมาย SLA < 4 ชม.', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
                        ].map((kpi, i) => (
                            <Card key={i} className={`p-4 border ${kpi.border}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}><kpi.icon size={18} /></div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{kpi.val}</h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-1">{kpi.sub}</p>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <div className="p-4 border-b bg-slate-50 flex justify-between items-center font-bold text-slate-800">
                                <h3 className="flex items-center gap-2"><Activity size={18} className="text-blue-500" /> <Tooltip text="รายการคำขอที่อยู่ระหว่างดำเนินการ — คลิกเพื่อดูรายละเอียด" position="bottom"><span className="cursor-help">Active Applications Pipeline</span></Tooltip></h3>
                                <div className="relative">
                                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="ค้นหาเลขอ้างอิง..." className="bg-white border border-slate-100 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500 w-48" />
                                </div>
                            </div>
                            <div className="p-0 divide-y">
                                {[
                                    { ref: 'REQ-2024-8842', company: 'Thai Agri Export Co.', agreement: 'ASEAN-China (ACFTA)', status: 'Verifying', time: '2 ชม. ที่แล้ว', risk: 'Low', sla: '1.5 ชม. เหลือ', slaColor: 'text-emerald-600' },
                                    { ref: 'REQ-2024-8843', company: 'Pacific Motors Ltd.', agreement: 'RCEP', status: 'Pending Approval', time: '4 ชม. ที่แล้ว', risk: 'Med', sla: '0.5 ชม. เหลือ', slaColor: 'text-amber-600' },
                                    { ref: 'REQ-2024-8844', company: 'Global Food Solutions', agreement: 'GSP (USA)', status: 'Approved', time: '6 ชม. ที่แล้ว', risk: 'Low', sla: 'เสร็จสิ้น', slaColor: 'text-blue-500' },
                                    { ref: 'REQ-2024-8845', company: 'Siam Rubber Industries', agreement: 'JTEPA (ญี่ปุ่น)', status: 'Document Review', time: '1 ชม. ที่แล้ว', risk: 'Low', sla: '2.5 ชม. เหลือ', slaColor: 'text-emerald-600' },
                                    { ref: 'REQ-2024-8846', company: 'Eastern Seafood Co.', agreement: 'AIFTA (อินเดีย)', status: 'Rejected', time: 'เมื่อวาน', risk: 'High', sla: 'ส่งเอกสารเพิ่ม', slaColor: 'text-rose-500' },
                                ].map((req, i) => (
                                    <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between group transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-xl ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : req.status === 'Rejected' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}><FileCheck size={20} /></div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-mono font-black text-slate-900 text-sm">{req.ref}</p>
                                                    <Badge variant={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : req.status === 'Verifying' ? 'info' : 'warning'}>{req.status}</Badge>
                                                    <Badge variant={req.risk === 'High' ? 'danger' : req.risk === 'Med' ? 'warning' : 'default'}>{req.risk} Risk</Badge>
                                                </div>
                                                <p className="text-xs font-bold text-slate-600 mt-0.5">{req.company}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{req.agreement} • {req.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex items-center gap-3">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">SLA</p>
                                                <p className={`text-xs font-bold ${req.slaColor}`}>{req.sla}</p>
                                            </div>
                                            <button className="p-2 hover:bg-white hover:shadow-md border rounded-xl transition-all"><ChevronRight size={18} className="text-slate-300" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="space-y-6">
                            {/* Verification Checklist (TOR Section 3.3.1.4) */}
                            <Card className="p-5 border-t-4 border-t-blue-500">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <ShieldQuestion size={18} className="text-blue-500" />
                                    <Tooltip text="รายการตรวจสอบอัตโนมัติก่อนอนุมัติ — ระบบตรวจสอบ ROO, HS Code, ทะเบียนบริษัท" position="bottom"><span className="cursor-help">Smart Verification Checklist</span></Tooltip>
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'ตรวจสอบทะเบียนนิติบุคคล (DBD)', status: 'pass', detail: 'ยืนยัน TAX ID ผ่าน API กรมพัฒนาธุรกิจการค้า' },
                                        { label: 'ตรวจสอบกฎถิ่นกำเนิด (ROO)', status: 'pass', detail: 'เกณฑ์ WO สอดคล้องกับ ACFTA Annex 3' },
                                        { label: 'ตรวจสอบพิกัด HS Code', status: 'pass', detail: 'HS 0804.50 ตรงกับ Eligible List ปี 2567' },
                                        { label: 'ตรวจสอบเอกสารแนบ', status: 'warning', detail: 'Bill of Lading ยังไม่ได้แนบ (ไม่บังคับ)' },
                                        { label: 'ตรวจสอบ Blacklist/Watchlist', status: 'pass', detail: 'ไม่พบรายชื่อในฐานข้อมูลเฝ้าระวัง' },
                                        { label: 'AI Fraud Detection', status: 'pass', detail: 'ความน่าเชื่อถือ 96.4% — ไม่พบความผิดปกติ' },
                                    ].map((check, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${check.status === 'pass' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {check.status === 'pass' ? <CheckCircle2 size={14} /> : <AlertTriangle size={12} />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-700">{check.label}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">{check.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* e-Issuance Center */}
                            <Card className="p-5 bg-gradient-to-br from-white to-blue-50/50 border-blue-100">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Printer size={18} className="text-blue-500" /> e-Issuance Center</h3>
                                <div className="p-4 bg-white border border-blue-100 rounded-2xl shadow-sm relative overflow-hidden group cursor-pointer">
                                    <div className="absolute top-0 right-0 w-14 h-14 bg-blue-600 text-white rounded-bl-3xl flex items-center justify-center translate-x-1 -translate-y-1 group-hover:scale-110 transition-transform"><Sticker size={20} /></div>
                                    <p className="text-[10px] font-bold text-blue-600 uppercase">Latest Issued e-CO</p>
                                    <p className="text-lg font-black text-slate-900 mt-1">DFT-CN-2024012</p>
                                    <p className="text-[10px] text-slate-400 mt-1">Form E (ACFTA) • Thai Agri Export Co.</p>
                                    <div className="mt-3 flex gap-2"><button className="flex-1 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl shadow-lg">Download PDF</button><button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl"><Eye size={14} /></button></div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Recent Activity Feed (TOR Section 2.8 - Audit Trail) */}
                    <Card>
                        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><History size={18} className="text-indigo-500" /> ประวัติการดำเนินการล่าสุด</h3>
                            <button className="text-[10px] text-blue-600 font-black uppercase hover:underline">ดูทั้งหมด</button>
                        </div>
                        <div className="p-4">
                            <div className="relative border-l-2 border-slate-100 ml-4 space-y-0">
                                {[
                                    { time: '10:45', action: 'อนุมัติคำขอ REQ-2024-8844', user: 'ผอ.กองสิทธิฯ', type: 'success' },
                                    { time: '10:32', action: 'ตรวจสอบเอกสาร REQ-2024-8842 — ผ่านเกณฑ์ ROO', user: 'ระบบ AI', type: 'info' },
                                    { time: '10:15', action: 'ส่งคำขอใหม่ REQ-2024-8846 — Eastern Seafood Co.', user: 'ผู้ประกอบการ', type: 'default' },
                                    { time: '09:50', action: 'ปฏิเสธคำขอ REQ-2024-8840 — เอกสารไม่ครบ', user: 'เจ้าหน้าที่ตรวจสอบ', type: 'danger' },
                                    { time: '09:30', action: 'ออก e-CO DFT-CN-2024012 — Form E (ACFTA)', user: 'ระบบอัตโนมัติ', type: 'success' },
                                    { time: '09:15', action: 'แก้ไขข้อมูล HS Code REQ-2024-8841 — 0804.50 → 0804.90', user: 'เจ้าหน้าที่', type: 'warning' },
                                ].map((log, i) => (
                                    <div key={i} className="relative pl-8 py-3 hover:bg-slate-50 rounded-r-xl transition-all">
                                        <div className={`absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full border-2 border-white ${log.type === 'success' ? 'bg-emerald-500' : log.type === 'info' ? 'bg-blue-500' : log.type === 'danger' ? 'bg-rose-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-slate-700">{log.action}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">โดย: {log.user}</p>
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">{log.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
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
                        <Zap size={18} className="text-emerald-500" /> <Tooltip text="สถานะระบบและข้อตกลงระดับบริการ" position="right"><span className="cursor-help">System Health & SLA</span></Tooltip>
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
                    <Tooltip text="ศูนย์บูรณาการข้อมูล — จัดการการนำเข้าและเชื่อมโยงแหล่งข้อมูล" position="bottom"><h1 className="text-2xl font-extrabold text-slate-900 tracking-tight cursor-help">Data Integration Center</h1></Tooltip>
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
                    <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 flex items-center gap-2"><DatabaseZap size={18} className="text-amber-500" /> <Tooltip text="บันทึกการทำความสะอาดและแปลงข้อมูล" position="bottom"><span className="cursor-help">Data Cleansing & Transformation Log</span></Tooltip></div>
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
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-300"><HardDrive size={20} /> <Tooltip text="คลังข้อมูล — โครงสร้างฐานข้อมูลสำหรับวิเคราะห์สถิติย้อนหลัง" position="bottom"><span className="cursor-help">Data Warehouse (Section 3.4)</span></Tooltip></h3>
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
                            <TrendingUp size={20} className="text-purple-500" /> <Tooltip text="พยากรณ์มูลค่าส่งออกและอัตราการใช้สิทธิล่วงหน้า 6 เดือน" position="bottom"><span className="cursor-help">Export & Utilization Prediction (Next 6 Months)</span></Tooltip>
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
                    <Tooltip text="วิเคราะห์เชิงลึก — กรองข้อมูลการค้าตามเงื่อนไขที่กำหนดเอง" position="bottom"><h1 className="text-2xl font-extrabold text-slate-900 tracking-tight cursor-help">Advanced Analytics</h1></Tooltip>
                    <p className="text-slate-500 text-sm">วิเคราะห์ข้อมูลการค้าระหว่างประเทศเชิงลึกแบบกำหนดเงื่อนไข (Section 3.2.1)</p>
                </div>
                <div className="flex gap-2">
                    <Tooltip text="ส่งออกข้อมูลที่กรองแล้วเป็นไฟล์ Excel" position="bottom">
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all">
                            <FileSpreadsheet size={16} /> Export Excel
                        </button>
                    </Tooltip>
                    <Tooltip text="ส่งออกรายงานเป็น PDF" position="bottom">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
                            <Download size={16} /> Export PDF
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Enhanced Filter Panel (TOR 3.2.1-5) */}
            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">กรอบความตกลง</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>ทั้งหมด</option>
                            <option>ACFTA (จีน)</option>
                            <option>AFTA (ASEAN)</option>
                            <option>RCEP</option>
                            <option>JTEPA (ญี่ปุ่น)</option>
                            <option>TAFTA (ออสเตรเลีย)</option>
                            <option>AKFTA (เกาหลี)</option>
                            <option>AIFTA (อินเดีย)</option>
                            <option>GSP (สิทธิพิเศษ)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">พิกัดศุลกากร (HS Code)</label>
                        <input type="text" placeholder="เช่น 0804, 87" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">ประเทศ / ภูมิภาค</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>ทุกประเทศ</option>
                            <option>จีน</option>
                            <option>ญี่ปุ่น</option>
                            <option>สหรัฐอเมริกา</option>
                            <option>ออสเตรเลีย</option>
                            <option>--- ภูมิภาค ---</option>
                            <option>อาเซียน</option>
                            <option>เอเชียตะวันออก</option>
                            <option>ยุโรป</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">กลุ่มสินค้า</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>ทั้งหมด</option>
                            <option>เกษตรและเกษตรแปรรูป (01-24)</option>
                            <option>อุตสาหกรรม (25-97)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase">ช่วงเวลา</label>
                        <div className="flex gap-1.5">
                            <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-2 text-sm"><option>2024</option><option>2023</option><option>2022</option></select>
                            <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-2 text-sm"><option>ทั้งปี</option><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select>
                        </div>
                    </div>
                    <div className="flex items-end gap-2">
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                            <Search size={16} /> ค้นหา
                        </button>
                        <Tooltip text="บันทึกเงื่อนไขค้นหานี้เพื่อใช้ซ้ำในภายหลัง" position="bottom">
                            <button className="py-2 px-3 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all">
                                <BookOpen size={16} />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <BookOpen size={12} /> <span className="font-bold">Saved Searches:</span>
                    <button className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-bold hover:bg-blue-100">ACFTA ผลไม้สด 2024</button>
                    <button className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-bold hover:bg-blue-100">RCEP ยานยนต์ Q1-Q3</button>
                    <button className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-bold hover:bg-blue-100">GSP ทั้งหมด 3 ปี</button>
                </div>
            </Card>

            {/* KPI Summary for Current Filter (TOR 3.2.1) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { title: 'มูลค่า Eligible', val: '$9,455.1M', trend: '+9.8%', isUp: true },
                    { title: 'มูลค่า Actual', val: '$7,633.4M', trend: '+11.2%', isUp: true },
                    { title: 'อัตราใช้สิทธิ', val: '80.73%', trend: '+1.1%', isUp: true },
                    { title: 'จำนวน CO', val: '35,200', trend: '+14.5%', isUp: true },
                    { title: 'ดุลการค้า', val: '+$3,212M', trend: '+5.4%', isUp: true },
                ].map((kpi, i) => (
                    <Card key={i} className="p-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                        <div className="flex items-end justify-between mt-1">
                            <span className="text-xl font-black text-slate-900">{kpi.val}</span>
                            <span className={`text-[11px] font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {kpi.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{kpi.trend}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Results Table (Enhanced) */}
            <Card>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><BarChart3 size={18} className="text-blue-500" /> ผลการวิเคราะห์จำแนกรายประเทศ</h3>
                    <span className="text-[10px] font-bold text-slate-400">เงื่อนไข: ACFTA • ทุกพิกัด • ปี 2024 ทั้งปี</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b text-slate-500 font-bold text-[11px]">
                            <tr>
                                <th className="p-3 text-left">ประเทศคู่ค้า</th>
                                <th className="p-3 text-right">Eligible ($M)</th>
                                <th className="p-3 text-right">Actual ($M)</th>
                                <th className="p-3 text-center">อัตราใช้สิทธิ</th>
                                <th className="p-3 text-right">จำนวน CO</th>
                                <th className="p-3 text-center">YoY</th>
                                <th className="p-3 text-center">3Y Avg</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {[
                                { country: 'จีน', exp: '4,520.5', act: '3,842.1', util: '84.99', co: '18,450', trend: '+12.4%', avg: '78.2%', isUp: true },
                                { country: 'ญี่ปุ่น', exp: '2,145.2', act: '1,520.8', util: '70.89', co: '8,200', trend: '+5.1%', avg: '68.5%', isUp: true },
                                { country: 'ออสเตรเลีย', exp: '1,840.0', act: '1,650.4', util: '89.70', co: '5,100', trend: '-2.3%', avg: '87.1%', isUp: false },
                                { country: 'อินโดนีเซีย', exp: '950.4', act: '620.1', util: '65.25', co: '3,450', trend: '+18.7%', avg: '58.4%', isUp: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3 font-bold text-slate-800">{row.country}</td>
                                    <td className="p-3 text-right font-mono">{row.exp}</td>
                                    <td className="p-3 text-right font-mono">{row.act}</td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${parseFloat(row.util) >= 80 ? 'bg-emerald-500' : parseFloat(row.util) >= 65 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${row.util}%` }}></div>
                                            </div>
                                            <span className="text-[11px] font-bold">{row.util}%</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right font-mono">{row.co}</td>
                                    <td className={`p-3 text-center font-bold text-xs ${row.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                                        <span className="flex items-center justify-center gap-0.5">{row.isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}{row.trend}</span>
                                    </td>
                                    <td className="p-3 text-center text-[11px] font-bold text-slate-500">{row.avg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Comparative Analysis & Drill-down (TOR 3.2.1 Comparative Analysis) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 3-Year Trend Comparison */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <TrendingUp size={18} className="text-indigo-500" />
                        <Tooltip text="เปรียบเทียบแนวโน้มอัตราการใช้สิทธิ 3 ปีย้อนหลัง (TOR 3.2.1 Comparative)" position="right"><span className="cursor-help">Comparative Analysis: แนวโน้ม 3 ปี</span></Tooltip>
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-4 px-2 border-b border-l border-slate-100 relative">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                            {[1,2,3,4].map(l => <div key={l} className="border-t border-slate-200 w-full"></div>)}
                        </div>
                        {['Q1','Q2','Q3','Q4'].map((q, i) => {
                            const d2022 = [62, 65, 68, 64];
                            const d2023 = [70, 74, 78, 72];
                            const d2024 = [76, 80, 85, 82];
                            return (
                                <div key={i} className="flex-1 h-full flex items-end gap-1 z-10">
                                    <div className="flex-1 bg-slate-200 rounded-t-sm" style={{ height: `${d2022[i]}%` }}></div>
                                    <div className="flex-1 bg-blue-400 rounded-t-sm" style={{ height: `${d2023[i]}%` }}></div>
                                    <div className="flex-1 bg-blue-600 rounded-t-sm" style={{ height: `${d2024[i]}%` }}></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2">
                        {['Q1','Q2','Q3','Q4'].map(q => <span key={q} className="text-[10px] font-bold text-slate-400 flex-1 text-center">{q}</span>)}
                    </div>
                    <div className="mt-4 flex justify-center gap-6">
                        {[{ label: '2022', color: 'bg-slate-200' },{ label: '2023', color: 'bg-blue-400' },{ label: '2024', color: 'bg-blue-600' }].map(l => (
                            <div key={l.label} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                                <div className={`w-3 h-3 rounded-sm ${l.color}`}></div> {l.label}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* HS Code Drill-down Detail */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Layers size={18} className="text-amber-500" />
                        <Tooltip text="เจาะลึกข้อมูลตามพิกัดศุลกากร — แสดงรายละเอียดสินค้าย่อย" position="right"><span className="cursor-help">HS Code Drill-down</span></Tooltip>
                    </h3>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-amber-700">HS 08</span>
                            <ChevronRight size={14} className="text-amber-400" />
                            <span className="text-xs font-mono font-black text-amber-700">0804</span>
                            <ChevronRight size={14} className="text-amber-400" />
                            <span className="text-xs font-mono font-black text-amber-900">0804.50</span>
                        </div>
                        <p className="text-[11px] text-amber-600 mt-1">ผลไม้ — ฝรั่ง มะม่วง มังคุด สด</p>
                    </div>
                    <div className="space-y-3">
                        {[
                            { code: '0804.50.20', name: 'มะม่วงสด', val: '$1,820M', rate: '72.4%', co: '4,200' },
                            { code: '0804.50.10', name: 'ฝรั่งสด', val: '$650M', rate: '58.2%', co: '1,800' },
                            { code: '0804.50.30', name: 'มังคุดสด', val: '$1,630M', rate: '82.1%', co: '3,500' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-mono font-bold text-blue-600">{item.code}</span>
                                        <span className="text-xs font-bold text-slate-700">{item.name}</span>
                                    </div>
                                    <div className="flex gap-4 mt-1 text-[10px] text-slate-400 font-medium">
                                        <span>CO: {item.co} ฉบับ</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-900">{item.val}</p>
                                    <p className="text-[11px] font-bold text-emerald-600">{item.rate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Top Products by Utilization Gap (TOR 3.2.1-5 filter by product) */}
            <Card className="p-6">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-rose-500" />
                        <Tooltip text="สินค้าที่มีมูลค่าส่งออกสูงแต่อัตราใช้สิทธิยังต่ำ — โอกาสเพิ่มการใช้สิทธิ" position="right"><span className="cursor-help">Utilization Gap Analysis — สินค้าที่ควรเร่งส่งเสริม</span></Tooltip>
                    </h3>
                    <Badge variant="danger">Gap {'>'} 30%</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { hs: '2710.12', name: 'น้ำมันปิโตรเลียม', eligible: '$4,200M', actual: '$1,800M', gap: '57.1%', potential: '$2,400M' },
                        { hs: '8471.30', name: 'คอมพิวเตอร์พกพา', eligible: '$3,500M', actual: '$1,600M', gap: '54.3%', potential: '$1,900M' },
                        { hs: '0810.90', name: 'มังคุดสด', eligible: '$1,200M', actual: '$650M', gap: '45.8%', potential: '$550M' },
                        { hs: '3903.19', name: 'โพลิสไตรีน', eligible: '$2,100M', actual: '$1,200M', gap: '42.9%', potential: '$900M' },
                    ].map((item, i) => (
                        <div key={i} className="p-4 border border-rose-100 rounded-xl bg-rose-50/30 hover:bg-rose-50 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">{item.hs}</span>
                                <span className="text-xs font-bold text-slate-700">{item.name}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] mt-3">
                                <div><span className="text-slate-400">Eligible:</span> <span className="font-bold text-slate-700">{item.eligible}</span></div>
                                <div><span className="text-slate-400">Actual:</span> <span className="font-bold text-slate-700">{item.actual}</span></div>
                                <div><span className="text-slate-400">Gap:</span> <span className="font-black text-rose-600">{item.gap}</span></div>
                                <div><span className="text-slate-400">โอกาส:</span> <span className="font-black text-emerald-600">{item.potential}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

    // 4. Governance View
    const GovernanceView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <Tooltip text="ธรรมาภิบาลข้อมูล — บัญชีข้อมูลภาครัฐและการกำกับดูแลคุณภาพ" position="bottom"><h1 className="text-2xl font-extrabold text-slate-900 tracking-tight cursor-help">Data Governance & Catalog</h1></Tooltip>
                    <p className="text-slate-500 text-sm">การกำกับดูแลข้อมูลและบัญชีข้อมูลภาครัฐ (Section 3.5)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileJson size={18} /> <Tooltip text="สำรวจบัญชีข้อมูล — ค้นหาและดูรายละเอียดชุดข้อมูลทั้งหมด" position="bottom"><span className="cursor-help">Data Catalog Explorer</span></Tooltip></h3>
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
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-blue-500" /> <Tooltip text="ประเมินคุณภาพข้อมูล — ความถูกต้อง ความสมบูรณ์ และความทันสมัย" position="bottom"><span className="cursor-help">Data Quality Assessment</span></Tooltip></h3>
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
    // Annual FTA & GSP Report Preview
    const AnnualReportPreview = () => {
        const agreementData = [
            { name: 'AFTA (ASEAN)', eligible: 28500, actual: 18200, rate: 63.86, co: 52400, trend: '+8.5%', isUp: true },
            { name: 'ACFTA (จีน)', eligible: 18900, actual: 14800, rate: 78.31, co: 35200, trend: '+12.4%', isUp: true },
            { name: 'JTEPA (ญี่ปุ่น)', eligible: 12400, actual: 8900, rate: 71.77, co: 18500, trend: '+5.1%', isUp: true },
            { name: 'TAFTA (ออสเตรเลีย)', eligible: 6800, actual: 4200, rate: 61.76, co: 12300, trend: '-2.3%', isUp: false },
            { name: 'AKFTA (เกาหลี)', eligible: 5200, actual: 3100, rate: 59.62, co: 8900, trend: '+15.2%', isUp: true },
            { name: 'RCEP', eligible: 8400, actual: 5800, rate: 69.05, co: 11200, trend: '+22.8%', isUp: true },
            { name: 'GSP (สิทธิพิเศษ)', eligible: 4050, actual: 1940, rate: 47.90, co: 4008, trend: '-5.1%', isUp: false },
        ];
        const topHsData = [
            { rank: 1, code: '8703.23', name: 'รถยนต์นั่ง เครื่องยนต์สูบ 1,500-3,000 cc', eligible: 12500, actual: 10600, rate: 84.80 },
            { rank: 2, code: '8415.10', name: 'เครื่องปรับอากาศ ชนิดติดผนัง/หน้าต่าง', eligible: 8200, actual: 6500, rate: 79.27 },
            { rank: 3, code: '4001.22', name: 'ยางธรรมชาติ (TSR 20)', eligible: 6700, actual: 4800, rate: 71.64 },
            { rank: 4, code: '0804.50', name: 'มะม่วง มังคุด ฝรั่ง สด', eligible: 4100, actual: 2900, rate: 70.73 },
            { rank: 5, code: '1604.14', name: 'ปลาทูน่ากระป๋อง', eligible: 3800, actual: 3200, rate: 84.21 },
            { rank: 6, code: '8471.30', name: 'เครื่องคอมพิวเตอร์พกพา', eligible: 3500, actual: 2200, rate: 62.86 },
            { rank: 7, code: '3903.19', name: 'โพลิสไตรีน (Polystyrene)', eligible: 2900, actual: 2100, rate: 72.41 },
            { rank: 8, code: '2710.12', name: 'น้ำมันปิโตรเลียม', eligible: 2600, actual: 1500, rate: 57.69 },
            { rank: 9, code: '7108.13', name: 'ทองคำ กึ่งสำเร็จรูป', eligible: 2400, actual: 1800, rate: 75.00 },
            { rank: 10, code: '0306.17', name: 'กุ้งแช่แข็ง', eligible: 2200, actual: 1700, rate: 77.27 },
        ];
        const quarterlyData = [
            { q: 'Q1/2567', eligible: 19800, actual: 12400, rate: 62.63, co: 34200 },
            { q: 'Q2/2567', eligible: 21500, actual: 14100, rate: 65.58, co: 36800 },
            { q: 'Q3/2567', eligible: 22100, actual: 14800, rate: 66.97, co: 38100 },
            { q: 'Q4/2567', eligible: 20850, actual: 13640, rate: 65.42, co: 33408 },
        ];
        const totalEligible = agreementData.reduce((s, d) => s + d.eligible, 0);
        const totalActual = agreementData.reduce((s, d) => s + d.actual, 0);
        const totalCO = agreementData.reduce((s, d) => s + d.co, 0);
        const totalRate = ((totalActual / totalEligible) * 100).toFixed(2);

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button onClick={() => setReportPreview(null)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
                        <ArrowLeft size={18} /> กลับไปหน้ารายงาน
                    </button>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
                            <Printer size={16} /> พิมพ์
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
                            <Download size={16} /> ดาวน์โหลด PDF
                        </button>
                    </div>
                </div>

                {/* Report Cover */}
                <Card className="overflow-visible">
                    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <Badge variant="info">Annual Report</Badge>
                            <h1 className="text-3xl font-black tracking-tight mt-4 leading-tight">รายงานสรุปภาพรวม<br />การใช้สิทธิประโยชน์ทางการค้า</h1>
                            <h2 className="text-xl font-bold text-blue-300 mt-2">FTA & GSP ปีงบประมาณ 2567</h2>
                            <div className="flex gap-6 mt-8 text-sm">
                                <div><p className="text-blue-300 text-[10px] uppercase font-bold">หน่วยงาน</p><p className="font-bold">กรมการค้าต่างประเทศ</p></div>
                                <div><p className="text-blue-300 text-[10px] uppercase font-bold">จัดทำโดย</p><p className="font-bold">กองสิทธิประโยชน์ทางการค้า</p></div>
                                <div><p className="text-blue-300 text-[10px] uppercase font-bold">วันที่จัดทำ</p><p className="font-bold">มีนาคม 2567</p></div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Executive Summary KPIs */}
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> สรุปผลภาพรวม (Executive Summary)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'มูลค่าส่งออกที่มีสิทธิ (Eligible)', val: `$${(totalEligible).toLocaleString()}M`, sub: 'เพิ่มขึ้น 9.8% จากปีก่อน', color: 'border-blue-500', icon: Globe },
                            { title: 'มูลค่าที่ใช้สิทธิจริง (Actual)', val: `$${(totalActual).toLocaleString()}M`, sub: 'เพิ่มขึ้น 11.2% จากปีก่อน', color: 'border-emerald-500', icon: Activity },
                            { title: 'อัตราการใช้สิทธิ (Utilization Rate)', val: `${totalRate}%`, sub: 'เป้าหมาย 65% — บรรลุเป้า', color: 'border-amber-500', icon: BarChart3 },
                            { title: 'จำนวนหนังสือรับรอง (CO)', val: `${totalCO.toLocaleString()} ฉบับ`, sub: 'เพิ่มขึ้น 15.4% จากปีก่อน', color: 'border-indigo-500', icon: FileText },
                        ].map((kpi, i) => (
                            <Card key={i} className={`p-5 border-l-4 ${kpi.color}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <kpi.icon size={16} className="text-slate-400" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{kpi.val}</h3>
                                <p className="text-[11px] text-emerald-600 font-bold mt-1">{kpi.sub}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Quarterly Trend */}
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> สถิติรายไตรมาส
                    </h3>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b">
                                    <tr className="text-slate-500 font-bold text-[11px] uppercase">
                                        <th className="p-4 text-left">ไตรมาส</th>
                                        <th className="p-4 text-right">มูลค่าส่งออก Eligible ($M)</th>
                                        <th className="p-4 text-right">มูลค่าใช้สิทธิ Actual ($M)</th>
                                        <th className="p-4 text-center">อัตราการใช้สิทธิ (%)</th>
                                        <th className="p-4 text-right">จำนวน CO (ฉบับ)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {quarterlyData.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-bold text-slate-800">{row.q}</td>
                                            <td className="p-4 text-right font-mono">{row.eligible.toLocaleString()}</td>
                                            <td className="p-4 text-right font-mono">{row.actual.toLocaleString()}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.rate}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700">{row.rate}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-mono">{row.co.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-50 font-bold text-blue-900">
                                        <td className="p-4">รวมทั้งปี</td>
                                        <td className="p-4 text-right font-mono">{totalEligible.toLocaleString()}</td>
                                        <td className="p-4 text-right font-mono">{totalActual.toLocaleString()}</td>
                                        <td className="p-4 text-center text-lg font-black">{totalRate}%</td>
                                        <td className="p-4 text-right font-mono">{totalCO.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Quarterly Bar Chart */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <BarChart3 size={18} className="text-blue-500" /> กราฟเปรียบเทียบรายไตรมาส (Eligible vs Actual)
                    </h3>
                    <div className="h-56 flex items-end justify-around gap-8 px-4 border-b border-l border-slate-100 relative">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                            {[1,2,3,4].map(l => <div key={l} className="border-t border-slate-200 w-full"></div>)}
                        </div>
                        {quarterlyData.map((d, i) => {
                            const maxVal = 22500;
                            return (
                                <div key={i} className="flex-1 h-full flex items-end gap-2 z-10 group">
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-slate-200 rounded-t-lg transition-all group-hover:bg-slate-300" style={{ height: `${(d.eligible / maxVal) * 100}%` }}>
                                            <div className="text-[9px] font-bold text-slate-500 text-center pt-1">{(d.eligible / 1000).toFixed(1)}B</div>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                                        <div className="w-full bg-blue-500 rounded-t-lg transition-all group-hover:bg-blue-600" style={{ height: `${(d.actual / maxVal) * 100}%` }}>
                                            <div className="text-[9px] font-bold text-white text-center pt-1">{(d.actual / 1000).toFixed(1)}B</div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-7 left-0 right-0 flex justify-around">
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-around mt-3">
                        {quarterlyData.map((d, i) => (
                            <span key={i} className="text-[11px] font-bold text-slate-500">{d.q}</span>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center gap-8">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Eligible Export
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Actual Utilization
                        </div>
                    </div>
                </Card>

                {/* By Agreement */}
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div> สถิติจำแนกตามกรอบความตกลง
                    </h3>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b">
                                    <tr className="text-slate-500 font-bold text-[11px] uppercase">
                                        <th className="p-4 text-left">ความตกลง</th>
                                        <th className="p-4 text-right">Eligible ($M)</th>
                                        <th className="p-4 text-right">Actual ($M)</th>
                                        <th className="p-4 text-center">อัตราใช้สิทธิ</th>
                                        <th className="p-4 text-right">จำนวน CO</th>
                                        <th className="p-4 text-center">แนวโน้ม YoY</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {agreementData.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-bold text-slate-800">{row.name}</td>
                                            <td className="p-4 text-right font-mono">{row.eligible.toLocaleString()}</td>
                                            <td className="p-4 text-right font-mono">{row.actual.toLocaleString()}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${row.rate >= 70 ? 'bg-emerald-500' : row.rate >= 60 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${row.rate}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-bold">{row.rate}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-mono">{row.co.toLocaleString()}</td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center gap-1 font-bold text-xs ${row.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                    {row.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {row.trend}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Top 10 HS Codes */}
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div> 10 อันดับพิกัดสินค้าส่งออกสูงสุด
                    </h3>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b">
                                    <tr className="text-slate-500 font-bold text-[11px] uppercase">
                                        <th className="p-4 text-center w-12">#</th>
                                        <th className="p-4 text-left">พิกัด HS</th>
                                        <th className="p-4 text-left">รายการสินค้า</th>
                                        <th className="p-4 text-right">Eligible ($M)</th>
                                        <th className="p-4 text-right">Actual ($M)</th>
                                        <th className="p-4 text-center">อัตราใช้สิทธิ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {topHsData.map((row) => (
                                        <tr key={row.rank} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 text-center">
                                                <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-black ${row.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{row.rank}</span>
                                            </td>
                                            <td className="p-4 font-mono font-bold text-blue-600">{row.code}</td>
                                            <td className="p-4 text-slate-700">{row.name}</td>
                                            <td className="p-4 text-right font-mono">{row.eligible.toLocaleString()}</td>
                                            <td className="p-4 text-right font-mono">{row.actual.toLocaleString()}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${row.rate >= 80 ? 'bg-emerald-500' : row.rate >= 65 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${row.rate}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-bold">{row.rate}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Key Findings */}
                <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div> ข้อค้นพบสำคัญและข้อเสนอแนะ
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="p-6 border-l-4 border-l-emerald-500">
                            <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> จุดเด่น</h4>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex gap-2"><span className="text-emerald-500 font-bold shrink-0">•</span> RCEP มีอัตราเติบโตสูงสุดที่ +22.8% สะท้อนการตอบรับที่ดีจากผู้ประกอบการ</li>
                                <li className="flex gap-2"><span className="text-emerald-500 font-bold shrink-0">•</span> ACFTA ยังคงมีอัตราการใช้สิทธิสูงสุดที่ 78.31% แสดงศักยภาพตลาดจีน</li>
                                <li className="flex gap-2"><span className="text-emerald-500 font-bold shrink-0">•</span> สินค้ารถยนต์และเครื่องปรับอากาศมีอัตราใช้สิทธิเกิน 79% เกือบเต็มศักยภาพ</li>
                                <li className="flex gap-2"><span className="text-emerald-500 font-bold shrink-0">•</span> จำนวน CO ที่ออกเพิ่มขึ้น 15.4% สอดคล้องกับนโยบาย e-CO</li>
                            </ul>
                        </Card>
                        <Card className="p-6 border-l-4 border-l-amber-500">
                            <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500" /> จุดที่ต้องปรับปรุง</h4>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex gap-2"><span className="text-amber-500 font-bold shrink-0">•</span> GSP มีอัตราใช้สิทธิต่ำสุดที่ 47.90% เนื่องจากสหรัฐฯ ตัดสิทธิบางรายการ</li>
                                <li className="flex gap-2"><span className="text-amber-500 font-bold shrink-0">•</span> TAFTA มีแนวโน้มลดลง -2.3% ต้องเร่งสร้างการรับรู้แก่ผู้ประกอบการ</li>
                                <li className="flex gap-2"><span className="text-amber-500 font-bold shrink-0">•</span> สินค้ากลุ่มปิโตรเลียม (HS 2710) มีอัตราใช้สิทธิเพียง 57.69%</li>
                                <li className="flex gap-2"><span className="text-amber-500 font-bold shrink-0">•</span> ควรเพิ่มช่องทางอบรมออนไลน์สำหรับ SME เพื่อลดช่องว่างการใช้สิทธิ</li>
                            </ul>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <Card className="p-6 bg-slate-50">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <div>
                            <p className="font-bold text-slate-500">กรมการค้าต่างประเทศ — กองสิทธิประโยชน์ทางการค้า</p>
                            <p className="mt-1">รายงานนี้จัดทำโดยระบบ FTA-GSP Intelligence Portal (Section 3.3.2)</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-500">ข้อมูล ณ วันที่ 31 มีนาคม 2567</p>
                            <p className="mt-1">แหล่งข้อมูล: DFT Data Warehouse, SMART-I, ROVERS PLUS</p>
                        </div>
                    </div>
                </Card>
            </div>
        );
    };

    const ReportsView = () => {
        if (reportPreview === 'annual') return <AnnualReportPreview />;
        return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <Tooltip text="รายงานและเอกสาร — รายงานสำเร็จรูปพร้อมดาวน์โหลด" position="bottom"><h1 className="text-2xl font-extrabold text-slate-900 tracking-tight cursor-help">Reports & Documents</h1></Tooltip>
                    <p className="text-slate-500 text-sm">รายงานสถานการณ์การใช้สิทธิประโยชน์ทางการค้าสำเร็จรูป (Section 3.3.2)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { id: 'annual', title: 'สรุปภาพรวม FTA & GSP รายปี', period: 'ปีงบประมาณ 2567', type: 'Annual Report', icon: <PieChart size={20} className="text-indigo-500" /> },
                    { id: null, title: 'กลุ่มสินค้าศักยภาพ Top 20', period: 'ไตรมาส 1/2567', type: 'Analysis Report', icon: <BarChart3 size={20} className="text-emerald-500" /> },
                    { id: null, title: 'รายงานสถานการณ์รายความตกลง', period: 'อัปเดตล่าสุด: เม.ย. 67', type: 'Agreement Focus', icon: <Globe size={20} className="text-blue-500" /> },
                    { id: null, title: 'สถิติการออกหนังสือรับรองถิ่นกำเนิด', period: 'สะสมตั้งแต่ต้นปี (YTD)', type: 'Operations Log', icon: <FileText size={20} className="text-amber-500" /> },
                    { id: null, title: 'รายงานการส่งออกรายประเทศสมาชิก', period: 'เปรียบเทียบ 3 ปี ย้อนหลัง', type: 'Comparative', icon: <Activity size={20} className="text-rose-500" /> },
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
                                <button
                                    onClick={() => rep.id && setReportPreview(rep.id)}
                                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-colors flex items-center justify-center gap-1.5 uppercase ${rep.id ? 'bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border-slate-100' : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'}`}
                                >
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
    };

    const SecurityAdminView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <Tooltip text="ความปลอดภัยและการบริหารจัดการ — สิทธิ์ผู้ใช้ ประวัติการแก้ไข และ Audit" position="bottom"><h1 className="text-2xl font-extrabold text-slate-900 tracking-tight cursor-help">Security & Administration</h1></Tooltip>
                    <p className="text-slate-500 text-sm">การควบคุมสิทธิ์ ประวัติการแก้ไข และความปลอดภัย (Section 2.8, 2.12, 3.6)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Users size={18} className="text-blue-600" /> <Tooltip text="บทบาทและกลุ่มผู้ใช้งาน — จัดการสิทธิ์การเข้าถึงระบบ" position="right"><span className="cursor-help">User Roles & Group (Section 2.12)</span></Tooltip></h3>
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
                        <h3 className="flex items-center gap-2"><History size={18} className="text-rose-500" /> <Tooltip text="ประวัติการแก้ไขข้อมูลและบันทึกการตรวจสอบ" position="bottom"><span className="cursor-help">Audit Trail & Data Correction (Section 3.2.2)</span></Tooltip></h3>
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
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[24px] shadow-2xl shadow-blue-200 mb-6 group cursor-default p-2 border border-slate-100/50">
                        <img src={dftLogo} alt="DFT Logo" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
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
                        <img src={dftLogo} alt="DFT" className="h-8 grayscale hover:grayscale-0 transition-all cursor-help" />
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
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0 p-1">
                        <img src={dftLogo} alt="DFT Logo" className="w-full h-full object-contain" />
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
                        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, tipTh: 'แดชบอร์ด — ภาพรวมสถิติการใช้สิทธิประโยชน์ FTA/GSP' },
                        { id: 'services', label: 'Service Portal', icon: FileCheck, tipTh: 'บริการออนไลน์ — ยื่นคำขอหนังสือรับรองถิ่นกำเนิดสินค้า (CO)' },
                        { id: 'operations', label: 'Operations/CO', icon: ClipboardCheck, tipTh: 'ติดตามงาน — สถานะการออกหนังสือรับรองและสถิติรายวัน' },
                        { id: 'data', label: 'Data Integration', icon: Database, tipTh: 'บูรณาการข้อมูล — จัดการแหล่งข้อมูลและ ETL Pipeline' },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3, tipTh: 'วิเคราะห์ข้อมูล — รายงานเชิงลึกและแนวโน้มการค้า' },
                        { id: 'governance', label: 'Governance', icon: ShieldCheck, tipTh: 'ธรรมาภิบาลข้อมูล — มาตรฐาน คุณภาพ และการกำกับดูแล' },
                        { id: 'reports', label: 'Reports', icon: FileText, tipTh: 'รายงาน — รายงานสำเร็จรูปและเอกสารสรุปสถานการณ์' },
                        { id: 'security', label: 'Admin & Logs', icon: Lock, tipTh: 'ผู้ดูแลระบบ — จัดการผู้ใช้ สิทธิ์ และบันทึกการใช้งาน' },
                        { id: 'support', label: 'Help & Support', icon: LifeBuoy, tipTh: 'ช่วยเหลือ — คู่มือการใช้งาน คำถามที่พบบ่อย และแจ้งปัญหา' },
                    ].map((item) => (
                        <Tooltip key={item.id} text={item.tipTh} position="right">
                            <button
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative ${activeTab === item.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                            </button>
                        </Tooltip>
                    ))}

                    <div className="my-6">
                        <div className="border-t border-white/10 mx-2"></div>
                        <div className="mt-4 px-4 text-[10px] font-black text-slate-500 tracking-widest leading-loose">
                            INNOVATION & PROPOSALS
                        </div>
                    </div>

                    {[
                        { id: 'policy', label: 'Policy & Impact', icon: Target, tipTh: 'นโยบาย — วิเคราะห์ผลกระทบและข้อเสนอเชิงนโยบาย FTA' },
                        { id: 'ai', label: 'AI Intelligence', icon: BrainCircuit, tipTh: 'ปัญญาประดิษฐ์ — ตรวจจับความผิดปกติ ทำนายแนวโน้ม และจำแนกพิกัด' },
                    ].map((item) => (
                        <Tooltip key={item.id} text={item.tipTh} position="right">
                            <button
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative ${activeTab === item.id
                                        ? (item.id === 'ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30')
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                                {item.id === 'ai' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>}
                            </button>
                        </Tooltip>
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
                    <Tooltip text={isSidebarOpen ? "ย่อเมนูด้านข้าง" : "ขยายเมนูด้านข้าง"} position="right">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                        >
                            <MoreVertical size={20} className={isSidebarOpen ? "" : "rotate-90"} />
                        </button>
                    </Tooltip>

                    <div className="flex-1 max-w-xl mx-8 relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Tooltip text="พิมพ์เลขอ้างอิง, พิกัดศุลกากร หรือคำถามเพื่อให้ AI ช่วยค้นหา" position="bottom">
                            <input
                                type="text"
                                placeholder="ค้นหาเลขอ้างอิง, พิกัด, หรือขอความช่วยเหลือจาก AI..."
                                className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all outline-none"
                            />
                        </Tooltip>
                    </div>

                    <div className="flex items-center gap-3">
                        <Tooltip text="การแจ้งเตือน — มีรายการใหม่ที่ยังไม่ได้อ่าน" position="bottom">
                            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                            </button>
                        </Tooltip>
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