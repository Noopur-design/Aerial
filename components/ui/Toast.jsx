'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Toast() {
  const toast = useStore((s) => s.toast);
  const dismiss = useStore((s) => s.dismissToast);
  return (
    <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-0 bottom-4 z-[95] flex justify-center px-4 sm:bottom-6">
      {toast && (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex items-center gap-5 bg-charcoal py-3 pl-5 pr-2 text-[0.82rem] text-ivory shadow-[0_12px_40px_rgba(26,26,24,0.25)]"
        >
          <span>{toast.message}</span>
          {toast.action && (
            <Link href={toast.action.href} onClick={dismiss} className="text-[0.7rem] uppercase tracking-[0.16em] underline underline-offset-4">
              {toast.action.label}
            </Link>
          )}
          <button type="button" onClick={dismiss} aria-label="Dismiss notification" className="inline-flex h-8 w-8 items-center justify-center opacity-70 hover:opacity-100">
            <X size={16} strokeWidth={1.25} />
          </button>
        </div>
      )}
    </div>
  );
}
