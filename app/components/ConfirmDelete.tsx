import Modal from "./Modal";

type Props = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDelete({ title, onConfirm, onCancel }: Props) {
  return (
    <Modal title="Delete Todo" onClose={onCancel}>
      <p className="mb-6 text-slate-700">
        Are you sure you want to delete{" "}
        <span className="font-medium">{title}</span>?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
