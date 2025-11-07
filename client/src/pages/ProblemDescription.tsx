import { cn } from "@/lib/utils"

export const getDifficultyBadgeClass = (difficulty: string) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-500/15 text-green-500 border border-green-500/30"
    case "medium":
      return "bg-amber-500/15 text-amber-500 border border-amber-500/30"
    case "hard":
      return "bg-red-500/15 text-red-500 border border-red-500/30"
    default:
      return "bg-muted text-muted-foreground border border-border/60"
  }
}

interface ProblemDescriptionProps {
  problem: any
  currentProblemId: string
  onProblemChange: (id: string) => void
  allProblems: any[]
}

export default function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}: ProblemDescriptionProps) {
  return (
    <div className="h-full overflow-y-auto bg-background text-foreground">
      {/* HEADER */}
      <div className="p-6 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{problem.title}</h1>
          <span
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full",
              getDifficultyBadgeClass(problem.difficulty)
            )}
          >
            {problem.difficulty}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{problem.category}</p>

        {/* Problem Selector */}
        <div className="mt-4">
          <select
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-8">
        {/* DESCRIPTION */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold mb-3 text-foreground">Description</h2>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((note: string, idx: number) => (
              <p key={idx}>{note}</p>
            ))}
          </div>
        </section>

        {/* EXAMPLES */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Examples</h2>
          <div className="space-y-5">
            {problem.examples.map((example: any, idx: number) => (
              <div
                key={idx}
                className="rounded-lg bg-muted/30 border border-border/60 p-4 transition-colors hover:bg-accent/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">
                    Example {idx + 1}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    #{idx + 1}
                  </span>
                </div>
                <div className="font-mono text-sm space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-primary font-semibold min-w-[70px]">Input:</span>
                    <code className="text-foreground">{example.input}</code>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-primary font-semibold min-w-[70px]">Output:</span>
                    <code className="text-foreground">{example.output}</code>
                  </div>

                  {example.explanation && (
                    <div className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground leading-snug">
                      <span className="font-medium text-accent">Explanation:</span> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONSTRAINTS */}
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold mb-3 text-foreground">Constraints</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {problem.constraints.map((constraint: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <code>{constraint}</code>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
