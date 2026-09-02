import React, { useState } from 'react';
import JournalCard from './JournalCard';

export default function LearningJournalView({
    journals = [],
    onAddNewJournal,
    onEditJournal,
    onDeleteJournal,
    onReadFullJournal,
}) {
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJournals = journals.filter((item) => {
        const matchCategory = filterCategory === 'all' || item.category === filterCategory;
        const s = searchQuery.toLowerCase();
        const matchSearch =
            !searchQuery ||
            item.title.toLowerCase().includes(s) ||
            (item.snippet && item.snippet.toLowerCase().includes(s)) ||
            (item.content && item.content.toLowerCase().includes(s));
        return matchCategory && matchSearch;
    });

    return (
        <div className="space-y-6 max-w-4xl mx-auto font-sans">
            {/* Banner Header */}
            <div className="bg-[#0e0e12] p-6 sm:p-8 md:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden border border-white/10">
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-widest text-neutral-300 uppercase mb-3">
                        <i className="ph-bold ph-notebook text-emerald-400"></i> DOCUMENTATION // CONTINUOUS_STUDY
                    </div>
                    <h2 className="font-display text-2xl sm:text-4xl font-black mb-2 tracking-tight uppercase">
                        Daily Learning Journal
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm mb-6 max-w-lg leading-relaxed font-sans">
                        Dokumentasikan progres harianmu di Data Engineering & Cloud. Menulis ulang materi membantumu mengingat dan memahami arsitektur lebih dalam.
                    </p>
                    <button
                        onClick={onAddNewJournal}
                        className="px-5 py-3 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shadow-md flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer active:scale-[0.98]"
                    >
                        <i className="ph-bold ph-pencil-simple text-base"></i> Tulis Entri Hari Ini
                    </button>
                </div>
            </div>

            {/* Filter Chips & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                    {['all', 'Data Engineering', 'Cloud Computing'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                                filterCategory === cat
                                    ? 'bg-black text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {cat === 'all' ? 'Semua Jurnal' : cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-72">
                    <i className="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari materi / tag..."
                        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black transition-all shadow-xs"
                    />
                </div>
            </div>

            {/* Journal Cards List */}
            <div className="space-y-4">
                {filteredJournals.map((journal) => (
                    <JournalCard
                        key={journal.id}
                        journal={journal}
                        onEdit={onEditJournal}
                        onDelete={onDeleteJournal}
                        onReadFull={onReadFullJournal}
                    />
                ))}

                {filteredJournals.length === 0 && (
                    <div className="p-14 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
                        <i className="ph-bold ph-notebook text-4xl text-slate-300 mb-2"></i>
                        <h4 className="font-display font-bold text-slate-800 text-base">Tidak ada jurnal ditemukan</h4>
                        <p className="text-xs font-mono text-slate-400 mt-1">Mulai tulis catatan belajar harianmu sekarang!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
