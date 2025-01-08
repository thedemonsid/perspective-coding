import HomePage from "@/components/home-page";
import { getBlogPosts } from "./blogs/utils";


export default async function Page() {
 const blogs = await getBlogPosts();

  return <HomePage initialBlogs={blogs} />;
}
