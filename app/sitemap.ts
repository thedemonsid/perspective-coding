import { MetadataRoute } from "next";
import { getBlogPosts } from "./blogs/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const posts = await getBlogPosts();
  const baseUrl = "https://vdsidously.com";

  // Generate blog post URLs
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "never" as const,
    priority: 0.8,
  }));

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Get unique categories and add category pages
  const categories = [...new Set(posts.map((post) => post.metadata.category))];
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/blogs/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogUrls, ...categoryUrls];
}
