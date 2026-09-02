import React from 'react';

export default function TaskModal({
    isOpen,
    isEdit,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                    <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                            {isEdit ? 'UPDATE_TASK' : 'CREATE_TASK'}
                        </span>
                        <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                            {isEdit ? 'Edit Task Kanban' : 'Tambah Task Baru'}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Judul Tugas
                        </label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Misal: Setup Airflow DAG pipeline"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            rows="3"
                            value={form.description || ''}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Detail teknis tugas..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Status
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-2 focus:ring-black focus:outline-none"
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Tag
                            </label>
                            <select
                                value={form.tag}
                                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-2 focus:ring-black focus:outline-none"
                            >
                                <option value="Backend">Backend</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Database">Database</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Data Eng">Data Eng</option>
                                <option value="Auth">Auth</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-xs font-mono font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-xs font-mono font-bold bg-black hover:bg-neutral-800 text-white rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.98]"
                        >
                            Simpan Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
