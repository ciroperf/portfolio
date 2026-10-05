import ScrollReveal from "@/components/reactbits/ScrollReveal";
import SectionHeading from "@/components/site/SectionHeading";
import { content } from "@/lib/content";

export default function About() {
  const [lead, ...rest] = content.about;

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHeading index="01" title="About" />
      <ScrollReveal
        baseOpacity={0.08}
        blurStrength={6}
        baseRotation={2}
        textClassName="text-2xl font-medium leading-snug tracking-tight sm:text-4xl"
      >
        {lead}
      </ScrollReveal>
      <div className="mt-16 grid gap-8 text-lg leading-relaxed text-muted md:grid-cols-2">
        {rest.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
