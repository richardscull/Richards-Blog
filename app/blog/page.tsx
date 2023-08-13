import { getSortedPostsData } from "@/lib/posts";
import Post from "./[postId]/page";

export default function Blog() {
  const posts = getSortedPostsData();

  if (!posts.length)
    return (
      <section className="w-full mx-auto place-content-center flex my-5">
        <p className="text-2xl">No posts found.</p>
      </section>
    );

  const postId = posts[0].id;

  return (
    <main className="mx-auto mt-4 px-4 flex place-content-center">
      <div className="flex">
        <Post params={{ postId }} />
      </div>
    </main>
  );
}
