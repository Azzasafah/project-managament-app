import React from 'react';

export default function StatCards({
    activeTasksCount,
    journalCount,
    nearestKajian,
    avgSleep,
    onTabChange,
}) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
                onClick={() => onTabChange('projects')}
                className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
            >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <i className="ph-fill ph-kanban text-xl"></i>
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Tugas Aktif</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                    {activeTasksCount} <span className="text-sm font-normal text-slate-500">Task</span>
                </p>
            </div>

            <div
                onClick={() => onTabChange('learning')}
                className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
            >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <i className="ph-fill ph-notebook text-xl"></i>
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Jurnal Belajar</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                    {journalCount} <span className="text-sm font-normal text-slate-500">Entri</span>
                </p>
            </div>

            <div
                onClick={() => onTabChange('spiritual')}
                className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
            >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                    <i className="ph-fill ph-mosque text-xl"></i>
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Kajian Terdekat</p>
                <p className="text-lg font-bold text-slate-800 mt-1 truncate leading-tight">
                    {nearestKajian ? nearestKajian.title : 'Belum ada agenda'}
                </p>
            </div>

            <div
                onClick={() => onTabChange('wellbeing')}
                className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
            >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                    <i className="ph-fill ph-moon-stars text-xl"></i>
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Rata-rata Tidur</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                    {avgSleep} <span className="text-sm font-normal text-slate-500">Jam</span>
                </p>
            </div>
        </div>
    );
}
