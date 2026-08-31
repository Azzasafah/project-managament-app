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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 transform transition-all animate-scale-up space-y-5">
                
                {/* Danger Icon with Glowing Ring */}
                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-100 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/10">
                        <i className="ph-bold ph-trash text-3xl animate-bounce-short"></i>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                        {description}
                    </p>

                    {itemName && (
                        <div className="inline-block mt-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 max-w-[280px] truncate border border-slate-200">
                            "{itemName}"
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-2xl transition-all shadow-md shadow-rose-600/30 hover:shadow-rose-600/50 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                        {isLoading ? (
                            <i className="ph-bold ph-spinner animate-spin text-base"></i>
                        ) : (
                            <i className="ph-bold ph-trash text-base"></i>
                        )}
                        <span>{isLoading ? 'Menghapus...' : 'Ya, Hapus'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
