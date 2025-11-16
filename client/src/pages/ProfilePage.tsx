import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import AuthUserButton from "@/components/auth/AuthUserButton";

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and view your statistics
        </p>
      </div>

      {/* Profile Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            ACCOUNT INFORMATION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <AuthUserButton />
            <div>
              <p className="text-sm text-muted-foreground">
                Your profile information and settings
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Profile settings and preferences will be available here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

