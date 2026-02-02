import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "success",
    title: "Processing Time Improved",
    description: "AI assessments reduced average claim review time by 47% this week.",
  },
  {
    id: "2",
    type: "warning",
    title: "High Volume Alert",
    description: "12 claims pending review. Consider prioritizing severe damage cases.",
  },
  {
    id: "3",
    type: "info",
    title: "Model Accuracy Update",
    description: "Damage detection accuracy improved to 94.7% after recent training.",
  },
];

const typeConfig = {
  success: { icon: CheckCircle, className: "border-success/30 bg-success/5" },
  warning: { icon: AlertTriangle, className: "border-warning/30 bg-warning/5" },
  info: { icon: TrendingUp, className: "border-info/30 bg-info/5" },
};

export function AIInsightCard() {
  return (
    <div className="rounded-xl border bg-card shadow-card">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-ai shadow-ai">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Automated analysis and recommendations</p>
          </div>
        </div>
      </div>
      <div className="divide-y p-2">
        {insights.map((insight) => {
          const Icon = typeConfig[insight.type].icon;
          return (
            <div
              key={insight.id}
              className={cn(
                "flex items-start gap-4 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm m-2",
                typeConfig[insight.type].className
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 mt-0.5",
                  insight.type === "success" && "text-success",
                  insight.type === "warning" && "text-warning",
                  insight.type === "info" && "text-info"
                )}
              />
              <div>
                <p className="font-medium text-card-foreground">{insight.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
