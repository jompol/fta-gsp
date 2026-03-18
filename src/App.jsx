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
    X,
    Sun,
    Moon,
    Monitor,
    Type,
    Minus,
    Plus
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

const TorRef = ({ section }) => (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded border border-indigo-100 ml-1 shrink-0 uppercase tracking-wider">TOR {section}</span>
);

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

    // --- Theme & Accessibility ---
    const [theme, setTheme] = useState(() => localStorage.getItem('fta-theme') || 'light');
    const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fta-fontsize') || '100'));
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        localStorage.setItem('fta-theme', theme);
        const root = document.documentElement;
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
        } else {
            root.classList.toggle('dark', theme === 'dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('fta-fontsize', fontSize.toString());
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    const isDark = theme === 'dark' || (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // State for Application Form
    const [isCreatingApp, setIsCreatingApp] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [reportPreview, setReportPreview] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);

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
                    <p className="text-slate-500 text-sm">ข้อมูลสรุปภาพรวมการใช้สิทธิประโยชน์ทางการค้า (FTA & GSP) <TorRef section="3.2.1, 3.3.1" /></p>
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
                    ค้นหาหลายเงื่อนไข (Multi-Criteria Search) <TorRef section="2.5" />
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
                            <TrendingUp size={18} className="text-blue-500" /> สถิติการใช้สิทธิประโยชน์ย้อนหลัง 10 ปี (2015 - 2024) <TorRef section="3.2.1, 3.3.1(2)" />
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
                        <Filter size={18} className="text-emerald-500" /> <Tooltip text="5 อันดับพิกัดสินค้าที่มีมูลค่าส่งออกสูงสุด" position="right"><span className="cursor-help">Top 5 HS Codes (Export) <TorRef section="3.2.1(5)" /></span></Tooltip>
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
                        <Tooltip text="มูลค่าการใช้สิทธิจำแนกตามกรอบความตกลง FTA และ GSP" position="right"><span className="cursor-help">สถิติจำแนกตามความตกลง (FTA/GSP) <TorRef section="3.2.1(5)" /></span></Tooltip>
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
                        <Tooltip text="ประเทศที่มีมูลค่าการใช้สิทธิประโยชน์ FTA/GSP สูงสุด" position="right"><span className="cursor-help">ประเทศคู่ค้าสำคัญ Top 5 <TorRef section="3.2.1(5)" /></span></Tooltip>
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
                        <Tooltip text="จำนวนหนังสือรับรองถิ่นกำเนิดสินค้าจำแนกตามประเภทฟอร์ม" position="right"><span className="cursor-help">CO จำแนกตามประเภทฟอร์ม <TorRef section="3.2.1(6)" /></span></Tooltip>
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
                        <Tooltip text="สัดส่วนการใช้สิทธิระหว่างกลุ่มสินค้าเกษตร (พิกัด 01-24) และอุตสาหกรรม (พิกัด 25-97)" position="right"><span className="cursor-help">กลุ่มสินค้า: เกษตร vs อุตสาหกรรม <TorRef section="3.2.1(5)" /></span></Tooltip>
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
                        <Tooltip text="มูลค่าการใช้สิทธิจำแนกตามภูมิภาค/กลุ่มประเทศ" position="left"><span className="cursor-help">จำแนกตามภูมิภาค <TorRef section="3.2.1(5)" /></span></Tooltip>
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
                    <p className="text-slate-500 text-sm">ติดตามสถิติการออกหนังสือสำคัญและถิ่นกำเนิดสินค้า <TorRef section="3.3.1.4" /></p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all">
                        <FileSpreadsheet size={16} /> Export Excel
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            {/* KPI Cards with Trend (TOR 3.3.1.4) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'จำนวนฉบับ CO', val: '142,508', sub: 'ฉบับ', trend: '+15.4%', isUp: true, color: 'border-blue-500', icon: FileText },
                    { title: 'FOB Total Value', val: '$12,450.8M', sub: 'USD', trend: '+9.2%', isUp: true, color: 'border-emerald-500', icon: Globe },
                    { title: 'Total Net Weight', val: '85,240.5', sub: 'Metric Tons', trend: '+7.8%', isUp: true, color: 'border-amber-500', icon: Layers },
                    { title: 'จำนวนแผ่น (Pages)', val: '452,108', sub: 'แผ่น', trend: '+12.1%', isUp: true, color: 'border-indigo-500', icon: FileCheck },
                ].map((kpi, i) => (
                    <Card key={i} className={`p-5 border-l-4 ${kpi.color}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <kpi.icon size={14} className="text-slate-400" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{kpi.val}</h3>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-[11px] text-slate-500 font-medium">{kpi.sub}</span>
                            <span className={`text-[11px] font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {kpi.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{kpi.trend}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* e-CO vs Manual Ratio + CO by Form Type (TOR 3.2.1-6, 3.3.1-5) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* e-CO vs Manual */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Zap size={18} className="text-emerald-500" />
                        <Tooltip text="สัดส่วนหนังสือรับรองแบบอิเล็กทรอนิกส์ (e-CO) เทียบกับแบบกระดาษ" position="right"><span className="cursor-help">e-CO vs Manual <TorRef section="3.3.1(5)" /></span></Tooltip>
                    </h3>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-36 h-36">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4"></circle>
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="78 22" strokeLinecap="round"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-emerald-600">78%</span>
                                <span className="text-[9px] text-slate-400 font-bold">e-CO</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-50 rounded-xl text-center border border-emerald-100">
                            <p className="text-lg font-black text-emerald-700">111,156</p>
                            <p className="text-[10px] font-bold text-emerald-600">e-CO (อิเล็กทรอนิกส์)</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                            <p className="text-lg font-black text-slate-700">31,352</p>
                            <p className="text-[10px] font-bold text-slate-500">Manual (กระดาษ)</p>
                        </div>
                    </div>
                </Card>

                {/* CO by Form Type */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <FileCheck size={18} className="text-blue-500" />
                        <Tooltip text="จำนวน CO จำแนกตามประเภทฟอร์มหนังสือรับรอง" position="right"><span className="cursor-help">CO จำแนกตามฟอร์ม <TorRef section="3.2.1(6)" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { form: 'Form D (ASEAN)', count: 52400, pct: 37, color: 'bg-blue-500' },
                            { form: 'Form E (ACFTA)', count: 35200, pct: 25, color: 'bg-rose-500' },
                            { form: 'Form JTEPA', count: 18500, pct: 13, color: 'bg-amber-500' },
                            { form: 'Form RCEP', count: 11200, pct: 8, color: 'bg-purple-500' },
                            { form: 'Form AK', count: 8900, pct: 6, color: 'bg-emerald-500' },
                            { form: 'อื่นๆ', count: 16308, pct: 11, color: 'bg-slate-300' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`}></div>
                                <span className="text-[11px] font-medium text-slate-600 flex-1">{item.form}</span>
                                <span className="text-[11px] font-bold text-slate-800">{item.count.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400 w-8 text-right">{item.pct}%</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* CO by Issuing Office (TOR 3.2.1-6) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Building2 size={18} className="text-indigo-500" />
                        <Tooltip text="จำนวน CO จำแนกตามหน่วยงานที่ออก — ส่วนกลางและส่วนภูมิภาค" position="right"><span className="cursor-help">CO จำแนกตามหน่วยงาน <TorRef section="3.2.1(6)" /></span></Tooltip>
                    </h3>
                    <div className="space-y-4">
                        {[
                            { office: 'สำนักงานส่วนกลาง กรุงเทพฯ', count: 82450, pct: 57.9, trend: '+8.2%', isUp: true },
                            { office: 'สำนักงานบริการส่งออก สนามบิน', count: 28100, pct: 19.7, trend: '+22.5%', isUp: true },
                            { office: 'สำนักงานภาคตะวันออก (ชลบุรี)', count: 15800, pct: 11.1, trend: '+5.1%', isUp: true },
                            { office: 'สำนักงานภาคใต้ (สงขลา)', count: 9250, pct: 6.5, trend: '-1.8%', isUp: false },
                            { office: 'สำนักงานภาคเหนือ (เชียงใหม่)', count: 6908, pct: 4.8, trend: '+3.4%', isUp: true },
                        ].map((item, i) => (
                            <div key={i} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">{item.office}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{item.count.toLocaleString()} ฉบับ ({item.pct}%)</p>
                                    </div>
                                    <span className={`text-[11px] font-bold flex items-center gap-0.5 ${item.isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                                        {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{item.trend}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Monthly Trend Chart (TOR 3.2.1-7) */}
            <Card className="p-6">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-500" />
                    <Tooltip text="แนวโน้มการออก CO รายเดือน เปรียบเทียบปีปัจจุบันกับปีก่อน" position="right"><span className="cursor-help">CO Issuance Monthly Trend <TorRef section="3.2.1(7)" /></span></Tooltip>
                </h3>
                <div className="h-48 flex items-end justify-between gap-2 px-2 border-b border-l border-slate-100 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                        {[1,2,3,4].map(l => <div key={l} className="border-t border-slate-200 w-full"></div>)}
                    </div>
                    {[
                        { m: 'ม.ค.', prev: 55, curr: 62 },
                        { m: 'ก.พ.', prev: 50, curr: 58 },
                        { m: 'มี.ค.', prev: 60, curr: 70 },
                        { m: 'เม.ย.', prev: 48, curr: 55 },
                        { m: 'พ.ค.', prev: 65, curr: 75 },
                        { m: 'มิ.ย.', prev: 70, curr: 82 },
                        { m: 'ก.ค.', prev: 72, curr: 88 },
                        { m: 'ส.ค.', prev: 68, curr: 85 },
                        { m: 'ก.ย.', prev: 75, curr: 92 },
                        { m: 'ต.ค.', prev: 78, curr: 95 },
                        { m: 'พ.ย.', prev: 72, curr: 0 },
                        { m: 'ธ.ค.', prev: 65, curr: 0 },
                    ].map((d, i) => (
                        <div key={i} className="flex-1 h-full flex items-end gap-0.5 z-10 group">
                            <div className="flex-1 bg-slate-200 rounded-t-sm transition-all group-hover:bg-slate-300" style={{ height: `${d.prev}%` }}></div>
                            {d.curr > 0 && <div className="flex-1 bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600" style={{ height: `${d.curr}%` }}></div>}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 px-1">
                    {['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'].map(m => (
                        <span key={m} className="text-[8px] font-bold text-slate-400 flex-1 text-center">{m}</span>
                    ))}
                </div>
                <div className="mt-4 flex justify-center gap-8">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                        <div className="w-3 h-3 bg-slate-200 rounded-sm"></div> ปี 2566
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> ปี 2567
                    </div>
                </div>
            </Card>

            {/* Top 10 Products + CO Detail Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top 10 Products by CO (TOR 3.3.1-4) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <BarChart3 size={18} className="text-amber-500" />
                        <Tooltip text="10 อันดับสินค้าที่ยื่นขอหนังสือรับรอง CO มากที่สุด" position="right"><span className="cursor-help">Top 10 สินค้ายื่นขอ CO <TorRef section="3.3.1(4)" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { rank: 1, hs: '8703', name: 'รถยนต์นั่ง', co: 18450 },
                            { rank: 2, hs: '8415', name: 'เครื่องปรับอากาศ', co: 12800 },
                            { rank: 3, hs: '4001', name: 'ยางธรรมชาติ', co: 11200 },
                            { rank: 4, hs: '0804', name: 'ผลไม้สด', co: 9800 },
                            { rank: 5, hs: '1604', name: 'ปลาทูน่ากระป๋อง', co: 8500 },
                            { rank: 6, hs: '8471', name: 'คอมพิวเตอร์', co: 7200 },
                            { rank: 7, hs: '3903', name: 'โพลิสไตรีน', co: 6100 },
                            { rank: 8, hs: '0306', name: 'กุ้งแช่แข็ง', co: 5400 },
                            { rank: 9, hs: '7108', name: 'ทองคำ', co: 4800 },
                            { rank: 10, hs: '2710', name: 'น้ำมันปิโตรเลียม', co: 4200 },
                        ].map((item) => (
                            <div key={item.rank} className="flex items-center gap-2.5">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${item.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{item.rank}</span>
                                <span className="text-[10px] font-mono font-bold text-blue-600 w-10">{item.hs}</span>
                                <span className="text-[11px] text-slate-600 flex-1 truncate">{item.name}</span>
                                <span className="text-[11px] font-bold text-slate-800">{item.co.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* CO Issuance Detail Table (Enhanced) */}
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center font-bold text-slate-800">
                        <h3 className="flex items-center gap-2"><ClipboardCheck size={18} /> <Tooltip text="รายละเอียดการออกหนังสือรับรองถิ่นกำเนิดสินค้า" position="bottom"><span className="cursor-help">CO Issuance Detail <TorRef section="3.3.1.5" /></span></Tooltip></h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="ค้นหาเลขอ้างอิง..." className="bg-white border border-slate-100 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500 w-44" />
                            </div>
                            <Badge variant="success">Real-time Sync</Badge>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50/50 border-b text-slate-400 font-bold text-[11px]">
                                <tr>
                                    <th className="p-3 text-left">เลขอ้างอิง</th>
                                    <th className="p-3 text-left">ประเภท</th>
                                    <th className="p-3 text-left">หน่วยงาน</th>
                                    <th className="p-3 text-right">FOB Value</th>
                                    <th className="p-3 text-right">Net Weight</th>
                                    <th className="p-3 text-center">e-CO</th>
                                    <th className="p-3 text-center">Print</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                                {[
                                    { id: 'DFT2024-00142', type: 'Form D', office: 'ส่วนกลาง', val: '$45,200', weight: '1,200 kg', eco: 'Electronic', print: 'Printed (2)' },
                                    { id: 'DFT2024-00143', type: 'Form E', office: 'ส่วนกลาง', val: '$120,450', weight: '8,500 kg', eco: 'Electronic', print: 'Unprinted' },
                                    { id: 'DFT2024-00144', type: 'Form AK', office: 'ชลบุรี', val: '$12,800', weight: '450 kg', eco: 'Manual', print: 'Printed (1)' },
                                    { id: 'DFT2024-00145', type: 'Form RCEP', office: 'ส่วนกลาง', val: '$88,900', weight: '3,200 kg', eco: 'Electronic', print: 'Printed (3)' },
                                    { id: 'DFT2024-00146', type: 'Form JTEPA', office: 'สงขลา', val: '$32,100', weight: '2,100 kg', eco: 'Electronic', print: 'Unprinted' },
                                    { id: 'DFT2024-00147', type: 'Form D', office: 'สนามบิน', val: '$67,500', weight: '4,800 kg', eco: 'Electronic', print: 'Printed (1)' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50">
                                        <td className="p-3 font-mono font-bold text-blue-600 text-xs">{row.id}</td>
                                        <td className="p-3 text-xs font-medium">{row.type}</td>
                                        <td className="p-3 text-xs text-slate-500">{row.office}</td>
                                        <td className="p-3 text-right font-bold text-xs">{row.val}</td>
                                        <td className="p-3 text-right text-xs">{row.weight}</td>
                                        <td className="p-3 text-center"><Badge variant={row.eco === 'Electronic' ? 'success' : 'default'}>{row.eco}</Badge></td>
                                        <td className="p-3 text-center text-[10px] font-bold text-slate-400">{row.print}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
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
                    <p className="text-slate-500 text-sm">การวิเคราะห์ผลลัพธ์เชิงยุทธศาสตร์และศักยภาพสินค้า <TorRef section="15" /></p>
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
                            <Globe size={18} className="text-blue-500" /> <Tooltip text="ติดตามการขยายตลาดหลังมี FTA — เปรียบเทียบก่อนและหลัง" position="bottom"><span className="cursor-help">Market Expansion Tracking (Post-FTA Growth) <TorRef section="15.3" /></span></Tooltip>
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
                            <Lightbulb size={18} className="text-amber-500" /> <Tooltip text="ค้นหาโอกาส — สินค้าศักยภาพสูงที่ใช้สิทธิยังต่ำ" position="bottom"><span className="cursor-help">Opportunity Finder <TorRef section="15.1" /></span></Tooltip>
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
                        <Compass size={20} className="text-indigo-600" /> <Tooltip text="ข้อมูลสนับสนุนนโยบาย — เตรียมข้อมูลสำหรับการเจรจา FTA" position="right"><span className="cursor-help">Policy Support Insight (Negotiation Prep) <TorRef section="15.2" /></span></Tooltip>
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
                        <Flag size={20} className="text-emerald-500" /> <Tooltip text="ติดตามตัวชี้วัดความสำเร็จเชิงยุทธศาสตร์" position="right"><span className="cursor-help">Strategic Success Tracking <TorRef section="14, 15" /></span></Tooltip>
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
                        <h2 className="text-2xl font-black tracking-tight">New Certificate of Origin Request <TorRef section="3.3.1" /></h2>
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

    // Application Detail View
    const ApplicationDetailView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <button onClick={() => setSelectedApp(null)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
                    <ArrowLeft size={18} /> กลับไป Active Pipeline
                </button>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">
                        <Printer size={16} /> พิมพ์
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-200">
                        <Download size={16} /> ดาวน์โหลด PDF
                    </button>
                </div>
            </div>

            {/* Header Card */}
            <Card className="overflow-visible">
                <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <h1 className="text-2xl font-black tracking-tight font-mono">REQ-2024-8842</h1>
                                <Badge variant="info">Verifying</Badge>
                                <Badge variant="success">Low Risk</Badge>
                            </div>
                            <p className="text-blue-300 text-sm font-bold">Thai Agri Export Co., Ltd.</p>
                            <p className="text-blue-400 text-xs mt-1">ความตกลง ASEAN-China (ACFTA) — Form E • ประเทศปลายทาง: จีน</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-blue-300 uppercase font-bold">ยื่นคำขอเมื่อ</p>
                            <p className="text-sm font-bold">19 มี.ค. 2567 — 07:30 น.</p>
                            <p className="text-[10px] text-blue-400 mt-1">2 ชม. ที่แล้ว • SLA เหลือ 1.5 ชม.</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Workflow Progress (TOR 3.3.1) */}
            <Card className="p-6">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Activity size={18} className="text-blue-500" /> สถานะ Workflow <TorRef section="3.3.1" />
                </h3>
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 z-0"></div>
                    <div className="absolute top-6 left-0 w-[37%] h-1 bg-blue-500 z-0 rounded-full"></div>
                    {[
                        { step: 1, label: 'ยื่นคำขอ', sub: '19 มี.ค. 07:30', status: 'done', by: 'ผู้ประกอบการ' },
                        { step: 2, label: 'ตรวจสอบเอกสาร', sub: '19 มี.ค. 07:35', status: 'active', by: 'ระบบ AI + เจ้าหน้าที่' },
                        { step: 3, label: 'อนุมัติ', sub: 'รอดำเนินการ', status: 'pending', by: 'ผอ.กองสิทธิฯ' },
                        { step: 4, label: 'ออก e-CO', sub: 'รอดำเนินการ', status: 'pending', by: 'ระบบอัตโนมัติ' },
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black border-4 ${item.status === 'done' ? 'bg-emerald-500 text-white border-emerald-200' : item.status === 'active' ? 'bg-blue-600 text-white border-blue-200 animate-pulse' : 'bg-white text-slate-400 border-slate-200'}`}>
                                {item.status === 'done' ? <CheckCircle2 size={20} /> : item.step}
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                                <p className="text-[10px] text-slate-400">{item.sub}</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">โดย: {item.by}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Exporter & Agreement Info */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 size={18} className="text-blue-500" /> ข้อมูลผู้ส่งออก <TorRef section="3.3.1" />
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: 'ชื่อบริษัท', val: 'บริษัท ไทย อะกริ เอ็กซ์ปอร์ต จำกัด' },
                            { label: 'Tax ID', val: '0105560001234' },
                            { label: 'ที่อยู่', val: '123 ถ.รัชดาภิเษก แขวงดินแดง กรุงเทพฯ 10400' },
                            { label: 'ผู้ติดต่อ', val: 'นายสมศักดิ์ ว. (081-xxx-xxxx)' },
                            { label: 'สถานะ DBD', val: 'ยืนยันแล้ว ✓' },
                        ].map((item, i) => (
                            <div key={i}>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                                <p className="text-xs font-medium text-slate-700">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Product Details */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-emerald-500" /> รายละเอียดสินค้า <TorRef section="3.3.1" />
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: 'พิกัดศุลกากร (HS Code)', val: '0804.50.20' },
                            { label: 'รายการสินค้า', val: 'มะม่วงสด (Fresh Mangoes)' },
                            { label: 'เกณฑ์ถิ่นกำเนิด (ROO)', val: 'WO (Wholly Obtained)' },
                            { label: 'น้ำหนักสุทธิ', val: '12,500 KG' },
                            { label: 'มูลค่า FOB', val: '$45,200.00 USD' },
                            { label: 'ประเทศปลายทาง', val: 'จีน (China)' },
                            { label: 'ท่าเรือปลายทาง', val: 'Shanghai Port' },
                        ].map((item, i) => (
                            <div key={i}>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                                <p className="text-xs font-medium text-slate-700">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Smart Verification Status */}
                <Card className="p-6 border-t-4 border-t-blue-500">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldQuestion size={18} className="text-blue-500" /> ผลการตรวจสอบ <TorRef section="3.3.1.4" />
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: 'ทะเบียนนิติบุคคล (DBD)', status: 'pass', time: '07:31' },
                            { label: 'กฎถิ่นกำเนิด (ROO)', status: 'pass', time: '07:32' },
                            { label: 'HS Code vs Eligible List', status: 'pass', time: '07:32' },
                            { label: 'Blacklist / Watchlist', status: 'pass', time: '07:33' },
                            { label: 'AI Fraud Detection', status: 'pass', time: '07:33' },
                            { label: 'เอกสารแนบ', status: 'warning', time: '07:35' },
                        ].map((check, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                                <div className="flex items-center gap-2">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${check.status === 'pass' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                        {check.status === 'pass' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700">{check.label}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">{check.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-1">
                            <BrainCircuit size={16} className="text-emerald-600" />
                            <span className="text-xs font-bold text-emerald-800">AI Confidence: 96.4%</span>
                        </div>
                        <p className="text-[10px] text-emerald-600">ไม่พบความผิดปกติ — สอดคล้องกับพฤติกรรมการส่งออกเดิมของบริษัท</p>
                    </div>
                </Card>
            </div>

            {/* Documents + Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Attached Documents */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText size={18} className="text-indigo-500" /> เอกสารแนบ <TorRef section="3.3.1" />
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Commercial Invoice #INV-2024-0842.pdf', size: '245 KB', status: 'ตรวจสอบแล้ว', pass: true },
                            { name: 'Packing List #PL-2024-0842.pdf', size: '128 KB', status: 'ตรวจสอบแล้ว', pass: true },
                            { name: 'Bill of Lading (B/L)', size: '-', status: 'ยังไม่ได้แนบ (ไม่บังคับ)', pass: false },
                            { name: 'Origin Declaration.pdf', size: '89 KB', status: 'ตรวจสอบแล้ว', pass: true },
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${doc.pass ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}><FileText size={16} /></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">{doc.name}</p>
                                        <p className="text-[10px] text-slate-400">{doc.size}</p>
                                    </div>
                                </div>
                                <Badge variant={doc.pass ? 'success' : 'warning'}>{doc.status}</Badge>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Activity Timeline */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <History size={18} className="text-rose-500" /> ประวัติการดำเนินการ <TorRef section="2.8" />
                    </h3>
                    <div className="relative border-l-2 border-slate-100 ml-3 space-y-0">
                        {[
                            { time: '07:35', date: '19 มี.ค.', action: 'ตรวจสอบเอกสาร — B/L ไม่ได้แนบ (Optional)', user: 'ระบบ AI', type: 'warning' },
                            { time: '07:33', date: '19 มี.ค.', action: 'AI Fraud Detection — ผ่าน (Confidence 96.4%)', user: 'ระบบ AI', type: 'success' },
                            { time: '07:33', date: '19 มี.ค.', action: 'ตรวจสอบ Blacklist/Watchlist — ไม่พบ', user: 'ระบบอัตโนมัติ', type: 'success' },
                            { time: '07:32', date: '19 มี.ค.', action: 'ตรวจสอบ HS 0804.50.20 กับ Eligible List — ผ่าน', user: 'ระบบอัตโนมัติ', type: 'success' },
                            { time: '07:32', date: '19 มี.ค.', action: 'ตรวจสอบกฎ ROO (WO) ภายใต้ ACFTA — ผ่าน', user: 'ระบบ AI', type: 'success' },
                            { time: '07:31', date: '19 มี.ค.', action: 'ตรวจสอบทะเบียนนิติบุคคล DBD — ยืนยัน TAX ID ผ่าน', user: 'DBD API', type: 'info' },
                            { time: '07:30', date: '19 มี.ค.', action: 'ยื่นคำขอหนังสือรับรอง Form E (ACFTA) → จีน', user: 'Thai Agri Export Co.', type: 'default' },
                        ].map((log, i) => (
                            <div key={i} className="relative pl-7 py-2.5">
                                <div className={`absolute left-[-5px] top-3.5 w-2.5 h-2.5 rounded-full border-2 border-white ${log.type === 'success' ? 'bg-emerald-500' : log.type === 'info' ? 'bg-blue-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-700">{log.action}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">โดย: {log.user}</p>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 ml-2">{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Action Buttons */}
            <Card className="p-6 bg-slate-50">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                        <span className="font-bold text-slate-700">สถานะปัจจุบัน:</span> อยู่ระหว่างขั้นตอนตรวจสอบ (Step 2/4) — รอเจ้าหน้าที่ยืนยันเอกสาร
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-100 text-rose-700 rounded-xl text-sm font-bold hover:bg-rose-200 transition-all">
                            <X size={16} /> ปฏิเสธ
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-amber-100 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-200 transition-all">
                            <RefreshCw size={16} /> ส่งกลับแก้ไข
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                            <CheckCircle2 size={16} /> อนุมัติ
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );

    const ServicesView = () => (
        <div className="space-y-6">
            {selectedApp ? (
                <ApplicationDetailView />
            ) : isCreatingApp ? (
                <ApplicationFormView />
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                                <ClipboardCheck className="text-blue-600" size={32} /> Service Hub: End-to-End Workflow
                            </h1>
                            <p className="text-slate-500 text-sm">การให้บริการครบวงจร: ยื่นคำขอ {'→'} ตรวจสอบ {'→'} อนุมัติ {'→'} ออกเอกสาร e-CO <TorRef section="3.3.1" /></p>
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
                                <h3 className="flex items-center gap-2"><Activity size={18} className="text-blue-500" /> <Tooltip text="รายการคำขอที่อยู่ระหว่างดำเนินการ — คลิกเพื่อดูรายละเอียด" position="bottom"><span className="cursor-help">Active Applications Pipeline <TorRef section="3.3.1" /></span></Tooltip></h3>
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
                                            <button onClick={() => req.ref === 'REQ-2024-8842' && setSelectedApp(req.ref)} className="p-2 hover:bg-white hover:shadow-md border rounded-xl transition-all"><ChevronRight size={18} className="text-slate-300" /></button>
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
                                    <Tooltip text="รายการตรวจสอบอัตโนมัติก่อนอนุมัติ — ระบบตรวจสอบ ROO, HS Code, ทะเบียนบริษัท" position="bottom"><span className="cursor-help">Smart Verification Checklist <TorRef section="3.3.1.4" /></span></Tooltip>
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
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Printer size={18} className="text-blue-500" /> <Tooltip text="ศูนย์ออกหนังสือรับรองอิเล็กทรอนิกส์ (e-CO) — ดาวน์โหลดและตรวจสอบ CO ที่ออกล่าสุด" position="right"><span className="cursor-help">e-Issuance Center <TorRef section="3.3.1.5" /></span></Tooltip></h3>
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
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><History size={18} className="text-indigo-500" /> ประวัติการดำเนินการล่าสุด <TorRef section="2.8" /></h3>
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
                    <p className="text-slate-500 text-sm">ศูนย์ช่วยเหลือ คู่มือการใช้งาน และการติดตาม SLA <TorRef section="2.11, 7.3, 7.4, 11.5" /></p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-200">
                    <HelpCircle size={18} /> แจ้งปัญหาการใช้งาน (Helpdesk)
                </button>
            </div>

            {/* Support KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Tickets เดือนนี้', val: '24', sub: '18 แก้ไขแล้ว, 6 รอดำเนินการ', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { title: 'เวลาตอบสนองเฉลี่ย', val: '12 นาที', sub: 'เป้าหมาย SLA ≤ 60 นาที', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { title: 'ความพึงพอใจผู้ใช้', val: '4.6/5.0', sub: 'จากแบบสอบถาม 120 ราย', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { title: 'คู่มือ / สื่อการสอน', val: '12 รายการ', sub: '6 e-Book, 4 Video, 2 FAQ', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((kpi, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}><kpi.icon size={16} /></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{kpi.val}</h3>
                        <p className="text-[10px] text-slate-500 mt-1">{kpi.sub}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Health & SLA */}
                <Card className="p-6 border-t-4 border-t-emerald-500">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Zap size={18} className="text-emerald-500" /> <Tooltip text="สถานะระบบและข้อตกลงระดับบริการ" position="right"><span className="cursor-help">System Health & SLA <TorRef section="11.5" /></span></Tooltip>
                    </h3>
                    <div className="space-y-4">
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
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock size={14} className="text-blue-500" />
                                <span className="text-[11px] font-bold text-slate-700">Maintenance Window</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed">รอบถัดไป: 15 เม.ย. 2567 (02:00 - 04:00 น.)</p>
                        </div>
                    </div>
                </Card>

                {/* SLA Severity Table (TOR 11.5) */}
                <Card className="lg:col-span-2 p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <Tooltip text="ข้อตกลงระดับบริการจำแนกตามระดับความรุนแรง (SLA)" position="right"><span className="cursor-help">SLA Severity Levels <TorRef section="11.5" /></span></Tooltip>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px]">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                                    <th className="p-3 text-left">ระดับความรุนแรง</th>
                                    <th className="p-3 text-left">สถานการณ์</th>
                                    <th className="p-3 text-left">ช่องทางบริการ</th>
                                    <th className="p-3 text-center">ตอบสนอง</th>
                                    <th className="p-3 text-center">แก้ไข</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="p-3"><Badge variant="danger">ระดับ 1: สูง</Badge></td>
                                    <td className="p-3 text-slate-600">ระบบฐานข้อมูลหรือแอปพลิเคชันไม่สามารถใช้งานได้ตามปกติ</td>
                                    <td className="p-3 text-slate-600">On-site / Remote Access</td>
                                    <td className="p-3 text-center font-bold text-rose-600">≤ 1 ชม.</td>
                                    <td className="p-3 text-center font-bold text-rose-600">≤ 3 ชม.</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-3"><Badge variant="warning">ระดับ 2: ต่ำ</Badge></td>
                                    <td className="p-3 text-slate-600">คำแนะนำการใช้งาน ตรวจสอบประสิทธิภาพ โดยระบบยังใช้งานได้ปกติ</td>
                                    <td className="p-3 text-slate-600">ประสานงานกรมฯ / นอกสถานที่</td>
                                    <td className="p-3 text-center font-bold text-amber-600">ตอบสนอง</td>
                                    <td className="p-3 text-center font-bold text-amber-600">≤ 24 ชม.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 italic">* ผู้รับจ้างต้องจัดบุคลากรมาประจำสัปดาห์ละ 1 วัน เป็นเวลา 3 ปี (TOR 11.6)</p>
                </Card>
            </div>

            {/* Training + FAQ + Helpdesk */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Training Workshop (TOR 7.4) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Users size={18} className="text-purple-500" />
                        <Tooltip text="หลักสูตรฝึกอบรมเชิงปฏิบัติการ 5 หลักสูตร ตามที่กำหนดใน TOR" position="right"><span className="cursor-help">Training Workshop <TorRef section="7.4" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { course: 'หลักสูตรผู้บริหารและเจ้าหน้าที่กรมฯ', sessions: '2 ครั้ง × 6 ชม.', participants: '≥ 15 คน/ครั้ง' },
                            { course: 'หลักสูตรผู้ดูแลระบบ ศูนย์ IT', sessions: '1 ครั้ง × 6 ชม.', participants: '≥ 5 คน' },
                            { course: 'หลักสูตรกองสิทธิประโยชน์ทางการค้า', sessions: '1 ครั้ง × 6 ชม.', participants: '≥ 5 คน' },
                            { course: 'หลักสูตรธรรมาภิบาลข้อมูล', sessions: '2 ครั้ง × 6 ชม.', participants: '≥ 15 คน/ครั้ง' },
                            { course: 'หลักสูตรพัฒนาทักษะดิจิทัล', sessions: '1 ครั้ง × 6 ชม.', participants: '≥ 15 คน' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                                <p className="text-xs font-bold text-slate-700">{item.course}</p>
                                <div className="flex gap-3 mt-1 text-[10px] text-slate-400">
                                    <span>{item.sessions}</span>
                                    <span>{item.participants}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Training Materials & Manuals (TOR 7.3, 2.11) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <BookOpen size={18} className="text-blue-500" />
                        <Tooltip text="คู่มือการใช้งานและสื่อการเรียนรู้ในรูปแบบ e-Book และ Video" position="right"><span className="cursor-help">Training Materials <TorRef section="7.3, 2.11" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { title: 'คู่มือผู้ใช้งาน (Front Office)', type: 'e-Book', icon: <FileText size={16} className="text-blue-500" />, size: '4.5 MB' },
                            { title: 'คู่มือผู้ดูแลระบบ (Back Office)', type: 'e-Book', icon: <Settings size={16} className="text-slate-500" />, size: '8.2 MB' },
                            { title: 'การใช้งาน Dashboard เบื้องต้น', type: 'Video', icon: <PlayCircle size={16} className="text-rose-500" />, size: '12:45' },
                            { title: 'การบริหาร Data Catalog', type: 'Video', icon: <PlayCircle size={16} className="text-rose-500" />, size: '08:20' },
                            { title: 'การยื่นคำขอ CO ออนไลน์', type: 'Video', icon: <PlayCircle size={16} className="text-rose-500" />, size: '15:30' },
                            { title: 'การใช้งาน Multi-Criteria Search', type: 'Video', icon: <PlayCircle size={16} className="text-rose-500" />, size: '06:10' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                                {item.icon}
                                <div className="flex-1">
                                    <p className="text-[11px] font-bold text-slate-700">{item.title}</p>
                                    <p className="text-[10px] text-slate-400">{item.type} • {item.size}</p>
                                </div>
                                <Download size={14} className="text-slate-300" />
                            </div>
                        ))}
                    </div>
                </Card>

                {/* FAQ (TOR 2.11) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <HelpCircle size={18} className="text-amber-500" />
                        <Tooltip text="คำถามที่พบบ่อยเกี่ยวกับการใช้งานระบบ FTA-GSP" position="right"><span className="cursor-help">FAQ / คำถามที่พบบ่อย <TorRef section="2.11" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { q: 'วิธียื่นคำขอหนังสือรับรอง CO ออนไลน์?', category: 'Service Portal' },
                            { q: 'ขั้นตอนการค้นหาข้อมูล Multi-Criteria Search?', category: 'Dashboard' },
                            { q: 'วิธีดาวน์โหลดรายงาน Excel / PDF?', category: 'Reports' },
                            { q: 'วิธีตรวจสอบสถานะคำขอ CO?', category: 'Operations' },
                            { q: 'การใช้งาน AI HS Classifier?', category: 'AI Intelligence' },
                            { q: 'วิธีเปลี่ยนรหัสผ่านและตั้งค่าบัญชี?', category: 'Admin' },
                            { q: 'ต้องการเชื่อมต่อ Open Data API?', category: 'Governance' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                                <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 mt-0.5 shrink-0 transition-colors" />
                                <div>
                                    <p className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.q}</p>
                                    <p className="text-[10px] text-slate-400">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Helpdesk Queue + Contact */}
            <Card className="p-6">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare size={18} className="text-blue-500" />
                        <Tooltip text="รายการ Ticket ที่แจ้งปัญหาและสถานะการดำเนินการ" position="right"><span className="cursor-help">Helpdesk Ticket Queue <TorRef section="11.5" /></span></Tooltip>
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                                <th className="p-3 text-left">Ticket #</th>
                                <th className="p-3 text-left">ปัญหา</th>
                                <th className="p-3 text-left">ผู้แจ้ง</th>
                                <th className="p-3 text-center">ระดับ</th>
                                <th className="p-3 text-center">สถานะ</th>
                                <th className="p-3 text-center">เวลาที่ใช้</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { id: 'TK-2567-042', issue: 'ไม่สามารถ Export รายงาน PDF ได้', user: 'กองสิทธิฯ', level: 'สูง', status: 'กำลังแก้ไข', time: '45 นาที' },
                                { id: 'TK-2567-041', issue: 'Dashboard แสดงข้อมูลช้า', user: 'ผู้บริหาร', level: 'ต่ำ', status: 'แก้ไขแล้ว', time: '2 ชม.' },
                                { id: 'TK-2567-040', issue: 'ลืมรหัสผ่าน ล็อกอินไม่ได้', user: 'เจ้าหน้าที่', level: 'ต่ำ', status: 'แก้ไขแล้ว', time: '15 นาที' },
                                { id: 'TK-2567-039', issue: 'ข้อมูล HS Code ไม่อัปเดต', user: 'ศูนย์ IT', level: 'ต่ำ', status: 'รอดำเนินการ', time: '-' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-3 font-mono font-bold text-blue-600">{row.id}</td>
                                    <td className="p-3 font-medium text-slate-700">{row.issue}</td>
                                    <td className="p-3 text-slate-500">{row.user}</td>
                                    <td className="p-3 text-center"><Badge variant={row.level === 'สูง' ? 'danger' : 'warning'}>{row.level}</Badge></td>
                                    <td className="p-3 text-center"><Badge variant={row.status === 'แก้ไขแล้ว' ? 'success' : row.status === 'กำลังแก้ไข' ? 'info' : 'default'}>{row.status}</Badge></td>
                                    <td className="p-3 text-center font-bold text-slate-500">{row.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm"><HelpCircle size={20} className="text-blue-600" /></div>
                        <p className="text-xs font-bold text-blue-900">ต้องการความช่วยเหลือเพิ่มเติม? ติดต่อศูนย์ไอที โทร. 1234 หรือ Line: @DFT_Support</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white font-bold text-[10px] rounded-xl shadow-lg">Chat Live</button>
                </div>
            </Card>

            {/* System Specifications & Business Continuity (TOR 2.1-2.7, 7.5) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Server size={18} className="text-blue-500" />
                        <Tooltip text="ข้อกำหนดคุณลักษณะทั่วไปของระบบตาม TOR ข้อ 2" position="right"><span className="cursor-help">คุณลักษณะทั่วไประบบ <TorRef section="2.1-2.7" /></span></Tooltip>
                    </h3>
                    <div className="space-y-2.5">
                        {[
                            { spec: 'Cloud Deployment — ใช้งานต่อเนื่อง 3 ปี', ref: '2.1', pass: true },
                            { spec: 'Responsive Web — Chrome, Firefox, Edge, Mobile, Tablet', ref: '2.2', pass: true },
                            { spec: 'Export ข้อมูล — PDF, XLSX, DOCX, CSV', ref: '2.3', pass: true },
                            { spec: 'Multimedia — กราฟ, แผนภูมิ, อินโฟกราฟิก, Animation', ref: '2.4', pass: true },
                            { spec: 'Multi-Criteria Search — ค้นหาหลายเงื่อนไข', ref: '2.5', pass: true },
                            { spec: 'Modern UI — สวยงาม ใช้งานง่าย ทันสมัย', ref: '2.6', pass: true },
                            { spec: 'Data Retention — เก็บข้อมูลย้อนหลัง ≥ 10 ปี', ref: '2.7', pass: true },
                            { spec: 'Data Correction — แก้ไข/ปรับปรุงข้อมูลได้', ref: '2.8', pass: true },
                            { spec: 'User Statistics — นับจำนวนผู้เข้าใช้งาน', ref: '2.9', pass: true },
                            { spec: 'API/SSL — เชื่อมโยงข้อมูลผ่าน Secure Protocol', ref: '2.10', pass: true },
                            { spec: 'Tool Tips — แสดงคำอธิบายช่วยเหลือ', ref: '2.11', pass: true },
                            { spec: 'RBAC — กำหนดสิทธิ์ 3+ กลุ่มผู้ใช้', ref: '2.12', pass: true },
                            { spec: 'AD Login — เชื่อมต่อ Active Directory', ref: '2.13', pass: true },
                            { spec: 'PDPA — รักษาข้อมูลส่วนบุคคล', ref: '2.14', pass: true },
                            { spec: 'OWASP Top 10 — ความปลอดภัยมาตรฐาน', ref: '2.15', pass: true },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px]">
                                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle2 size={10} /></div>
                                <span className="font-medium text-slate-600 flex-1">{item.spec}</span>
                                <TorRef section={item.ref} />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <HardDrive size={18} className="text-amber-500" />
                        <Tooltip text="แผนความต่อเนื่องของระบบและแผนการย้ายระบบ Cloud" position="right"><span className="cursor-help">Business Continuity & Cloud Exit Plan <TorRef section="7.5" /></span></Tooltip>
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                            <h4 className="text-xs font-bold text-amber-800 mb-2">แผนความต่อเนื่องของระบบ</h4>
                            <div className="space-y-2 text-[11px] text-amber-700">
                                <p>• กรณีสัญญา Cloud สิ้นสุด — สามารถต่ออายุหรือย้ายไปยังผู้ให้บริการรายอื่น</p>
                                <p>• กรณีย้ายไปยัง Server/โครงสร้างพื้นฐาน กรมฯ กำหนด</p>
                                <p>• กรณีเหตุฉุกเฉิน — ไฟไหม้ แผ่นดินไหว น้ำท่วม ภัยพิบัติอื่นๆ</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[
                                { item: 'Disaster Recovery Plan', desc: 'แผนกู้คืนระบบกรณีเหตุฉุกเฉิน — RPO ≤ 24 ชม., RTO ≤ 4 ชม.', pass: true },
                                { item: 'Cloud Exit Strategy', desc: 'ขั้นตอนการย้ายข้อมูลและระบบออกจาก Cloud', pass: true },
                                { item: 'Data Migration Plan', desc: 'แผนการโอนย้ายข้อมูลทั้งหมดไปยังระบบใหม่', pass: true },
                                { item: 'Source Code Handover', desc: 'ส่งมอบ Source Code ฉบับสมบูรณ์ให้กรมฯ', pass: true },
                                { item: 'Warranty 3 Years', desc: 'รับประกันการบำรุงรักษา On-site 3 ปี', pass: true },
                            ].map((check, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle2 size={10} /></div>
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-700">{check.item}</p>
                                        <p className="text-[10px] text-slate-400">{check.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-[10px] text-slate-500">
                                <span className="font-bold text-slate-700">ระยะเวลาโครงการ <TorRef section="8" /></span><br />
                                ปีงบประมาณ พ.ศ. 2569 (270 วัน นับถัดจากวันลงนามในสัญญา) แบ่งส่งมอบ 4 งวด
                            </p>
                        </div>
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
                    <p className="text-slate-500 text-sm">จัดการการนำเข้าข้อมูลและการเชื่อมโยง API <TorRef section="3.1" /></p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200">
                    <RefreshCw size={18} /> Sync All Data Source <TorRef section="3.1.3.1, 3.1.4" />
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
                    <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 flex items-center gap-2"><DatabaseZap size={18} className="text-amber-500" /> <Tooltip text="บันทึกการทำความสะอาดและแปลงข้อมูล" position="bottom"><span className="cursor-help">Data Cleansing & Transformation Log <TorRef section="3.1.3.3" /></span></Tooltip></div>
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
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-300"><HardDrive size={20} /> <Tooltip text="คลังข้อมูล — โครงสร้างฐานข้อมูลสำหรับวิเคราะห์สถิติย้อนหลัง" position="bottom"><span className="cursor-help">Data Warehouse <TorRef section="3.4" /></span></Tooltip></h3>
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
                    <h3 className="font-bold text-slate-800">การนำเข้าไฟล์ข้อมูลแบบ Manual (Bulk Upload) <TorRef section="3.1.3.2" /></h3>
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
                    <p className="text-slate-500 text-sm">การประยุกต์ใช้เทคโนโลยีปัญญาประดิษฐ์เพื่อการวิเคราะห์ข้อมูลเชิงรุก <TorRef section="12.3.3.5" /></p>
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
                            <TrendingUp size={20} className="text-purple-500" /> <Tooltip text="พยากรณ์มูลค่าส่งออกและอัตราการใช้สิทธิล่วงหน้า 6 เดือน" position="bottom"><span className="cursor-help">Export & Utilization Prediction (Next 6 Months) <TorRef section="12.3.3" /></span></Tooltip>
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
                        <AlertTriangle size={20} className="text-amber-500" /> Smart Anomaly Detection <TorRef section="12.3.3" />
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
                        <Target size={20} className="text-indigo-500" /> Smart HS Classifier (Auto Suggestion) <TorRef section="12.3.3" />
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
                        <MessageSquare size={20} /> AI Trade Policy Assistant <TorRef section="12.3.3.5" />
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
                    <p className="text-slate-500 text-sm">วิเคราะห์ข้อมูลการค้าระหว่างประเทศเชิงลึกแบบกำหนดเงื่อนไข <TorRef section="3.2.1" /></p>
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
                        <Tooltip text="เปรียบเทียบแนวโน้มอัตราการใช้สิทธิ 3 ปีย้อนหลัง (TOR 3.2.1 Comparative)" position="right"><span className="cursor-help">Comparative Analysis: แนวโน้ม 3 ปี <TorRef section="3.2.1" /></span></Tooltip>
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
                        <Tooltip text="เจาะลึกข้อมูลตามพิกัดศุลกากร — แสดงรายละเอียดสินค้าย่อย" position="right"><span className="cursor-help">HS Code Drill-down <TorRef section="3.2.1(5)" /></span></Tooltip>
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
                        <Tooltip text="สินค้าที่มีมูลค่าส่งออกสูงแต่อัตราใช้สิทธิยังต่ำ — โอกาสเพิ่มการใช้สิทธิ" position="right"><span className="cursor-help">Utilization Gap Analysis — สินค้าที่ควรเร่งส่งเสริม <TorRef section="3.2.1" /></span></Tooltip>
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
                    <p className="text-slate-500 text-sm">การกำกับดูแลข้อมูลและบัญชีข้อมูลภาครัฐ <TorRef section="3.5" /></p>
                </div>
            </div>

            {/* Governance Readiness Overview KPIs (TOR 3.5.9) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Governance Readiness', val: '82%', sub: 'ประเมินความพร้อมการกำกับดูแล', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', pct: 82 },
                    { title: 'Data Quality Score', val: '95%', sub: 'คะแนนคุณภาพข้อมูลรวม', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', pct: 95 },
                    { title: 'Security Assessment', val: '88%', sub: 'ระดับความปลอดภัยข้อมูล', icon: Lock, color: 'text-indigo-600', bg: 'bg-indigo-50', pct: 88 },
                    { title: 'Risk Assessment', val: 'ต่ำ', sub: 'ความเสี่ยงภาพรวม: 2 จาก 5', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', pct: 40 },
                ].map((kpi, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}><kpi.icon size={16} /></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{kpi.val}</h3>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                            <div className={`h-full rounded-full ${kpi.pct >= 90 ? 'bg-emerald-500' : kpi.pct >= 70 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${kpi.pct}%` }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1.5">{kpi.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Data Classification & Category (TOR 3.5.2, 3.5.3) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Shield size={18} className="text-indigo-500" />
                        <Tooltip text="จัดระดับชั้นข้อมูลตามมาตรฐาน สพร. (TOR 3.5.3)" position="right"><span className="cursor-help">Data Classification Level <TorRef section="3.5.3" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { level: 'Open (เปิดเผย)', count: 8, desc: 'ข้อมูลสาธารณะ เปิดเผยได้ทั่วไป', color: 'bg-emerald-500', pct: 32 },
                            { level: 'Public (สาธารณะ)', count: 6, desc: 'เผยแพร่ภายในองค์กร/หน่วยงานรัฐ', color: 'bg-blue-500', pct: 24 },
                            { level: 'Internal (ใช้ภายใน)', count: 5, desc: 'เผยแพร่เมื่อได้รับอนุญาต', color: 'bg-amber-500', pct: 20 },
                            { level: 'Confidential (ลับ)', count: 4, desc: 'ข้อมูลส่วนบุคคล / PDPA', color: 'bg-rose-500', pct: 16 },
                            { level: 'Secret (ลับมาก)', count: 2, desc: 'ข้อมูลความมั่นคงทางการค้า', color: 'bg-slate-800', pct: 8 },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`}></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-slate-700">{item.level}</span>
                                        <span className="text-[11px] font-black text-slate-900">{item.count} ชุดข้อมูล</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Layers size={18} className="text-purple-500" />
                        <Tooltip text="จัดหมวดหมู่ข้อมูล 5 หมวด ตามแนวทาง สพร. (TOR 3.5.2)" position="right"><span className="cursor-help">Data Category (หมวดหมู่ข้อมูล) <TorRef section="3.5.2" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { cat: 'ข้อมูลสาธารณะ', desc: 'สถิติ FTA/GSP, Eligible List, TRS Schedule', count: 12, color: 'border-emerald-500 bg-emerald-50' },
                            { cat: 'ข้อมูลส่วนบุคคล', desc: 'ข้อมูลผู้ประกอบการ, PDPA Consent', count: 3, color: 'border-rose-500 bg-rose-50' },
                            { cat: 'ข้อมูลลับทางราชการ', desc: 'ท่าทีเจรจา FTA, กลยุทธ์การค้า', count: 2, color: 'border-slate-700 bg-slate-50' },
                            { cat: 'ข้อมูลใช้ภายใน', desc: 'Audit Log, ข้อมูลเจ้าหน้าที่, Workflow', count: 5, color: 'border-blue-500 bg-blue-50' },
                            { cat: 'ข้อมูลความมั่นคง', desc: 'Blacklist, Watchlist, Fraud Detection', count: 3, color: 'border-amber-500 bg-amber-50' },
                        ].map((item, i) => (
                            <div key={i} className={`p-3 border-l-4 rounded-r-xl ${item.color}`}>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-800">{item.cat}</span>
                                    <Badge variant="default">{item.count} ชุดข้อมูล</Badge>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Data Catalog + Quality (existing, enhanced) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileJson size={18} /> <Tooltip text="สำรวจบัญชีข้อมูล — ค้นหาและดูรายละเอียดชุดข้อมูลทั้งหมด" position="bottom"><span className="cursor-help">Data Catalog Explorer <TorRef section="3.5.4" /></span></Tooltip></h3>
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
                                { name: 'TB_ELIGIBLE_LIST', desc: 'รายการสินค้าที่ได้รับสิทธิ FTA/GSP พร้อมอัตราภาษี', owner: 'กองสิทธิฯ', level: 'Public', rows: '85K' },
                                { name: 'TB_TRS_SCHEDULE', desc: 'ตารางการลดภาษี (Tariff Reduction Schedule) รายความตกลง', owner: 'กองสิทธิฯ', level: 'Public', rows: '320K' },
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
                    {/* Data Quality Assessment (TOR 3.5.9.2) */}
                    <Card className="p-5">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-blue-500" /> <Tooltip text="ประเมินคุณภาพข้อมูล — ความถูกต้อง ความสมบูรณ์ และความทันสมัย (TOR 3.5.9.2)" position="bottom"><span className="cursor-help">Data Quality Assessment <TorRef section="3.5.9.2" /></span></Tooltip></h3>
                        <div className="space-y-3">
                            {[
                                { label: 'ความถูกต้อง (Accuracy)', pct: 98 },
                                { label: 'ความสมบูรณ์ (Completeness)', pct: 95 },
                                { label: 'ความทันสมัย (Timeliness)', pct: 92 },
                                { label: 'ความสอดคล้อง (Consistency)', pct: 89 },
                                { label: 'ความพร้อมใช้ (Availability)', pct: 99 },
                            ].map((q, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span className="text-slate-600">{q.label}</span>
                                        <span className={q.pct >= 95 ? 'text-emerald-600' : q.pct >= 90 ? 'text-blue-600' : 'text-amber-600'}>{q.pct}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${q.pct >= 95 ? 'bg-emerald-500' : q.pct >= 90 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${q.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Metadata Standard */}
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

            {/* RASCI Matrix + Open Data API + Data Flow (TOR 3.5.7, 3.5.8, 3.5.1) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* RASCI Matrix (TOR 3.5.7) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Users size={18} className="text-blue-500" />
                        <Tooltip text="แบบจำลอง RASCI กำหนดบทบาทหน้าที่ผู้รับผิดชอบข้อมูล (TOR 3.5.7)" position="right"><span className="cursor-help">RASCI Matrix <TorRef section="3.5.7" /></span></Tooltip>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 font-bold uppercase">
                                    <th className="p-2 text-left">กระบวนงาน</th>
                                    <th className="p-2 text-center">กองสิทธิฯ</th>
                                    <th className="p-2 text-center">ศูนย์ IT</th>
                                    <th className="p-2 text-center">ผู้บริหาร</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { process: 'นำเข้าข้อมูล', r1: 'R', r2: 'S', r3: 'I' },
                                    { process: 'ตรวจสอบคุณภาพ', r1: 'A', r2: 'R', r3: 'I' },
                                    { process: 'จัดชั้นความลับ', r1: 'C', r2: 'R', r3: 'A' },
                                    { process: 'เผยแพร่ข้อมูล', r1: 'R', r2: 'S', r3: 'A' },
                                    { process: 'บำรุงรักษา DW', r1: 'I', r2: 'R', r3: 'C' },
                                    { process: 'จัดทำ Metadata', r1: 'R', r2: 'A', r3: 'I' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50">
                                        <td className="p-2 font-bold text-slate-700">{row.process}</td>
                                        {[row.r1, row.r2, row.r3].map((v, j) => (
                                            <td key={j} className="p-2 text-center">
                                                <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center font-black text-[9px] ${v === 'R' ? 'bg-blue-100 text-blue-700' : v === 'A' ? 'bg-emerald-100 text-emerald-700' : v === 'S' ? 'bg-amber-100 text-amber-700' : v === 'C' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-400'}`}>{v}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {[{ l: 'R', c: 'bg-blue-100 text-blue-700', n: 'Responsible' },{ l: 'A', c: 'bg-emerald-100 text-emerald-700', n: 'Accountable' },{ l: 'S', c: 'bg-amber-100 text-amber-700', n: 'Support' },{ l: 'C', c: 'bg-purple-100 text-purple-700', n: 'Consulted' },{ l: 'I', c: 'bg-slate-100 text-slate-400', n: 'Informed' }].map(item => (
                            <span key={item.l} className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${item.c}`}>{item.l} = {item.n}</span>
                        ))}
                    </div>
                </Card>

                {/* Open Data API (TOR 3.5.8) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Globe size={18} className="text-emerald-500" />
                        <Tooltip text="API สำหรับชุดข้อมูลสาธารณะ (Open Data) เพื่อเชื่อมต่อกับระบบภายนอก (TOR 3.5.8)" position="right"><span className="cursor-help">Open Data API <TorRef section="3.5.8" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { method: 'GET', path: '/api/v1/utilization', desc: 'สถิติการใช้สิทธิ FTA/GSP', status: 'Active' },
                            { method: 'GET', path: '/api/v1/hs-codes', desc: 'รายการพิกัดศุลกากร', status: 'Active' },
                            { method: 'GET', path: '/api/v1/eligible-list', desc: 'Eligible List รายความตกลง', status: 'Active' },
                            { method: 'GET', path: '/api/v1/trs-schedule', desc: 'ตาราง TRS ลดภาษี', status: 'Active' },
                            { method: 'GET', path: '/api/v1/co-statistics', desc: 'สถิติการออก CO', status: 'Beta' },
                        ].map((api, i) => (
                            <div key={i} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">{api.method}</span>
                                    <code className="text-[11px] font-mono font-bold text-slate-700">{api.path}</code>
                                    <Badge variant={api.status === 'Active' ? 'success' : 'purple'}>{api.status}</Badge>
                                </div>
                                <p className="text-[10px] text-slate-400">{api.desc}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Data Flow Overview (TOR 3.5.1) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Activity size={18} className="text-indigo-500" />
                        <Tooltip text="แผนภาพการไหลของข้อมูล แสดงการเชื่อมโยงจากต้นทางถึงปลายทาง (TOR 3.5.1)" position="left"><span className="cursor-help">Data Flow Overview <TorRef section="3.5.1" /></span></Tooltip>
                    </h3>
                    <div className="space-y-2">
                        {[
                            { from: 'SMART-I / ROVERS', to: 'ETL Pipeline', arrow: true },
                            { from: 'ETL Pipeline', to: 'Data Warehouse', arrow: true },
                            { from: 'Data Warehouse', to: 'Analytics Engine', arrow: true },
                            { from: 'Analytics Engine', to: 'Dashboard / Reports', arrow: true },
                            { from: 'Dashboard / Reports', to: 'ผู้ใช้งาน / Open API', arrow: false },
                        ].map((step, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                                    <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</div>
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className="text-[11px] font-bold text-slate-700">{step.from}</span>
                                        <ChevronRight size={14} className="text-indigo-400 shrink-0" />
                                        <span className="text-[11px] font-bold text-indigo-600">{step.to}</span>
                                    </div>
                                </div>
                                {step.arrow && <div className="flex justify-center"><div className="w-0.5 h-2 bg-slate-200"></div></div>}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Security & Risk Detail (TOR 3.5.9.3, 3.5.9.4) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 border-t-4 border-t-indigo-500">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Lock size={18} className="text-indigo-500" />
                        <Tooltip text="ประเมินความมั่นคงปลอดภัยข้อมูลตามมาตรฐาน (TOR 3.5.9.3, 3.6)" position="right"><span className="cursor-help">Data Security Assessment <TorRef section="3.5.9.3, 3.6" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { item: 'Access Control (การควบคุมการเข้าถึง)', score: 'ผ่าน', detail: 'AD Authentication + RBAC 3 ระดับ', pass: true },
                            { item: 'Encryption (การเข้ารหัส)', score: 'ผ่าน', detail: 'SSL/TLS, AES-256 at rest', pass: true },
                            { item: 'PDPA Compliance', score: 'ผ่าน', detail: 'Consent Management + Data Masking', pass: true },
                            { item: 'Audit Logging', score: 'ผ่าน', detail: 'บันทึกทุกการเข้าถึง/แก้ไข (Section 2.8)', pass: true },
                            { item: 'Vulnerability Scan', score: 'เตือน', detail: '2 รายการ Medium severity ต้องแพทช์', pass: false },
                            { item: 'Backup & Recovery', score: 'ผ่าน', detail: 'Daily backup + tested DR plan', pass: true },
                        ].map((check, i) => (
                            <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50">
                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${check.pass ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {check.pass ? <CheckCircle2 size={14} /> : <AlertTriangle size={12} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-bold text-slate-700">{check.item}</p>
                                        <Badge variant={check.pass ? 'success' : 'warning'}>{check.score}</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{check.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 border-t-4 border-t-amber-500">
                    <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <Tooltip text="ประเมินความเสี่ยงข้อมูล ระบุปัจจัยเสี่ยงและแนวทางลดความเสี่ยง (TOR 3.5.9.4)" position="right"><span className="cursor-help">Data Risk Assessment <TorRef section="3.5.9.4" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { risk: 'ข้อมูลรั่วไหลจากการเข้าถึงไม่ถูกต้อง', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', mitigation: 'RBAC + AD Authentication + Access Log' },
                            { risk: 'ข้อมูลสูญหายจากระบบล่ม', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', mitigation: 'Daily Backup + Cloud DR + 3-year warranty' },
                            { risk: 'ข้อมูลถูกแก้ไขโดยไม่ได้รับอนุญาต', level: 'ปานกลาง', color: 'bg-amber-100 text-amber-700 border-amber-200', mitigation: 'Audit Trail + Data Correction Log (Section 3.2.2)' },
                            { risk: 'การโจมตีทางไซเบอร์ (OWASP Top 10)', level: 'ปานกลาง', color: 'bg-amber-100 text-amber-700 border-amber-200', mitigation: 'WAF + Penetration Test + Vulnerability Scan' },
                            { risk: 'การละเมิด PDPA จากข้อมูลส่วนบุคคล', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', mitigation: 'Data Masking + Consent + NDA (Section 1.9)' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50">
                                <div className="flex justify-between items-start mb-1.5">
                                    <p className="text-xs font-bold text-slate-700 flex-1">{item.risk}</p>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${item.color}`}>{item.level}</span>
                                </div>
                                <p className="text-[10px] text-slate-400"><span className="font-bold text-slate-500">แนวทางลดเสี่ยง:</span> {item.mitigation}</p>
                            </div>
                        ))}
                    </div>
                </Card>
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
                    <p className="text-slate-500 text-sm">รายงานสถานการณ์การใช้สิทธิประโยชน์ทางการค้าสำเร็จรูป <TorRef section="3.3.2" /></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { id: 'annual', title: 'สรุปภาพรวม FTA & GSP รายปี', period: 'ปีงบประมาณ 2567', type: 'Annual Report', tor: '3.3.2(1)', icon: <PieChart size={20} className="text-indigo-500" /> },
                    { id: null, title: 'กลุ่มสินค้าศักยภาพ Top 20', period: 'ไตรมาส 1/2567', type: 'Analysis Report', tor: '3.3.2(2)', icon: <BarChart3 size={20} className="text-emerald-500" /> },
                    { id: null, title: 'รายงานสถานการณ์รายความตกลง', period: 'อัปเดตล่าสุด: เม.ย. 67', type: 'Agreement Focus', tor: '3.3.2(1)', icon: <Globe size={20} className="text-blue-500" /> },
                    { id: null, title: 'สถิติการออกหนังสือรับรองถิ่นกำเนิด', period: 'สะสมตั้งแต่ต้นปี (YTD)', type: 'Operations Log', tor: '3.3.1.5', icon: <FileText size={20} className="text-amber-500" /> },
                    { id: null, title: 'รายงานการส่งออกรายประเทศสมาชิก', period: 'เปรียบเทียบ 3 ปี ย้อนหลัง', type: 'Comparative', tor: '3.2.1', icon: <Activity size={20} className="text-rose-500" /> },
                ].map((rep, i) => (
                    <Card key={i} className="hover:shadow-lg transition-all cursor-pointer group">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">{rep.icon}</div>
                                <Badge variant="info">{rep.type}</Badge>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-1 leading-tight">{rep.title}</h4>
                            <p className="text-xs text-slate-400 font-medium">{rep.period} {rep.tor && <TorRef section={rep.tor} />}</p>
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
                    <p className="text-slate-500 text-sm">การควบคุมสิทธิ์ ประวัติการแก้ไข และความปลอดภัย <TorRef section="2.8, 2.12, 3.6" /></p>
                </div>
            </div>

            {/* Security KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'ผู้ใช้งานทั้งหมด', val: '60', sub: '3 กลุ่มสิทธิ์', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { title: 'Active Sessions', val: '18', sub: 'ออนไลน์ขณะนี้', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { title: 'Security Events (7d)', val: '3', sub: '1 Critical, 2 Warning', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { title: 'OWASP Compliance', val: '92%', sub: 'ผ่านเกณฑ์ Top 10', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((kpi, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}><kpi.icon size={16} /></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{kpi.title}</p>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">{kpi.val}</h3>
                        <p className="text-[10px] text-slate-500 mt-1">{kpi.sub}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Roles & Group (Enhanced) */}
                <Card className="p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Users size={18} className="text-blue-600" /> <Tooltip text="บทบาทและกลุ่มผู้ใช้งาน — จัดการสิทธิ์การเข้าถึงระบบ" position="right"><span className="cursor-help">User Roles & Group <TorRef section="2.12" /></span></Tooltip></h3>
                    <div className="space-y-3">
                        {[
                            { role: 'ผู้บริหารกรมฯ', desc: 'ดูข้อมูลทุกระดับ อนุมัติรายงาน', users: 3, color: 'border-rose-500' },
                            { role: 'เจ้าหน้าที่กรมฯ', desc: 'ออก CO, แก้ไขข้อมูล, จัดทำรายงาน', users: 45, color: 'border-blue-500' },
                            { role: 'ผู้ดูแลระบบ', desc: 'บริหารสิทธิ์, ตั้งค่า, Audit', users: 5, color: 'border-emerald-500' },
                            { role: 'ผู้ประกอบการ', desc: 'ยื่นคำขอ CO, ตรวจสถานะ', users: 4200, color: 'border-amber-500' },
                            { role: 'บุคคลทั่วไป', desc: 'ดูข้อมูลสาธารณะ, Open Data', users: '∞', color: 'border-slate-400' },
                        ].map((r, i) => (
                            <div key={i} className={`p-3 bg-slate-50 border-l-4 ${r.color} rounded-r-xl`}>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-xs text-slate-800">{r.role}</span>
                                    <span className="text-[10px] font-bold text-slate-500">{r.users} Users</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                        <Fingerprint className="text-blue-600 shrink-0" size={20} />
                        <div>
                            <p className="text-[10px] font-bold text-blue-900 uppercase">AD Authentication <TorRef section="2.13" /></p>
                            <p className="text-[10px] text-blue-600">Connected to Microsoft AD + Access Log enabled</p>
                        </div>
                    </div>
                </Card>

                {/* Audit Trail (Enhanced) */}
                <Card className="lg:col-span-2">
                    <div className="p-4 border-b bg-slate-50 font-bold text-slate-800 flex justify-between items-center">
                        <h3 className="flex items-center gap-2"><History size={18} className="text-rose-500" /> <Tooltip text="ประวัติการแก้ไขข้อมูลและบันทึกการตรวจสอบ" position="bottom"><span className="cursor-help">Audit Trail & Data Correction <TorRef section="3.2.2" /></span></Tooltip></h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="ค้นหา log..." className="bg-white border border-slate-100 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500 w-40" />
                            </div>
                            <button className="text-[10px] text-blue-600 font-black uppercase">View Full Logs</button>
                        </div>
                    </div>
                    <div className="p-0">
                        <div className="grid grid-cols-1 divide-y divide-slate-100">
                            {[
                                { user: 'Chalermpol.C (Admin)', action: 'Data Correction: Ref. DFT2024-00142', target: 'Utilization Value', time: '10:45:12', type: 'warning' },
                                { user: 'Manager.01', action: 'Update TRS Schedule', target: 'ASEAN-China TRS', time: '09:30:10', type: 'info' },
                                { user: 'System (Auto)', action: 'System Hardening Check — Passed', target: 'Security Baseline', time: '03:00:00', type: 'success' },
                                { user: 'Unknown IP (203.154.xx)', action: 'Unauthorized Access Blocked', target: 'Firewall Alert', time: 'เมื่อคืนนี้ 22:15', type: 'danger' },
                                { user: 'System (Auto)', action: 'Backup Completed — 24.5 GB', target: 'Daily Backup', time: '02:00:00', type: 'success' },
                                { user: 'Officer.12', action: 'Login via AD SSO', target: 'Access Log', time: '08:45:30', type: 'info' },
                            ].map((log, i) => (
                                <div key={i} className="p-3.5 hover:bg-slate-50 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${log.type === 'danger' ? 'bg-rose-100 text-rose-600' : log.type === 'warning' ? 'bg-amber-100 text-amber-600' : log.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}><Activity size={14} /></div>
                                        <div><p className="font-bold text-slate-800 text-xs">{log.user}</p><p className="text-[10px] text-slate-500">{log.action}</p></div>
                                    </div>
                                    <div className="text-right"><p className="text-[10px] font-bold text-slate-400">{log.time}</p><span className="text-[9px] font-bold uppercase text-blue-600">{log.target}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* User Management Table (TOR 2.12) */}
            <Card>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Settings size={18} className="text-blue-500" />
                        <Tooltip text="จัดการผู้ใช้งาน — เพิ่ม ลบ แก้ไข บทบาท และสถานะการเข้าถึง" position="right"><span className="cursor-help">จัดการผู้ใช้งาน (User Management) <TorRef section="2.12" /></span></Tooltip>
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="ค้นหาผู้ใช้..." className="bg-white border border-slate-100 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500 w-44" />
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
                            <FilePlus size={14} /> เพิ่มผู้ใช้
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50/50 border-b text-slate-400 font-bold text-[11px]">
                            <tr>
                                <th className="p-3 text-left">ชื่อผู้ใช้</th>
                                <th className="p-3 text-left">ชื่อ-นามสกุล</th>
                                <th className="p-3 text-left">หน่วยงาน</th>
                                <th className="p-3 text-center">บทบาท</th>
                                <th className="p-3 text-center">สถานะ</th>
                                <th className="p-3 text-center">Login ล่าสุด</th>
                                <th className="p-3 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {[
                                { username: 'chalermpol.c', name: 'นายเฉลิมพล ช.', dept: 'ศูนย์เทคโนโลยีสารสนเทศฯ', role: 'Administrator', status: 'Active', lastLogin: '19/03/2567 08:30', roleColor: 'danger' },
                                { username: 'somchai.p', name: 'นายสมชาย พ.', dept: 'กองสิทธิประโยชน์ทางการค้า', role: 'DFT Officer', status: 'Active', lastLogin: '19/03/2567 09:15', roleColor: 'info' },
                                { username: 'sumalee.k', name: 'นางสุมาลี ก.', dept: 'สำนักผู้อำนวยการ', role: 'Executive', status: 'Active', lastLogin: '18/03/2567 16:40', roleColor: 'purple' },
                                { username: 'wichai.t', name: 'นายวิชัย ท.', dept: 'กองสิทธิประโยชน์ทางการค้า', role: 'DFT Officer', status: 'Active', lastLogin: '19/03/2567 07:55', roleColor: 'info' },
                                { username: 'pranee.s', name: 'นางปราณี ส.', dept: 'ศูนย์เทคโนโลยีสารสนเทศฯ', role: 'Administrator', status: 'Active', lastLogin: '19/03/2567 08:00', roleColor: 'danger' },
                                { username: 'kittipong.r', name: 'นายกิตติพงศ์ ร.', dept: 'กองสิทธิประโยชน์ทางการค้า', role: 'DFT Officer', status: 'Locked', lastLogin: '15/03/2567 11:20', roleColor: 'info' },
                                { username: 'apinya.m', name: 'นางอภิญญา ม.', dept: 'สำนักงานภาคตะวันออก', role: 'DFT Officer', status: 'Active', lastLogin: '18/03/2567 14:30', roleColor: 'info' },
                            ].map((user, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-3 font-mono font-bold text-blue-600 text-xs">{user.username}</td>
                                    <td className="p-3 text-xs font-medium text-slate-800">{user.name}</td>
                                    <td className="p-3 text-xs text-slate-500">{user.dept}</td>
                                    <td className="p-3 text-center"><Badge variant={user.roleColor}>{user.role}</Badge></td>
                                    <td className="p-3 text-center"><Badge variant={user.status === 'Active' ? 'success' : 'warning'}>{user.status}</Badge></td>
                                    <td className="p-3 text-center text-[10px] text-slate-400 font-mono">{user.lastLogin}</td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"><Settings size={14} /></button>
                                            <button className="p-1.5 hover:bg-amber-50 rounded-lg text-amber-500 transition-colors"><Lock size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Permission Matrix (TOR 2.12) */}
            <Card>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        <Tooltip text="ตารางสิทธิ์การเข้าถึงระบบจำแนกตามบทบาท — กำหนดได้ว่าใครเข้าถึงเมนูใดบ้าง" position="right"><span className="cursor-help">Permission Matrix (สิทธิ์การเข้าถึง) <TorRef section="2.12" /></span></Tooltip>
                    </h3>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
                        <Settings size={14} /> แก้ไขสิทธิ์
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                                <th className="p-3 text-left">เมนู / ฟังก์ชัน</th>
                                <th className="p-3 text-center">ผู้บริหาร</th>
                                <th className="p-3 text-center">เจ้าหน้าที่</th>
                                <th className="p-3 text-center">ผู้ดูแลระบบ</th>
                                <th className="p-3 text-center">ผู้ประกอบการ</th>
                                <th className="p-3 text-center">บุคคลทั่วไป</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { menu: 'Dashboard — ดูข้อมูลสถิติ', p: [true, true, true, false, false] },
                                { menu: 'Service Portal — ยื่นคำขอ CO', p: [false, true, false, true, false] },
                                { menu: 'Operations/CO — ติดตามสถานะ', p: [true, true, true, true, false] },
                                { menu: 'Data Integration — นำเข้าข้อมูล', p: [false, true, true, false, false] },
                                { menu: 'Analytics — วิเคราะห์เชิงลึก', p: [true, true, true, false, false] },
                                { menu: 'Governance — ธรรมาภิบาลข้อมูล', p: [true, false, true, false, false] },
                                { menu: 'Reports — ดาวน์โหลดรายงาน', p: [true, true, true, true, true] },
                                { menu: 'Admin — จัดการผู้ใช้/สิทธิ์', p: [false, false, true, false, false] },
                                { menu: 'AI Intelligence — ใช้งาน AI', p: [true, true, true, false, false] },
                                { menu: 'Data Correction — แก้ไขข้อมูล', p: [false, true, true, false, false] },
                                { menu: 'Open Data API — เข้าถึง API', p: [true, true, true, true, true] },
                                { menu: 'Export Excel/PDF', p: [true, true, true, true, false] },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-3 font-medium text-slate-700">{row.menu}</td>
                                    {row.p.map((v, j) => (
                                        <td key={j} className="p-3 text-center">
                                            {v ? (
                                                <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center"><CheckCircle2 size={14} /></span>
                                            ) : (
                                                <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 text-slate-300 items-center justify-center"><X size={14} /></span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Access Log / Login History (TOR 2.13, 3.6.3.1.3) */}
            <Card>
                <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Fingerprint size={18} className="text-blue-500" />
                        <Tooltip text="บันทึกการเข้าสู่ระบบ (Access Log) ของผู้ใช้ทั้งหมด เพื่อตรวจสอบกิจกรรมที่ผิดปกติ" position="right"><span className="cursor-help">Access Log / Login History <TorRef section="2.13, 3.6.3.1.3" /></span></Tooltip>
                    </h3>
                    <div className="flex items-center gap-2">
                        <select className="bg-white border border-slate-100 rounded-lg py-1.5 px-3 text-xs outline-none">
                            <option>วันนี้</option>
                            <option>7 วันล่าสุด</option>
                            <option>30 วันล่าสุด</option>
                        </select>
                        <button className="text-[10px] text-blue-600 font-black uppercase">Export Log</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                                <th className="p-3 text-left">วัน-เวลา</th>
                                <th className="p-3 text-left">ผู้ใช้</th>
                                <th className="p-3 text-left">กิจกรรม</th>
                                <th className="p-3 text-left">IP Address</th>
                                <th className="p-3 text-center">ผลลัพธ์</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { time: '19/03/2567 09:15:42', user: 'somchai.p', action: 'Login via AD SSO', ip: '10.1.15.42', result: 'Success' },
                                { time: '19/03/2567 08:30:18', user: 'chalermpol.c', action: 'Login via AD SSO', ip: '10.1.15.10', result: 'Success' },
                                { time: '19/03/2567 08:00:05', user: 'pranee.s', action: 'Login via AD SSO', ip: '10.1.15.11', result: 'Success' },
                                { time: '19/03/2567 07:55:33', user: 'wichai.t', action: 'Login via AD SSO', ip: '10.1.20.85', result: 'Success' },
                                { time: '18/03/2567 22:15:08', user: 'unknown', action: 'Brute Force Attempt (5 failed)', ip: '203.154.xx.xx', result: 'Blocked' },
                                { time: '18/03/2567 18:20:15', user: 'kittipong.r', action: 'Login Failed (wrong password)', ip: '192.168.1.50', result: 'Failed' },
                                { time: '18/03/2567 16:40:22', user: 'sumalee.k', action: 'Logout', ip: '10.1.10.5', result: 'Success' },
                                { time: '18/03/2567 14:30:10', user: 'apinya.m', action: 'Login via AD SSO (ภาคตะวันออก)', ip: '10.2.5.15', result: 'Success' },
                            ].map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-3 font-mono text-slate-500">{log.time}</td>
                                    <td className="p-3 font-bold text-slate-800">{log.user}</td>
                                    <td className="p-3 text-slate-600">{log.action}</td>
                                    <td className="p-3 font-mono text-slate-400">{log.ip}</td>
                                    <td className="p-3 text-center">
                                        <Badge variant={log.result === 'Success' ? 'success' : log.result === 'Blocked' ? 'danger' : 'warning'}>{log.result}</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Security Baseline + PDPA + Cybersecurity (TOR 2.14, 2.15, 3.6) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* OWASP / Security Baseline (TOR 2.15, 3.6.3.2) */}
                <Card className="p-6 border-t-4 border-t-indigo-500">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Shield size={18} className="text-indigo-500" />
                        <Tooltip text="มาตรฐานความปลอดภัย OWASP Top 10 และ Security Baseline Configuration" position="right"><span className="cursor-help">Security Baseline <TorRef section="2.15, 3.6.3.2" /></span></Tooltip>
                    </h3>
                    <div className="space-y-2.5">
                        {[
                            { item: 'SQL Injection Protection', pass: true },
                            { item: 'Cross-Site Scripting (XSS)', pass: true },
                            { item: 'Broken Authentication', pass: true },
                            { item: 'Security Misconfiguration', pass: true },
                            { item: 'Sensitive Data Exposure', pass: true },
                            { item: 'Insecure Deserialization', pass: false },
                            { item: 'Insufficient Logging', pass: true },
                            { item: 'HTTPS / TLS Enforcement', pass: true },
                        ].map((check, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px]">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${check.pass ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    {check.pass ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                                </div>
                                <span className={`font-medium ${check.pass ? 'text-slate-600' : 'text-amber-700 font-bold'}`}>{check.item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 italic">Penetration Test ครั้งล่าสุด: 15 ก.พ. 2567</p>
                </Card>

                {/* PDPA Compliance (TOR 2.14) */}
                <Card className="p-6 border-t-4 border-t-rose-500">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Lock size={18} className="text-rose-500" />
                        <Tooltip text="การปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)" position="right"><span className="cursor-help">PDPA Compliance <TorRef section="2.14" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { item: 'Consent Management', desc: 'ระบบจัดเก็บความยินยอมก่อนประมวลผล', pass: true },
                            { item: 'Data Masking', desc: 'ปกปิดข้อมูลส่วนบุคคลในรายงาน', pass: true },
                            { item: 'Right to Access', desc: 'ผู้ใช้สามารถขอดูข้อมูลตนเองได้', pass: true },
                            { item: 'Data Retention Policy', desc: 'กำหนดระยะเวลาเก็บรักษาข้อมูล', pass: true },
                            { item: 'Breach Notification', desc: 'แจ้งเตือนกรณีข้อมูลรั่วไหลภายใน 72 ชม.', pass: true },
                            { item: 'NDA (Section 1.9)', desc: 'ข้อตกลงรักษาความลับกับผู้รับจ้าง', pass: true },
                        ].map((check, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${check.pass ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                    <CheckCircle2 size={10} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-700">{check.item}</p>
                                    <p className="text-[10px] text-slate-400">{check.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Cybersecurity Risk Profile (TOR 3.6.3.1.2, 3.6.3) */}
                <Card className="p-6 border-t-4 border-t-amber-500">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <Tooltip text="โปรไฟล์ความเสี่ยงไซเบอร์ และมาตรการควบคุมการเข้าถึง" position="right"><span className="cursor-help">Cybersecurity Risk Profile <TorRef section="3.6.3" /></span></Tooltip>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { risk: 'Access Control (Least Privilege)', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700' },
                            { risk: 'Separation of Duties', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700' },
                            { risk: 'Remote Connection Security', level: 'ปานกลาง', color: 'bg-amber-100 text-amber-700' },
                            { risk: 'Malware Protection', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700' },
                            { risk: 'Information Sharing (Encryption)', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700' },
                            { risk: 'Unused Port Closure', level: 'ต่ำ', color: 'bg-emerald-100 text-emerald-700' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50">
                                <span className="text-[11px] font-medium text-slate-700">{item.risk}</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.color}`}>{item.level}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-500"><span className="font-bold text-slate-700">Password Policy <TorRef section="3.6.3.2.1" /></span><br />ความยาวขั้นต่ำ 12 ตัวอักษร, ตัวพิมพ์ใหญ่+เล็ก+ตัวเลข+อักขระพิเศษ, เปลี่ยนทุก 90 วัน</p>
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
                            <h2 className="text-xl font-bold text-slate-800">เข้าสู่ระบบเจ้าหน้าที่ <TorRef section="2.13" /></h2>
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
        <div className={`flex h-screen overflow-hidden font-sans antialiased transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>

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
                <header className={`h-[72px] backdrop-blur-xl border-b px-6 flex items-center justify-between shrink-0 sticky top-0 z-20 transition-colors duration-300 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
                    <Tooltip text={isSidebarOpen ? "ย่อเมนูด้านข้าง" : "ขยายเมนูด้านข้าง"} position="right">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
                        >
                            <MoreVertical size={20} className={`transition-transform ${isSidebarOpen ? "" : "rotate-90"}`} />
                        </button>
                    </Tooltip>

                    <div className="flex-1 max-w-2xl mx-6 relative hidden sm:block">
                        <div className="relative flex items-center group">
                            {/* Glow effect on focus */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 rounded-3xl blur-lg opacity-0 group-focus-within:from-blue-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-blue-500/10 group-focus-within:opacity-100 transition-all duration-500"></div>

                            <div className="relative w-full flex items-center">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Search size={18} className="text-slate-300 group-focus-within:text-blue-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="ค้นหาเลขอ้างอิง, พิกัด HS Code, ชื่อบริษัท หรือถาม AI..."
                                    className={`w-full rounded-2xl py-3 pl-12 pr-36 text-sm font-medium placeholder:text-slate-400 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-300 outline-none border ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus:bg-slate-800 focus:border-blue-500' : 'bg-slate-50/80 border-slate-200/80 text-slate-700 focus:bg-white focus:border-blue-300'}`}
                                />
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-violet-600 to-blue-500 text-white text-[10px] font-black rounded-xl shadow-md shadow-violet-200/50 hover:shadow-lg hover:shadow-violet-200/80 hover:scale-105 transition-all cursor-pointer">
                                        <Sparkles size={12} /> AI Search
                                    </span>
                                    <span className="hidden lg:flex items-center gap-1 px-2 py-1.5 bg-slate-100/80 text-slate-400 text-[10px] font-mono font-bold rounded-lg border border-slate-200/80">⌘K</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Theme & Font Settings */}
                        <div className="relative">
                            <Tooltip text="ตั้งค่าธีมและขนาดตัวอักษร" position="bottom">
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className={`p-2.5 rounded-xl transition-all ${showSettings ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                                >
                                    {isDark ? <Moon size={18} /> : <Sun size={18} />}
                                </button>
                            </Tooltip>

                            {showSettings && (
                                <div className={`absolute right-0 top-full mt-2 w-72 rounded-2xl shadow-2xl border z-50 animate-in ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                                    {/* Arrow */}
                                    <div className={`absolute -top-2 right-4 w-4 h-4 rotate-45 border-l border-t ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}></div>

                                    <div className="p-5 relative z-10">
                                        <div className="flex justify-between items-center mb-5">
                                            <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>การตั้งค่าแสดงผล</h4>
                                            <button onClick={() => setShowSettings(false)} className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-400'}`}><X size={16} /></button>
                                        </div>

                                        {/* Theme Selector */}
                                        <div className="mb-5">
                                            <p className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ธีม (Theme)</p>
                                            <div className={`flex rounded-xl p-1 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                                                {[
                                                    { id: 'light', label: 'สว่าง', icon: Sun },
                                                    { id: 'dark', label: 'มืด', icon: Moon },
                                                    { id: 'auto', label: 'อัตโนมัติ', icon: Monitor },
                                                ].map(t => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => setTheme(t.id)}
                                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${theme === t.id
                                                            ? (isDark ? 'bg-slate-700 text-white shadow-md' : 'bg-white text-slate-900 shadow-md')
                                                            : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')
                                                        }`}
                                                    >
                                                        <t.icon size={14} /> {t.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Font Size */}
                                        <div>
                                            <p className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ขนาดตัวอักษร</p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setFontSize(Math.max(75, fontSize - 5))}
                                                    disabled={fontSize <= 75}
                                                    className={`p-2 rounded-xl border transition-all ${fontSize <= 75 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100'} ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <div className="flex-1 relative">
                                                    <div className={`h-2 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                                                        <div
                                                            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all"
                                                            style={{ width: `${((fontSize - 75) / 50) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className={`text-center text-xs font-black mt-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>{fontSize}%</p>
                                                </div>
                                                <button
                                                    onClick={() => setFontSize(Math.min(125, fontSize + 5))}
                                                    disabled={fontSize >= 125}
                                                    className={`p-2 rounded-xl border transition-all ${fontSize >= 125 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100'} ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                {[
                                                    { val: 85, label: 'เล็ก' },
                                                    { val: 100, label: 'ปกติ' },
                                                    { val: 115, label: 'ใหญ่' },
                                                ].map(preset => (
                                                    <button
                                                        key={preset.val}
                                                        onClick={() => setFontSize(preset.val)}
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${fontSize === preset.val
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')
                                                        }`}
                                                    >
                                                        {preset.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Tooltip text="การแจ้งเตือน — มีรายการใหม่ที่ยังไม่ได้อ่าน" position="bottom">
                            <button className={`relative p-2.5 rounded-xl transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-100'}`}>
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                            </button>
                        </Tooltip>
                        <div className={`h-8 w-[1px] mx-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                        <button className={`flex items-center gap-3 p-1.5 pr-3 rounded-xl transition-colors group ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                {user?.name?.charAt(0).toUpperCase() || 'J'}
                            </div>
                            <div className="text-left hidden lg:block">
                                <p className={`text-[11px] font-extrabold leading-none truncate max-w-[100px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.name || 'Jane Doe'}</p>
                                <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-none truncate max-w-[100px]">{user?.role || 'Intelligence Officer'}</p>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Dynamic Content View */}
                <div className={`flex-1 overflow-y-auto p-6 relative transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50/50'}`}>
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