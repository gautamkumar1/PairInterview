"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Code2, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PROBLEMS } from "@/data/dsa-problem.ts" // adjust path

export default function ProblemsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const difficulties = ["All", "Easy", "Medium", "Hard"]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-400 bg-emerald-500/10"
      case "Medium":
        return "text-amber-400 bg-amber-500/10"
      case "Hard":
        return "text-red-400 bg-red-500/10"
      default:
        return "text-muted-foreground bg-muted/10"
    }
  }

  const problemsList = Object.values(PROBLEMS)

  const filteredProblems = useMemo(() => {
    const byDifficulty =
      selectedDifficulty === "All"
        ? problemsList
        : problemsList.filter((p) => p.difficulty === selectedDifficulty)

    if (!searchTerm.trim()) return byDifficulty
    return byDifficulty.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [selectedDifficulty, searchTerm])

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-8 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto text-center mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold">Practice Problems</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Improve your algorithmic skills with short, focused problems.
        </p>
      </motion.div>

      {/* Search + Filter */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="relative flex gap-2">
          {difficulties.map((difficulty) => {
            const isActive = selectedDifficulty === difficulty
            return (
              <motion.button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative px-3 py-1.5 text-sm rounded-full font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent/30"
                )}
              >
                {difficulty}
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-primary/20"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Problems List */}
      <motion.div
        layout
        className="max-w-3xl mx-auto divide-y divide-border border border-border/60 rounded-lg bg-card/30 overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: index * 0.03, duration: 0.25 }}
                whileHover={{ backgroundColor: "hsl(var(--muted)/0.3)" }}
                className="flex justify-between items-center p-4 sm:p-5 transition-colors cursor-pointer"
              >
                {/* Left */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Code2 className="w-4 h-4 text-primary/70" />
                    <h2 className="font-medium text-sm sm:text-base">
                      {problem.title}
                    </h2>
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[11px] rounded-full font-medium",
                        getDifficultyColor(problem.difficulty)
                      )}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {problem.category}
                  </p>
                </div>

                {/* Right */}
                <Button
                  variant="ghost"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  Solve
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground py-10 text-sm"
            >
              No problems found.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
