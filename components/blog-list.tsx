import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import { BlogProps } from "@/app/blogs/utils";
import Link from "next/link";
export default function BlogsList({ blogs }: { blogs: BlogProps[] }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-foreground px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-20 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
              Articles and Tutorials
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {blogs.length} hand-crafted articles about Internet, Web
              Development, AI , Mathematics and Programming.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((blog: BlogProps) => (
            <Card
              key={blog.slug}
              className="group relative bg-background border-border/50 hover:border-border backdrop-blur-sm transition-all duration-500"
            >
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {blog.metadata.category && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border border-primary/20 font-mono"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {blog.metadata.category}
                    </Badge>
                  )}

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatDate(blog.metadata.publishedAt)}</span>
                  </div>
                </div>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="block space-y-3 group/link"
                >
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {blog.metadata.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">
                    {blog.metadata.summary}
                  </p>

                  <div className="inline-flex items-center gap-2 text-[15px] text-muted-foreground group-hover/link:text-primary transition-colors duration-300">
                    Read article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
