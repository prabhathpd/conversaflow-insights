
import { Badge } from "@/components/ui/badge";
import { LeadIntent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface IntentBadgeProps {
  intent: LeadIntent;
  className?: string;
}

export function IntentBadge({ intent, className }: IntentBadgeProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 text-xs font-medium text-white",
        intent === "high" && "bg-intent-high",
        intent === "medium" && "bg-intent-medium",
        intent === "low" && "bg-intent-low",
        className
      )}
    >
      {intent.charAt(0).toUpperCase() + intent.slice(1)} Intent
    </Badge>
  );
}
