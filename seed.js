const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create courses
  const courses = await prisma.course.createMany({
    data: [
      {
        name: "Introduction to Markdown",
        slug: "introduction-to-markdown",
        description:
          "Learn how to use MDX to create dynamic content with JSX and Markdown",
      },
      {
        name: "React Fundamentals",
        slug: "react-fundamentals",
        description: "Master the core concepts of React development",
      },
      {
        name: "Next.js Advanced Patterns",
        slug: "nextjs-advanced-patterns",
        description: "Deep dive into Next.js framework features and patterns",
      },
      {
        name: "TypeScript for JavaScript Developers",
        slug: "typescript-for-javascript-developers",
        description:
          "Learn TypeScript to write more maintainable JavaScript code",
      },
      {
        name: "Full-Stack Development with Prisma",
        slug: "full-stack-development-with-prisma",
        description: "Learn how to use Prisma for full-stack development",
      },
    ],
  });

  // Create modules for the first course
  const course = await prisma.course.findUnique({
    where: { slug: "introduction-to-markdown" },
  });

  const modules = await prisma.module.createMany({
    data: [
      {
        name: "Getting Started with Markdown",
        slug: "getting-started-with-markdown",
        description: "Introduction to Markdown syntax and usage",
        courseId: course.id,
        index: 1,
        isFree: true,
      },
      {
        name: "Advanced Markdown Techniques",
        slug: "advanced-markdown-techniques",
        description: "Learn advanced Markdown techniques",
        courseId: course.id,
        index: 2,
        isFree: false,
      },
    ],
  });

  // Create lessons for the first module
  const module = await prisma.module.findUnique({
    where: {
      slug_courseId: {
        slug: "getting-started-with-markdown",
        courseId: course.id,
      },
    },
  });
  const mdxContent = `
---
title : Hello World
publishedAt: 2021-07-10
summary: "This is a Demo Blog for the testing purposes"
category: "Hello"
author: "the_demon_sid"
---

# Hello World

A checkbox is a square box that can be activated or deactivated when ticked.
Use checkboxes to select one or more options from a list of choices.

<MyComponent/>
\`\`\`javascript
import { Checkbox } from '@react-spectrum/checkbox';

function Example() {
  return <Checkbox>Label</Checkbox>;
}
\`\`\`
\`\`\`jsx
<Checkbox>Label</Checkbox>
\`\`\`
\`\`\`html
<input type="checkbox" id="checkbox" name="checkbox" value="checkbox">
<label for="checkbox">Label</label>
\`\`\`

A checkbox is a square box that can be activated or deactivated when ticked.

Use checkboxes to select one or more options from a list of choices.

\`\`\`javascript
import { Checkbox } from '@react-spectrum/checkbox';

function Example() {
  return <Checkbox>Label</Checkbox>;
}
\`\`\`
\`\`\`jsx
<Checkbox>Label</Checkbox>
\`\`\`
\`\`\`html
<input type="checkbox" id="checkbox" name="checkboxconst mdxContent
# Hello World

A checkbox is a square box that can be activated or deactivated when ticked.
Use checkboxes to select one or more options from a list of choices.

<MyComponent/>
\`\`\`javascript
import { Checkbox } from '@react-spectrum/checkbox';

function Example() {
  return <Checkbox>Label</Checkbox>;
}
\`\`\`
\`\`\`jsx
<Checkbox>Label</Checkbox>
\`\`\`
\`\`\`html
<input type="checkbox" id="checkbox" name="checkbox" value="checkbox">
<label for="checkbox">Label</label>
\`\`\`

A checkbox is a square box that can be activated or deactivated when ticked.

Use checkboxes to select one or more options from a list of choices.

\`\`\`javascript
import { Checkbox } from '@react-spectrum/checkbox';

function Example() {
  return <Checkbox>Label</Checkbox>;
}
\`\`\`
\`\`\`jsx
<Checkbox>Label</Checkbox>
\`\`\`
\`\`\`html
<input type="checkbox" id="checkbox" name="checkbox`;
  const lessons = await prisma.lesson.createMany({
    data: [
      {
        name: "Introduction to Markdown",
        slug: "introduction-to-markdown",
        description: "Learn the basics of Markdown",
        content: mdxContent,
        moduleId: module.id,
        index: 1,
      },
      {
        name: "Markdown Syntax",
        slug: "markdown-syntax",
        description: "Learn the syntax of Markdown",
        content: mdxContent,
        moduleId: module.id,
        index: 2,
      },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
