import React, { useState, useEffect } from 'react';

export default function PhaseManagerModal({
    open,
    onClose,
    currentPhases = [],
    sessionPhases = [],
    onSavePhases,
    onToast,
}) {
    const defaultPhaseList = [
        { id: 'PRA_BOOTCAMP', label: 'Pra-Bootcamp' },
        { id: 'CORE', label: 'Core & Foundation' },
        { id: 'STREAMING', label: 'Streaming Kafka' },
        { id: 'PROCESSING', label: 'PySpark Processing' },
        { id: 'LAKE_ORCHESTRATION', label: 'MinIO & Airflow' },
        { id: 'CONSULTATION', label: 'Konsultasi Proyek' },
        { id: 'GRAND_DEMO_DAY', label: 'Grand Demo Day' },
        { id: 'CAREER', label: 'Career Coaching' },
        { id: 'USER_TEST', label: 'User Test' },
    ];

    const [phases, setPhases] = useState([]);
    const [newId, setNewId] = useState('');
    const [newLabel, setNewLabel] = useState('');

    useEffect(() => {
        if (open) {
            if (currentPhases && currentPhases.length > 0) {
                setPhases(JSON.parse(JSON.stringify(currentPhases)));
            } else {
                setPhases(defaultPhaseList);
            }
        }
    }, [open, currentPhases]);

    if (!open) return null;

    const handleLabelChange = (index, value) => {
        const updated = [...phases];
        updated[index].label = value;
        setPhases(updated);
    };

    const handleAddPhase = (e) => {
        e.preventDefault();
        const trimmedId = newId.trim().toUpperCase().replace(/\s+/g, '_');
        const trimmedLabel = newLabel.trim();

        if (!trimmedId || !trimmedLabel) {
            if (onToast) onToast('Kode dan label kategori wajib diisi.', 'error');
            return;
        }

        if (phases.some((p) => p.id === trimmedId)) {
            if (onToast) onToast(`Kode '${trimmedId}' sudah ada dalam daftar.`, 'error');
            return;
        }

        const updated = [...phases, { id: trimmedId, label: trimmedLabel }];
        setPhases(updated);
        setNewId('');
        setNewLabel('');
        if (onToast) onToast(`Kategori '${trimmedLabel}' berhasil ditambahkan!`, 'success');
    };

    const handleDeletePhase = (phaseId) => {
        if (phases.length <= 1) {
            if (onToast) onToast('Minimal harus ada 1 kategori filter.', 'error');
            return;
        }
        const updated = phases.filter((p) => p.id !== phaseId);
        setPhases(updated);
    };

    const handleResetDefault = () => {
        if (confirm('Kembalikan semua nama kategori slider ke susunan standar?')) {
            setPhases(defaultPhaseList);
            if (onToast) onToast('Kategori dikembalikan ke standar.', 'info');
        }
    };

    const handleSave = () => {
        if (onSavePhases) {
            onSavePhases(phases);
        }
        onClose();
        if (onToast) onToast('Pilihan kategori slider kurikulum berhasil diperbarui!', 'success');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
            <div
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-sm">
                            <i className="ph-bold ph-sliders"></i>
                        </div>
                        <div>
                            <h3 className="font-display font-black text-slate-900 text-base leading-tight">
                                Kelola Kategori Slider Kurikulum
                            </h3>
                            <p className="text-[11px] font-mono text-neutral-400">
                                Edit label tampilan, tambah kategori baru, atau sesuaikan filter sesi
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-sm"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scroll">
                    {/* Add new phase */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <i className="ph-bold ph-plus-circle text-black"></i>
                            Tambah Kategori Slider Baru
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <input
                                type="text"
                                value={newId}
                                onChange={(e) => setNewId(e.target.value)}
                                placeholder="KODE (contoh: CLOUD_AWS)"
                                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono uppercase focus:border-black focus:outline-hidden"
                            />
                            <input
                                type="text"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                placeholder="Label Tampilan (contoh: Cloud AWS)"
                                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:border-black focus:outline-hidden"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleAddPhase}
                                className="px-4 py-1.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                            >
                                <i className="ph-bold ph-plus"></i>
                                <span>Tambahkan</span>
                            </button>
                        </div>
                    </div>

                    {/* Phase List */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                Daftar Kategori Pilihan ({phases.length})
                            </span>
                            <button
                                type="button"
                                onClick={handleResetDefault}
                                className="text-[11px] font-mono font-bold text-slate-500 hover:text-black hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                <i className="ph-bold ph-arrow-counter-clockwise"></i>
                                <span>Reset Standar</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            {phases.map((p, idx) => {
                                const count = sessionPhases.filter((sp) => sp === p.id).length;

                                return (
                                    <div
                                        key={p.id}
                                        className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-center gap-3 shadow-2xs"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                                                    {p.id}
                                                </span>
                                                <span className="text-[10px] font-mono text-neutral-400">
                                                    ({count} sesi aktif)
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={p.label}
                                                onChange={(e) => handleLabelChange(idx, e.target.value)}
                                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                                placeholder="Label tampilan..."
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeletePhase(p.id)}
                                            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0"
                                            title="Hapus Kategori"
                                        >
                                            <i className="ph-bold ph-trash text-sm"></i>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <p className="text-[11px] font-mono text-neutral-400">
                        Perubahan akan langsung aktif pada slider filter
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-5 py-2 rounded-2xl bg-black text-white text-xs font-bold hover:bg-slate-800 shadow-sm transition-all active:scale-95 cursor-pointer"
                        >
                            Simpan & Terapkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
