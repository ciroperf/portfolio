import CountUp from "@/components/reactbits/CountUp";
import { content } from "@/lib/content";

export default function Stats() {
  return (
    <section className="border-y border-line bg-panel/60">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 lg:grid-cols-4">
        {content.stats.map((stat) => (
          <div key={stat.label} className="py-10 pr-4">
            <dd className="font-mono text-4xl font-semibold text-fg sm:text-5xl">
              <CountUp to={stat.value} separator="," duration={1.5} />
              <span className="text-accent">{stat.suffix}</span>
            </dd>
            <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
