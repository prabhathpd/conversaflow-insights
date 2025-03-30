
import { Badge } from "@/components/ui/badge";
import { CallTone } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ToneBadgeProps {
  tone: CallTone;
  className?: string;
}

export function ToneBadge({ tone, className }: ToneBadgeProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 text-xs font-medium",
        tone === "happy" && "bg-green-500 text-white",
        tone === "neutral" && "bg-blue-500 text-white",
        tone === "busy" && "bg-amber-500 text-white",
        tone === "annoyed" && "bg-red-500 text-white",
        className
      )}
    >
      {tone.charAt(0).toUpperCase() + tone.slice(1)}
    </Badge>
  );
}
