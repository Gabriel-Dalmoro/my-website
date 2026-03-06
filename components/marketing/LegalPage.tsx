"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Shield, ArrowLeft, Mail, MapPin, Globe } from "lucide-react";

export default function LegalPage() {
    const t = useTranslations("Legal");

    return (
        <main className="bg-zinc-950 min-h-screen pt-28 pb-20">
            {/* Subtle background gradient */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(20,83,45,0.06)_0%,_transparent_60%)]" />

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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Shield className="w-3.5 h-3.5" />
                        GDPR Compliant
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                        {t("title")}
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        {t("lastUpdated")}: <span className="text-zinc-400">{t("lastUpdatedDate")}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="prose-legal">
                    {/* Identity */}
                    <Section>
                        <SectionTitle>{t("sections.identity.title")}</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <InfoCard icon={<Globe className="w-4 h-4" />} label={t("sections.identity.site")} value="gabrieldalmoro.com" />
                            <InfoCard icon={<Mail className="w-4 h-4" />} label={t("sections.identity.email")} value="gabriel@gabrieldalmoro.com" />
                            <InfoCard icon={<MapPin className="w-4 h-4" />} label={t("sections.identity.location")} value="Annecy, France" />
                            <InfoCard icon={<Shield className="w-4 h-4" />} label={t("sections.identity.status")} value={t("sections.identity.statusValue")} />
                        </div>
                    </Section>

                    {/* Data Controller */}
                    <Section>
                        <SectionTitle>{t("sections.dataController.title")}</SectionTitle>
                        <Paragraph>{t("sections.dataController.content")}</Paragraph>
                    </Section>

                    {/* Data Collected */}
                    <Section>
                        <SectionTitle>{t("sections.dataCollected.title")}</SectionTitle>
                        <Paragraph>{t("sections.dataCollected.intro")}</Paragraph>
                        <ul className="mt-4 space-y-2">
                            {(t.raw("sections.dataCollected.items") as string[]).map((item: string, i: number) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </ul>
                    </Section>

                    {/* Purpose & Legal Basis */}
                    <Section>
                        <SectionTitle>{t("sections.purpose.title")}</SectionTitle>
                        <Paragraph>{t("sections.purpose.intro")}</Paragraph>
                        <ul className="mt-4 space-y-2">
                            {(t.raw("sections.purpose.items") as string[]).map((item: string, i: number) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </ul>
                    </Section>

                    {/* Data Retention */}
                    <Section>
                        <SectionTitle>{t("sections.retention.title")}</SectionTitle>
                        <Paragraph>{t("sections.retention.content")}</Paragraph>
                    </Section>

                    {/* Data Sharing */}
                    <Section>
                        <SectionTitle>{t("sections.sharing.title")}</SectionTitle>
                        <Paragraph>{t("sections.sharing.intro")}</Paragraph>
                        <ul className="mt-4 space-y-2">
                            {(t.raw("sections.sharing.items") as string[]).map((item: string, i: number) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </ul>
                        <Paragraph className="mt-4">{t("sections.sharing.note")}</Paragraph>
                    </Section>

                    {/* Your Rights */}
                    <Section>
                        <SectionTitle>{t("sections.rights.title")}</SectionTitle>
                        <Paragraph>{t("sections.rights.intro")}</Paragraph>
                        <ul className="mt-4 space-y-2">
                            {(t.raw("sections.rights.items") as string[]).map((item: string, i: number) => (
                                <ListItem key={i}>{item}</ListItem>
                            ))}
                        </ul>
                        <Paragraph className="mt-4">{t("sections.rights.exercise")}</Paragraph>
                        <a
                            href="mailto:gabriel@gabrieldalmoro.com"
                            className="inline-flex items-center gap-2 mt-3 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            gabriel@gabrieldalmoro.com
                        </a>
                    </Section>

                    {/* Cookies */}
                    <Section>
                        <SectionTitle>{t("sections.cookies.title")}</SectionTitle>
                        <Paragraph>{t("sections.cookies.content")}</Paragraph>
                    </Section>

                    {/* Hosting */}
                    <Section>
                        <SectionTitle>{t("sections.hosting.title")}</SectionTitle>
                        <Paragraph>{t("sections.hosting.content")}</Paragraph>
                        <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 space-y-1">
                            <p className="font-semibold text-zinc-300">Vercel Inc.</p>
                            <p>340 Pine Street, Suite 701</p>
                            <p>San Francisco, CA 94104, USA</p>
                            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs block mt-2">
                                vercel.com/legal/privacy-policy
                            </a>
                        </div>
                    </Section>

                    {/* Contact DPA */}
                    <Section>
                        <SectionTitle>{t("sections.complaints.title")}</SectionTitle>
                        <Paragraph>{t("sections.complaints.content")}</Paragraph>
                        <a
                            href="https://www.cnil.fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                            CNIL — cnil.fr
                        </a>
                    </Section>

                    {/* Divider */}
                    <div className="border-t border-zinc-800 pt-8 mt-8">
                        <p className="text-zinc-600 text-xs text-center">
                            {t("footerNote")}
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                                {t("viewTerms")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Section({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-10 pb-10 border-b border-zinc-800/60 last:border-0 last:mb-0 last:pb-0">
            {children}
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2 before:content-[''] before:block before:w-1 before:h-5 before:bg-primary before:rounded-full">
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

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-primary mt-0.5">{icon}</div>
            <div>
                <p className="text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-zinc-300 text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}
