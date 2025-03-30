
import { cn } from "@/lib/utils";

interface CallScoreProps {
  score: number;
  className?: string;
  showText?: boolean;
}

export function CallScore({ score, className, showText = true }: CallScoreProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={cn(
              "h-4 w-4 rounded-full",
              star <= score ? "bg-app-blue" : "bg-gray-200"
            )}
          />
        ))}
      </div>
      {showText && <span className="ml-1 text-sm">{score}/5</span>}
    </div>
  );
}
