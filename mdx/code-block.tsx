"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CodeBlock({
  children,
  codeHTML,
  language,
}: {
  children: string;
  codeHTML: string;
  language?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg border border-border bg-card overflow-hidden">
      {/* VS Code-like top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          {language && (
            <span className="text-xs text-muted-foreground ml-2">
              {language}
            </span>
          )}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md hover:bg-muted-foreground/10 transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary transition-all" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground transition-all" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">{copied ? "Copied!" : "Copy code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="relative font-mono text-sm leading-6">
          <code
            className="relative rounded bg-transparent p-0"
            dangerouslySetInnerHTML={{ __html: codeHTML }}
          />
        </pre>
      </div>
    </div>
  );
}
