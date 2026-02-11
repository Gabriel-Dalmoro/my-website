"use client";

import { useTranslations } from "next-intl";
import {
    Mail,
    MapPin,
    ChevronRight,
    ChevronLeft,
    ShieldCheck,
    Clock,
    CheckCircle2,
    CheckSquare,
    Settings2,
    Rocket,
    Globe,
    Sparkles,
    BarChart3,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, Suspense, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function ContactForm() {
    const t = useTranslations("Contact");
    const tPricing = useTranslations("Pricing");
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const [formData, setFormData] = useState({
        problem: "",
        hours: "",
        opportunity: "",
        tools: [] as string[],
        plan: "starter",
        websiteAddon: false,
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        const planParam = searchParams.get('plan');
        const addonParam = searchParams.get('addon');
        if (planParam === 'starter' || planParam === 'custom') setFormData(prev => ({ ...prev, plan: planParam }));
        if (addonParam === 'website') setFormData(prev => ({ ...prev, websiteAddon: true }));
    }, [searchParams]);

    // Auto-focus logic
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [step, submitted]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleTool = (value: string) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.includes(value) ? prev.tools.filter(i => i !== value) : [...prev.tools, value]
        }));
    };

    const totalSteps = 9;

    const nextStep = () => {
        if (step === 1 && !formData.problem) return;
        if (step === 2 && !formData.hours) return;
        if (step === 3 && !formData.opportunity) return;
        if (step === 7 && !formData.name) return;
        if (step === 8 && !formData.email) return;

        if (step < totalSteps) {
            setStep(prev => prev + 1);
        } else {
            submitForm();
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("https://n8n-production-ced7.up.railway.app/webhook/1a7dab8b-98a0-4536-881a-d7b52f73cb5c", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                    locale: searchParams.get('lang') || 'en'
                }),
            });
            if (response.ok) setSubmitted(true);
            else throw new Error("Failed");
        } catch (error) {
            console.error(error);
            alert("Error sending application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            if (step !== totalSteps || step === 9) {
                e.preventDefault();
                nextStep();
            }
        }
    };

    return (
        <div className="relative isolate max-w-lg mx-auto w-full px-4 sm:px-0">
            {/* Ambient background glows */}
            <div className="absolute -z-10 -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute -z-10 -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] opacity-20 animate-pulse" />

            <motion.div
                layout
                className="rounded-3xl bg-zinc-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden relative min-h-[400px] flex flex-col transition-all duration-700 hover:border-white/20"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary via-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(255,193,7,0.4)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ type: "spring", stiffness: 40, damping: 20 }}
                    />
                </div>

                <div className="flex-1 p-5 sm:p-7 lg:p-9 flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                className="text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 mx-auto text-emerald-500 ring-1 ring-emerald-500/20 shadow-2xl shadow-emerald-500/10"
                                >
                                    <ShieldCheck className="w-10 h-10" />
                                </motion.div>
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{t("successTitle")}</h3>
                                <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed text-lg font-medium">{t("success")}</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-8 sm:space-y-12"
                                onKeyDown={onKeyDown}
                            >
                                {/* Refined Step Indicator */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                                        Question {step}
                                    </div>
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                    <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">{totalSteps.toString().padStart(2, '0')}</span>
                                </div>

                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                                            {t("field_problem_label")}
                                        </h2>
                                        <textarea
                                            ref={inputRef as any}
                                            name="problem"
                                            rows={2}
                                            value={formData.problem}
                                            onChange={handleInputChange}
                                            placeholder={t("field_problem_placeholder")}
                                            className="block w-full text-base sm:text-lg lg:text-xl bg-transparent border-0 border-b-2 border-white/5 p-0 pb-3 text-white focus:ring-0 focus:outline-none focus:border-white/5 placeholder:text-zinc-800 transition-all resize-none font-normal"
                                        />
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                                            {t("field_hours_label")}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {['low', 'medium', 'high', 'critical'].map((key) => {
                                                const valMap: Record<string, string> = { low: '1-5', medium: '6-10', high: '11-20', critical: '20+' };
                                                const val = valMap[key];
                                                return (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        onClick={() => { setFormData(p => ({ ...p, hours: val })); setTimeout(nextStep, 300); }}
                                                        className={cn(
                                                            "flex items-center justify-between gap-4 rounded-2xl px-6 py-5 text-base font-bold transition-all border text-left group backdrop-blur-sm",
                                                            formData.hours === val
                                                                ? "bg-primary border-primary text-zinc-950 shadow-[0_0_30px_-5px_rgba(255,193,7,0.4)] scale-[1.02]"
                                                                : "bg-white/5 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/10"
                                                        )}
                                                    >
                                                        <span>{t(`field_hours_${key}`)}</span>
                                                        <div className={cn("w-2 h-2 rounded-full", formData.hours === val ? "bg-zinc-950" : "bg-white/20 group-hover:bg-white/40")} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                                            {t("field_opportunity_label")}
                                        </h2>
                                        <textarea
                                            ref={inputRef as any}
                                            name="opportunity"
                                            rows={2}
                                            value={formData.opportunity}
                                            onChange={handleInputChange}
                                            placeholder={t("field_opportunity_placeholder")}
                                            className="block w-full text-base sm:text-lg lg:text-xl bg-transparent border-0 border-b-2 border-white/5 p-0 pb-3 text-white focus:ring-0 focus:outline-none focus:border-white/5 placeholder:text-zinc-800 transition-all resize-none font-normal"
                                        />
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-8">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                                            {t("field_tools_label")}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['google', 'invoice', 'crm', 'project', 'other'].map((toolKey) => (
                                                <button
                                                    key={toolKey}
                                                    type="button"
                                                    onClick={() => toggleTool(toolKey)}
                                                    className={cn(
                                                        "flex items-center justify-between w-full rounded-2xl px-6 py-4.5 text-left transition-all border group backdrop-blur-sm",
                                                        formData.tools.includes(toolKey)
                                                            ? "bg-primary/20 border-primary text-white"
                                                            : "bg-white/5 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/10"
                                                    )}
                                                >
                                                    <span className="text-[13px] font-bold tracking-tight">{t(`field_tools_${toolKey}`)}</span>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
                                                        formData.tools.includes(toolKey) ? "bg-primary border-primary text-zinc-950 scale-110" : "border-white/10 group-hover:border-white/30"
                                                    )}>
                                                        {formData.tools.includes(toolKey) && <CheckSquare className="w-3.5 h-3.5" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="space-y-8">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">{t("planFocus")}</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => { setFormData(prev => ({ ...prev, plan: 'starter' })); setTimeout(nextStep, 300); }}
                                                className={cn(
                                                    "flex flex-col items-start p-6 rounded-3xl border transition-all text-left group backdrop-blur-sm",
                                                    formData.plan === 'starter' ? "bg-primary/20 border-primary" : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                                )}
                                            >
                                                <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-yellow-500/5">
                                                    <Rocket className="w-6 h-6" />
                                                </div>
                                                <h4 className="text-lg font-black tracking-tight text-white mb-1 uppercase">{tPricing("cards.starter.headline")}</h4>
                                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">{tPricing("cards.starter.price")}</p>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setFormData(prev => ({ ...prev, plan: 'custom' })); setTimeout(nextStep, 300); }}
                                                className={cn(
                                                    "flex flex-col items-start p-6 rounded-3xl border transition-all text-left group backdrop-blur-sm",
                                                    formData.plan === 'custom' ? "bg-white/15 border-white" : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                                )}
                                            >
                                                <div className="p-3 rounded-2xl bg-zinc-800 text-white mb-6 group-hover:scale-110 transition-transform">
                                                    <Settings2 className="w-6 h-6" />
                                                </div>
                                                <h4 className="text-lg font-black tracking-tight text-white mb-1 uppercase">{tPricing("cards.custom.headline")}</h4>
                                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">{tPricing("cards.custom.price")}</p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 6 && (
                                    <div className="space-y-8">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">{t("websiteFocus")}</h2>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, websiteAddon: !p.websiteAddon }))}
                                            className={cn(
                                                "w-full rounded-[2rem] p-8 border transition-all flex items-center justify-between group backdrop-blur-sm",
                                                formData.websiteAddon ? "bg-blue-500/20 border-blue-500 shadow-[0_0_40px_-5px_rgba(59,130,246,0.3)]" : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={cn("p-4 rounded-2xl transition-all shadow-2xl", formData.websiteAddon ? "bg-blue-500 text-white scale-110 shadow-blue-500/40" : "bg-white/10 text-zinc-600")}>
                                                    <Globe className="w-7 h-7" />
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="text-xl font-black tracking-tight text-white mb-1">{t("field_website")}</h4>
                                                    <p className="text-sm text-zinc-500 font-bold leading-relaxed">{t("websiteDescription")}</p>
                                                </div>
                                            </div>
                                            <div className={cn("w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all", formData.websiteAddon ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 group-hover:border-white/30 text-transparent")}>
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        </button>
                                    </div>
                                )}

                                {step === 7 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                                            {t("nameFocus")}
                                        </h2>
                                        <input
                                            ref={inputRef as any}
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={t("namePlaceholder")}
                                            className="block w-full text-base sm:text-lg lg:text-xl bg-transparent border-0 border-b-2 border-white/5 p-0 pb-3 text-white focus:ring-0 focus:outline-none focus:border-white/5 placeholder:text-zinc-800 transition-all font-normal"
                                        />
                                    </div>
                                )}

                                {step === 8 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                                            {t("emailFocus")}
                                        </h2>
                                        <input
                                            ref={inputRef as any}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder={t("emailPlaceholder")}
                                            className="block w-full text-base sm:text-lg lg:text-xl bg-transparent border-0 border-b-2 border-white/5 p-0 pb-3 text-white focus:ring-0 focus:outline-none focus:border-white/5 placeholder:text-zinc-800 transition-all font-normal"
                                        />
                                    </div>
                                )}

                                {step === 9 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">{t("messageFocus")}</h2>
                                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-500 font-black text-[10px] uppercase tracking-[0.2em]">{t("optional")}</span>
                                        </div>
                                        <textarea
                                            ref={inputRef as any}
                                            name="message"
                                            rows={2}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder={t("messagePlaceholder")}
                                            className="block w-full text-sm sm:text-base lg:text-lg bg-transparent border-0 border-b-2 border-white/5 p-0 pb-3 text-white focus:ring-0 focus:outline-none focus:border-white/5 placeholder:text-zinc-800 transition-all resize-none font-normal"
                                        />
                                    </div>
                                )}

                                {/* Navigation & Help */}
                                <div className="pt-8 sm:pt-12 flex items-center justify-between gap-6">
                                    <div className="min-w-[80px]">
                                        <AnimatePresence>
                                            {step > 1 && (
                                                <motion.button
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all group"
                                                >
                                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={nextStep}
                                            disabled={isSubmitting}
                                            className="grow sm:grow-0 group relative flex items-center justify-center gap-4 bg-primary text-zinc-950 px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.25em] transition-all shadow-[0_20px_40px_-10px_rgba(255,193,7,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(255,193,7,0.4)] disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    {step === totalSteps ? t("submit") : t("next")}
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </motion.button>

                                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-zinc-500/40 select-none mr-1">
                                            <span>or press</span>
                                            <span className="flex items-center justify-center min-w-[40px] h-5 px-2 rounded-md border border-white/10 bg-white/5 text-[9px] text-zinc-400 font-mono leading-none">
                                                ENTER ↵
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Enhanced Security Footer */}
                <div className="bg-white/[0.03] px-8 sm:px-12 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 leading-tight">
                            {t("security")}
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}

export default function ContactPage() {
    const t = useTranslations("Contact");

    return (
        <div className="bg-zinc-950 pt-32 pb-32 min-h-screen relative overflow-hidden selection:bg-primary/30">
            {/* Advanced Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] opacity-60 animate-glow-slow" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] opacity-40 animate-glow-slower" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center mb-24 sm:mb-32">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 leading-[1.1] text-balance"
                    >
                        {t("headline")}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl leading-relaxed text-zinc-500 font-bold max-w-2xl mx-auto text-balance"
                    >
                        {t("subheadline")}
                    </motion.p>
                </div>

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                    </div>
                }>
                    <ContactForm />
                </Suspense>

                {/* Direct Email Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 sm:mt-32 text-center space-y-4"
                >
                    <p className="text-zinc-600 font-bold text-sm tracking-wide">
                        {t("directEmailMessage")}
                    </p>
                    <a
                        href="mailto:gabriel@gabrieldalmoro.com"
                        className="inline-block text-white font-black text-2xl sm:text-3xl tracking-tight hover:text-primary transition-all duration-300 relative group"
                    >
                        gabriel@gabrieldalmoro.com
                        <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
                    </a>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes glow-slow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(5%, 5%) scale(1.1); }
                }
                @keyframes glow-slower {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-5%, -5%) scale(1.05); }
                }
                .animate-glow-slow {
                    animation: glow-slow 15s ease-in-out infinite;
                }
                .animate-glow-slower {
                    animation: glow-slower 20s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
