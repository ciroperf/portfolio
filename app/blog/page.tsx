import type { Metadata } from "next";
import PostList from "@/components/site/PostList";
import DecryptedText from "@/components/reactbits/DecryptedText";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on the projects I build: the problem, the approach, and the decisions behind them.",
};

export default function BlogIndex() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 pb-28">
      <p className="font-mono text-sm text-accent">$ ls ./blog</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tighter sm:text-7xl">
        <DecryptedText text="Writing" animateOn="view" sequential speed={50} encryptedClassName="text-accent" />
      </h1>
      <p className="mt-6 mb-16 max-w-2xl text-lg text-muted">{metadata.description}</p>
      <PostList posts={getAllPosts()} />
    </section>
  );
}
