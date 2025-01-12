import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface CourseType {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string | null;
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

    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20 animate-float"
          style={{
            left: `${(i * 237) % 100}%`,
            top: `${(i * 173) % 100}%`,
            animationDelay: `${-i * 0.2}s`,
            animationDuration: `${2 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  </div>
);

function CourseCard({ course }: { course: CourseType }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="relative group overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/80 to-background hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18c1.747 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {course.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {course.description}
          </p>
        </div>
        <div className="mt-8">
          <div className="inline-flex items-center space-x-2 text-sm font-medium text-primary relative">
            <span className="relative z-10">Start Learning</span>
            <ChevronRight className="w-4 h-4 relative z-10" />
            <div className="absolute inset-0 bg-primary/10 rounded-lg scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </Link>
  );
}

async function CourseList() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <ConnectorLines />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4 relative">
              Available Courses
              <div className="absolute -right-8 top-0 w-6 h-6 bg-primary/10 rounded-full animate-ping" />
            </h2>
            <p className="text-xl text-muted-foreground">
              Start your learning journey with our carefully crafted courses
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseList;
