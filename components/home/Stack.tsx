import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { content } from "@/lib/content";

const ROWS = 2;
const NON_TECHNICAL = "Ways of working";

export default function Stack() {
  const items = content.skills
    .filter((group) => group.label !== NON_TECHNICAL)
    .flatMap((group) => group.items);
  const perRow = Math.ceil(items.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, i) => items.slice(i * perRow, (i + 1) * perRow).join(" · ") + " · ");

  return (
    <section aria-label="Tech stack" className="overflow-hidden border-y border-line py-10">
      <ScrollVelocity
        texts={rows}
        velocity={40}
        className="px-4 font-mono text-3xl font-medium tracking-tight text-muted/70 sm:text-5xl"
      />
    </section>
  );
}
