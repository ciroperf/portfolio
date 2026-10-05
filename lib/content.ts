import portfolio from "@/data/portfolio.json";

export type Project = (typeof portfolio.projects)[number];

export const content = portfolio;

/** Projects are appended to the data file over time; show the newest first. */
export const projects: Project[] = [...portfolio.projects].reverse();

/** Data files store blog links as "blog/<slug>"; make them root-relative. */
export function projectHref(project: Project) {
  return /^https?:\/\//.test(project.url) ? project.url : `/${project.url.replace(/^\//, "")}`;
}

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}
