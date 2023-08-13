import getFormattedDate from "@/lib/getFormattedDate";
import { getSortedPostsData } from "@/lib/posts";

export async function GET(req: Request) {
  const posts = getSortedPostsData();

  return new Response(JSON.stringify(posts));
}
