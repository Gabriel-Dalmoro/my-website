import { getTranslations } from "next-intl/server";
import { client } from "@/lib/sanity.client";
import BlogFeed from "@/components/blog/BlogFeed";

export const revalidate = 60; // revalidate every minute

async function getPosts() {
    // Fetch ALL posts regardless of locale
    const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        mainImage,
        type,
        excerpt,
        publishedAt,
        locale,
        "author": author-> {
            name,
            image
        }
    }`;
    return await client.fetch(query);
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const posts = await getPosts();
    const t = await getTranslations({ locale, namespace: "Blog" });

    return (
        <div className="bg-white min-h-screen pt-32 pb-24 text-zinc-900 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-zinc-950 mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg leading-relaxed text-zinc-600 whitespace-pre-line">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-8">
                    <BlogFeed posts={posts} />
                </div>
            </div>
        </div>
    );
}
