import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/gallery", "/artists", "/experience", "/booking", "/contact", "/journal", "/privacy"];
  return routes.map((route) => ({
    url: `https://lauxirio.example${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
