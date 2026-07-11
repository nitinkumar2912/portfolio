import { FadeIn } from "@/components/motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <FadeIn>
      <p className="font-mono text-sm text-zinc-500">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-normal text-zinc-100 sm:text-3xl">{title}</h2>
      {copy ? <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-400">{copy}</p> : null}
    </FadeIn>
  );
}
