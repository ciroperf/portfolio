import Link from "next/link";
import DecryptedText from "@/components/reactbits/DecryptedText";
import FaultyTerminal from "@/components/reactbits/FaultyTerminal";
import TextType from "@/components/reactbits/TextType";
import { content } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div className="absolute inset-0 opacity-50" aria-hidden>
        <FaultyTerminal
          tint="#3ddc97"
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          brightness={0.6}
          scanlineIntensity={0.5}
          curvature={0.1}
          mouseStrength={0.3}
          dpr={1}
          pageLoadAnimation
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/70 to-ink" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-16">
        <p className="font-mono text-sm text-accent">$ whoami</p>
        <p className="mt-6 text-xl text-muted sm:text-2xl">{content.greeting}</p>
        <h1 className="mt-2 text-6xl font-semibold tracking-tighter sm:text-8xl lg:text-9xl">
          <DecryptedText text={content.name} animateOn="view" sequential speed={55} encryptedClassName="text-accent" />
        </h1>
        <TextType
          as="p"
          text={content.roles}
          className="mt-6 min-h-[2lh] font-mono text-lg sm:min-h-0 sm:text-2xl"
          cursorClassName="text-accent"
          typingSpeed={45}
          deletingSpeed={25}
          pauseDuration={1800}
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{content.summary}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-sm">
          <a href="#work" className="rounded-full bg-accent px-6 py-3 font-medium text-ink transition hover:bg-fg">
            view work
          </a>
          <Link
            href="/blog"
            className="rounded-full border border-line px-6 py-3 text-fg transition hover:border-accent hover:text-accent"
          >
            read the blog
          </Link>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs text-muted hover:text-fg"
      >
        scroll ↓
      </a>
    </section>
  );
}
