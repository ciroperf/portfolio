import Image from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import SectionHeading from "@/components/site/SectionHeading";
import { isExternal, projectHref, projects, type Project } from "@/lib/content";

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const href = projectHref(project);
  const external = isExternal(href);

  return (
    <SpotlightCard
      spotlightColor="rgba(61, 220, 151, 0.18)"
      className={`group rounded-2xl! border-line! bg-panel! p-0! ${featured ? "md:col-span-2" : ""}`}
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={`flex h-full flex-col ${featured ? "md:flex-row" : ""}`}
      >
        <div
          className={`flex aspect-video items-center justify-center overflow-hidden border-b border-line bg-ink p-6 ${featured ? "md:w-3/5 md:border-r md:border-b-0" : ""}`}
        >
          <Image
            src={project.imageSrc}
            alt=""
            width={0}
            height={0}
            sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="h-auto max-h-full w-auto max-w-full rounded-lg opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        </div>
        <div className={`flex flex-1 flex-col p-6 ${featured ? "md:justify-center md:p-10" : ""}`}>
          <p className="font-mono text-xs text-muted">0x{project.id.padStart(2, "0")}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className={`mt-3 leading-relaxed text-muted ${featured ? "" : "line-clamp-4"}`}>{project.description}</p>
          <p className="mt-auto pt-6 font-mono text-sm text-fg">
            {external ? "view source ↗" : "read case study →"}
          </p>
        </div>
      </Link>
    </SpotlightCard>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHeading index="02" title="Selected work" kicker="work" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}
