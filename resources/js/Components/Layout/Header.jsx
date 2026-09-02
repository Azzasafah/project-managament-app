import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Header({ currentTab, navItems, currentDate, onQuickAdd }) {
    const activeItem = navItems.find((n) => n.id === currentTab);

    return (
        <>
            {/* Mobile Top Header */}
            <header className="md:hidden glass sticky top-0 z-30 px-4 h-16 flex items-center justify-between border-b border-slate-200/70 shadow-xs">
                <div className="flex items-center gap-2.5">
                    <Link href="/" className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-display font-black text-base shadow-sm">
                        <span>S</span>
                    </Link>
                    <div>
                        <span className="font-display font-extrabold text-sm text-slate-900 tracking-tight block leading-tight">
                            Safah<span className="text-neutral-500">Workspace</span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500 font-mono">
                            {activeItem?.labelMobile || 'Home'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Portofolio Publik"
                    >
                        <i className="ph-bold ph-globe"></i>
                    </Link>
                    <button
                        onClick={onQuickAdd}
                        className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-sm font-bold shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                        title="Quick Add"
                    >
                        <i className="ph-bold ph-plus"></i>
                    </button>
                    <button
                        onClick={() => router.post('/logout')}
                        className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-sm active:scale-[0.98] transition-transform cursor-pointer"
                        title="Logout"
                    >
                        <i className="ph-bold ph-sign-out"></i>
                    </button>
                </div>
            </header>

            {/* Desktop Top Header */}
            <header className="hidden md:flex items-center justify-between px-8 h-20 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/60">
                <div>
                    <h2 className="font-display text-2xl font-black text-slate-900 capitalize tracking-tight">
                        {activeItem?.label || 'Workspace'}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono font-medium mt-0.5">{currentDate}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-[0.98]"
                    >
                        <i className="ph-bold ph-arrow-square-out text-sm"></i> Preview Portofolio
                    </Link>
                    <button
                        onClick={onQuickAdd}
                        className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
                        <i className="ph-bold ph-plus-circle text-base"></i> Quick Add
                    </button>
                </div>
            </header>
        </>
    );
}
