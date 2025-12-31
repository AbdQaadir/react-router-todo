// src/pages/todos/TodoForm.tsx
import { useState } from "react";
import Modal from "./Modal";

type Props = {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (data: { title: string; description?: string }) => Promise<void>;
  onCancel: () => void;
};

export default function TodoForm({
  initialTitle = "",
  initialDescription = "",
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    await onSubmit({ title, description });
    setLoading(false);
  }

  return (
    <Modal title="Todo" onClose={onCancel}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <textarea
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900"
          placeholder="Description (optional)"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
