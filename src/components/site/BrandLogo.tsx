import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

const BrandLogo = ({ className, compact = false }: BrandLogoProps) => {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      <img src="/zivika-logo.svg" alt="Zivika Labs logo" className={compact ? "h-10 w-10" : "h-12 w-12"} />
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Zivika Labs</div>
        {!compact && <div className="text-xs text-muted-foreground">India&apos;s Intelligent Health OS</div>}
      </div>
    </Link>
  );
};

export default BrandLogo;
