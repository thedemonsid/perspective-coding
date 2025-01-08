const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.course.createMany({
    data: [
      {
        title: "Introduction to Markdown",
        description:
          "Learn how to use MDX to create dynamic content with JSX and Markdown",
      },
      {
        title: "React Fundamentals",
        description: "Master the core concepts of React development",
      },
      {
        title: "Next.js Advanced Patterns",
        description: "Deep dive into Next.js framework features and patterns",
      },
      {
        title: "TypeScript for JavaScript Developers",
        description:
          "Learn TypeScript to write more maintainable JavaScript code",
      },
      {
        title: "Full-Stack Development with Prisma",
        description: "Build modern applications with Prisma ORM",
      },
    ],
  });

  // Create chapters after courses are created
  const courses = await prisma.course.findMany();

  for (const course of courses) {
    await prisma.chapter.createMany({
      data: [
        {
          title: "Chapter 1",
          content: `---
title: Introduction to ${course.title}
publishedAt: "2024-03-20"
summary: Learn the basics
category: Web Development
author: Course Team
---

Dive into the basics of ${course.title} and get started on your learning journey!`,
          courseId: course.id,
        },
        {
          title: "Chapter 2",
          content: `---
title: Advanced Concepts in ${course.title}
publishedAt: "2024-03-27"
summary: Level up your skills
category: Web Development
author: Course Team
---

Take your understanding of ${course.title} to the next level with advanced topics.`,
          courseId: course.id,
        },
        {
          title: "Chapter 3",
          content: `---
title: Practical Use Cases of ${course.title}
publishedAt: "2024-04-03"
summary: Apply what you learn
category: Web Development
author: Course Team
---

Discover how ${course.title} is used in real-world projects.`,
          courseId: course.id,
        },
        {
          title: "Chapter 4",
          content: `---
title: Common Pitfalls in ${course.title}
publishedAt: "2024-04-10"
summary: Avoid the common mistakes
category: Web Development
author: Course Team
---

Learn how to identify and avoid common mistakes in ${course.title}.`,
          courseId: course.id,
        },
        {
          title: "Chapter 5",
          content: `---
title: Tools and Extensions for ${course.title}
publishedAt: "2024-04-17"
summary: Enhance your productivity
category: Web Development
author: Course Team
---

Explore the best tools and extensions to maximize your productivity in ${course.title}.`,
          courseId: course.id,
        },
        {
          title: "Chapter 6",
          content: `---
title: Mastery of ${course.title}
publishedAt: "2024-04-24"
summary: Become an expert
category: Web Development
author: Course Team
---

Capstone content to help you become a true expert in ${course.title}.`,
          courseId: course.id,
        },
      ],
    });
  }

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
