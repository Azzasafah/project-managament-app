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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-lg text-slate-800">
                        {isEdit ? 'Edit Task Kanban' : 'Tambah Task Baru'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-xl"></i>
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Judul Tugas</label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Deskripsi</label>
                        <textarea
                            rows="3"
                            value={form.description || ''}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Tag</label>
                            <select
                                value={form.tag}
                                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                            >
                                <option value="Backend">Backend</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Database">Database</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Auth">Auth</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm cursor-pointer"
                        >
                            Simpan Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
