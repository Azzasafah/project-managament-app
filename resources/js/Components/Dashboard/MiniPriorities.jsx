import React from 'react';

export default function MiniPriorities({
    todoTasks = [],
    onCompleteTask,
    onEditTask,
    onAddNewTask,
    onViewAllTasks,
}) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col font-sans">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">KANBAN // FOCUS</span>
                    <h3 className="font-display font-black text-slate-900 text-lg">Prioritas Hari Ini</h3>
                </div>
                <button
                    onClick={onAddNewTask}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-slate-600 transition-all cursor-pointer active:scale-95"
                    title="Tambah Tugas"
                >
                    <i className="ph-bold ph-plus text-sm"></i>
                </button>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto no-scrollbar max-h-[300px]">
                {todoTasks.slice(0, 5).map((task) => (
                    <div
                        key={task.id}
                        className="group flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl transition-all cursor-pointer border border-slate-100 hover:border-slate-200"
                    >
                        <input
                            type="checkbox"
                            onChange={() => onCompleteTask(task)}
                            className="w-4 h-4 rounded text-black border-slate-300 focus:ring-black cursor-pointer mt-1"
                        />
                        <div
                            className="flex-1 min-w-0"
                            onClick={() => onEditTask(task)}
                        >
                            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-neutral-700 transition-colors truncate">
                                {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700">
                                    {task.tag}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {task.date_label || 'Hari Ini'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {todoTasks.length === 0 && (
                    <div className="p-8 text-center text-slate-400 text-xs font-mono">
                        <i className="ph-bold ph-check-circle text-2xl mb-1 text-emerald-500 block"></i>
                        Semua prioritas selesai!
                    </div>
                )}
            </div>

            <button
                onClick={onViewAllTasks}
                className="w-full mt-4 py-2.5 text-xs font-mono font-bold text-slate-800 bg-slate-100 hover:bg-black hover:text-white rounded-xl transition-all cursor-pointer active:scale-[0.98]"
            >
                Buka Papan Kanban &rarr;
            </button>
        </div>
    );
}
