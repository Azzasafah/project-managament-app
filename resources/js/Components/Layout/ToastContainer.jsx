import React from 'react';

export default function ToastContainer({ toasts }) {
    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-xl border text-sm font-medium bg-slate-900 text-white border-slate-700 transition-all duration-300 animate-slide-in"
                >
                    <i className="ph-fill ph-check-circle text-emerald-400 text-xl"></i>
                    <p className="flex-1 text-xs leading-snug">{toast.message}</p>
                </div>
            ))}
        </div>
    );
}
