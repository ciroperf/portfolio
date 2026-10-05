import { content } from "@/lib/content";

export default function Footer() {
  const email = content.socials.find((social) => social.link.startsWith("mailto:"));

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <p className="font-mono text-sm text-accent">$ ./contact.sh</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Let&apos;s build something worth shipping.
        </h2>
        {email && (
          <a
            href={email.link}
            className="mt-8 inline-block font-mono text-lg text-fg underline decoration-accent underline-offset-8 transition-colors hover:text-accent"
          >
            {email.link.replace("mailto:", "")}
          </a>
        )}
        <div className="mt-16 flex flex-col gap-6 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-6">
            {content.socials.map((social) => (
              <li key={social.title}>
                <a href={social.link} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                  {social.title.toLowerCase()} ↗
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {content.name} · {content.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
