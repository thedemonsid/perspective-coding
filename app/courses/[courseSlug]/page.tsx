import React from "react";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface ModuleType {
  id: string;
  name: string;
  slug: string;
  description: string;
  index: number;
  isFree: boolean;
  _count: {
    lessons: number;
  };
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

function ModuleCard({
  module,
  courseSlug,
}: {
  module: ModuleType;
  courseSlug: string;
}) {
  return (
    <Link
      href={`/courses/${courseSlug}/${module.slug}`}
      className="relative group overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/80 to-background hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-xl font-bold text-primary">
              {module.index}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {module.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {module.description}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4 mr-2" />
            {module._count.lessons} lessons
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </Link>
  );
}

async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        orderBy: { index: "asc" },
        include: {
          _count: {
            select: { lessons: true },
          },
        },
      },
    },
  });

  if (!course) return null;

  return (
    <section className="relative py-20 overflow-hidden">
      <ConnectorLines />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 relative">
            {course.name}
            <div className="absolute -right-8 top-0 w-6 h-6 bg-primary/10 rounded-full animate-ping" />
          </h1>
          <p className="text-xl text-muted-foreground">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {course.modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              courseSlug={courseSlug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursePage;
