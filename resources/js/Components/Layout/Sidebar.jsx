import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Sidebar({ currentTab, setCurrentTab, navItems, user }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 z-30 shrink-0 font-sans">
            {/* Animated Logo & Branding */}
            <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-display font-black text-xl shadow-md transition-transform group-hover:scale-105">
                        <span>S</span>
                    </div>
                    <div>
                        <h1 className="font-display font-extrabold text-base leading-tight tracking-tight text-slate-900">
                            Safah<span className="text-neutral-500">Workspace</span>
                        </h1>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-400 font-mono font-bold">
                            OPERATING HUB
                        </p>
                    </div>
                </Link>
            </div>

            {/* Navigation List */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            className={`flex items-center w-full gap-3 px-3.5 py-3 transition-all duration-200 rounded-2xl text-xs font-semibold text-left group relative cursor-pointer active:scale-[0.98] ${
                                isActive
                                    ? 'bg-black text-white shadow-sm font-bold'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            <i className={`${item.icon} text-lg ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`}></i>
                            <span className="truncate">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer & User Profile */}
            <div className="p-4 border-t border-slate-100 space-y-2.5">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-slate-100 hover:bg-black hover:text-white text-slate-800 rounded-2xl text-xs font-mono font-bold transition-all shadow-xs active:scale-[0.98]"
                >
                    <i className="ph-bold ph-globe text-sm"></i> Portofolio Publik
                </Link>

                <div className="relative">
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 p-2 w-full hover:bg-slate-100 rounded-2xl transition-colors text-left cursor-pointer active:scale-[0.98]"
                    >
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=f1f5f9`}
                            alt="Avatar"
                            className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate text-slate-900 leading-tight">{user.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
                        </div>
                        <i className="ph-bold ph-caret-up text-slate-400 text-xs"></i>
                    </button>

                    {userMenuOpen && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 p-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 space-y-1 z-40">
                            <button
                                onClick={() => router.post('/logout')}
                                className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
                            >
                                <i className="ph-bold ph-sign-out text-sm"></i> Keluar (Logout)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
