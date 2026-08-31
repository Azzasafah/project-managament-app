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
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Banner Header */}
            <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 p-6 md:p-8 rounded-3xl text-white shadow-floating relative overflow-hidden">
                <i className="ph-fill ph-notebook absolute -right-4 -bottom-4 text-9xl text-white/10 transform -rotate-12"></i>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Daily Learning Journal</h2>
                    <p className="text-indigo-200 text-sm mb-6 max-w-lg">
                        Dokumentasikan progres harianmu di Data Engineering & Cloud. Menulis ulang materi membantumu mengingat lebih lama.
                    </p>
                    <button
                        onClick={onAddNewJournal}
                        className="px-5 py-3 bg-white text-indigo-900 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
                    >
                        <i className="ph-bold ph-pencil-simple"></i> Tulis Entri Hari Ini
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
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                filterCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {cat === 'all' ? 'Semua Jurnal' : cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <i className="ph-bold ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari materi / tag..."
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Journal Cards List */}
            <div className="space-y-6">
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
                    <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-soft">
                        <i className="ph-fill ph-notebook text-5xl text-slate-300 mb-2"></i>
                        <h4 className="font-bold text-slate-700">Tidak ada jurnal ditemukan</h4>
                        <p className="text-xs text-slate-400 mt-1">Mulai tulis catatan belajar harianmu sekarang!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
