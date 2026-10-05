import type { ReactNode } from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { content } from "@/lib/content";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-sm text-accent">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHeading index="03" title="Experience" />

      <ol className="relative border-l border-line">
        {content.experience.map((job) => (
          <li key={job.position} className="relative pb-14 pl-8 last:pb-0">
            <span className="absolute top-2 -left-[5px] size-2.5 rounded-full bg-accent shadow-[0_0_12px] shadow-accent" />
            <p className="font-mono text-sm text-muted">
              {job.dates} · {job.type}
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">{job.position}</h3>
            <ul className="mt-4 max-w-3xl space-y-2 text-muted">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="font-mono text-accent">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-24 grid gap-14 md:grid-cols-2">
        <Block title="education">
          {content.education.map((degree) => (
            <div key={degree.degree}>
              <p className="font-medium">{degree.degree}</p>
              <p className="text-sm text-muted">
                {degree.school} · {degree.dates} · {degree.grade}
              </p>
              {degree.details && <p className="mt-2 text-sm text-muted">{degree.details}</p>}
            </div>
          ))}
        </Block>

        <Block title="certifications">
          <ul className="space-y-3">
            {content.certifications.map((cert) => (
              <li key={cert.name} className="flex flex-wrap justify-between gap-x-4 border-b border-line pb-3">
                <span>{cert.name}</span>
                {cert.date && <span className="font-mono text-sm text-muted">{cert.date}</span>}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="skills">
          {content.skills.map((group) => (
            <div key={group.label}>
              <p className="text-sm text-muted">{group.label}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3 py-1 font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Block>

        <Block title="languages">
          <ul className="space-y-3">
            {content.spokenLanguages.map((lang) => (
              <li key={lang.language} className="flex flex-wrap justify-between gap-x-4 border-b border-line pb-3">
                <span>{lang.language}</span>
                <span className="font-mono text-sm text-muted">{lang.proficiency}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </section>
  );
}
