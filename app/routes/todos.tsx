import { useState } from "react";

import type { Route } from "./+types/todos";

import { redirect, useRevalidator } from "react-router";
import { clerkClient, getAuth } from "@clerk/react-router/server";
import TodoItem from "~/components/TodoItem";
import type { Todo } from "~/types";
import TodoForm from "~/components/TodoForm";
import ConfirmDelete from "~/components/ConfirmDelete";
import { useAuth } from "@clerk/react-router";

const API_ROUTE = import.meta.env.VITE_API_URL;

export async function loader(args: Route.LoaderArgs) {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId, getToken } = await getAuth(args);

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return redirect("/sign-in?redirect_url=" + args.request.url);
  }

  // Get the user's full `Backend User` object
  const user = await clerkClient(args).users.getUser(userId);

  // Fetch todos
  const token = await getToken();

  const res = await fetch(`${API_ROUTE}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: Todo[] = await res.json();

  return {
    user,
    todos: data,
  };
}

export default function TodosPage({ loaderData }: Route.ComponentProps) {
  const { user, todos } = loaderData;
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Todo | null>(null);
  const [deleting, setDeleting] = useState<Todo | null>(null);
  const [adding, setAdding] = useState(false);

  const revalidator = useRevalidator();

  async function addTodo(data: Partial<Todo>) {
    try {
      const token = await getToken();
      await fetch(`${API_ROUTE}/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      revalidator.revalidate();

      setAdding(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateTodo(id: string, data: Partial<Todo>) {
    try {
      const token = await getToken();
      await fetch(`${API_ROUTE}/todos/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      revalidator.revalidate();
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteTodo(id: string) {
    try {
      const token = await getToken();
      await fetch(`${API_ROUTE}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      revalidator.revalidate();

      setDeleting(null);
    } catch (err) {
      console.error(err);
    }
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>;
  }

  const isEmpty = todos?.length === 0;

  return (
    <main className="mx-auto w-full max-w-[90vw] sm:max-w-[600px] p-8 space-y-6">
      <header className="w-full flex align-center justify-between">
        <h1 className="text-xl font-semibold">Your Todos</h1>
        <button
          onClick={() => setAdding(true)}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Add Todo
        </button>
      </header>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={() => setEditing(todo)}
            onDelete={() => setDeleting(todo)}
            onToggle={() => updateTodo(todo.id, { completed: !todo.completed })}
          />
        ))}

        {isEmpty && (
          <div className="w-full p-4 border border-gray-100 rounded-4 text-center">
            <p>No items added yet</p>
          </div>
        )}
      </div>

      {adding && (
        <TodoForm onSubmit={addTodo} onCancel={() => setAdding(false)} />
      )}

      {editing && (
        <TodoForm
          initialTitle={editing.title}
          initialDescription={editing.description}
          onSubmit={(title) => updateTodo(editing.id, title)}
          onCancel={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDelete
          title={deleting.title}
          onConfirm={() => deleteTodo(deleting.id)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </main>
  );
}
