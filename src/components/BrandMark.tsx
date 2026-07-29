import Link from 'next/link';

function BrandGlyph({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`
        relative grid size-9 shrink-0 place-items-center overflow-hidden
        rounded-xl bg-brand-600
        ${className}
      `}
    >
      <span className="
        absolute top-[8px] left-[7px] h-[4px] w-[20px] -rotate-12 rounded-full
        bg-white
      "
      />
      <span className="
        absolute top-[15px] left-[10px] h-[4px] w-[18px] -rotate-12 rounded-full
        bg-white/80
      "
      />
    </span>
  );
}

export function BrandMark({
  href = '/',
  compact = false,
  inverse = false,
}: {
  href?: string;
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5" aria-label="ScapeLeap home">
      <BrandGlyph />
      {!compact && (
        <span className={`
          text-[17px] font-bold tracking-[-0.035em]
          ${inverse
          ? `text-white`
          : `text-foreground`}
        `}
        >
          ScapeLeap
        </span>
      )}
    </Link>
  );
}
