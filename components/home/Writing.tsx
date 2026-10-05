import Link from "next/link";
import PostList from "@/components/site/PostList";
import SectionHeading from "@/components/site/SectionHeading";
import { getAllPosts } from "@/lib/posts";

const LATEST = 3;

export default function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHeading index="04" title="Writing" />
      <PostList posts={getAllPosts().slice(0, LATEST)} />
      <Link href="/blog" className="mt-10 inline-block font-mono text-sm text-fg hover:text-accent">
        all posts →
      </Link>
    </section>
  );
}
