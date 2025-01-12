import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface LessonType {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  index: number;
  module: {
    id: string;
    name: string;
    course: {
      id: string;
      name: string;
    };
  };
}

export const metadata: Metadata = {
  title: "Lesson",
  description: "Lesson description",
};

const fetchLesson = async (slug: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  });
  return lesson;
};

const LessonPage = () => {
  const params = useParams();
  const { lessonslug } = params;
  const [lesson, setLesson] = useState<LessonType | null>(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      const data = await fetchLesson(lessonslug);
      if (!data) notFound();
      setLesson(data);
    };
    fetchLessonData();
  }, [lessonslug]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-4">{lesson.name}</h1>
      <p className="text-muted-foreground mb-8">{lesson.description}</p>

      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />

      <div className="mt-12">
        <Link href={`/lessons/previous-slug`} className="text-primary">
          Previous Lesson
        </Link>
        <Link href={`/lessons/next-slug`} className="text-primary float-right">
          Next Lesson
        </Link>
      </div>
    </section>
  );
};

export default LessonPage;
