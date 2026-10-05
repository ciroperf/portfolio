import Link from "next/link";

const LINKS = [
  { href: "/#about", label: "about" },
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "experience" },
  { href: "/blog", label: "blog" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 font-mono text-sm">
        <Link href="/" className="whitespace-nowrap text-fg transition-colors hover:text-accent">
          <span className="text-accent">~/</span>ciro-perfetto
        </Link>
        <ul className="flex gap-3 text-xs sm:gap-6 sm:text-sm">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-muted transition-colors hover:text-fg">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
