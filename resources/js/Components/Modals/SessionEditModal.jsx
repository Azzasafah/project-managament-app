import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function SessionEditModal({ open, session, onClose, onToast }) {
    if (!open) return null;

    const isEdit = Boolean(session && session.id);

    const [form, setForm] = useState({
        session_number: '',
        session_name: '',
        phase: 'CORE',
        scheduled_date: new Date().toISOString().split('T')[0],
        day_name: 'Minggu',
        start_time: '19:30',
        mentor_name: '',
        topic: '',
        target_project: '',
        zoom_url: '',
        recording_url: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (session && session.id) {
            setForm({
                session_number: session.session_number || '',
                session_name: session.session_name || '',
                phase: session.phase || 'CORE',
                scheduled_date: session.scheduled_date || new Date().toISOString().split('T')[0],
                day_name: session.day_name || 'Minggu',
                start_time: session.start_time || '19:30',
                mentor_name: session.mentor_name || '',
                topic: session.topic || '',
                target_project: session.target_project || '',
                zoom_url: session.zoom_url || '',
                recording_url: session.recording_url || '',
            });
        } else {
            setForm({
                session_number: '',
                session_name: '',
                phase: 'CORE',
                scheduled_date: new Date().toISOString().split('T')[0],
                day_name: 'Minggu',
                start_time: '19:30',
                mentor_name: '',
                topic: '',
                target_project: '',
                zoom_url: '',
                recording_url: '',
            });
        }
    }, [session]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const url = isEdit ? `/safahflow/sessions/${session.id}` : '/safahflow/sessions';
        const method = isEdit ? 'put' : 'post';

        router[method](url, form, {
            onSuccess: () => {
                setSubmitting(false);
                if (onToast) onToast(`Sesi ${form.session_number || ''} berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`, 'success');
                onClose();
            },
            onError: (errs) => {
                setSubmitting(false);
                const first = Object.values(errs)[0];
                if (onToast) onToast(first || 'Gagal menyimpan data sesi.', 'error');
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-display font-black text-base shadow-sm">
                            <span>#{form.session_number || '+'}</span>
                        </div>
                        <div>
                            <h3 className="font-display font-extrabold text-slate-900 text-base leading-tight">
                                {isEdit ? `Edit Sesi #${session.session_number}` : 'Tambah Sesi Bootcamp Baru'}
                            </h3>
                            <p className="text-[11px] font-mono text-neutral-400">
                                {isEdit ? session.session_name : 'Kurikulum & Jadwal Belajar'}
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scroll">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Nomor Sesi
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={form.session_number}
                                onChange={(e) => setForm({ ...form, session_number: parseInt(e.target.value) || '' })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                placeholder="Contoh: 37"
                                required
                                disabled={isEdit}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Label Sesi (Nama)
                            </label>
                            <input
                                type="text"
                                value={form.session_name}
                                onChange={(e) => setForm({ ...form, session_name: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                placeholder="Contoh: Sesi 37"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Fase Belajar
                            </label>
                            {(() => {
                                const defaultList = [
                                    { id: 'PRA_BOOTCAMP', label: 'PRA BOOTCAMP' },
                                    { id: 'CORE', label: 'CORE / FOUNDATION' },
                                    { id: 'STREAMING', label: 'STREAMING' },
                                    { id: 'PROCESSING', label: 'PROCESSING' },
                                    { id: 'LAKE_ORCHESTRATION', label: 'LAKE & ORCHESTRATION' },
                                    { id: 'CONSULTATION', label: 'CONSULTATION' },
                                    { id: 'GRAND_DEMO_DAY', label: 'GRAND DEMO DAY' },
                                    { id: 'CAREER', label: 'CAREER' },
                                    { id: 'USER_TEST', label: 'USER TEST' },
                                ];
                                let currentList = defaultList;
                                try {
                                    const saved = localStorage.getItem('safahflow_custom_phases');
                                    if (saved) {
                                        const parsed = JSON.parse(saved);
                                        if (Array.isArray(parsed) && parsed.length > 0) {
                                            currentList = parsed;
                                        }
                                    }
                                } catch (e) {}
                                if (form.phase && !currentList.some((p) => p.id === form.phase)) {
                                    currentList = [...currentList, { id: form.phase, label: form.phase.replace(/_/g, ' ') }];
                                }

                                return (
                                    <select
                                        value={form.phase}
                                        onChange={(e) => setForm({ ...form, phase: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all uppercase"
                                    >
                                        {currentList.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.label || p.id}
                                            </option>
                                        ))}
                                    </select>
                                );
                            })()}
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Mentor / Instruktur
                            </label>
                            <input
                                type="text"
                                value={form.mentor_name}
                                onChange={(e) => setForm({ ...form, mentor_name: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                placeholder="Contoh: Mas Bachtiyar"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Tanggal
                            </label>
                            <input
                                type="date"
                                value={form.scheduled_date}
                                onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Hari
                            </label>
                            <input
                                type="text"
                                value={form.day_name}
                                onChange={(e) => setForm({ ...form, day_name: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                placeholder="Minggu"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Jam Mulai
                            </label>
                            <input
                                type="text"
                                value={form.start_time}
                                onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                placeholder="19:30"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Materi & Topik Sesi
                        </label>
                        <textarea
                            rows={2}
                            value={form.topic}
                            onChange={(e) => setForm({ ...form, topic: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all resize-none"
                            placeholder="Contoh: Realtime Stream Processing with Flink..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Target Proyek Portofolio
                        </label>
                        <input
                            type="text"
                            value={form.target_project}
                            onChange={(e) => setForm({ ...form, target_project: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                            placeholder="Contoh: Capstone / Telkom ETL"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Link Zoom Live Class
                            </label>
                            <div className="relative">
                                <i className="ph-bold ph-video-camera absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input
                                    type="url"
                                    value={form.zoom_url}
                                    onChange={(e) => setForm({ ...form, zoom_url: e.target.value })}
                                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all font-mono"
                                    placeholder="https://zoom.us/j/..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Link Rekaman / Video
                            </label>
                            <div className="relative">
                                <i className="ph-bold ph-play-circle absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input
                                    type="url"
                                    value={form.recording_url}
                                    onChange={(e) => setForm({ ...form, recording_url: e.target.value })}
                                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all font-mono"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2.5 rounded-2xl bg-black text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                            {submitting ? (
                                <>
                                    <i className="ph-bold ph-spinner animate-spin"></i> Menyimpan...
                                </>
                            ) : (
                                <>
                                    <i className="ph-bold ph-check"></i> {isEdit ? 'Simpan Perubahan' : 'Tambah Sesi'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
