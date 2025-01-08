import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Clock,
  Users,
  BookOpen,
  Sparkles,
  GraduationCap,
  ChevronRight,
  RocketIcon,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";

interface CourseProps {
  slug: string;
  title: string;
  enrollmentCount: number;
  chapterTotal: number;
  learnHours: number;
}

const hotCourses: CourseProps[] = [
  {
    slug: "python-adventure",
    title: "Python Adventure: Your First Coding Journey",
    enrollmentCount: 120,
    chapterTotal: 10,
    learnHours: 15,
  },
  {
    slug: "web-wizards",
    title: "Web Wizards: HTML & CSS and JS Basics to create fun on web",
    enrollmentCount: 95,
    chapterTotal: 8,
    learnHours: 12,
  },
];

const comingSoonCourses: CourseProps[] = [
  {
    slug: "game-dev-101",
    title: "Game Development 101: Create Your First Game",
    enrollmentCount: 0,
    chapterTotal: 5,
    learnHours: 8,
  },
  {
    slug: "app-inventors",
    title: "App Inventors: Mobile Development Basics",
    enrollmentCount: 0,
    chapterTotal: 7,
    learnHours: 10,
  },
];

export default async function CourseList() {
  const courses = await prisma.course.findMany();
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="px-4 py-1">
              <GraduationCap className="w-4 h-4 mr-2" />
              Learning Path
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-muted-foreground bg-clip-text text-transparent">
              Explore Our Courses
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Start your coding adventure with our specially designed courses
              for young developers. Learn at your own pace and build amazing
              projects!
            </p>
          </div>
        </header>

        <section className="mb-20 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              Popular Courses
            </h2>
            <Link
              href="/courses/all"
              className="text-primary hover:text-primary/80 flex items-center gap-2"
            >
              View all courses
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-lg hover:shadow-primary/5 relative bg-card/30 border-border/50 hover:border-primary/50 backdrop-blur-sm transition-all duration-500"
              >
                <CardContent className="p-8">
                  <Link
                    href={`/courses/${course.id}`}
                    className="block space-y-6"
                  >
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      Most Popular
                    </Badge>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {course.title}
                      </h2>

                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {/* <span>{course.enrollmentCount || ""} students</span> */}
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          {/* <span>{course.chapterTotal} chapters</span> */}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {/* <span>{course.learnHours} hours</span> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-primary group-hover:translate-x-2 transition-transform duration-300">
                      <Button variant="default" size="lg" className="text-lg">
                        Start learning
                      </Button>
                      <RocketIcon className="w-4 h-4" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Coming Soon
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {comingSoonCourses.map((course) => (
              <Card
                key={course.slug}
                className="group relative bg-primary/5 border-primary/20 backdrop-blur-sm transition-all duration-500"
              >
                <CardContent className="p-8">
                  <div className="block space-y-6">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      Coming Soon
                    </Badge>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-foreground">
                        {course.title}
                      </h2>

                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span>{course.chapterTotal} chapters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{course.learnHours} hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary">
                      Get notified when available
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
