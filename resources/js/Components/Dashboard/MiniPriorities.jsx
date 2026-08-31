import React from 'react';

export default function MiniPriorities({
    todoTasks = [],
    onCompleteTask,
    onEditTask,
    onAddNewTask,
    onViewAllTasks,
}) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100 flex flex-col">
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-slate-800 text-lg">Prioritas Hari Ini</h3>
                <button
                    onClick={onAddNewTask}
                    className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                    <i className="ph-bold ph-plus"></i>
                </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar max-h-[300px]">
                {todoTasks.slice(0, 5).map((task) => (
                    <div
                        key={task.id}
                        className="group flex items-start gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100"
                    >
                        <input
                            type="checkbox"
                            onChange={() => onCompleteTask(task)}
                            className="w-5 h-5 rounded-md border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer mt-0.5"
                        />
                        <div
                            className="flex-1 min-w-0"
                            onClick={() => onEditTask(task)}
                        >
                            <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors truncate">
                                {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                                    {task.tag}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                    {task.date_label || 'Hari Ini'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {todoTasks.length === 0 && (
                    <div className="p-6 text-center text-slate-400 text-xs">Semua prioritas selesai!</div>
                )}
            </div>

            <button
                onClick={onViewAllTasks}
                className="w-full mt-4 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
            >
                Lihat Semua Tugas
            </button>
        </div>
    );
}
