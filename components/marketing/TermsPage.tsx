"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ScrollText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
    const t = useTranslations("Terms");

    return (
        <main className="bg-zinc-950 min-h-screen pt-28 pb-20">
            {/* Subtle background gradient */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(234,179,8,0.04)_0%,_transparent_60%)]" />

            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors mb-10 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    {t("backHome")}
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <ScrollText className="w-3.5 h-3.5" />
                        {t("badge")}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                        {t("title")}
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        {t("lastUpdated")}: <span className="text-zinc-400">{t("lastUpdatedDate")}</span>
                    </p>
                </div>

                {/* Intro */}
                <div className="mb-10 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm leading-relaxed">
                    {t("intro")}
                </div>

                {/* Sections */}
                <div className="space-y-0">
                    {/* 1. Services */}
                    <Section number="1">
                        <SectionTitle>{t("sections.services.title")}</SectionTitle>
                        <Paragraph>{t("sections.services.content")}</Paragraph>
                    </Section>

                    {/* 2. Acceptance */}
                    <Section number="2">
                        <SectionTitle>{t("sections.acceptance.title")}</SectionTitle>
                        <Paragraph>{t("sections.acceptance.content")}</Paragraph>
                    </Section>

                    {/* 3. Client Obligations */}
                    <Section number="3">
                        <SectionTitle>{t("sections.obligations.title")}</SectionTitle>
                        <Paragraph>{t("sections.obligations.intro")}</Paragraph>
                        <ul className="mt-4 space-y-2">
                            {(t.raw("sections.obligations.items") as string[]).map((item: string, i: number) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </ul>
                    </Section>

                    {/* 4. Payment */}
                    <Section number="4">
                        <SectionTitle>{t("sections.payment.title")}</SectionTitle>
                        <Paragraph>{t("sections.payment.content")}</Paragraph>
                        <ul className="mt-4 space-y-2">
                            {(t.raw("sections.payment.items") as string[]).map((item: string, i: number) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </ul>
                    </Section>

                    {/* 5. Intellectual Property */}
                    <Section number="5">
                        <SectionTitle>{t("sections.ip.title")}</SectionTitle>
                        <Paragraph>{t("sections.ip.content")}</Paragraph>
                    </Section>

                    {/* 6. Confidentiality */}
                    <Section number="6">
                        <SectionTitle>{t("sections.confidentiality.title")}</SectionTitle>
                        <Paragraph>{t("sections.confidentiality.content")}</Paragraph>
                    </Section>

                    {/* 7. Guarantee */}
                    <Section number="7">
                        <SectionTitle>{t("sections.guarantee.title")}</SectionTitle>
                        <Paragraph>{t("sections.guarantee.content")}</Paragraph>
                    </Section>

                    {/* 8. Limitation of Liability */}
                    <Section number="8">
                        <SectionTitle>{t("sections.liability.title")}</SectionTitle>
                        <Paragraph>{t("sections.liability.content")}</Paragraph>
                    </Section>

                    {/* 9. Termination */}
                    <Section number="9">
                        <SectionTitle>{t("sections.termination.title")}</SectionTitle>
                        <Paragraph>{t("sections.termination.content")}</Paragraph>
                    </Section>

                    {/* 10. Governing Law */}
                    <Section number="10">
                        <SectionTitle>{t("sections.law.title")}</SectionTitle>
                        <Paragraph>{t("sections.law.content")}</Paragraph>
                    </Section>

                    {/* 11. Modifications */}
                    <Section number="11">
                        <SectionTitle>{t("sections.modifications.title")}</SectionTitle>
                        <Paragraph>{t("sections.modifications.content")}</Paragraph>
                    </Section>

                    {/* 12. Contact */}
                    <Section number="12" last>
                        <SectionTitle>{t("sections.contact.title")}</SectionTitle>
                        <Paragraph>{t("sections.contact.content")}</Paragraph>
                        <a
                            href="mailto:gabriel@gabrieldalmoro.com"
                            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                        >
                            gabriel@gabrieldalmoro.com
                        </a>
                    </Section>
                </div>

                {/* Footer note */}
                <div className="border-t border-zinc-800 pt-8 mt-8">
                    <p className="text-zinc-600 text-xs text-center">
                        {t("footerNote")}
                    </p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link href="/legal" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                            {t("viewLegal")}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Section({ children, number, last = false }: { children: React.ReactNode; number: string; last?: boolean }) {
    return (
        <div className={`mb-8 pb-8 ${!last ? "border-b border-zinc-800/60" : ""}`}>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-black mt-0.5">
                    {number}
                </div>
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-base font-bold text-white mb-3">
            {children}
        </h2>
    );
}

function Paragraph({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={`text-zinc-400 text-sm leading-relaxed ${className}`}>
            {children}
        </p>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2.5 text-sm text-zinc-400">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
            {children}
        </li>
    );
}
