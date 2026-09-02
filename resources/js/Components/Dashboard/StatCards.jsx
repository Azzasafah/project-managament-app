import React from 'react';

export default function StatCards({
    activeTasksCount,
    journalCount,
    nearestKajian,
    avgSleep,
    onTabChange,
}) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
            <div
                onClick={() => onTabChange('projects')}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-sm">
                        <i className="ph-bold ph-kanban"></i>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">TASK</span>
                </div>
                <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Tugas Aktif</p>
                <p className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1 tabular-nums">
                    {activeTasksCount} <span className="text-xs font-mono font-normal text-neutral-500">Item</span>
                </p>
            </div>

            <div
                onClick={() => onTabChange('learning')}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-emerald-400 flex items-center justify-center text-lg shadow-sm">
                        <i className="ph-bold ph-notebook"></i>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">JOURNAL</span>
                </div>
                <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Jurnal Belajar</p>
                <p className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1 tabular-nums">
                    {journalCount} <span className="text-xs font-mono font-normal text-neutral-500">Entri</span>
                </p>
            </div>

            <div
                onClick={() => onTabChange('spiritual')}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-amber-300 flex items-center justify-center text-lg shadow-sm">
                        <i className="ph-bold ph-mosque"></i>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">KAJIAN</span>
                </div>
                <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Agenda Spiritual</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 mt-2 truncate leading-tight">
                    {nearestKajian ? nearestKajian.title : 'Belum ada agenda'}
                </p>
            </div>

            <div
                onClick={() => onTabChange('wellbeing')}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-purple-300 flex items-center justify-center text-lg shadow-sm">
                        <i className="ph-bold ph-moon-stars"></i>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">SLEEP</span>
                </div>
                <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Rata-rata Tidur</p>
                <p className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1 tabular-nums">
                    {avgSleep} <span className="text-xs font-mono font-normal text-neutral-500">Jam/Hari</span>
                </p>
            </div>
        </div>
    );
}
