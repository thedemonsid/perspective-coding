import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface LessonType {
  id: string;
  name: string;
}

const ConnectorLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute w-full h-full" style={{ zIndex: -1 }}>
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="currentColor"
            className="stroke-primary/5"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {[...Array(3)].map((_, i) => (
        <path
          key={i}
          d={`M ${-50 + i * 400},${50 + i * 100} C ${100 + i * 400},${
            150 + i * 100
          } ${200 + i * 400},${50 + i * 100} ${300 + i * 400},${150 + i * 100}`}
          className="stroke-primary/10 animate-dash"
          fill="none"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
      ))}
    </svg>
  </div>
);

function LessonCard({
  lesson,
  courseSlug,
  moduleSlug,
}: {
  lesson: LessonType;
  courseSlug: string;
  moduleSlug: string;
}) {
  return (
    <Link
      href={`/courses/${courseSlug}/${moduleSlug}/${lesson.id}`}
      className="relative group overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/80 to-background hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {lesson.name}
        </h3>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </Link>
  );
}

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
    <section className="relative py-20 overflow-hidden">
      <ConnectorLines />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 relative">
            {module1.name}
            <div className="absolute -right-8 top-0 w-6 h-6 bg-primary/10 rounded-full animate-ping" />
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            {module1.description}
          </p>
          <p className="text-sm text-muted-foreground">
            Published on {module1.createdAt.toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {module1.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              courseSlug={courseSlug}
              moduleSlug={moduleSlug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Course;
