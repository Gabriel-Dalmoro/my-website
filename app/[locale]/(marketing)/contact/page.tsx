"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, ChevronRight, ChevronLeft, ShieldCheck, Clock, CheckCircle2, CheckSquare, Settings2, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function ContactForm() {
    const t = useTranslations("Contact");
    const tPricing = useTranslations("Pricing");
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const response = await fetch("https://n8n-production-ced7.up.railway.app/webhook-test/1a7dab8b-98a0-4536-881a-d7b52f73cb5c", {
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
            if (step !== totalSteps || step === 9) { // Allow enter for message step too
                e.preventDefault();
                nextStep();
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-800/50 z-20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary via-yellow-400 to-orange-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                </div>

                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 mx-auto text-emerald-500 ring-1 ring-emerald-500/20">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{t("successTitle")}</h3>
                                <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed">{t("form.success")}</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-8"
                                onKeyDown={onKeyDown}
                            >
                                {/* Step Indicator */}
                                <div className="flex items-center gap-3 mb-2 text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
                                    <span className="text-primary">{step.toString().padStart(2, '0')}</span>
                                    <div className="w-8 h-[1px] bg-zinc-800" />
                                    <span>{totalSteps.toString().padStart(2, '0')}</span>
                                </div>

                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                            {t("form.fields.problem.label")}
                                        </h2>
                                        <textarea
                                            autoFocus
                                            name="problem"
                                            rows={3}
                                            value={formData.problem}
                                            onChange={handleInputChange}
                                            placeholder={t("form.fields.problem.placeholder")}
                                            className="block w-full text-xl sm:text-2xl bg-transparent border-0 border-b border-zinc-800 p-0 pb-4 text-white focus:ring-0 focus:border-primary placeholder:text-zinc-800 transition-all resize-none font-medium"
                                        />
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                            {t("form.fields.hours.label")}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['low', 'medium', 'high', 'critical'].map((key) => {
                                                // Map keys back to values for state
                                                const valMap: Record<string, string> = { low: '1-5', medium: '6-10', high: '11-20', critical: '20+' };
                                                const val = valMap[key];
                                                return (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        onClick={() => { setFormData(p => ({ ...p, hours: val })); setTimeout(nextStep, 300); }}
                                                        className={cn(
                                                            "flex items-center gap-4 rounded-2xl p-4 text-sm font-bold transition-all border-2 text-left group",
                                                            formData.hours === val
                                                                ? "bg-primary/5 border-primary text-primary"
                                                                : "bg-zinc-950 border-zinc-800/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                                        )}
                                                    >
                                                        <div className={cn("w-2 h-2 rounded-full", formData.hours === val ? "bg-primary" : "bg-zinc-800 group-hover:bg-zinc-700")} />
                                                        {t(`form.fields.hours.options.${key}`)}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                            {t("form.fields.opportunity.label")}
                                        </h2>
                                        <textarea
                                            autoFocus
                                            name="opportunity"
                                            rows={3}
                                            value={formData.opportunity}
                                            onChange={handleInputChange}
                                            placeholder={t("form.fields.opportunity.placeholder")}
                                            className="block w-full text-xl sm:text-2xl bg-transparent border-0 border-b border-zinc-800 p-0 pb-4 text-white focus:ring-0 focus:border-primary placeholder:text-zinc-800 transition-all resize-none font-medium"
                                        />
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                            {t("form.fields.tools.label")}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {['google', 'invoice', 'crm', 'project', 'other'].map((toolKey) => (
                                                <button
                                                    key={toolKey}
                                                    type="button"
                                                    onClick={() => toggleTool(toolKey)}
                                                    className={cn(
                                                        "flex items-center justify-between w-full rounded-xl px-4 py-3 text-left transition-all border group",
                                                        formData.tools.includes(toolKey)
                                                            ? "bg-zinc-800 border-primary text-white"
                                                            : "bg-zinc-950 border-zinc-800/50 text-zinc-500 hover:border-zinc-700 hover:text-white"
                                                    )}
                                                >
                                                    <span className="text-xs font-bold">{t(`form.fields.tools.options.${toolKey}`)}</span>
                                                    <div className={cn(
                                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                                        formData.tools.includes(toolKey) ? "bg-primary border-primary text-zinc-950" : "border-zinc-800 group-hover:border-zinc-700"
                                                    )}>
                                                        {formData.tools.includes(toolKey) && <CheckSquare className="w-3 h-3" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{t("form.planFocus")}</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Pilot */}
                                            <button
                                                type="button"
                                                onClick={() => { setFormData(prev => ({ ...prev, plan: 'starter' })); setTimeout(nextStep, 300); }}
                                                className={cn(
                                                    "flex flex-col items-start p-5 rounded-2xl border-2 transition-all text-left group",
                                                    formData.plan === 'starter' ? "bg-primary/5 border-primary" : "bg-zinc-950 border-zinc-800/50 hover:border-zinc-700"
                                                )}
                                            >
                                                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                                                    <Rocket className="w-5 h-5" />
                                                </div>
                                                <h4 className="text-sm font-bold text-white mb-1">{tPricing("cards.starter.headline")}</h4>
                                                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">{tPricing("cards.starter.price")}</p>
                                            </button>
                                            {/* Custom */}
                                            <button
                                                type="button"
                                                onClick={() => { setFormData(prev => ({ ...prev, plan: 'custom' })); setTimeout(nextStep, 300); }}
                                                className={cn(
                                                    "flex flex-col items-start p-5 rounded-2xl border-2 transition-all text-left group",
                                                    formData.plan === 'custom' ? "bg-white/5 border-white" : "bg-zinc-950 border-zinc-800/50 hover:border-zinc-700"
                                                )}
                                            >
                                                <div className="p-2 rounded-lg bg-zinc-800 text-white mb-4 group-hover:scale-110 transition-transform">
                                                    <Settings2 className="w-5 h-5" />
                                                </div>
                                                <h4 className="text-sm font-bold text-white mb-1">{tPricing("cards.custom.headline")}</h4>
                                                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">{tPricing("cards.custom.price")}</p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 6 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{t("form.websiteFocus")}</h2>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, websiteAddon: !p.websiteAddon }))}
                                            className={cn(
                                                "w-full rounded-2xl p-6 border-2 transition-all flex items-center justify-between group",
                                                formData.websiteAddon ? "bg-blue-500/5 border-blue-500" : "bg-zinc-950 border-zinc-800/50 hover:border-zinc-700"
                                            )}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={cn("p-3 rounded-xl transition-colors", formData.websiteAddon ? "bg-blue-500 text-white" : "bg-zinc-900 text-zinc-600")}>
                                                    <Globe className="w-6 h-6" />
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="text-lg font-bold text-white">{t("form.fields.website")}</h4>
                                                    <p className="text-sm text-zinc-500 font-medium">{t("form.websiteDescription")}</p>
                                                </div>
                                            </div>
                                            <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", formData.websiteAddon ? "bg-blue-500 border-blue-500 text-white" : "border-zinc-800 group-hover:border-zinc-700 text-transparent")}>
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        </button>
                                    </div>
                                )}

                                {step === 7 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                            {t("form.nameFocus")}
                                        </h2>
                                        <input
                                            autoFocus
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={t("form.namePlaceholder")}
                                            className="block w-full text-xl sm:text-2xl bg-transparent border-0 border-b border-zinc-800 p-0 pb-4 text-white focus:ring-0 focus:border-primary placeholder:text-zinc-800 transition-all font-medium"
                                        />
                                    </div>
                                )}

                                {step === 8 && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                            {t("form.emailFocus")}
                                        </h2>
                                        <input
                                            autoFocus
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder={t("form.emailPlaceholder")}
                                            className="block w-full text-xl sm:text-2xl bg-transparent border-0 border-b border-zinc-800 p-0 pb-4 text-white focus:ring-0 focus:border-primary placeholder:text-zinc-800 transition-all font-medium"
                                        />
                                    </div>
                                )}

                                {step === 9 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{t("form.messageFocus")}</h2>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">{t("form.optional")}</span>
                                        </div>
                                        <textarea
                                            autoFocus
                                            name="message"
                                            rows={3}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder={t("form.messagePlaceholder")}
                                            className="block w-full text-lg sm:text-xl bg-transparent border-0 border-b border-zinc-800 p-0 pb-4 text-white focus:ring-0 focus:border-primary placeholder:text-zinc-800 transition-all resize-none font-medium"
                                        />
                                    </div>
                                )}

                                {/* Navigation & Help */}
                                <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-2">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="p-3 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all shadow-sm"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                        )}
                                        <div className="flex flex-col">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={isSubmitting}
                                                className="group relative flex items-center gap-3 bg-primary hover:bg-white text-zinc-950 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        {step === totalSteps ? t("form.submit") : t("form.next")}
                                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-zinc-600">
                                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                                            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">Enter</span>
                                            <span>{t("form.pressToProceed")}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Security Footer */}
                <div className="bg-zinc-950/50 px-8 py-4 border-t border-zinc-800/50 flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                        {t("form.security")}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    const t = useTranslations("Contact");

    return (
        <div className="bg-zinc-950 pt-32 pb-24 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                    >
                        {t("headline")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-lg leading-8 text-zinc-400"
                    >
                        {t("subheadline")}
                    </motion.p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </div>
    );
}
