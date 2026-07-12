import Image from "next/image";

import { personal } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ProfileLogoProps = {
  className?: string;
  priority?: boolean;
  size?: number;
};

export function ProfileLogo({ className, priority = false, size = 56 }: ProfileLogoProps) {
  return (
    <span
      className={cn(
        "block shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.06]",
        className,
      )}
    >
      <Image
        src="/profile-logo.jpg"
        alt={`${personal.name} logo`}
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
