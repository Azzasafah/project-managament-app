import React, { useState } from 'react';

export default function DynamicTagInput({
    tags = [],
    onChange,
    label = 'Tech Stack & Tags',
    placeholder = 'Ketik tag baru lalu tekan Enter atau koma...',
    suggestions = [
        'Python', 'PySpark', 'Airflow', 'Laravel', 'React', 'Next.js',
        'TypeScript', 'Docker', 'PostgreSQL', 'MySQL', 'REST API',
        'FastAPI', 'TailwindCSS', 'Azure', 'GCP', 'Kafka', 'Redis',
        'PHP', 'CodeIgniter', 'Express.js', 'Node.js', 'UML', 'Bootstrap'
    ],
}) {
    const [inputValue, setInputValue] = useState('');

    // Ensure tags is always an array
    const currentTags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string' && tags.trim().length > 0
        ? tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    const addTag = (rawTag) => {
        const cleanTag = rawTag.trim().replace(/^,+|,+$/g, '');
        if (!cleanTag) return;

        // Check if already exists (case-insensitive)
        if (!currentTags.some((t) => t.toLowerCase() === cleanTag.toLowerCase())) {
            const nextTags = [...currentTags, cleanTag];
            onChange(nextTags);
        }
        setInputValue('');
    };

    const removeTag = (indexToRemove) => {
        const nextTags = currentTags.filter((_, idx) => idx !== indexToRemove);
        onChange(nextTags);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && currentTags.length > 0) {
            removeTag(currentTags.length - 1);
        }
    };

    return (
        <div className="space-y-2 font-sans">
            <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                    {label}
                </label>
                <span className="text-[10px] font-mono text-neutral-400">
                    {currentTags.length} tag terpilih
                </span>
            </div>

            {/* Tag Input Box */}
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-black focus-within:bg-white focus-within:border-black transition-all shadow-xs">
                {/* Active Tag Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {currentTags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-black text-white shadow-xs group transition-all"
                        >
                            <span>{tag}</span>
                            <button
                                type="button"
                                onClick={() => removeTag(idx)}
                                className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                                title={`Hapus tag ${tag}`}
                            >
                                <i className="ph-bold ph-x text-[10px]"></i>
                            </button>
                        </span>
                    ))}

                    {currentTags.length === 0 && (
                        <span className="text-[11px] font-mono text-slate-400 italic px-1">
                            Belum ada tag. Ketik tag bebas di bawah atau klik saran:
                        </span>
                    )}
                </div>

                {/* Input Field & Add Button */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-1 bg-transparent border-0 text-xs sm:text-sm font-mono text-slate-800 focus:outline-hidden placeholder:text-slate-400 py-1"
                    />
                    <button
                        type="button"
                        onClick={() => addTag(inputValue)}
                        disabled={!inputValue.trim()}
                        className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-black disabled:opacity-30 text-white text-[11px] font-mono font-bold transition-all cursor-pointer shrink-0 active:scale-95"
                    >
                        + Tambah
                    </button>
                </div>
            </div>

            {/* Quick Suggestions */}
            {suggestions && suggestions.length > 0 && (
                <div className="pt-1">
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                        <i className="ph-bold ph-lightbulb text-amber-500"></i>
                        <span>Saran Tag Populer (Klik untuk tambah):</span>
                    </div>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                        {suggestions.map((sug) => {
                            const isAdded = currentTags.some((t) => t.toLowerCase() === sug.toLowerCase());
                            return (
                                <button
                                    type="button"
                                    key={sug}
                                    onClick={() => {
                                        if (isAdded) {
                                            const idx = currentTags.findIndex((t) => t.toLowerCase() === sug.toLowerCase());
                                            removeTag(idx);
                                        } else {
                                            addTag(sug);
                                        }
                                    }}
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium transition-all cursor-pointer flex items-center gap-1 ${
                                        isAdded
                                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                                    }`}
                                >
                                    <span>{sug}</span>
                                    {isAdded ? (
                                        <i className="ph-bold ph-check text-[9px]"></i>
                                    ) : (
                                        <span className="text-[10px] text-slate-400">+</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
