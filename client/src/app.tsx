import { authClient } from "./lib/auth-client";
import { SignIn } from "./components/auth/sign-in";
import { SignUp } from "./components/auth/sign-up";
import { Button } from "./components/ui/button";
import { useState } from "react";

function App() {
  const { data: session, isPending } = authClient.useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session && !showAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-4 p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome</h1>
            <p className="text-muted-foreground mb-6">
              Sign in to your account or create a new one
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="default"
              className="flex-1"
              onClick={() => {
                setIsSignUp(false);
                setShowAuth(true);
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setIsSignUp(true);
                setShowAuth(true);
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!session && showAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          {isSignUp ? (
            <SignUp onSuccess={() => setShowAuth(false)} />
          ) : (
            <SignIn onSuccess={() => setShowAuth(false)} />
          )}
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => {
                setShowAuth(false);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            You're signed in as <strong>{session?.user.email}</strong>
          </p>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default App;

