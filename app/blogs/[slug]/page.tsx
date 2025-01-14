import React from "react";
import { getBlogPost } from "../utils";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/mdx/custom-mdx";
import { formatDate } from "@/lib/format-date";
import ProgressBar from "@/components/progress-bar";

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogPost(slug);
  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-wotfard pt-20">
      <ProgressBar />
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {blog.metadata.title}
        </h1>
        <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-500 mb-4">
          <time>{formatDate(blog.metadata.publishedAt)}</time>
          <span className="mx-2">•</span>
          <span className="text-foreground">{blog.metadata.author}</span>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          {blog.metadata.summary}
        </p>
      </header>

      <article className="prose prose-zinc dark:prose-invert max-w-none mb-8">
        <CustomMDX source={blog.content} />
      </article>

      <footer className="text-sm sm:text-base text-gray-500 pt-4 border-t">
        <time>{formatDate(blog.metadata.publishedAt)}</time>
        <span className="mx-2">•</span>
        <span className="text-foreground">{blog.metadata.author}</span>
      </footer>
    </div>
  );
};

export default Blog;
