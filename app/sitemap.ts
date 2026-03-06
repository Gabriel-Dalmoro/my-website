import { MetadataRoute } from "next";
import { client } from "@/lib/sanity.client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.gabrieldalmoro.com";

    // Static routes for both locales
    const routes = ["", "/about", "/blog", "/pricing", "/contact"].flatMap((route) => [
        {
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: route === "" ? 1 : 0.8,
        },
        {
            url: `${baseUrl}/fr${route}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: route === "" ? 1 : 0.8,
        },
    ]);

    const legalRoutes = ["/legal", "/terms"].flatMap((route) => [
        {
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/fr${route}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
    ]);

    // Fetch all posts from Sanity
    // We fetch slug and locale to build precise URLs
    const query = `*[_type == "post"] {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    locale
  }`;

    let postRoutes: any[] = [];

    try {
        const posts = await client.fetch(query);
        postRoutes = posts.map((post: any) => ({
            url: `${baseUrl}/${post.locale || 'en'}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Failed to fetch blog posts for sitemap:", error);
        // Continue with static routes only if Sanity fails (e.g. missing env vars during build)
    }

    return [...routes, ...legalRoutes, ...postRoutes];
}
