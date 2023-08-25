import { getSortedPostsData } from "@/lib/posts";
import Post from "./[postId]/page";

export default function Blog() {
  const posts = getSortedPostsData();

  if (!posts.length)
    return (
      <section className="w-full mx-auto place-content-center lg:flex my-5">
        <p className="text-2xl">No posts found.</p>
      </section>
    );

  const postId = posts[0].id;

  return <Post params={{ postId }} />;
}
