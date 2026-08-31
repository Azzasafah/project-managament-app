import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Header({ currentTab, navItems, currentDate, onQuickAdd }) {
    const activeItem = navItems.find((n) => n.id === currentTab);

    return (
        <>
            {/* Mobile Top Header */}
            <header className="md:hidden glass sticky top-0 z-30 px-4 h-16 flex items-center justify-between border-b border-slate-200/70 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 text-lg">
                        <i className="ph-bold ph-hexagon text-cyan-200 animate-spin-slow"></i>
                    </div>
                    <div>
                        <span className="font-extrabold text-sm text-slate-800 tracking-tight block leading-tight">
                            Personal<span className="text-indigo-600">Hub</span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-500 font-mono">
                            {activeItem?.labelMobile || 'Safah'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/portfolio"
                        className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-base hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Portofolio Publik"
                    >
                        <i className="ph-bold ph-globe"></i>
                    </Link>
                    <button
                        onClick={onQuickAdd}
                        className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-base font-bold shadow-md shadow-indigo-600/30 active:scale-95 transition-transform cursor-pointer"
                        title="Quick Add"
                    >
                        <i className="ph-bold ph-plus"></i>
                    </button>
                    <button
                        onClick={() => router.post('/logout')}
                        className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-base active:scale-95 transition-transform cursor-pointer"
                        title="Logout"
                    >
                        <i className="ph-bold ph-sign-out"></i>
                    </button>
                </div>
            </header>

            {/* Desktop Top Header */}
            <header className="hidden md:flex items-center justify-between px-8 h-20 bg-white/70 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/50">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 capitalize">
                        {activeItem?.label || 'Workspace'}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{currentDate}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/portfolio"
                        className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                        <i className="ph-bold ph-arrow-square-out text-base"></i> Preview Portofolio
                    </Link>
                    <button
                        onClick={onQuickAdd}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-floating flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                        <i className="ph-bold ph-plus-circle text-lg"></i> Quick Add
                    </button>
                </div>
            </header>
        </>
    );
}
