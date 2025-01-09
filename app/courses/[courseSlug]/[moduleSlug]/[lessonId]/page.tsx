import { CustomMDX } from "@/components/mdx/custom-mdx";
import ProgressBar from "@/components/progress-bar";
import { formatDate } from "@/lib/format-date";
import { parseMDXContent } from "@/lib/parseMDX";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

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
    <div className="max-w-4xl mx-auto p-6 font-wotfard">
      <ProgressBar />
      <h1 className="text-4xl font-bold mb-4">{blog.metadata.title} </h1>
      <p className="text-gray-500 mb-2">
        {formatDate(blog.metadata.publishedAt)}
        <span className="text-foreground px-2 mx-2">
          {blog.metadata.author}
        </span>
      </p>
      <p className="text-gray-700 mb-6">{blog.metadata.summary}</p>
      <article className="prose">
        <CustomMDX source={blog.content} />
      </article>
      <p className="text-gray-500 mb-2">
        {formatDate(blog.metadata.publishedAt)}
        <span className="text-foreground px-2 mx-2">
          {blog.metadata.author}
        </span>
      </p>
    </div>
  );
};

export default Chapter;
