import DecryptedText from "@/components/reactbits/DecryptedText";

type Props = { index: string; title: string; kicker?: string };

export default function SectionHeading({ index, title, kicker }: Props) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm text-accent">
        {index} <span className="text-muted">{"//"}</span> {kicker ?? title.toLowerCase()}
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        <DecryptedText
          text={title}
          animateOn="view"
          sequential
          revealDirection="start"
          speed={40}
          encryptedClassName="text-accent"
        />
      </h2>
    </div>
  );
}
