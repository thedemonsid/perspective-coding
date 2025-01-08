import { CustomMDX } from "@/components/mdx/custom-mdx";
import ProgressBar from "@/components/progress-bar";
import { formatDate } from "@/lib/format-date";
import { parseMDXContent } from "@/lib/parseMDX";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const Chapter = async () => {
  const chapters = await prisma.chapter.findMany();
  const chapter = chapters[0];
  if (!chapter) {
    notFound();
  }
  const { metadata, content } = parseMDXContent(chapter.content);

  const blog = { metadata, content };
  console.log(metadata);

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
