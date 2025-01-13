import React from "react";
import { CustomMDX } from "@/mdx/custom-mdx";
import ProgressBar from "@/components/progress-bar";
import { formatDate } from "@/lib/format-date";
import { parseMDXContent } from "@/lib/parseMDX";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const Chapter = async ({
  params,
}: {
  params: Promise<{
    courseSlug: string;
    moduleSlug: string;
    lessonId: string;
  }>;
}) => {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
  });

  if (!lesson) {
    notFound();
  }

  const { metadata, content } = parseMDXContent(lesson.content);
  const blog = { metadata, content };

  return (
    <div className="min-h-screen w-full">
      {/* Progress bar */}
      <ProgressBar />
      {/* Main container with padding that adapts to screen size */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        {/* Header section */}
        <header className="space-y-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight break-words">
            {blog.metadata.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <time dateTime={blog.metadata.publishedAt}>
              {formatDate(blog.metadata.publishedAt)}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>{blog.metadata.author}</span>
          </div>

          {/* Summary section with responsive padding */}
          <div className="mt-4 prose prose-gray prose-sm sm:prose-base lg:prose-lg max-w-none">
            <p className="text-gray-600">{blog.metadata.summary}</p>
          </div>
        </header>

        {/* Main content */}
        <article className="prose prose-gray prose-sm sm:prose-base lg:prose-lg max-w-none">
          <CustomMDX source={blog.content} />
        </article>

        {/* Footer meta information */}
        <footer className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <time dateTime={blog.metadata.publishedAt}>
              {formatDate(blog.metadata.publishedAt)}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>{blog.metadata.author}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chapter;
