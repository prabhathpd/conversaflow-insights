
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function DashboardCard({
  title,
  value,
  description,
  icon,
  className,
  footer,
  trend,
  trendValue,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "mr-1 rounded-sm px-1 py-0.5",
                trend === "up" && "bg-green-100 text-green-800",
                trend === "down" && "bg-red-100 text-red-800",
                trend === "neutral" && "bg-gray-100 text-gray-800"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
            </span>
            <span
              className={cn(
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-gray-600"
              )}
            >
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
      {footer && <div className="border-t p-3 text-sm">{footer}</div>}
    </Card>
  );
}
