import React from 'react';

export default function ConfirmDeleteModal({
    isOpen,
    title = 'Hapus Item Ini?',
    description = 'Tindakan ini tidak dapat dibatalkan. Data yang dihapus akan hilang secara permanen dari sistem.',
    itemName = '',
    onClose,
    onConfirm,
    isLoading = false,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 transform transition-all animate-scale-up space-y-4 text-center">
                
                {/* Danger Icon */}
                <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-xs">
                        <i className="ph-bold ph-trash text-2xl"></i>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-rose-600 uppercase tracking-widest">
                        DELETION_CONFIRMATION
                    </span>
                    <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-sans">
                        {description}
                    </p>

                    {itemName && (
                        <div className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded-xl text-xs font-mono font-bold text-slate-800 max-w-[280px] truncate border border-slate-200">
                            "{itemName}"
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5 pt-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer active:scale-95"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <i className="ph-bold ph-spinner animate-spin text-sm"></i>
                        ) : (
                            <i className="ph-bold ph-trash text-sm"></i>
                        )}
                        <span>{isLoading ? 'Menghapus...' : 'Ya, Hapus'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
