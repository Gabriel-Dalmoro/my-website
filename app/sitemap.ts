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

    // Fetch all posts from Sanity
    // We fetch slug and locale to build precise URLs
    const query = `*[_type == "post"] {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    locale
  }`;

    const posts = await client.fetch(query);

    const postRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/${post.locale || 'en'}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...routes, ...postRoutes];
}
