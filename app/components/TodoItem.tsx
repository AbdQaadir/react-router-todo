import type { Todo } from "~/types";

type Props = {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
};

export default function TodoItem({ todo, onEdit, onDelete, onToggle }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <label className="flex gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="mt-1"
          />

          <div>
            <p
              className={`font-medium ${
                todo.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {todo.title}
            </p>

            {todo.description && (
              <p className="mt-1 text-sm text-slate-600">{todo.description}</p>
            )}
          </div>
        </label>

        <div className="flex gap-3 text-sm">
          <button
            onClick={onEdit}
            className="text-slate-600 hover:text-slate-900"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
