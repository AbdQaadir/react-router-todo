import { useEffect } from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: Props) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg p-6">
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
