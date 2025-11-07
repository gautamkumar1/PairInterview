"use client"

import { type ExecuteResult } from "./ProblemDetailsPage"
import { cn } from "@/lib/utils"
import { Terminal, CheckCircle2, XCircle } from "lucide-react"

type OutputPanelProps = {
  output: ExecuteResult | null
}

export default function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col bg-card border-l border-border rounded-r-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Terminal className="w-4 h-4 text-primary" />
          Output
        </div>
        {output && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
              output.success
                ? "bg-green-500/15 text-green-500 border border-green-500/30"
                : "bg-red-500/15 text-red-500 border border-red-500/30"
            )}
          >
            {output.success ? (
              <>
                <CheckCircle2 className="w-3 h-3" /> Success
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3" /> Error
              </>
            )}
          </div>
        )}
      </div>

      {/* Output Body */}
      <div className="flex-1 overflow-auto px-4 py-3 font-mono text-sm text-foreground bg-background/60">
        {!output ? (
          <p className="text-muted-foreground italic">
            Click <span className="text-primary font-medium">"Run Code"</span> to see your output here...
          </p>
        ) : output.success ? (
          <pre className="whitespace-pre-wrap text-green-400">{output.output}</pre>
        ) : (
          <div className="space-y-2">
            {output.output && (
              <pre className="whitespace-pre-wrap text-muted-foreground">{output.output}</pre>
            )}
            <pre className="whitespace-pre-wrap text-red-400">{output.error}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
