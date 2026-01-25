"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Post = {
    title: string;
    slug: { current: string };
    mainImage: any;
    type: string;
    excerpt: string;
    publishedAt: string;
    locale: string;
    author?: { name: string; image: any };
};

export default function FeaturedPost({ post }: { post: Post }) {
    const t = useTranslations("Blog");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl mb-12"
        >
            <div className="absolute inset-0 z-0">
                {post.mainImage && (
                    <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end min-h-[350px] sm:min-h-[400px]">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full border shadow-lg uppercase tracking-wider ${post.type === 'Adventure'
                            ? 'bg-blue-500 text-white border-blue-400'
                            : post.type === 'Business'
                                ? 'bg-yellow-500 text-black border-yellow-400'
                                : 'bg-white text-zinc-900 border-zinc-200'
                            }`}>
                            {t(`categories.${post.type.toLowerCase()}`)}
                        </span>
                        <span className="text-zinc-300 text-xs sm:text-sm font-semibold">
                            {new Date(post.publishedAt).toLocaleDateString(post.locale === 'fr' ? 'fr-FR' : 'en-US', { dateStyle: 'long' })}
                        </span>
                    </div>

                    <Link href={`/blog/${post.slug.current}`} className="group/title block">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-3 group-hover/title:text-yellow-400 transition-colors">
                            {post.title}
                        </h2>
                    </Link>

                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5 max-w-lg line-clamp-2">
                        {post.excerpt}
                    </p>

                    <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-flex items-center gap-2 text-white font-bold text-sm sm:text-base hover:text-yellow-400 transition-colors group/btn"
                    >
                        {t("hero.readStory")}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
