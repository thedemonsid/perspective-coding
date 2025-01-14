import { MDXRemote } from "next-mdx-remote/rsc";

import { Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";
import { CodeBlock } from "./code-block";
import MyComponent from "./my-component";
import { cn } from "@/lib/utils";
import ServiceMatchGame from "@/mdx/match-the-pairs";
import Quizcomponent from "./quizcomponent";
import InfoCard from "./doyouknowcard";
import PacketJourneyDemo from "./how-web-works/module-2/packet-journey";
import PacketRoutingGame from "./how-web-works/module-2/find-route";
import HomeNetworkFinder from "./how-web-works/module-1/virt-home";
import {
  LemonadeCalculator,
  PatternRecognitionGame,
  StoryCreatorTool,
  VariableExplorer,
} from "./math-content";
import NetworkDefenseGame from "./how-web-works/module-2/net-defense";
import SecretMessageEncoder from "./how-web-works/module-2/network-encoder";
import DNSDetective from "./how-web-works/module-2/dns-dectetive";
import DNSExplorer from "./persepctive-dns";
import NetworkMazeGame from "./how-web-works/module-2/network-maze";
import DNSPlayground from "./how-web-works/module-2/dns-playground";
import PacketSorter from "./how-web-works/module-2/find-route";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/\-\-+/g, "-");
}
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

function createHeading(level: HeadingLevel) {
  const Heading = ({ children }: any) => {
    const slug = slugify(children);

    const headingClasses = {
      1: "scroll-m-20 text-3xl font-bold tracking-tight mt-16 mb-6 text-foreground/90 first:mt-8",
      2: cn(
        // Base styles
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        "text-foreground/90",

        // Spacing & Border
        "mt-12 first:mt-6 mb-6",
        "pb-2 border-b border-border/40",

        // Container width & alignment
        "w-full",

        // Additional styling
        "flex items-center gap-2"
      ),
      3: "scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4 text-foreground/80",
      4: "scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3 text-foreground/80",
      5: "scroll-m-20 text-base font-medium tracking-tight mt-4 mb-2 text-foreground/70",
      6: "scroll-m-20 text-sm font-medium tracking-tight mt-4 mb-2 text-foreground/70",
    };

    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: cn(headingClasses[level], "relative group"),
      },
      [
        React.createElement(
          "a",
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: cn(
              "hidden absolute group-hover:inline-block",
              "right-full pr-2",
              "text-muted-foreground/50 hover:text-primary/60",
              "transition-colors duration-200"
            ),
            "aria-label": "Anchor",
          },
          "#"
        ),
        children,
      ]
    );
  };
  return Heading;
}

function RoundedImage(props: any) {
  return (
    <figure className="my-10 overflow-hidden rounded-lg ring-1 ring-border/50">
      <div className="relative aspect-video overflow-hidden bg-muted/50">
        <Image
          alt={props.alt}
          className="object-cover transition-all hover:scale-105 duration-500"
          {...props}
        />
      </div>
      {props.alt && (
        <figcaption className="mt-2.5 px-2 text-sm text-muted-foreground/80 text-center italic">
          {props.alt}
        </figcaption>
      )}
    </figure>
  );
}

function CustomLink(props: any) {
  const href = props.href;

  const linkClasses = cn(
    "font-medium inline-flex items-center gap-1",
    "text-primary/90 hover:text-primary",
    "underline-offset-4 hover:underline",
    "transition-colors duration-200"
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkClasses} {...props}>
        {props.children}
      </Link>
    );
  }

  return (
    <a
      className={linkClasses}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  );
}

function Code({ children, className }: any) {
  const codeHTML = highlight(children);
  const language = className?.replace("language-", "") || "plaintext";

  return (
    <CodeBlock codeHTML={codeHTML} language={language}>
      {children}
    </CodeBlock>
  );
}

