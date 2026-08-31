import React from 'react';
import { getTagColor } from '@/Utils/dateHelpers';

export default function TaskCard({
    task,
    isDragged,
    onDragStart,
    onEdit,
    onDelete,
    onMoveStatus,
    onOpenPortfolio,
}) {
    return (
        <div
            draggable={true}
            onDragStart={(e) => onDragStart(e, task)}
            className={`bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 transition-all hover:shadow-md cursor-grab active:cursor-grabbing group ${
                isDragged ? 'opacity-40 scale-95' : 'opacity-100'
            }`}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${getTagColor(task.tag)}`}>
                    {task.tag}
                </span>
                <div className="flex items-center gap-1">
                    {task.status === 'done' && (
                        <span className="text-emerald-500 text-lg mr-1" title="Selesai">
                            <i className="ph-fill ph-check-circle"></i>
                        </span>
                    )}
                    <button
                        onClick={() => onEdit(task)}
                        className="text-slate-300 hover:text-indigo-600 p-1 cursor-pointer"
                        title="Edit Task"
                    >
                        <i className="ph-bold ph-pencil-simple"></i>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer"
                        title="Hapus Task"
                    >
                        <i className="ph-bold ph-trash"></i>
                    </button>
                </div>
            </div>

            <p className={`font-semibold text-sm leading-snug mb-2 ${task.status === 'done' ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-800'}`}>
                {task.title}
            </p>

            {task.description && task.status !== 'done' && (
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
            )}

            <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <i className="ph-fill ph-calendar-blank"></i> {task.date_label || 'Hari Ini'}
                </span>

                {task.status === 'todo' && (
                    <button
                        onClick={() => onMoveStatus(task, 'in_progress')}
                        className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer"
                    >
                        Mulai →
                    </button>
                )}

                {task.status === 'in_progress' && (
                    <button
                        onClick={() => onMoveStatus(task, 'done')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer"
                    >
                        Selesai ✓
                    </button>
                )}
            </div>

            {task.status === 'done' && (
                <button
                    onClick={() => onOpenPortfolio(task)}
                    className={`w-full mt-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        task.is_portfolio
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                >
                    <i className="ph-bold ph-globe"></i>
                    <span>{task.is_portfolio ? 'Portofolio Aktif' : 'Jadikan Portofolio'}</span>
                </button>
            )}
        </div>
    );
}
