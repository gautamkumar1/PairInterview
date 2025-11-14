"use client"

import { type ExecuteResult, type TestCaseResult } from "./ProblemDetailsPage"
import { cn } from "@/lib/utils"
import { Terminal, CheckCircle2, XCircle, Check, X } from "lucide-react"

type OutputPanelProps = {
  output: ExecuteResult | null
  testCaseResults: TestCaseResult[]
}

export default function OutputPanel({ output, testCaseResults }: OutputPanelProps) {
  const allTestsPassed = testCaseResults.length > 0 && testCaseResults.every(tc => tc.passed);
  const hasTestResults = testCaseResults.length > 0;

  return (
    <div className="h-full flex flex-col bg-card border-l border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/60 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Terminal className="w-4 h-4 text-primary" />
          Test Result
        </div>
        {output && (
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1",
              output.success && allTestsPassed
                ? "bg-green-500/15 text-green-500 border border-green-500/30"
                : output.success && !allTestsPassed
                ? "bg-yellow-500/15 text-yellow-500 border border-yellow-500/30"
                : "bg-red-500/15 text-red-500 border border-red-500/30"
            )}
          >
            {output.success && allTestsPassed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> All Passed
              </>
            ) : output.success ? (
              <>
                <XCircle className="w-3.5 h-3.5" /> Failed
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" /> Error
              </>
            )}
          </div>
        )}
      </div>

      {/* Test Cases - LeetCode Style */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {!output ? (
          <div className="px-4 py-6 text-center">
            <p className="text-muted-foreground italic text-sm">
              Click <span className="text-primary font-medium">"Run Code"</span> to see test results here...
            </p>
          </div>
        ) : hasTestResults ? (
          <div className="px-4 py-3 space-y-2">
            {testCaseResults.map((testCase, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-lg border p-3 transition-colors",
                  testCase.passed
                    ? "bg-green-500/5 border-green-500/20"
                    : "bg-red-500/5 border-red-500/20"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {testCase.passed ? (
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    testCase.passed ? "text-green-500" : "text-red-500"
                  )}>
                    Test Case {testCase.testCaseNumber}
                  </span>
                  {testCase.passed && (
                    <span className="text-xs text-green-500/70 ml-auto">Passed</span>
                  )}
                </div>
                {!testCase.passed && (
                  <div className="space-y-1.5 mt-2 text-xs font-mono">
                    <div>
                      <span className="text-muted-foreground">Expected: </span>
                      <span className="text-green-400">{testCase.expected}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Got: </span>
                      <span className="text-red-400">{testCase.actual}</span>
                    </div>
                  </div>
                )}
                {testCase.passed && (
                  <div className="mt-1.5 text-xs font-mono">
                    <span className="text-muted-foreground">Output: </span>
                    <span className="text-green-400">{testCase.actual}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : output.success ? (
          <div className="px-4 py-3">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm font-mono text-green-400 mt-2">
                {output.output}
              </pre>
            </div>
          </div>
        ) : (
          <div className="px-4 py-3">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">Execution Error</span>
              </div>
              <div className="space-y-2 mt-2">
                {output.output && (
                  <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">
                    {output.output}
                  </pre>
                )}
                <pre className="whitespace-pre-wrap text-sm font-mono text-red-400">
                  {output.error}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
