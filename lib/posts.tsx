import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype/lib";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

const postsDirectory = path.join(process.cwd(), "posts");
const publicDirectory = path.join(process.cwd(), "public");

export function getSortedPostsData() {
  const filesNames = fs.readdirSync(postsDirectory);
  const allPostsData = filesNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const grayMatterResult = matter(fileContents);

    return {
      id,
      title: grayMatterResult.data.title,
      tags: grayMatterResult.data.tags,
      date: grayMatterResult.data.date,
    } as Blogpost;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const grayMatterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm, { singleTilde: false })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeDocument, { title: grayMatterResult.data.title })
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(grayMatterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    title: grayMatterResult.data.title,
    tags: grayMatterResult.data.tags,
    date: grayMatterResult.data.date,
    raw: fileContents,
    contentHtml,
  } as Blogpost & { contentHtml: string; raw: string };
}
