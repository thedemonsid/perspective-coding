// app/blogs/page.tsx
import BlogsList from "@/components/blog-list";
import { getBlogPosts } from "./utils";
import { notFound } from "next/navigation";

export default async function BlogsPage() {
  const blogs = await getBlogPosts();
  if (!blogs || blogs.length == 0) {
    notFound();
  }
  return <BlogsList blogs={blogs} />;
}
