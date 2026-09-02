import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function FaqModal({ isOpen, onClose, faq = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        question: '',
        answer: '',
        category: 'General',
        order_index: 0,
        is_active: true,
    });

    const categoryOptions = [
        'General',
        'Data Engineering',
        'Cloud & DevOps',
        'Technical',
        'Work Collaboration',
    ];

    useEffect(() => {
        if (faq) {
            setData({
                question: faq.question || '',
                answer: faq.answer || '',
                category: faq.category || 'General',
                order_index: faq.order_index ?? 0,
                is_active: faq.is_active ?? true,
            });
        } else {
            reset();
            setData({
                question: '',
                answer: '',
                category: 'General',
                order_index: 0,
                is_active: true,
            });
        }
    }, [faq, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (faq) {
            put(`/faqs/${faq.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/faqs', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-xs">
                            <i className="ph-bold ph-question"></i>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                                CMS // FAQ
                            </span>
                            <h3 className="font-display font-black text-slate-900 text-lg leading-tight">
                                {faq ? 'Edit Pertanyaan FAQ' : 'Tambah FAQ Baru'}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 custom-scroll">
                    {/* Category Selector */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Kategori FAQ
                        </label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        >
                            {categoryOptions.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Question */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Pertanyaan *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                            placeholder="Contoh: Apa fokus keahlian teknis Anda saat ini?"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        />
                        {errors.question && <p className="text-rose-500 text-xs mt-1">{errors.question}</p>}
                    </div>

                    {/* Answer */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Jawaban Lengkap *
                        </label>
                        <textarea
                            rows={5}
                            required
                            value={data.answer}
                            onChange={(e) => setData('answer', e.target.value)}
                            placeholder="Jelaskan jawaban secara ringkas, jelas, dan profesional..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-black focus:bg-white leading-relaxed transition-all shadow-xs"
                        />
                        {errors.answer && <p className="text-rose-500 text-xs mt-1">{errors.answer}</p>}
                    </div>

                    {/* Order & Active Status */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <label className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-black border-slate-300 focus:ring-black"
                            />
                            Tampilkan di Portofolio Publik
                        </label>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-mono">Urutan:</span>
                            <input
                                type="number"
                                min="0"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center font-bold"
                            />
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                        >
                            <i className="ph-bold ph-floppy-disk text-sm"></i>
                            {processing ? 'Menyimpan...' : 'Simpan FAQ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
