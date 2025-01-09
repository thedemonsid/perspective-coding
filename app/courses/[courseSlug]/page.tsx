import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const Course = async ({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) => {
  const { courseSlug } = await params;
  const course = await prisma.course.findUnique({
    where: {
      slug: courseSlug,
    },
    include: {
      modules: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-wotfard mt-12">
      <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
      <p className="text-gray-500 mb-2">{course.description}</p>
      <p className="text-gray-500 mb-2">
        PublishedAt: {course.createdAt.toLocaleDateString()}
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-4">Modules</h2>
      <ul className="list-disc list-inside">
        {course.modules.map((module) => (
          <li key={module.id} className="mb-2">
            <Link
              className="text-blue-500 hover:underline"
              href={`/courses/${courseSlug}/${module.slug}`}
            >
              {module.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