const BlockQuote = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLQuoteElement> &
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>
) => {
  return (
    <blockquote
      {...props}
      className={[
        // Base styles
        "my-6 mx-10",
        "border-l-4 border-primary",
        "bg-primary/60 dark:bg-primary/10",

        // Padding and rounded corners
        "p-6 rounded-r-lg",

        // Typography
        "text-lg text-muted-foreground",
        "font-serif italic",

        // Subtle hover effect
        "transition-all duration-300",
        "hover:bg-primary/10 dark:hover:bg-primary/15",

        // Interior spacing
        "[&>*]:mt-0 [&>*:not(:first-child)]:mt-4",

        // Box shadow
        "shadow-md hover:shadow-xl",

        // Additional decorative elements
        "relative",
        "after:content-[''] after:absolute after:top-0 after:left-0",
        "after:w-1 after:h-full after:bg-primary/50",
        "after:rounded-l-sm after:transition-all",
        "hover:after:h-[calc(100%+8px)] hover:after:-top-1",
      ].join(" ")}
    >
      <Lightbulb className="text-primary " />
      {props.children}
    </blockquote>
  );
};
function Hr() {
  return <hr className="my-8 border-border/50" />;
}
function Table({ data }: any) {
  return (
    <div className="my-8 w-full overflow-hidden rounded-lg border border-border/60">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {data.headers.map((header: any, index: any) => (
                <th
                  key={index}
                  className="p-4 text-left font-medium text-foreground/70"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: any, index: any) => (
              <tr
                key={index}
                className={cn(
                  "border-b border-border/50",
                  "hover:bg-muted/50 transition-colors",
                  "last:border-0"
                )}
              >
                {row.map((cell: any, cellIndex: any) => (
                  <td key={cellIndex} className="p-4 text-foreground/80">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Paragraph(props: any) {
  return (
    <p
      className={cn(
        // Base styles
        "text-base sm:text-lg text-foreground/80",
        "leading-relaxed",

        // Spacing
        "my-6",

        // List context spacing
        "list-item:my-2",
        "list-item:first:mt-0",
        "list-item:last:mb-0",

        // Text formatting
        "text-pretty",
        "hyphens-auto",

        // List spacing
        "[&:has(+ul)]:mb-2",
        "[&:has(+ol)]:mb-2"
      )}
      {...props}
    />
  );
}

function UnorderedList(props: any) {
  return (
    <ul
      className={cn(
        // Base container styles
        "my-8 list-none", // Added list-none to reset and apply custom styling
        "ml-4 sm:ml-6",
        "space-y-3",

        // List item styling
        "[&>li]:relative",
        "[&>li]:pl-6",
        "[&>li]:text-foreground/80",
        "[&>li]:leading-relaxed",

        // Custom bullets with pseudo-element
        "[&>li:before]:absolute",
        "[&>li:before]:content-['•']", // Explicit bullet character
        "[&>li:before]:left-0",
        "[&>li:before]:top-0",
        "[&>li:before]:text-primary",
        "[&>li:before]:text-lg",
        "[&>li:before]:leading-relaxed",

        // Nested list styling
        "[&>li>ul]:mt-3",
        "[&>li>ul]:mb-3",
        "[&>li>ul]:ml-4",
        "[&>li>ul>li:before]:content-['◦']", // Different bullet for nested lists

        // Typography
        "text-base sm:text-lg",
        "leading-relaxed",

        // Content wrapping
        "[&>li]:break-words",

        // Paragraph spacing in lists
        "[&>li>p]:my-2",
        "[&>li>p:first-child]:mt-0",
        "[&>li>p:last-child]:mb-0"
      )}
      {...props}
    />
  );
}

function OrderedList(props: any) {
  return (
    <ol
      className={cn(
        // Base container styles
        "my-8 list-decimal", // Added list-decimal for native numbering
        "ml-8 sm:ml-10", // Increased margin for numbers
        "space-y-3",

        // List item styling
        "[&>li]:relative",
        "[&>li]:pl-2", // Reduced padding since we're using native numbers
        "[&>li]:text-foreground/80",
        "[&>li]:leading-relaxed",
        "[&>li]:marker:text-primary/70", // Style the numbers
        "[&>li]:marker:font-medium",

        // Nested list styling
        "[&>li>ol]:mt-3",
        "[&>li>ol]:mb-3",
        "[&>li>ol]:ml-4",

        // Typography
        "text-base sm:text-lg",
        "leading-relaxed",

        // Content wrapping
        "[&>li]:break-words",

        // Paragraph spacing in lists
        "[&>li>p]:my-2",
        "[&>li>p:first-child]:mt-0",
        "[&>li>p:last-child]:mb-0"
      )}
      {...props}
    />
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  blockquote: BlockQuote,
  table: Table,
  MyComponent,
  ServiceMatchGame,
  Quizcomponent,
  InfoCard,
  PacketJourneyDemo,
  PacketRoutingGame,
  HomeNetworkFinder,
  LemonadeCalculator,
  PatternRecognitionGame,
  StoryCreatorTool,
  VariableExplorer,
  NetworkDefenseGame,
  SecretMessageEncoder,
  DNSDetective,
  DNSExplorer,
  NetworkMazeGame,
  BlockQuote,
  Hr,
  DNSPlayground,
  PacketSorter,
};

export function CustomMDX(props: any) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </article>
  );
}
