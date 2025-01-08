import yaml from "js-yaml";
interface Metadata {
  title: string;
  publishedAt: string;
  summary: string;
  category: string;
  author: string;
}
export function parseMDXContent(mdxContent: string): {
  metadata: Metadata;
  content: string;
} {
  const trimmedContent = mdxContent.trim();
  const frontMatterRegex = /^---([\s\S]*?)---/;
  const match = frontMatterRegex.exec(trimmedContent);

  if (!match) {
    throw new Error("Invalid front matter format");
  }

  const frontMatter = match[1];
  const content = trimmedContent.slice(match[0].length).trim();
  const metadata = yaml.load(frontMatter) as Metadata;

  return { metadata, content };
}
