import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import ListDataItems from "../listByDateItems";
import ScrollUpButton from "@/app/components/scrollUpButton";
import Copyright from "@/app/components/copyright";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((post) => post.id === postId))
    return {
      title: "Not found",
    };

  const postData = await getPostData(postId);

  return {
    title: postData.title,
    description: postData.raw.split("---")[2],
    image: "./images/HuTaoNavigation.png",
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) return notFound();

  const { title, date, tags, contentHtml } = await getPostData(postId);

  const pubDate = getFormattedDate(date);

  return (
    <main className="lg:flex justify-center items-center mx-auto m-auto mt-4">
      <div className="lg:flex">
        <div className="md:gap-0 mr-5 hidden lg:flex">
          <ListDataItems
            posts={posts}
            setOpenYear={new Date(date).getFullYear()}
            setOpenMonth={new Date(date).getMonth()}
          />
        </div>
        <div className="prose prose-lg prose-invert mx-auto max-w-2xl px-4">
          <div className="border-b-2 pb-12">
            <h1 className="text-4xl my-5">{title}</h1>
            <p className="-my-3">{pubDate}</p>
          </div>
          <article>
            <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <p className="text-center text-2xl">
              {tags ? `🔗 Tags: ${tags?.join(", ")}` : ""}
            </p>
          </article>
        </div>
        <ScrollUpButton />
      </div>
    </main>
  );
}
