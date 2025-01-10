import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Link from "next/link";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Yes, Log me out
      </Button>
    </form>
  );
}
export default async function LogOut() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        Are you sure you want to leave?
      </h1>
      <p className="text-gray-600 mt-2">
        Your progress will be saved and you can continue where you left off next
        time.
      </p>
      <div className="mt-6 flex space-x-4">
        <SignOut></SignOut>
        <Button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <Link href={"/courses"}> No, Take me back</Link>
        </Button>
      </div>
    </div>
  );
}
