import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "_posts");
const WORDS_PER_MINUTE = 220;

export type PostMeta = {
  slug: string;
  date: string;
  title: string;
  tagline: string;
  preview: string;
  image: string;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function readPost(slug: string) {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  // Unquoted YAML dates are parsed into Date objects.
  const date = data.date instanceof Date ? data.date.toISOString() : String(data.date);
  const meta: PostMeta = {
    slug,
    date: date.slice(0, 10),
    title: data.title,
    tagline: data.tagline,
    preview: data.preview,
    image: data.image,
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / WORDS_PER_MINUTE)),
  };
  return { meta, content };
}

export function getPostSlugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readPost(slug).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post> {
  const { meta, content } = readPost(slug);
  const html = String(await remark().use(remarkGfm).use(remarkHtml).process(content));
  return { ...meta, html };
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
