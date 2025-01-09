import { prisma } from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const Course = async ({
  params,
}: {
  params: Promise<{ courseSlug: string; moduleSlug: string }>;
}) => {
  const { courseSlug, moduleSlug } = await params;
  const course = await prisma.course.findUnique({
    where: {
      slug: courseSlug,
    },
  });
  if (!course) {
    notFound();
  }
  //! Using name module1 because module is a reserved word
  const module1 = await prisma.module.findUnique({
    where: {
      slug_courseId: {
        slug: moduleSlug,
        courseId: course.id,
      },
    },
    include: {
      lessons: true,
    },
  });

  if (!module1) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-wotfard mt-12">
      <h1 className="text-4xl font-bold mb-4">{module1.name}</h1>
      <p className="text-gray-500 mb-2">{module1.description}</p>
      <p className="text-gray-500 mb-2">
        PublishedAt: {module1.createdAt.toLocaleDateString()}
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-4">Lessons</h2>
      <ul className="list-disc list-inside">
        {module1.lessons.map((lesson) => (
          <li key={lesson.id} className="mb-2">
            <Link
              className="text-blue-500 hover:underline"
              href={`/courses/${courseSlug}/${moduleSlug}/${lesson.id}`}
            >
              {lesson.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
