import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return {
    title: post.title,
    description: post.preview,
    openGraph: { type: "article", images: [post.image] },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost((await params).slug);

  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-28">
      <Link href="/blog" className="font-mono text-sm text-muted hover:text-accent">
        ← cd ../blog
      </Link>
      <header className="mt-10">
        <p className="font-mono text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance sm:text-6xl">{post.title}</h1>
        <p className="mt-4 text-xl text-muted">{post.tagline}</p>
      </header>
      <Image
        src={post.image}
        alt=""
        width={0}
        height={0}
        priority
        sizes="(min-width: 768px) 48rem, 100vw"
        className="mx-auto mt-12 h-auto max-h-[32rem] w-auto max-w-full rounded-2xl border border-line"
      />
      <div
        className="prose prose-invert prose-lg mt-14 max-w-none prose-headings:tracking-tight prose-a:text-accent prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-line prose-pre:bg-panel prose-th:text-fg"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
