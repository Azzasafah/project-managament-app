import React from 'react';

export default function MobileBottomNav({ currentTab, setCurrentTab, navItems }) {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200/80 z-40 px-1 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] font-sans">
            <div className="flex items-center h-13 max-w-full overflow-x-auto no-scrollbar px-1 gap-1 justify-between">
                {navItems.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            className={`flex flex-col items-center justify-center min-w-[52px] py-1 rounded-2xl transition-all duration-200 cursor-pointer shrink-0 active:scale-90 ${
                                isActive ? 'text-black font-bold' : 'text-slate-400 hover:text-slate-700'
                            }`}
                        >
                            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                                isActive ? 'bg-black text-white shadow-xs' : ''
                            }`}>
                                <i className={`${item.icon} ${isActive ? 'text-lg font-bold' : 'text-base'}`}></i>
                            </div>
                            <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-black text-black' : 'font-medium text-slate-500'}`}>
                                {item.labelMobile}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
