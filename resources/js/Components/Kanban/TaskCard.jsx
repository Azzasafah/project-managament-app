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
            className={`bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/90 hover:border-slate-400 transition-all hover:shadow-md cursor-grab active:cursor-grabbing group ${
                isDragged ? 'opacity-40 scale-95' : 'opacity-100'
            }`}
        >
            <div className="flex justify-between items-start mb-2.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${getTagColor(task.tag)}`}>
                    {task.tag}
                </span>
                <div className="flex items-center gap-1">
                    {task.status === 'done' && (
                        <span className="text-emerald-500 text-base mr-0.5" title="Selesai">
                            <i className="ph-fill ph-check-circle"></i>
                        </span>
                    )}
                    <button
                        onClick={() => onEdit(task)}
                        className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit Task"
                    >
                        <i className="ph-bold ph-pencil-simple text-sm"></i>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Task"
                    >
                        <i className="ph-bold ph-trash text-sm"></i>
                    </button>
                </div>
            </div>

            <p className={`font-display font-bold text-sm leading-snug mb-1.5 ${task.status === 'done' ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-900'}`}>
                {task.title}
            </p>

            {task.description && task.status !== 'done' && (
                <p className="text-xs text-slate-500 mb-3 line-clamp-2 font-sans">{task.description}</p>
            )}

            <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2">
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 font-medium">
                    <i className="ph-bold ph-calendar-blank"></i> {task.date_label || 'Hari Ini'}
                </span>

                {task.status === 'todo' && (
                    <button
                        onClick={() => onMoveStatus(task, 'in_progress')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-black hover:text-white text-slate-800 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer active:scale-95"
                    >
                        Mulai &rarr;
                    </button>
                )}

                {task.status === 'in_progress' && (
                    <button
                        onClick={() => onMoveStatus(task, 'done')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer active:scale-95 shadow-xs"
                    >
                        Selesai &#10003;
                    </button>
                )}
            </div>

            {task.status === 'done' && (
                <button
                    onClick={() => onOpenPortfolio(task)}
                    className={`w-full mt-3 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                        task.is_portfolio
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                >
                    <i className="ph-bold ph-globe text-sm"></i>
                    <span>{task.is_portfolio ? '● Portofolio Aktif' : '○ Jadikan Portofolio'}</span>
                </button>
            )}
        </div>
    );
}
