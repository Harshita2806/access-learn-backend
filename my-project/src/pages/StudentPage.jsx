import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Menu, User, Play, Compass, Book,
    Headphones, Mic, BarChart, History, X, Sparkles, Zap,
    LogOut, Mail, ShieldCheck
} from "lucide-react";
import SSubjectLibrary from "../components/Student/SubjectLibrary";
import NeuralPlayer from "../components/Student/NeuralPlayer";
import VoiceDoubts from "../components/Student/VoiceDoubts";
import MasteryMap from "../components/Student/MasteryMap";

export default function StudentPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [activeView, setActiveView] = useState("dashboard");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const libraryRef = useRef(null);
    const profileRef = useRef(null);

    // Close profile card when clicking outside
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    const scrollToLibrary = () => {
        setSidebarOpen(false);
        setActiveView("dashboard");
        setTimeout(() => {
            libraryRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const renderContent = () => {
        switch (activeView) {
            case "player": return <NeuralPlayer />;
            case "doubts": return <VoiceDoubts />;
            case "analytics": return <MasteryMap />;
            default: return (
                <>
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="px-6 md:px-10 max-w-[1400px] mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[85vh] pt-4"
                    >
                        <div className="hidden lg:flex col-span-3 flex-col items-center gap-8">
                            <StatSquare icon={<History />} label="Last Session" value="45m" color="emerald" variants={itemVariants} />
                            <StatSquare icon={<Book />} label="Chapters" value="12/15" color="teal" variants={itemVariants} />
                        </div>

                        <div className="w-full lg:col-span-6 text-center flex flex-col items-center">
                            {/* Updated Badge Theme */}
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/30 text-[#14b8a6] text-[10px] uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                                <Sparkles size={12} /> Personalized Learning Path
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 md:mb-6 font-serif text-white">
                                Listen. Learn. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-emerald-200">Conquer.</span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-[#a4a2a2] text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed italic font-manrope">
                                "Transform your study sessions into an immersive audio journey. From complex equations to historical sagas, dive deep into your subjects."
                            </motion.p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(20,184,166,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-linear-to-br from-brand-primary/20 to-emerald-200/20 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                                >
                                    <Play size={18} fill="white" /> Continue: Quantum Physics
                                </motion.button>
                                <motion.button
                                    onClick={scrollToLibrary}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all text-white"
                                >
                                    Explore Subjects
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-md lg:hidden">
                                <StatSquare icon={<History />} label="Last Session" value="45m" color="emerald" variants={itemVariants} mobile />
                                <StatSquare icon={<Zap />} label="Retention" value="89%" color="emerald" variants={itemVariants} mobile />
                                <StatSquare icon={<Book />} label="Chapters" value="12/15" color="teal" variants={itemVariants} mobile />
                                <StatSquare icon={<BarChart />} label="Streak" value="14 Days" color="teal" variants={itemVariants} mobile />
                            </div>
                        </div>

                        <div className="hidden lg:flex col-span-3 flex-col items-center gap-8">
                            <StatSquare icon={<Zap />} label="Retention" value="89%" color="emerald" variants={itemVariants} />
                            <StatSquare icon={<BarChart />} label="Streak" value="14 Days" color="teal" variants={itemVariants} />
                        </div>
                    </motion.section>

                    <div ref={libraryRef}>
                        <SSubjectLibrary />
                    </div>
                </>
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#14b8a6]/30">

            {/* --- FIXED NAVBAR --- */}
            <header className="fixed top-0 left-0 w-full z-[100] border-b border-[#333] bg-[#050505]/60 backdrop-blur-xl px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-[#14b8a6]">
                    <Menu size={22} />
                </button>

                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileCard(!showProfileCard)}
                        className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${showProfileCard ? 'bg-[#14b8a6]/20 border-[#14b8a6]/50' : 'bg-white/5 border-white/10 hover:border-[#14b8a6]/50'}`}
                    >
                        <User size={18} className={showProfileCard ? "text-white" : "text-[#14b8a6]"} />
                    </button>

                    {/* --- PROFILE DROPDOWN --- */}
                    <AnimatePresence>
                        {showProfileCard && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-4 w-72 bg-[#0a0a0a] border border-[#333] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl z-[110]"
                            >
                                <div className="bg-gradient-to-br from-[#14b8a6]/20 to-emerald-900/20 p-6 border-b border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#14b8a6] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#14b8a6]/40">
                                            {user?.name?.charAt(0) || "S"}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg leading-none truncate w-32">{user?.name || "Student"}</h4>
                                            <div className="flex items-center gap-1 mt-1 text-[#14b8a6]">
                                                <ShieldCheck size={12} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{user?.role || "Student"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-1">
                                    <div className="flex items-center gap-3 px-4 py-3 text-gray-400 text-sm">
                                        <Mail size={16} className="text-[#14b8a6]" />
                                        <span className="truncate">{user?.email || "student@accesslearn.com"}</span>
                                    </div>

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

            <main className="pt-20 md:pt-24 pb-12">
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
            </main>

            <StudentSidebar
                isOpen={isSidebarOpen}
                setOpen={setSidebarOpen}
                activeView={activeView}
                setActiveView={setActiveView}
                scrollToLibrary={scrollToLibrary}
                handleLogout={handleLogout}
                user={user}
            />
        </div>
    );
}

function StatSquare({ icon, label, value, color, variants, mobile }) {
    const isEmerald = color === "emerald";
    const sizeClasses = mobile ? "w-full h-32" : "w-36 h-36 md:w-44 md:h-44";

    return (
        <motion.div variants={variants} className={`${sizeClasses} group relative`}>
            <div className={`absolute inset-0 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl ${isEmerald ? 'bg-[#14b8a6]' : 'bg-emerald-600'}`} />
            <div className="w-full h-full relative flex flex-col items-center justify-center rounded-[2rem] md:rounded-[2.5rem] border border-[#333] bg-[#0a0a0a]/60 backdrop-blur-2xl transition-all duration-500 group-hover:border-[#14b8a6]/40 group-hover:translate-y-[-5px]">
                <div className={isEmerald ? "text-[#14b8a6]" : "text-emerald-500"}>
                    {React.cloneElement(icon, { size: mobile ? 22 : 28, strokeWidth: 1.5 })}
                </div>
                <div className={`font-black mt-1 tracking-tighter text-white ${mobile ? 'text-2xl' : 'text-3xl'}`}>{value}</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#888] font-bold mt-0.5">{label}</div>
            </div>
        </motion.div>
    );
}

function StudentSidebar({ isOpen, setOpen, activeView, setActiveView, scrollToLibrary, handleLogout, user }) {
    const menuItems = [
        { id: "dashboard", label: "My Hub", icon: <Compass size={18} />, action: () => setActiveView("dashboard") },
        { id: "subjects", label: "Library", icon: <Book size={18} />, action: scrollToLibrary },
        { id: "player", label: "Neural Player", icon: <Headphones size={18} />, action: () => setActiveView("player") },
        { id: "doubts", label: "Voice Doubts", icon: <Mic size={18} />, action: () => setActiveView("doubts") },
        { id: "analytics", label: "Mastery Map", icon: <BarChart size={18} />, action: () => setActiveView("analytics") },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]" />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 120 }}
                        className="fixed left-0 top-0 h-full w-[85%] sm:w-80 bg-[#0a0a0a] border-r border-[#333] z-[120] p-6 sm:p-8 flex flex-col shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8 md:mb-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#14b8a6]">Student Menu</span>
                            <X size={20} className="cursor-pointer text-gray-600 hover:text-white transition-colors" onClick={() => setOpen(false)} />
                        </div>
                        <nav className="space-y-2 flex-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { item.action(); setOpen(false); }}
                                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeView === item.id
                                        ? "bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 shadow-inner"
                                        : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                                        }`}
                                >
                                    <span className={activeView === item.id ? "text-[#14b8a6]" : "text-gray-600"}>{item.icon}</span>
                                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                </button>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/5 transition-all mt-4"
                            >
                                <LogOut size={18} />
                                <span className="font-bold text-sm tracking-wide">Sign Out</span>
                            </button>
                        </nav>

                        <div className="mt-auto flex items-center gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/5 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#14b8a6] flex items-center justify-center font-bold text-white">
                                {user?.name?.charAt(0) || "S"}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">{user?.name || "Student"}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role || "Learner"}</p>
                            </div>
                        </div>

                        <div className="p-5 bg-[#14b8a6]/5 rounded-[1.5rem] border border-[#14b8a6]/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform"><Sparkles size={40} /></div>
                            <p className="text-[10px] uppercase tracking-widest text-[#14b8a6] font-bold mb-2">Resume Learning</p>
                            <p className="text-sm font-bold text-white">Advanced Calculus</p>
                            <p className="text-xs text-gray-500 mt-1">Section 4.2: Derivatives</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}