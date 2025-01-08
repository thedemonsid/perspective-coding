"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  Rocket,
  Star,
  Clock,
  Calendar,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Cloud } from "@/components/cloud";
import { formatDate } from "@/lib/format-date";
import ProgressBar from "./progress-bar";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  startDate: string;
}

interface HomePageProps {
  featuredCourses: Course[];
  upcomingCourses: Course[];
}

export default function HomePage({
  featuredCourses,
  upcomingCourses,
}: HomePageProps) {
  return (
    <>
      <Cloud position="top" className="z-10" />
      <ProgressBar></ProgressBar>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-b from-background via-background/90 to-background"
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <header className="space-y-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2"
            >
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4"
              >
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="font-mono text-primary">
                  Your CS Journey Starts Here
                </span>
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-6xl font-bold tracking-wider bg-gradient-to-r from-primary via-secondary-foreground to-primary bg-clip-text text-transparent">
                Master Computer Science
                <br />
                One Step at a Time
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Join thousands of 8th and 9th graders discovering the magic of
                coding through interactive lessons, fun projects, and supportive
                community.
              </p>
              <div className="flex gap-4">
                <Link href="/courses">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2"
                  >
                    Start Learning <Rocket className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold"
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </header>

          {/* Featured Courses */}
          <Section
            title="Featured Courses"
            icon={<Star className="w-6 h-6 text-yellow-400" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          </Section>

          {/* Latest Updates */}
          <Section
            title="What's New"
            icon={<Lightbulb className="w-6 h-6 text-primary" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpdateCard
                title="New Python Course Released!"
                date="2025-01-05"
                description="Master the basics of Python with our new interactive course designed specifically for beginners."
                icon={<BookOpen className="w-5 h-5" />}
              />
              <UpdateCard
                title="Weekend Coding Challenge"
                date="2025-01-12"
                description="Join our upcoming weekend challenge and build your first game using Scratch!"
                icon={<Trophy className="w-5 h-5" />}
              />
            </div>
          </Section>

          {/* Learning Path */}
          <Section
            title="Your Learning Path"
            icon={<Rocket className="w-6 h-6 text-primary" />}
          >
            <div className="relative flex flex-col md:flex-row gap-6 justify-between">
              <PathStep
                number={1}
                title="Start with Basics"
                description="Learn fundamental concepts through interactive lessons"
              />
              <PathStep
                number={2}
                title="Build Projects"
                description="Apply your knowledge by creating real projects"
              />
              <PathStep
                number={3}
                title="Join Challenges"
                description="Test your skills and compete with peers"
              />
            </div>
          </Section>
        </div>
      </motion.main>
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/courses/${course.id}`}>
        <article className="relative p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/50 transition-all h-full">
          <Badge variant="secondary" className="mb-4">
            {course.level}
          </Badge>
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(course.startDate)}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function UpdateCard({
  title,
  date,
  description,
  icon,
}: {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <article className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <Badge variant="secondary">{formatDate(date)}</Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </article>
    </motion.div>
  );
}

function PathStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          {number}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
