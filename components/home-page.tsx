"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Terminal, Timer, ArrowRight, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Cloud } from "@/components/cloud";
import { formatDate } from "@/lib/format-date";

interface Blog {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    category: string;
    featured?: boolean;
  };
  content: string;
}

interface HomePageProps {
  initialBlogs: Blog[];
}

export default function HomePage({ initialBlogs }: HomePageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const recentBlogs = initialBlogs.slice(0, 3);
  const popularBlogs = initialBlogs.filter((blog) => blog.metadata.title);

  return (
    <>
      <Cloud position="top" className="z-10" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-muted via-primary to-secondary origin-[0%] z-50"
        style={{ scaleX }}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-b from-background via-background/90 to-background"
      >
        <div className="max-w-7xl mx-auto px-4 py-24">
          <header className="space-y-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 text-sm"
            >
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-muted-foreground">
                  <span className="text-primary">~/</span>thoughts-and-knowledge
                </span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <span className="block text-4xl sm:text-6xl font-bold tracking-wider bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent font-wotfard">
                Thoughts, Stories, and
                <br /> Technical Guides
              </span>
              <div className="flex items-center gap-4 text-lg sm:text-xl text-muted-foreground font-mono">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-primary font-wotfard">
                  Documenting the journey.
                </span>
              </div>
            </motion.h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Recent Posts Section */}
            <Section
              title="Recent Posts"
              blogs={recentBlogs}
              viewAllLink="/blogs"
            />

            {/* Popular Posts Section */}
            <Section
              title="Popular Posts"
              blogs={popularBlogs}
              renderBadge={false}
            />
          </div>

          {/* Coming Soon Section */}
          <ComingSoonSection />

          {/* All Posts Section */}
          <Section title="All Posts" blogs={initialBlogs} />
        </div>
      </motion.main>
    </>
  );
}

function Section({
  title,
  blogs,
  viewAllLink,
  renderBadge = true,
}: {
  title: string;
  blogs: Blog[];
  viewAllLink?: string;
  renderBadge?: boolean;
}) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            View all
          </Link>
        )}
      </div>
      <div className="grid gap-6">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/blogs/${blog.slug}`} className="group">
              <article className="relative p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4">
                  {renderBadge && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      {blog.metadata.category?.includes("code") ? (
                        <Code2 className="w-4 h-4" />
                      ) : (
                        <Terminal className="w-4 h-4" />
                      )}
                      {blog.metadata.category || "Uncategorized"}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Timer className="w-4 h-4 mr-1" />
                    <span>{formatDate(blog.metadata.publishedAt)}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {blog.metadata.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {blog.metadata.summary}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    Read article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ComingSoonSection() {
  return (
    <section className="w-full mb-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <article className="relative p-6 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm h-full">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Coming Soon
              </Badge>
              <div className="mt-8 space-y-2">
                <div className="h-6 w-3/4 bg-primary/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-primary/5 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-primary/5 rounded animate-pulse" />
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
