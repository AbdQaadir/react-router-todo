import { redirect } from "react-router";
import { getAuth } from "@clerk/react-router/server";
import { SignIn } from "@clerk/react-router";
import type { Route } from "./+types/sign-in";

export async function loader(args: Route.LoaderArgs) {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated } = await getAuth(args);

  // Protect the route by checking if the user is signed in
  if (isAuthenticated) {
    return redirect("/todos");
  }

  return null;
}

export default function SignInPage() {
  return (
    <div className="flex-1 w-full h-full flex align-center justify-center">
      <div className="m-auto">
        <SignIn forceRedirectUrl="/todos" />
      </div>
    </div>
  );
}
