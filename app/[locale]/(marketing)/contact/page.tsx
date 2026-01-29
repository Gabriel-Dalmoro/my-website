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
    const tPricing = useTranslations("Pricing"); // Reuse Pricing translations
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        problem: "",
        hours: "",
        opportunity: "",
        tools: [] as string[],
        plan: "starter", // Default to starter or none? 'starter', 'custom', 'none'
        websiteAddon: false,
        name: "",
        email: "",
        message: ""
    });

    // Handle URL Params
    useEffect(() => {
        const planParam = searchParams.get('plan');
        const addonParam = searchParams.get('addon');

        if (planParam === 'starter' || planParam === 'custom') {
            setFormData(prev => ({ ...prev, plan: planParam }));
        }
        if (addonParam === 'website') {
            setFormData(prev => ({ ...prev, websiteAddon: true }));
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const setHours = (value: string) => {
        setFormData(prev => ({ ...prev, hours: value }));
    }

    const toggleTool = (value: string) => {
        setFormData(prev => {
            if (prev.tools.includes(value)) {
                return { ...prev, tools: prev.tools.filter(item => item !== value) };
            } else {
                return { ...prev, tools: [...prev.tools, value] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://n8n-production-ced7.up.railway.app/webhook-test/1a7dab8b-98a0-4536-881a-d7b52f73cb5c", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                    locale: searchParams.get('lang') || 'en'
                }),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error("Failed to submit");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Sorry, there was an error sending your application. Please try again or email me directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 1) {
            if (!formData.problem || !formData.hours || !formData.opportunity) {
                alert("Please fill in the required fields");
                return;
            }
        }
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4 lg:col-span-4 order-2 lg:order-1"
            >
                <div className="rounded-xl bg-zinc-900/30 p-5 border border-zinc-800/50 hover:border-zinc-700 transition-colors group">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" /> {t("info.emailLabel")}
                    </h3>
                    <a href="mailto:gabriel@gabrieldalmoro.com" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium break-all flex items-center gap-2 group-hover:text-primary">
                        {t("info.email")}
                    </a>
                </div>
                <div className="rounded-xl bg-zinc-900/30 p-5 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" /> {t("info.locationLabel")}
                    </h3>
                    <p className="text-zinc-200 text-sm font-medium leading-relaxed">
                        {t("info.location")}
                    </p>
                </div>
            </motion.div>

            {/* Multi-step Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-8 order-1 lg:order-2"
            >
                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden relative">
                    {/* Top Progress Line */}
                    <div className="h-1 w-full bg-zinc-800">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-yellow-400"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <div className="p-6 lg:p-8">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Application Received</h3>
                                <p className="text-zinc-400 max-w-xs">{t("form.success")}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <AnimatePresence mode="wait">
                                    {/* STEP 1: Qualification */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-white">
                                                    {t("form.fields.problem.label")} <span className="text-primary">*</span>
                                                </label>
                                                <textarea
                                                    name="problem"
                                                    rows={2}
                                                    required
                                                    value={formData.problem}
                                                    onChange={handleInputChange}
                                                    placeholder={t("form.fields.problem.placeholder")}
                                                    className="block w-full rounded-lg border-0 bg-zinc-950 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-800 placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-relaxed transition-all resize-none"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-white">
                                                    {t("form.fields.hours.label")} <span className="text-primary">*</span>
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {['1-5', '6-10', '11-20', '20+'].map((val) => (
                                                        <button
                                                            key={val}
                                                            type="button"
                                                            onClick={() => setHours(val)}
                                                            className={cn(
                                                                "relative flex items-center justify-center rounded-lg p-3 text-xs font-semibold transition-all border",
                                                                formData.hours === val
                                                                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                                                                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900"
                                                            )}
                                                        >
                                                            <Clock className={cn("w-3 h-3 mr-1.5", formData.hours === val ? "text-primary" : "text-zinc-600")} />
                                                            {t(`form.fields.hours.options.${val === '20+' ? 'critical' : val === '11-20' ? 'high' : val === '6-10' ? 'medium' : 'low'}`)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-white">
                                                    {t("form.fields.opportunity.label")} <span className="text-primary">*</span>
                                                </label>
                                                <textarea
                                                    name="opportunity"
                                                    rows={2}
                                                    required
                                                    value={formData.opportunity}
                                                    onChange={handleInputChange}
                                                    placeholder={t("form.fields.opportunity.placeholder")}
                                                    className="block w-full rounded-lg border-0 bg-zinc-950 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-800 placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-relaxed transition-all resize-none"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-white">
                                                    {t("form.fields.tools.label")}
                                                </label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {['google', 'invoice', 'crm', 'project', 'other'].map((toolKey) => (
                                                        <button
                                                            key={toolKey}
                                                            type="button"
                                                            onClick={() => toggleTool(toolKey)}
                                                            className={cn(
                                                                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-left transition-all border",
                                                                formData.tools.includes(toolKey)
                                                                    ? "bg-zinc-800 border-primary text-white"
                                                                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                                            )}
                                                        >
                                                            <span className="text-xs font-medium">{t(`form.fields.tools.options.${toolKey}`)}</span>
                                                            {formData.tools.includes(toolKey) && (
                                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <Button type="button" onClick={nextStep} size="sm" className="w-full sm:w-auto px-6 font-semibold">
                                                    {t("form.next")} <ChevronRight className="w-4 h-4 ml-1.5" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: Offer Selection */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-lg font-bold text-white mb-4">Select Your Plan</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Starter Plan */}
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, plan: 'starter' }))}
                                                    className={cn(
                                                        "relative flex flex-col items-start p-5 rounded-xl border transition-all text-left group hover:border-zinc-700",
                                                        formData.plan === 'starter'
                                                            ? "bg-zinc-800/80 border-primary shadow-lg ring-1 ring-primary/50"
                                                            : "bg-zinc-900/50 border-zinc-800"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between w-full mb-3">
                                                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                                                            <Rocket className="w-5 h-5" />
                                                        </div>
                                                        {formData.plan === 'starter' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                                    </div>
                                                    <h4 className="text-base font-bold text-white mb-1">{tPricing("cards.starter.headline")}</h4>
                                                    <p className="text-xs text-zinc-400 mb-2">{tPricing("cards.starter.price")}</p>
                                                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                                                        {tPricing("cards.starter.goal")}
                                                    </p>
                                                </button>

                                                {/* Custom Plan */}
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, plan: 'custom' }))}
                                                    className={cn(
                                                        "relative flex flex-col items-start p-5 rounded-xl border transition-all text-left group hover:border-zinc-700",
                                                        formData.plan === 'custom'
                                                            ? "bg-zinc-800/80 border-white shadow-lg ring-1 ring-white/50"
                                                            : "bg-zinc-900/50 border-zinc-800"
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between w-full mb-3">
                                                        <div className="p-2 rounded-lg bg-white/10 text-white">
                                                            <Settings2 className="w-5 h-5" />
                                                        </div>
                                                        {formData.plan === 'custom' && <CheckCircle2 className="w-5 h-5 text-white" />}
                                                    </div>
                                                    <h4 className="text-base font-bold text-white mb-1">{tPricing("cards.custom.headline")}</h4>
                                                    <p className="text-xs text-zinc-400 mb-2">{tPricing("cards.custom.price")}</p>
                                                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                                                        {tPricing("cards.custom.goal")}
                                                    </p>
                                                </button>
                                            </div>

                                            {/* Website Addon */}
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, websiteAddon: !prev.websiteAddon }))}
                                                className={cn(
                                                    "flex items-center w-full rounded-xl px-4 py-4 text-left transition-all border group",
                                                    formData.websiteAddon
                                                        ? "bg-zinc-800/50 border-blue-500/50 ring-1 ring-blue-500/20"
                                                        : "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700"
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-5 w-5 rounded border flex items-center justify-center mr-4 transition-colors flex-shrink-0",
                                                    formData.websiteAddon ? "bg-blue-500 border-blue-500 text-white" : "border-zinc-600 bg-zinc-900 text-transparent group-hover:border-zinc-500"
                                                )}>
                                                    <CheckSquare className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                                                        <span className={cn("text-sm font-semibold", formData.websiteAddon ? "text-white" : "text-zinc-300")}>
                                                            {t("form.fields.website")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>

                                            <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                                                <Button type="button" variant="ghost" size="sm" onClick={prevStep} className="w-full sm:w-auto text-zinc-400 hover:text-white">
                                                    <ChevronLeft className="w-4 h-4 mr-1.5" /> {t("form.back")}
                                                </Button>
                                                <Button type="button" onClick={nextStep} size="sm" className="w-full sm:w-auto px-6 font-semibold">
                                                    {t("form.next")} <ChevronRight className="w-4 h-4 ml-1.5" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: Details */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="block text-xs font-medium text-zinc-400">
                                                        {t("form.fields.name")} <span className="text-primary">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="block w-full rounded-lg border-0 bg-zinc-950 p-3 text-white shadow-sm ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-xs font-medium text-zinc-400">
                                                        {t("form.fields.email")} <span className="text-primary">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="block w-full rounded-lg border-0 bg-zinc-950 p-3 text-white shadow-sm ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-xs font-medium text-zinc-400">
                                                    {t("form.fields.message")}
                                                </label>
                                                <textarea
                                                    name="message"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-lg border-0 bg-zinc-950 p-3 text-white shadow-sm ring-1 ring-inset ring-zinc-800 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm resize-none"
                                                />
                                            </div>

                                            <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                                                <Button type="button" variant="ghost" size="sm" onClick={prevStep} className="w-full sm:w-auto text-zinc-400 hover:text-white">
                                                    <ChevronLeft className="w-4 h-4 mr-1.5" /> {t("form.back")}
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    size="sm"
                                                    className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base min-w-[180px]"
                                                >
                                                    {isSubmitting ? (
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                            <span>{t("form.submitting")}</span>
                                                        </div>
                                                    ) : (
                                                        t("form.submit")
                                                    )}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Security Footer */}
                                <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                    <ShieldCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                                        {t("form.security")}
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
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
