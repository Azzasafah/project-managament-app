import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Sidebar({ currentTab, setCurrentTab, navItems, user }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 z-30 shrink-0">
            {/* Animated Logo & Branding */}
            <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-100">
                <div className="relative group cursor-pointer">
                    {/* Glowing background halo */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-500 group-hover:scale-110" />
                    
                    <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 text-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                        <i className="ph-bold ph-hexagon text-cyan-300 animate-spin-slow"></i>
                        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                    </div>
                </div>
                <div>
                    <h1 className="font-extrabold text-lg leading-tight tracking-tight">
                        Personal<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Hub</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-widest text-indigo-600/80 font-bold font-mono">
                        SAFAH WORKSPACE
                    </p>
                </div>
            </div>

            {/* Navigation List */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentTab(item.id)}
                        className={`flex items-center w-full gap-3 px-4 py-3.5 transition-all duration-200 rounded-2xl font-medium text-sm text-left group relative cursor-pointer ${
                            currentTab === item.id
                                ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                    >
                        <i className={`${item.icon} ${currentTab === item.id ? 'text-indigo-600' : 'text-slate-400'} text-xl`}></i>
                        <span>{item.label}</span>
                        {currentTab === item.id && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-600 rounded-r-full" />
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer & User Profile */}
            <div className="p-4 border-t border-slate-100 space-y-2">
                <Link
                    href="/portfolio"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                    <i className="ph-bold ph-globe"></i> Portofolio Publik
                </Link>

                <div className="relative">
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 p-2 w-full hover:bg-slate-50 rounded-2xl transition-colors text-left cursor-pointer"
                    >
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=e2e8f0`}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100"
                        />
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate text-slate-800">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                        <i className="ph-bold ph-caret-up text-slate-400"></i>
                    </button>

                    {userMenuOpen && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-100 space-y-1 z-40">
                            <button
                                onClick={() => router.post('/logout')}
                                className="w-full flex items-center gap-2 p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                            >
                                <i className="ph-bold ph-sign-out text-base"></i> Keluar (Logout)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
