// app/blogs/page.tsx
import BlogsList from "@/components/blog-list";
import { getBlogPosts } from "./utils";
import { notFound } from "next/navigation";
// import { auth } from "@/auth";

export default async function BlogsPage() {
  // const session = await auth();
  // if (!session || !session.user || session.user.role !== "ADMIN") {
  //   return notFound();
  // }
  const blogs = await getBlogPosts();
  if (!blogs || blogs.length == 0) {
    notFound();
  }
  return <BlogsList blogs={blogs} />;
}
