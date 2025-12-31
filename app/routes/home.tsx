import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/react-router";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-sm border border-slate-200 p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Todos App</h1>
          <p className="mt-2 text-slate-600">
            A simple, authenticated todo application built with React, Clerk,
            and NestJS.
          </p>
        </header>

        <SignedOut>
          <div className="space-y-6">
            <p className="text-slate-700">
              Sign in to manage your personal todo list securely.
            </p>

            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition">
                  Sign in
                </button>
              </SignInButton>

              <span className="text-sm text-slate-500">
                No account? Create one in seconds.
              </span>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="space-y-6">
            <p className="text-slate-700">
              You’re signed in. Continue to manage your todos.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/todos"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
              >
                Go to Todos
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />

              <SignOutButton>
                <button className="text-sm text-slate-600 hover:text-slate-900 transition">
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}
