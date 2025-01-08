import yaml from 'js-yaml';

export function parseMDXContent(mdxContent: string) {
  const trimmedContent = mdxContent.trim();
  const frontMatterRegex = /^---([\s\S]*?)---/;
  const match = frontMatterRegex.exec(trimmedContent);

  if (!match) {
    throw new Error('Invalid front matter format');
  }

  const frontMatter = match[1];
  const content = trimmedContent.slice(match[0].length).trim();
  const metadata = yaml.load(frontMatter) as Record<string, any>;

  return { metadata, content };
}