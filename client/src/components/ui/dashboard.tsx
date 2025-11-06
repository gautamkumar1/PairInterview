import { useState } from "react"
import { Play, Zap, TrendingUp, Clock, Target, Activity, Users, LogIn, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const liveSessions = [
  {
    id: 1,
    problemName: "Two Sum",
    difficulty: "Easy",
    creatorName: "CodeMaster92",
    participants: 1,
    maxParticipants: 2,
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 2,
    problemName: "Merge K Sorted Lists",
    difficulty: "Hard",
    creatorName: "AlgoKing",
    participants: 2,
    maxParticipants: 2,
    createdAt: new Date(Date.now() - 15 * 60000),
  },
  {
    id: 3,
    problemName: "Longest Substring",
    difficulty: "Medium",
    creatorName: "PythonPro",
    participants: 1,
    maxParticipants: 2,
    createdAt: new Date(Date.now() - 8 * 60000),
  },
]

const pastSessions = [
  {
    problemName: "Two Sum",
    difficulty: "Easy",
    completedTime: new Date(Date.now() - 3 * 60 * 60000),
    participants: 2,
    status: "Completed",
  },
  {
    problemName: "Merge K Sorted Lists",
    difficulty: "Hard",
    completedTime: new Date(Date.now() - 24 * 60 * 60000),
    participants: 2,
    status: "Completed",
  },
  {
    problemName: "Longest Substring",
    difficulty: "Medium",
    completedTime: new Date(Date.now() - 2 * 24 * 60 * 60000),
    participants: 1,
    status: "Abandoned",
  },
  {
    problemName: "3Sum",
    difficulty: "Medium",
    completedTime: new Date(Date.now() - 4 * 24 * 60 * 60000),
    participants: 2,
    status: "Completed",
  },
  {
    problemName: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    completedTime: new Date(Date.now() - 7 * 24 * 60 * 60000),
    participants: 1,
    status: "Completed",
  },
]

function getTimeAgo(date: Date): string {
  const now = new Date()
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (secondsAgo < 60) return "just now"
  const minutesAgo = Math.floor(secondsAgo / 60)
  if (minutesAgo < 60) return `${minutesAgo}m ago`
  const hoursAgo = Math.floor(minutesAgo / 60)
  if (hoursAgo < 24) return `${hoursAgo}h ago`
  const daysAgo = Math.floor(hoursAgo / 24)
  return `${daysAgo}d ago`
}

function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "Hard":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-neutral-500/20 text-neutral-400"
    }
  }

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [joinedSessions, setJoinedSessions] = useState<number[]>([])

  const activeSessionCount = liveSessions.length

  const totalSessions = pastSessions.length + activeSessionCount

  const handleJoinSession = (sessionId: number) => {
    if (!joinedSessions.includes(sessionId)) {
      setJoinedSessions([...joinedSessions, sessionId])
    }
  }

  const handleRejoinSession = (sessionId: number) => {
    // Rejoin logic
    console.log("Rejoining session", sessionId)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-70"} bg-sidebar border-r border-sidebar-border transition-all duration-300 fixed md:relative z-50 md:z-auto h-full`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`${sidebarCollapsed ? "hidden" : "block"}`}>
              <h1 className="text-primary font-bold text-lg tracking-wider">PRACTICE HUB</h1>
              <p className="text-muted-foreground text-xs">v2.1.7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Quick Start Section */}
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-wider mb-4">QUICK START</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-24 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-lg flex items-center justify-center gap-3">
                  <Play className="w-6 h-6" />
                  Start Solo Practice
                </Button>
                <Button className="h-24 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-lg rounded-lg flex items-center justify-center gap-3">
                  <Users className="w-6 h-6" />
                  Start 1v1 Session
                </Button>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Session Card */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    ACTIVE SESSION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="text-4xl font-bold text-foreground font-mono">{activeSessionCount}</div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-green-500 ring-1 ring-primary/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Sessions Card */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    TOTAL SESSIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-5xl font-bold text-foreground font-mono">{totalSessions}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session Card */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    LIVE SESSIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {liveSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-3 bg-muted rounded border-l-2 border-primary hover:bg-accent transition-colors"
                      >
                        <div className="mb-2">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="text-sm font-bold text-foreground">{session.problemName}</div>
                            <span className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${getDifficultyColor(session.difficulty)}`}>
                              {session.difficulty}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">Creator: {session.creatorName}</div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-muted-foreground">
                            Participants: {session.participants}/{session.maxParticipants}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {session.participants < session.maxParticipants ? (
                            <Button
                              onClick={() => handleJoinSession(session.id)}
                              disabled={joinedSessions.includes(session.id)}
                              className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                            >
                              <LogIn className="w-3 h-3 mr-1" />
                              Join
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className="flex-1 h-8 text-xs bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            >
                              <LogIn className="w-3 h-3 mr-1" />
                              Full
                            </Button>
                          )}
                          {joinedSessions.includes(session.id) && (
                            <Button
                              onClick={() => handleRejoinSession(session.id)}
                              className="flex-1 h-8 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              Rejoin
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Your Past Sessions & Performance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Your Past Sessions */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    YOUR PAST SESSIONS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {pastSessions.map((session, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded hover:bg-accent transition-colors cursor-pointer border-l-2 border-primary"
                      >
                        <div className="mb-2">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="text-sm font-bold text-foreground">{session.problemName}</div>
                            <span className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${getDifficultyColor(session.difficulty)}`}>
                              {session.difficulty}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{getTimeAgo(session.completedTime)}</span>
                          <span>•</span>
                          <span>{session.completedTime.toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">Participants: {session.participants}</div>
                          <span
                            className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                              session.status === "Completed"
                                ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                                : "bg-destructive/15 text-destructive ring-1 ring-destructive/30"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    PERFORMANCE SUMMARY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Problems Solved This Week */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Problems solved this week</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-bold text-foreground font-mono">87</div>
                        <div className="text-sm text-primary">+15% from last week</div>
                      </div>
                    </div>

                    {/* Average Time Per Problem */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Average time per problem</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-bold text-foreground font-mono">8m 34s</div>
                        <div className="text-sm text-primary">-2m from last week</div>
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Success rate (%)</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-bold text-foreground font-mono">91%</div>
                        <div className="text-sm text-primary">+4% from last week</div>
                      </div>
                      {/* Simple Progress Bar */}
                      <div className="mt-3 w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "91%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
