import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';

import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";

const carouselData = [
    { url: s1, text: "Inclusive education for all learners", sub: "Empowering every student's journey" },
    { url: s2, text: "Learn through AI-powered audio experiences", sub: "Advanced narration for every subject" },
    { url: s3, text: "Accessible tools for a brighter future", sub: "Designed specifically for accessibility" },
];

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [index, setIndex] = useState(0);
    const [role, setRole] = useState("student");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % carouselData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Front-end Password Validation (Matches your Backend Controller)
        if (!isLogin) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
            if (!passwordRegex.test(formData.password)) {
                alert("Password must contain: Uppercase, Lowercase, Number, and Special Character.");
                return;
            }
        }

        const endpoint = isLogin ? "/auth/login" : "/auth/signup";

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: role }),
            });

            const data = await response.json();

            if (response.ok) {
                if (!isLogin) {
                    // Success: Signup
                    alert("Account created in Sandbox! Check your email to verify before logging in.");
                    setIsLogin(true);
                } else {
                    // Success: Login
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    navigate(data.user.role === "teacher" ? "/teacher" : "/student");
                }
            } else {
                // Error from Backend
                alert(data.msg || "Authentication failed");
            }
        } catch (error) {
            alert("Error: Sandbox server is not running or network issue.");
        }
    };

    return (
        <div className="h-screen w-screen bg-[#050505] font-['Inter'] text-white overflow-hidden flex items-center justify-center">
            <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={isLogin ? "login-view" : "signup-view"}
                        initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`flex w-full h-full ${isLogin ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                    >
                        {/* FORM SECTION */}
                        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16 overflow-y-auto no-scrollbar bg-[#050505]">
                            <div className="w-full max-w-md">
                                <div className="flex items-center gap-2 text-[#14b8a6] font-bold text-xl mb-10 group cursor-pointer">
                                    <BookOpen size={24} className="group-hover:drop-shadow-[0_0_8px_#14b8a6]" />
                                    <span className="tracking-tighter font-['Plus_Jakarta_Sans'] uppercase text-lg">AccessLearn Sandbox</span>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-4xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-wider mb-2 text-white drop-shadow-[0_4px_12px_rgba(20,184,166,0.2)]">
                                                {isLogin ? "Welcome Back" : "Create Account"}
                                            </h1>
                                            <p className="text-gray-400 text-base font-light">
                                                {isLogin ? "Log in to continue your journey" : "Join our accessible learning platform"}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {!isLogin && (
                                                <InputBlock label="Full Name" name="name" type="text" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
                                            )}
                                            <InputBlock label="Email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                                            <InputBlock label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />

                                            {!isLogin && (
                                                <div className="space-y-2 pt-1">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">I am a</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {['student', 'teacher'].map((r) => (
                                                            <button key={r} type="button" onClick={() => setRole(r)} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${role === r ? "bg-[#14b8a6]/10 border-[#14b8a6] text-[#14b8a6]" : "bg-transparent border-white/5 text-gray-500 hover:border-white/10"}`}>
                                                                {r}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <button type="submit" className="w-full bg-[#14b8a6] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm mt-2 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] active:scale-[0.98] transition-all">
                                                {isLogin ? "Log In" : "Create Account"}
                                            </button>
                                        </div>

                                        <p className="text-center text-gray-500 text-sm mt-8">
                                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                                            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#14b8a6] font-semibold hover:underline ml-1">
                                                {isLogin ? "Sign up" : "Log in"}
                                            </button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* CAROUSEL SECTION */}
                        <div className="hidden lg:flex w-1/2 h-full">
                            <div className="h-full w-full relative overflow-hidden bg-[#0a0a0a]">
                                <AnimatePresence mode="wait">
                                    <motion.div key={index} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }} className="absolute inset-0">
                                        <img src={carouselData[index].url} alt="" className="w-full h-full object-cover opacity-60" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                                        <div className="absolute bottom-12 left-10 right-10">
                                            <h2 className="text-3xl font-bold mb-3 tracking-wide leading-tight font-['Plus_Jakarta_Sans'] text-white drop-shadow-lg">{carouselData[index].text}</h2>
                                            <p className="text-[#14b8a6] text-xs font-black uppercase tracking-[0.3em] mb-8 opacity-90">{carouselData[index].sub}</p>
                                            <div className="flex gap-2">
                                                {carouselData.map((_, i) => (
                                                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-10 bg-[#14b8a6]" : "w-4 bg-white/10"}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function InputBlock({ label, type, placeholder, value, onChange, name }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block ml-1">{label}</label>
            <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-[#14b8a6]/50 focus:border-[#14b8a6]/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-gray-700 text-white text-sm font-light" required />
        </div>
    );
}