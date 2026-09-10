import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Sidebar({
    currentTab,
    setCurrentTab,
    navItems,
    user,
    mobileOpen = false,
    onCloseMobile,
    isCollapsed = false,
    onToggleCollapse,
}) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleNavClick = (tabId) => {
        setCurrentTab(tabId);
        if (onCloseMobile) {
            onCloseMobile();
        }
    };

    return (
        <>
            {/* ============================================================ */}
            {/* 1. MOBILE DRAWER OVERLAY & SLIDE-OUT SIDEBAR (< md)         */}
            {/* ============================================================ */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
                    onClick={onCloseMobile}
                />
            )}

            <div
                className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out font-sans ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-display font-black text-base shadow-sm">
                            <span>S</span>
                        </div>
                        <div>
                            <h2 className="font-display font-black text-sm text-slate-900 leading-tight">
                                Safah<span className="text-neutral-500">Workspace</span>
                            </h2>
                            <p className="text-[8px] uppercase tracking-[0.16em] text-neutral-400 font-mono font-bold">
                                OPERATING HUB
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={onCloseMobile}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Tutup Menu"
                    >
                        <i className="ph-bold ph-x text-base"></i>
                    </button>
                </div>

                {/* Mobile Navigation List */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scroll">
                    {navItems.map((item) => {
                        const isActive = currentTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`flex items-center w-full gap-3 px-3.5 py-3 transition-all duration-200 rounded-2xl text-xs font-semibold text-left active:scale-[0.98] cursor-pointer ${
                                    isActive
                                        ? 'bg-black text-white shadow-sm font-bold'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <i className={`${item.icon} text-lg ${isActive ? 'text-white' : 'text-slate-400'}`}></i>
                                <span className="truncate">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Mobile Drawer Footer */}
                <div className="p-4 border-t border-slate-100 space-y-2.5 bg-slate-50/50">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-white border border-slate-200 hover:bg-black hover:text-white text-slate-800 rounded-2xl text-xs font-mono font-bold transition-all shadow-2xs"
                    >
                        <i className="ph-bold ph-globe text-sm"></i> Portofolio Publik
                    </Link>

                    <div className="flex items-center justify-between p-2 rounded-2xl bg-white border border-slate-200/80">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=f1f5f9`}
                                alt="Avatar"
                                className="w-8 h-8 rounded-xl border border-slate-200 bg-slate-100 shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-xs font-bold truncate text-slate-900 leading-tight">{user.name}</p>
                                <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => router.post('/logout')}
                            className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center text-sm transition-colors cursor-pointer shrink-0"
                            title="Keluar (Logout)"
                        >
                            <i className="ph-bold ph-sign-out"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================================================ */}
            {/* 2. DESKTOP SIDEBAR (>= md) WITH COLLAPSE / EXPAND TOGGLE    */}
            {/* ============================================================ */}
            <aside
                className={`hidden md:flex flex-col bg-white border-r border-slate-200/80 z-30 shrink-0 font-sans transition-all duration-300 ease-in-out ${
                    isCollapsed ? 'w-20' : 'w-64'
                }`}
            >
                {/* Desktop Sidebar Header */}
                <div className={`flex items-center h-20 border-b border-slate-100 transition-all ${
                    isCollapsed ? 'justify-center px-2' : 'justify-between px-5'
                }`}>
                    <Link href="/" className="flex items-center gap-3 group overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-display font-black text-xl shadow-md transition-transform group-hover:scale-105 shrink-0">
                            <span>S</span>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 transition-opacity duration-200">
                                <h1 className="font-display font-extrabold text-base leading-tight tracking-tight text-slate-900 truncate">
                                    Safah<span className="text-neutral-500">Workspace</span>
                                </h1>
                                <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-400 font-mono font-bold">
                                    OPERATING HUB
                                </p>
                            </div>
                        )}
                    </Link>

                    {/* Collapse / Expand Toggle Button */}
                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer ${
                            isCollapsed ? 'hidden' : 'shrink-0'
                        }`}
                        title="Ciutkan Sidebar"
                    >
                        <i className="ph-bold ph-caret-left text-base"></i>
                    </button>
                </div>

                {/* Desktop Navigation List */}
                <nav className="flex-1 px-2.5 py-5 space-y-1.5 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => {
                        const isActive = currentTab === item.id;

                        return (
                            <div key={item.id} className="relative group">
                                <button
                                    onClick={() => setCurrentTab(item.id)}
                                    className={`flex items-center w-full transition-all duration-200 rounded-2xl text-xs font-semibold cursor-pointer active:scale-[0.98] ${
                                        isCollapsed
                                            ? 'justify-center p-3'
                                            : 'gap-3 px-3.5 py-3 text-left'
                                    } ${
                                        isActive
                                            ? 'bg-black text-white shadow-sm font-bold'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <i className={`${item.icon} text-lg shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`}></i>
                                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                                </button>

                                {/* Tooltip for Collapsed Mode */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 shadow-xl">
                                        {item.label}
                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Desktop Footer & Profile */}
                <div className={`p-3 border-t border-slate-100 space-y-2 transition-all ${
                    isCollapsed ? 'flex flex-col items-center' : ''
                }`}>
                    {/* Public Portfolio Button */}
                    {isCollapsed ? (
                        <div className="relative group">
                            <Link
                                href="/"
                                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-800 flex items-center justify-center text-base transition-colors"
                                title="Portofolio Publik"
                            >
                                <i className="ph-bold ph-globe"></i>
                            </Link>
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 shadow-xl">
                                Portofolio Publik
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-slate-100 hover:bg-black hover:text-white text-slate-800 rounded-2xl text-xs font-mono font-bold transition-all shadow-xs active:scale-[0.98]"
                        >
                            <i className="ph-bold ph-globe text-sm"></i> Portofolio Publik
                        </Link>
                    )}

                    {/* User Profile */}
                    <div className="relative w-full">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className={`flex items-center w-full hover:bg-slate-100 rounded-2xl transition-colors cursor-pointer active:scale-[0.98] ${
                                isCollapsed ? 'justify-center p-1.5' : 'gap-3 p-2 text-left'
                            }`}
                            title={isCollapsed ? `${user.name} (Menu)` : undefined}
                        >
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=f1f5f9`}
                                alt="Avatar"
                                className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-100 shrink-0"
                            />
                            {!isCollapsed && (
                                <>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold truncate text-slate-900 leading-tight">{user.name}</p>
                                        <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
                                    </div>
                                    <i className={`ph-bold text-slate-400 text-xs transition-transform ${userMenuOpen ? 'ph-caret-down' : 'ph-caret-up'}`}></i>
                                </>
                            )}
                        </button>

                        {userMenuOpen && (
                            <div className={`absolute mb-2 p-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 space-y-1 z-40 ${
                                isCollapsed ? 'bottom-full left-0 w-44' : 'bottom-full left-0 right-0'
                            }`}>
                                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-mono text-slate-400 truncate">
                                    {user.email}
                                </div>
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
        </>
    );
}
