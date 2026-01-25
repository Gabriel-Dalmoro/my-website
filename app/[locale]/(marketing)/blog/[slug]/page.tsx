import { client, urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Link, redirect } from "@/i18n/routing";
import { ArrowLeft, Globe } from "lucide-react";
import ReadingProgress from "@/components/blog/ReadingProgress";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

// ... imports

// Helper to get post for metadata (lightweight query)
async function getPostForMetadata(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        title,
        excerpt,
        mainImage,
        publishedAt,
        _updatedAt,
        "author": author-> { name, image },
        locale
    }`;
    return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const post = await getPostForMetadata(slug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested article could not be found."
        };
    }

    const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : "/og-image.png";
    const canonicalUrl = `https://www.gabrieldalmoro.com/${locale}/blog/${slug}`;

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `https://www.gabrieldalmoro.com/en/blog/${slug}`,
                fr: `https://www.gabrieldalmoro.com/fr/blog/${slug}`,
            },
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishedAt,
            modifiedTime: post._updatedAt,
            authors: [post.author?.name || "Gabriel Dalmoro"],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
    };
}

// Main post query with full content
async function getPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        title,
        mainImage,
        publishedAt,
        content,
        type,
        excerpt,
        _updatedAt,
        locale,
        "author": author-> {
            name,
            image,
            bio
        }
    }`;
    return await client.fetch(query, { slug });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const post = await getPost(slug);
    const t = await getTranslations({ locale, namespace: "Blog.details" });

    if (!post) {
        // Only redirect if the slug is truly invalid (exists nowhere)
        redirect({ href: "/blog", locale });
    }

    const isLocaleMismatch = post.locale && post.locale !== locale;

    const ptComponents = {
        types: {
            image: ({ value }: any) => {
                if (!value?.asset?._ref) {
                    return null;
                }
                return (
                    <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || 'Blog image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                );
            },
        },
        block: {
            h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-zinc-950">{children}</h2>,
            h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-zinc-950">{children}</h3>,
            normal: ({ children }: any) => <p className="text-lg leading-relaxed text-zinc-700 mb-6">{children}</p>,
            blockquote: ({ children }: any) => (
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-zinc-800 bg-zinc-50 rounded-r-xl">
                    {children}
                </blockquote>
            ),
        },
    };

    return (
        <article className="bg-white min-h-screen pt-32 pb-24 text-zinc-900">
            <ReadingProgress />
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                {/* Back button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                </Link>

                {/* Locale Warning Banner */}
                {isLocaleMismatch && (
                    <div className="mb-12 p-4 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-start sm:items-center gap-4 text-yellow-800 animate-in slide-in-from-top-4 fade-in duration-500">
                        <div className="p-2 bg-yellow-100 rounded-full flex-shrink-0">
                            <Globe className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-medium">
                            {t("localeWarning", {
                                language: post.locale === 'fr' ? 'Français' : 'English'
                            })}
                        </p>
                    </div>
                )}

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-sm ${post.type === 'Adventure'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : post.type === 'Business'
                                ? 'bg-primary/10 text-primary-foreground border-primary/20'
                                : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                            }`}>
                            {post.type}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-zinc-300" />
                        <time className="text-sm font-semibold text-zinc-400">
                            {new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { dateStyle: 'long' })}
                        </time>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 mb-8 leading-[1.1]">
                        {post.title}
                    </h1>

                    {post.author && (
                        <div className="flex items-center gap-4 py-6 border-y border-zinc-100">
                            {post.author.image && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-bold text-zinc-950">{post.author.name}</p>
                                <p className="text-xs font-semibold text-zinc-400">Automation Expert & Adventurer</p>
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Image */}
                {post.mainImage && (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-zinc-200">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-zinc prose-lg max-w-none">
                    <PortableText value={post.content} components={ptComponents} />
                </div>

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.title,
                            datePublished: post.publishedAt,
                            dateModified: post._updatedAt || post.publishedAt,
                            description: post.excerpt,
                            image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
                            url: `https://www.gabrieldalmoro.com/${locale}/blog/${slug}`,
                            author: {
                                "@type": "Person",
                                name: post.author?.name || "Gabriel Dalmoro",
                            },
                        }),
                    }}
                />

                {/* Footer / Meta */}
                <footer className="mt-20 pt-10 border-t border-zinc-100">
                    <div className="bg-zinc-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 border border-zinc-100">
                        {post.author?.image && (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-none shadow-xl border-4 border-white">
                                <Image
                                    src={urlFor(post.author.image).url()}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl font-bold text-zinc-950 mb-2">About {post.author?.name}</h3>
                            <p className="text-zinc-600 mb-4 leading-relaxed">
                                {post.author?.bio || "A business automation expert sharing lessons from the digital trenches and the mountain peaks."}
                            </p>
                            <Link href="/about" className="text-primary font-bold hover:underline transition-all">
                                Learn more about my journey →
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </article>
    );
}
