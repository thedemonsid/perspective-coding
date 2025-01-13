import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Link from "next/link";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/courses" });
      }}
    >
      <Button
        type="submit"
        variant="destructive"
        size="lg"
        className="relative group overflow-hidden"
      >
        <span className="relative z-10">Yes, Log me out</span>
        <div className="absolute inset-0 bg-destructive-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Button>
    </form>
  );
}

export default async function LogOut() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4 w-full max-w-3xl mx-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-card/50 backdrop-blur-xl rounded-xl border border-border/50 p-8 shadow-lg">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Are you sure you want to leave?
            </h1>
            <p className="text-muted-foreground">
              Your progress will be saved and you can continue where you left
              off next time.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="relative group overflow-hidden"
            >
              <Link href="/courses">
                <span className="relative z-10">No, Take me back</span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </Button>
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  );
}
