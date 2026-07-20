import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/host99"],
    },
    sitemap: "https://bwpsoftware.com/sitemap.xml",
  };
}
