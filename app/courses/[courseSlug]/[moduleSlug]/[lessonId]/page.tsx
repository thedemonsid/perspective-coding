import React from "react";
import { CustomMDX } from "@/mdx/custom-mdx";
import ProgressBar from "@/components/progress-bar";
import { formatDate } from "@/lib/format-date";
import { parseMDXContent } from "@/lib/parseMDX";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ChapterParams {
  courseSlug: string;
  moduleSlug: string;
  lessonId: string;
}

const Chapter = async ({ params }: { params: Promise<ChapterParams> }) => {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    notFound();
  }

  const { metadata, content } = parseMDXContent(lesson.content);
  const blog = { metadata, content };

  return (
    <div className="min-h-screen">
      <ProgressBar />

      <div className="max-w-6xl mx-auto p-6 font-wotfard pt-16">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.metadata.title}</h1>
          <p className="text-gray-500 mb-2">
            {formatDate(blog.metadata.publishedAt)}
            <span className="text-foreground px-2 mx-2">
              {blog.metadata.author}
            </span>
          </p>
          <p className="text-gray-700">{blog.metadata.summary}</p>
        </header>

        <article className="prose max-w-none mb-8 [&>*]:mb-6 [&_pre]:mb-8 [&_pre]:mt-8 [&_.game-component]:my-12 [&_h2]:mt-12 [&_h3]:mt-8">
          <CustomMDX source={blog.content} />
        </article>

        <footer className="border-t pt-6">
          <p className="text-gray-500">
            {formatDate(blog.metadata.publishedAt)}
            <span className="text-foreground px-2 mx-2">
              {blog.metadata.author}
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Chapter;
