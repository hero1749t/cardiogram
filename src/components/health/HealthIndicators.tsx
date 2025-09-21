import { Heart, Brain, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HealthIndicators = () => {
  const indicators = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: "72",
      unit: "BPM",
      status: "normal",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Brain,
      label: "Stress Level",
      value: "Low",
      unit: "",
      status: "good",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Smile,
      label: "Wellness",
      value: "😊",
      unit: "",
      status: "excellent",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {indicators.map((indicator, index) => (
        <Card 
          key={index} 
          className="glass-card border-white/20 hover:border-white/30 transition-all duration-300"
        >
          <CardContent className="p-4 text-center">
            <div className={`${indicator.bgColor} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 health-glow ${indicator.color}`}>
              <indicator.icon className="h-6 w-6" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{indicator.label}</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-lg font-bold text-foreground">{indicator.value}</span>
              {indicator.unit && (
                <span className="text-xs text-muted-foreground">{indicator.unit}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HealthIndicators;