import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  Medal,
} from "lucide-react";

interface LeaderboardUser {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  problemsSolved: number;
  winRate: number;
  totalSessions: number;
}

// Mock data for leaderboard
const leaderboardData: LeaderboardUser[] = [
  {
    id: 1,
    rank: 1,
    name: "CodeMaster92",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster92",
    problemsSolved: 245,
    winRate: 92,
    totalSessions: 180,
  },
  {
    id: 2,
    rank: 2,
    name: "AlgoKing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoKing",
    problemsSolved: 238,
    winRate: 89,
    totalSessions: 175,
  },
  {
    id: 3,
    rank: 3,
    name: "PythonPro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PythonPro",
    problemsSolved: 220,
    winRate: 87,
    totalSessions: 165,
  },
  {
    id: 4,
    rank: 4,
    name: "DataStructGuru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataStructGuru",
    problemsSolved: 198,
    winRate: 85,
    totalSessions: 150,
  },
  {
    id: 5,
    rank: 5,
    name: "LeetCodeNinja",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeetCodeNinja",
    problemsSolved: 185,
    winRate: 83,
    totalSessions: 142,
  },
  {
    id: 6,
    rank: 6,
    name: "AlgorithmAce",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlgorithmAce",
    problemsSolved: 172,
    winRate: 81,
    totalSessions: 135,
  },
  {
    id: 7,
    rank: 7,
    name: "CodeWarrior",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeWarrior",
    problemsSolved: 165,
    winRate: 79,
    totalSessions: 128,
  },
  {
    id: 8,
    rank: 8,
    name: "BinarySearchPro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BinarySearchPro",
    problemsSolved: 158,
    winRate: 77,
    totalSessions: 120,
  },
];

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-300" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <Medal className="w-5 h-5 text-muted-foreground" />;
  }
}

function getRankBadgeColor(rank: number): string {
  switch (rank) {
    case 1:
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case 2:
      return "bg-gray-400/20 text-gray-300 border-gray-400/30";
    case 3:
      return "bg-amber-600/20 text-amber-500 border-amber-600/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export default function LeaderboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Top performers based on problems solved, win rate, and consistency
        </p>
      </div>

      {/* Leaderboard Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              TOP PERFORMERS
            </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <div
                key={user.id}
                className={`
                  p-4 rounded-lg border transition-all duration-200
                  ${
                    user.rank <= 3
                      ? "bg-accent/50 border-primary/20"
                      : "bg-muted/30 border-border hover:bg-accent/30"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {user.rank <= 3 ? (
                      getRankIcon(user.rank)
                    ) : (
                      <span
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          text-sm font-bold border
                          ${getRankBadgeColor(user.rank)}
                        `}
                      >
                        {user.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.totalSessions} sessions
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground font-mono">
                        {user.problemsSolved}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Problems
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground font-mono">
                        {user.winRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Win Rate
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="md:hidden flex flex-col gap-1 text-right">
                    <div className="text-sm font-bold text-foreground font-mono">
                      {user.problemsSolved}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.winRate}% win
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground mb-1">
              Total Participants
            </div>
            <div className="text-2xl font-bold text-foreground font-mono">
              {leaderboardData.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground mb-1">
              Avg Problems Solved
            </div>
            <div className="text-2xl font-bold text-foreground font-mono">
              {Math.round(
                leaderboardData.reduce((sum, u) => sum + u.problemsSolved, 0) /
                  leaderboardData.length
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground mb-1">
              Avg Win Rate
            </div>
            <div className="text-2xl font-bold text-foreground font-mono">
              {Math.round(
                leaderboardData.reduce((sum, u) => sum + u.winRate, 0) /
                  leaderboardData.length
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

