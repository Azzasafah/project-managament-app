import React from 'react';

export default function MobileBottomNav({ currentTab, setCurrentTab, navItems }) {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200/80 z-40 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center h-13 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            className={`flex flex-col items-center justify-center w-full py-1 rounded-2xl transition-all duration-200 cursor-pointer active:scale-90 ${
                                isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
                                isActive ? 'bg-indigo-50 text-indigo-600 shadow-xs' : ''
                            }`}>
                                <i className={`${item.icon} ${isActive ? 'text-xl font-bold' : 'text-lg'}`}></i>
                            </div>
                            <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-black text-indigo-600' : 'font-medium text-slate-500'}`}>
                                {item.labelMobile}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
