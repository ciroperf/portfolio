import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="border-t border-line">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-line">
          <Link href={`/blog/${post.slug}`} className="group grid gap-2 py-8 md:grid-cols-[10rem_1fr_auto] md:gap-8">
            <time dateTime={post.date} className="font-mono text-sm text-muted">
              {formatDate(post.date)}
            </time>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 max-w-2xl text-muted">{post.tagline}</p>
            </div>
            <span className="font-mono text-sm text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
              {post.readingMinutes} min →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
