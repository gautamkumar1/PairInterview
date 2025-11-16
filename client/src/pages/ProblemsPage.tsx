import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Code2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PROBLEMS } from "@/data/dsa-problem.ts" 

export default function ProblemsPage() {
  const navigate = useNavigate()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [direction, setDirection] = useState<number>(0) // -1 for prev, 1 for next
  const itemsPerPage = 10

  const difficulties = ["All", "Easy", "Medium", "Hard"]

  // Convert problem title to URL-friendly slug
  // e.g., "Valid Palindrome" -> "valid-palindrome"
  const titleToSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
    setDirection(0)
  }, [selectedDifficulty, searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProblems = filteredProblems.slice(startIndex, endIndex)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }
    return pages
  }

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
        className="max-w-3xl mx-auto divide-y divide-border border border-border/60 rounded-lg bg-card/30 overflow-hidden mb-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: direction > 0 ? 20 : direction < 0 ? -20 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -20 : direction < 0 ? 20 : 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.03, 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
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
                    onClick={() => navigate(`/dashboard/problem/${titleToSlug(problem.title)}`)}
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
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Results info */}
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProblems.length)} of{" "}
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? "s" : ""}
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDirection(-1)
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }}
              disabled={currentPage === 1}
              className="bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) => {
                if (page === "ellipsis") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 py-1 text-muted-foreground"
                    >
                      ...
                    </span>
                  )
                }

                const pageNum = page as number
                const isActive = currentPage === pageNum

                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => {
                      setDirection(pageNum > currentPage ? 1 : -1)
                      setCurrentPage(pageNum)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "min-w-[2.5rem] h-9 px-3 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {pageNum}
                  </motion.button>
                )
              })}
            </div>

            {/* Next button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDirection(1)
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }}
              disabled={currentPage === totalPages}
              className="bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
