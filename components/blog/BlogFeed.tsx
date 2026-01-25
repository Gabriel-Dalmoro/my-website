"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import FeaturedPost from "./FeaturedPost";
import Newsletter from "./Newsletter";
import PromoCard from "./PromoCard";
import FloatingCTA from "./FloatingCTA";

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

export default function BlogFeed({ posts }: { posts: Post[] }) {
    const t = useTranslations("Blog");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Business", "Adventure", "Journal"];

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.type === selectedCategory);

    // Magazine Logic: First post is Hero (if filtered results > 0)
    const heroPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    return (
        <div className="flex flex-col">
            {/* Category Tabs */}
            <div className="flex justify-center mb-16">
                <div className="flex p-1 bg-zinc-100/50 backdrop-blur-3xl rounded-full border border-zinc-200/50 shadow-sm relative">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${selectedCategory === category ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                                }`}
                        >
                            {selectedCategory === category && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white shadow-sm rounded-full border border-zinc-200/50"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{t(`categories.${category.toLowerCase()}`)}</span>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* 1. Hero Post */}
                        {heroPost && <FeaturedPost post={heroPost} />}

                        {/* 2. Standard Grid */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Inject Promo Card at index 0 (Visual Slot 2, after Hero) to ensure visibility with few posts */}
                            {gridPosts.map((post, index) => {
                                const isPromoSlot = index === 0; // Show immediately after hero

                                return (
                                    <>
                                        {isPromoSlot && (
                                            <div key="promo-card" className="block">
                                                <PromoCard />
                                            </div>
                                        )}
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            key={post.slug.current}
                                        >
                                            <Link
                                                href={`/blog/${post.slug.current}`}
                                                className="group flex flex-col items-start gap-4 rounded-3xl"
                                            >
                                                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-zinc-200/50 transition-all duration-500 border border-zinc-100">
                                                    {post.mainImage ? (
                                                        <Image
                                                            src={urlFor(post.mainImage).url()}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                                                            No Image
                                                        </div>
                                                    )}

                                                    {/* Glassmorphism Badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <div className={`px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-md border shadow-lg ${post.type === 'Adventure'
                                                            ? 'bg-blue-500/10 text-white border-white/20'
                                                            : post.type === 'Business'
                                                                ? 'bg-yellow-500/10 text-white border-white/20'
                                                                : 'bg-white/10 text-white border-white/20'
                                                            }`}>
                                                            {t(`categories.${post.type.toLowerCase()}`)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <h2 className="text-xl font-bold text-zinc-900 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                                        <span>{new Date(post.publishedAt).toLocaleDateString(post.locale === 'fr' ? 'fr-FR' : 'en-US', { dateStyle: 'medium' })}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    </>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <p className="text-zinc-400">{t("noPosts")}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Newsletter Section */}
            <Newsletter />

            {/* 4. Floating Conversion Button (Mobile/Tablet) */}
            <FloatingCTA />
        </div>
    );
}
