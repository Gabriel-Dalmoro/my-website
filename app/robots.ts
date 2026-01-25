import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/studio", "/api/disable-draft", "/api/revalidate"],
        },
        sitemap: "https://www.gabrieldalmoro.com/sitemap.xml",
    };
}
