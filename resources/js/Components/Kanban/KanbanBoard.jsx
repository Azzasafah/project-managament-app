import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import TaskCard from './TaskCard';

export default function KanbanBoard({
    projects = { todo: [], inProgress: [], done: [] },
    onAddNewTask,
    onEditTask,
    onDeleteTask,
    onMoveStatus,
    onOpenPortfolio,
}) {
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOverColumn, setDragOverColumn] = useState(null);
    const [activeMobileCol, setActiveMobileCol] = useState('all'); // 'all' | 'todo' | 'in_progress' | 'done'

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
        e.dataTransfer.setData('text/plain', task.id.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, columnStatus) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverColumn !== columnStatus) {
            setDragOverColumn(columnStatus);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetStatus) => {
        e.preventDefault();
        setDragOverColumn(null);

        if (!draggedTask) return;

        if (draggedTask.status !== targetStatus) {
            onMoveStatus(draggedTask, targetStatus);
        }
        setDraggedTask(null);
    };

    return (
        <div className="h-full flex flex-col max-w-[1600px] mx-auto space-y-5">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Project Management Kanban</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Geser atau pindahkan tugas antar kolom untuk memperbarui progres secara langsung.
                    </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Link
                        href="/portfolio"
                        className="flex-1 sm:flex-none px-3.5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                        <i className="ph-bold ph-globe"></i> Portofolio
                    </Link>
                    <button
                        onClick={() => onAddNewTask('todo')}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                        <i className="ph-bold ph-plus"></i> Task Baru
                    </button>
                </div>
            </div>

            {/* Mobile Column Switcher Filter Pills */}
            <div className="flex md:hidden items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveMobileCol('all')}
                    className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        activeMobileCol === 'all'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    Semua ({projects.todo.length + projects.inProgress.length + projects.done.length})
                </button>
                <button
                    onClick={() => setActiveMobileCol('todo')}
                    className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        activeMobileCol === 'todo'
                            ? 'bg-white text-indigo-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    To Do ({projects.todo.length})
                </button>
                <button
                    onClick={() => setActiveMobileCol('in_progress')}
                    className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        activeMobileCol === 'in_progress'
                            ? 'bg-white text-blue-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    In Progress ({projects.inProgress.length})
                </button>
                <button
                    onClick={() => setActiveMobileCol('done')}
                    className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        activeMobileCol === 'done'
                            ? 'bg-white text-emerald-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    Done ({projects.done.length})
                </button>
            </div>

            {/* 3 Columns Grid / Scroll */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 min-h-[550px] pb-10">
                
                {/* COLUMN: TO DO */}
                <div
                    onDragOver={(e) => handleDragOver(e, 'todo')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'todo')}
                    className={`flex flex-col rounded-3xl border transition-all duration-200 ${
                        activeMobileCol !== 'all' && activeMobileCol !== 'todo' ? 'hidden md:flex' : 'flex'
                    } ${
                        dragOverColumn === 'todo'
                            ? 'bg-slate-200/90 border-dashed border-2 border-indigo-500'
                            : 'bg-slate-100/80 border-slate-200'
                    }`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-slate-200/60">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                            <h3 className="font-bold text-slate-700 text-sm">To Do</h3>
                            <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-extrabold">
                                {projects.todo.length}
                            </span>
                        </div>
                        <button
                            onClick={() => onAddNewTask('todo')}
                            className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <i className="ph-bold ph-plus text-base"></i>
                        </button>
                    </div>

                    <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scroll min-h-[250px]">
                        {projects.todo.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                isDragged={draggedTask?.id === task.id}
                                onDragStart={handleDragStart}
                                onEdit={onEditTask}
                                onDelete={onDeleteTask}
                                onMoveStatus={onMoveStatus}
                                onOpenPortfolio={onOpenPortfolio}
                            />
                        ))}

                        {projects.todo.length === 0 && (
                            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                                Geser tugas ke sini
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMN: IN PROGRESS */}
                <div
                    onDragOver={(e) => handleDragOver(e, 'in_progress')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'in_progress')}
                    className={`flex flex-col rounded-3xl border transition-all duration-200 ${
                        activeMobileCol !== 'all' && activeMobileCol !== 'in_progress' ? 'hidden md:flex' : 'flex'
                    } ${
                        dragOverColumn === 'in_progress'
                            ? 'bg-blue-100/90 border-dashed border-2 border-blue-500'
                            : 'bg-blue-50/50 border-blue-100'
                    }`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-blue-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                            <h3 className="font-bold text-blue-900 text-sm">In Progress</h3>
                            <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-extrabold">
                                {projects.inProgress.length}
                            </span>
                        </div>
                    </div>

                    <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scroll min-h-[250px]">
                        {projects.inProgress.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                isDragged={draggedTask?.id === task.id}
                                onDragStart={handleDragStart}
                                onEdit={onEditTask}
                                onDelete={onDeleteTask}
                                onMoveStatus={onMoveStatus}
                                onOpenPortfolio={onOpenPortfolio}
                            />
                        ))}

                        {projects.inProgress.length === 0 && (
                            <div className="p-8 text-center text-xs text-blue-400 border border-dashed border-blue-200 rounded-2xl">
                                Geser tugas ke sini
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMN: DONE */}
                <div
                    onDragOver={(e) => handleDragOver(e, 'done')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'done')}
                    className={`flex flex-col rounded-3xl border transition-all duration-200 ${
                        activeMobileCol !== 'all' && activeMobileCol !== 'done' ? 'hidden md:flex' : 'flex'
                    } ${
                        dragOverColumn === 'done'
                            ? 'bg-emerald-100/90 border-dashed border-2 border-emerald-500'
                            : 'bg-emerald-50/40 border-emerald-100'
                    }`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-emerald-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            <h3 className="font-bold text-emerald-900 text-sm">Done</h3>
                            <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-extrabold">
                                {projects.done.length}
                            </span>
                        </div>
                    </div>

                    <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scroll min-h-[250px]">
                        {projects.done.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                isDragged={draggedTask?.id === task.id}
                                onDragStart={handleDragStart}
                                onEdit={onEditTask}
                                onDelete={onDeleteTask}
                                onMoveStatus={onMoveStatus}
                                onOpenPortfolio={onOpenPortfolio}
                            />
                        ))}

                        {projects.done.length === 0 && (
                            <div className="p-8 text-center text-xs text-emerald-400 border border-dashed border-emerald-200 rounded-2xl">
                                Geser tugas yang selesai ke sini
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
