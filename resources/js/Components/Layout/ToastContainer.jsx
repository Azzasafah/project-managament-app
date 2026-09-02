import React from 'react';

export default function ToastContainer({ toasts }) {
    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none font-sans">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-2xl border text-sm font-medium bg-[#0e0e12] text-white border-white/15 transition-all duration-300 animate-slide-in"
                >
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        {toast.type === 'error' ? (
                            <i className="ph-bold ph-warning text-rose-400 text-sm"></i>
                        ) : (
                            <i className="ph-bold ph-check text-emerald-400 text-sm"></i>
                        )}
                    </div>
                    <p className="flex-1 text-xs font-mono leading-snug">{toast.message}</p>
                </div>
            ))}
        </div>
    );
}
