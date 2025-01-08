const  { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create a course
  const course = await prisma.course.create({
    data: {
      title: "Introduction to MDX",
      description: "A course about using MDX in your projects",
      Chapter: {
        create: [
          {
            index: 1,
            title: "Chapter 1: Getting Started",
            content: `
            ---
            title: "Hello World"
            publishedAt: "2021-07-10"
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
            <input type="checkbox" id="checkbox" name="checkbox" value="checkbox">
            <label for="checkbox">Label</label>
            \`\`\`

            ## You can find more information on [MDX documentation](https://mdxjs.com/).

            <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
            - [ ] This is a complete item
            - [ ] This is an incomplete item
            - [x] This is a complete item
            <ul>
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>

            <a href="https://example.com">This is a link</a>

            > This is a blockquote following a header.
            > Siddhesh Rahul Shrriame
            `,
          },
        ],
      },
    },
  });

  console.log({ course });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
