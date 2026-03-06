import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Menu, User, Zap, Users, BookOpen,
    CheckCircle, Sparkles, X, Mic2, PieChart, LogOut, Compass, Mail, ShieldCheck
} from "lucide-react";
import UploadCenter from "../components/Teacher/UploadCenter";
import SemanticEditor from "../components/Teacher/SemanticEditor";
import AudioLab from "../components/Teacher/AudioLab";
import AssessmentArchitect from "../components/Teacher/AssessmentArchitect";
import InsightEngine from "../components/Teacher/InsightEngine";
import CurriculumCommander from "../components/Teacher/CurriculumCommander";

// Animation Variants (Kept exactly as original)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 10 }
    }
};

const headingLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 14, delay: 0.5 }
    }
};

const headingRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 14, delay: 0.8 }
    }
};

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [activeView, setActiveView] = useState("dashboard");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const uploadRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileCard(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const scrollToUpload = () => {
        setSidebarOpen(false);
        if (activeView !== "dashboard") {
            setActiveView("dashboard");
            setTimeout(() => {
                uploadRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            uploadRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case "semantic": return <SemanticEditor />;
            case "audio": return <AudioLab />;
            case "assessment": return <AssessmentArchitect />;
            case "curriculum": return <CurriculumCommander />;
            case "insights": return <InsightEngine />;
            default: return (
                <>
                    <main className="relative min-h-screen flex items-center justify-center px-4 md:px-10 pt-24 pb-20">
                        <ReducedParticleBackground />
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-[1400px] flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-4 items-center z-10"
                        >
                            <div className="hidden lg:flex col-span-3 flex-col items-center gap-12">
                                <CircularStat variants={itemVariants} icon={<Users />} label="Students" value="1.2k" color="teal" />
                                <CircularStat variants={itemVariants} icon={<Mic2 />} label="Audio" value="142h" color="emerald" />
                            </div>

                            <div className="w-full lg:col-span-6 text-center flex flex-col items-center">
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm"
                                >
                                    <Sparkles size={12} className="text-teal-400" /> Educator Portal Active
                                </motion.div>

                                <div className="overflow-hidden mb-6 py-2">
                                    <motion.h1 variants={headingLeftVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-serif text-white">
                                        Welcome Back,
                                    </motion.h1>
                                    <motion.span variants={headingRightVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight block font-serif text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                                        {user?.name || "Professor"}
                                    </motion.span>
                                </div>

                                <motion.p variants={itemVariants} className="text-gray-300 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                                    Manage your curriculum and monitor student engagement. Your AI-ready materials are waiting for review.
                                </motion.p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        onClick={scrollToUpload}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3.5 bg-white text-black rounded-full font-bold shadow-[0_10px_30px_rgba(20,184,166,0.2)]"
                                    >
                                        Upload Material
                                    </motion.button>

                                    <motion.button
                                        onClick={() => navigate('/student')}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3.5 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-full font-bold backdrop-blur-md"
                                    >
                                        Student View
                                    </motion.button>
                                </div>
                            </div>

                            <div className="hidden lg:flex col-span-3 flex-col items-center gap-12">
                                <CircularStat variants={itemVariants} icon={<BookOpen />} label="Lessons" value="48" color="teal" />
                                <CircularStat variants={itemVariants} icon={<CheckCircle />} label="Compliance" value="98%" color="emerald" />
                            </div>
                        </motion.div>
                    </main>

                    <div ref={uploadRef} className="scroll-mt-24">
                        <UploadCenter />
                    </div>
                </>
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050507] text-white font-sans overflow-x-hidden flex flex-col selection:bg-teal-500/30">

            {/* --- FIXED NAVBAR --- */}
            <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/10 bg-black/60 backdrop-blur-xl px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-teal-400">
                        <Menu size={22} />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 cursor-pointer" onClick={() => setActiveView("dashboard")}>
                        <Zap size={18} className="text-teal-500 fill-teal-500" />
                        <span className="font-bold tracking-tighter text-lg">ACCESS<span className="text-teal-500">LEARN</span></span>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-6 relative" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileCard(!showProfileCard)}
                        className={`flex items-center gap-3 px-4 py-1.5 rounded-2xl border transition-all duration-300 ${showProfileCard ? 'bg-teal-500/20 border-teal-500/50' : 'bg-teal-500/5 border-teal-500/10 hover:border-teal-500/30'}`}
                    >
                        <div className="text-right hidden xs:block">
                            <p className="text-[9px] font-black text-teal-400 uppercase tracking-tighter leading-none">{user?.role || 'User'}</p>
                            <p className="text-sm font-bold text-white leading-tight">{user?.name || "Account"}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center border border-white/20 shadow-lg shadow-teal-500/20">
                            <User size={16} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {showProfileCard && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-4 w-72 bg-[#0d0d12] border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl z-[110]"
                            >
                                <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 p-6 border-b border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/40">
                                            {user?.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg leading-none">{user?.name}</h4>
                                            <div className="flex items-center gap-1 mt-1 text-teal-400">
                                                <ShieldCheck size={12} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{user?.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-1">
                                    <div className="flex items-center gap-3 px-4 py-3 text-gray-400 text-sm">
                                        <Mail size={16} className="text-teal-400" />
                                        <span className="truncate">{user?.email || "No email provided"}</span>
                                    </div>
                                    <button
                                        onClick={() => { navigate('/student'); setShowProfileCard(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-all text-sm group"
                                    >
                                        <Compass size={16} className="group-hover:text-teal-400" />
                                        Switch to Student Mode
                                    </button>
                                    <div className="pt-2 mt-2 border-t border-white/5">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold"
                                        >
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* --- DYNAMIC CONTENT --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>

            {/* --- SIDEBAR --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-[85%] sm:w-80 bg-[#09090b] border-r border-white/10 z-[120] flex flex-col"
                        >
                            <div className="p-6 flex justify-between items-center border-b border-white/5">
                                <span className="font-black text-teal-500 tracking-tighter text-xl uppercase">Admin.Lab</span>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-500 hover:text-white"><X size={20} /></button>
                            </div>
                            <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-4 mb-4 mt-2">Instructional Tools</p>
                                {[
                                    { id: "dashboard", label: "Upload Center", icon: <Users size={18} />, action: scrollToUpload },
                                    { id: "semantic", label: "Semantic Editor", icon: <BookOpen size={18} />, action: () => setActiveView("semantic") },
                                    { id: "audio", label: "Audio Lab", icon: <Mic2 size={18} />, action: () => setActiveView("audio") },
                                    { id: "assessment", label: "Assessment Architect", icon: <CheckCircle size={18} />, action: () => setActiveView("assessment") },
                                    { id: "insights", label: "Insight Engine", icon: <Sparkles size={18} />, action: () => setActiveView("insights") },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { item.action(); setSidebarOpen(false); }}
                                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${activeView === item.id ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                                    >
                                        {item.icon}
                                        <span className="text-sm font-bold">{item.label}</span>
                                    </button>
                                ))}
                                <div className="mt-8 border-t border-white/5 pt-4">
                                    <button
                                        onClick={() => navigate('/student')}
                                        className="flex items-center gap-4 px-4 py-3.5 w-full text-teal-400 hover:bg-teal-500/5 rounded-xl transition-all"
                                    >
                                        <Compass size={18} />
                                        <span className="text-sm font-bold">Student View</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-4 px-4 py-3.5 w-full text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm font-bold">Sign Out</span>
                                    </button>
                                </div>
                            </nav>
                            <div className="p-6 bg-white/[0.02] border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white shadow-lg shadow-teal-500/20">{user?.name?.charAt(0) || "P"}</div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{user?.name || "User"}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- HELPER COMPONENTS ---
function CircularStat({ icon, label, value, color, variants, mobile }) {
    const isEmerald = color === "emerald";
    const glowColor = isEmerald ? "rgba(16,185,129,0.3)" : "rgba(20,184,166,0.3)";
    const circleSize = mobile ? "w-28 h-28" : "w-40 h-40";

    return (
        <motion.div
            variants={variants}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`relative ${circleSize} flex flex-col items-center justify-center rounded-full border-2 border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_20px_${glowColor}]`}
        >
            <div className={isEmerald ? "text-emerald-400" : "text-teal-400"}>{icon}</div>
            <span className="text-2xl font-bold mt-1 tracking-tighter text-white">{value}</span>
            <span className="text-[9px] uppercase tracking-[0.1em] text-gray-500 font-black">{label}</span>
        </motion.div>
    );
}

function ReducedParticleBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
        </div>
    );
}