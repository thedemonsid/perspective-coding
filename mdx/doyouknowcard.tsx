import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Book } from "lucide-react";

interface InfoCardProps {
  title?: string;
  description?: string;
  category?: string;
}

const InfoCard = ({ title, description, category }: InfoCardProps) => {
  return (
    <Card
      className="group relative overflow-hidden hover:shadow-md
                    bg-card border-border hover:border-primary/20
                    transition-all duration-300 w-full max-w-4xl"
    >
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 bg-muted/50 rounded-bl-full
                    opacity-50 transition-all group-hover:bg-primary/10"
      />

      <CardContent className="p-6 relative">
        {/* Category badge */}
        <div
          className="inline-flex items-center gap-1 bg-muted px-3 py-1
                      rounded-full text-sm font-medium mb-4"
        >
          <Sparkles size={14} className="animate-pulse text-primary" />
          <span className="text-primary">{category || "Science"}</span>
        </div>

        <div className="flex items-start gap-4">
          {/* Icon container with subtle float animation */}
          <div
            className="p-3 bg-muted rounded-2xl
                        group-hover:translate-y-[-2px] transition-transform duration-300"
          >
            <Book className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-2 flex-1">
            <h3
              className="text-xl font-semibold text-foreground
                         group-hover:text-primary transition-colors"
            >
              {title || "Discover Amazing Facts"}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description ||
                "Explore fascinating knowledge through interactive learning. Click to dive deeper into this topic."}
            </p>
          </div>
        </div>

        {/* Interactive dots decoration */}
        <div className="absolute bottom-3 right-6 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20
                       group-hover:bg-primary/20 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
