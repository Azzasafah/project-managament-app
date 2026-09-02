import React, { useState, useEffect } from 'react';

export default function SleepModal({
    isOpen,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    const [viewResult, setViewResult] = useState(false);

    // Initial default values
    const [sleepDate, setSleepDate] = useState(form.sleep_date || new Date().toISOString().split('T')[0]);
    const [sleepTime, setSleepTime] = useState(form.sleep_time || '22:30');
    const [wakeTime, setWakeTime] = useState(form.wake_time || '06:30');
    const [fallAsleepTime, setFallAsleepTime] = useState(form.fall_asleep_time || '16–30 menit');
    const [wakeUpCount, setWakeUpCount] = useState(form.wake_up_count || '1 kali');
    const [morningFeeling, setMorningFeeling] = useState(form.morning_feeling || '🙂 Cukup segar');
    const [notes, setNotes] = useState(form.notes || '');

    // Reset when opened
    useEffect(() => {
        if (isOpen) {
            setViewResult(false);
            setSleepDate(form.sleep_date || new Date().toISOString().split('T')[0]);
            setSleepTime(form.sleep_time || '22:30');
            setWakeTime(form.wake_time || '06:30');
            setFallAsleepTime(form.fall_asleep_time || '16–30 menit');
            setWakeUpCount(form.wake_up_count || '1 kali');
            setMorningFeeling(form.morning_feeling || '🙂 Cukup segar');
            setNotes(form.notes || '');
        }
    }, [isOpen]);

    // Calculate Duration
    const calcDuration = () => {
        if (!sleepTime || !wakeTime) return { hours: 8, minutes: 0, decimal: 8.0, text: '8j 00m' };
        const [startH, startM] = sleepTime.split(':').map(Number);
        const [endH, endM] = wakeTime.split(':').map(Number);
        let startMin = startH * 60 + startM;
        let endMin = endH * 60 + endM;
        if (endMin <= startMin) {
            endMin += 24 * 60; // passes midnight
        }
        const diffMin = endMin - startMin;
        const h = Math.floor(diffMin / 60);
        const m = diffMin % 60;
        const dec = Math.round((diffMin / 60) * 10) / 10;
        return {
            hours: h,
            minutes: m,
            decimal: dec,
            text: `${h}j ${m < 10 ? '0' : ''}${m}m`,
        };
    };

    const durationInfo = calcDuration();

    // Calculate Sleep Score & Analysis
    const getSleepAnalysis = () => {
        const dec = durationInfo.decimal;

        // 1. Duration (Max 45)
        let durScore = 5;
        if (dec >= 7.0 && dec <= 9.0) durScore = 45;
        else if (dec >= 6.0) durScore = 35;
        else if (dec >= 5.0) durScore = 25;
        else if (dec >= 4.0) durScore = 15;

        // 2. Latency (Max 20)
        let latScore = 15;
        if (fallAsleepTime === '≤15 menit') latScore = 20;
        else if (fallAsleepTime === '16–30 menit') latScore = 15;
        else if (fallAsleepTime === '31–60 menit') latScore = 10;
        else if (fallAsleepTime === '>60 menit') latScore = 3;

        // 3. Wakeups (Max 15)
        let wakeScore = 12;
        if (wakeUpCount === '0 kali') wakeScore = 15;
        else if (wakeUpCount === '1 kali') wakeScore = 12;
        else if (wakeUpCount === '2–3 kali') wakeScore = 7;
        else if (wakeUpCount === '>3 kali') wakeScore = 2;

        // 4. Morning Feeling (Max 20)
        let feelScore = 15;
        if (morningFeeling.includes('Sangat segar')) feelScore = 20;
        else if (morningFeeling.includes('Cukup segar')) feelScore = 15;
        else if (morningFeeling.includes('Lelah') && !morningFeeling.includes('Sangat')) feelScore = 8;
        else if (morningFeeling.includes('Sangat lelah')) feelScore = 2;

        const totalScore = Math.min(100, Math.max(0, durScore + latScore + wakeScore + feelScore));

        let statusText = 'GOOD 😴';
        if (totalScore >= 85) {
            statusText = 'EXCELLENT 🌟';
        } else if (totalScore >= 70) {
            statusText = 'GOOD 😴';
        } else if (totalScore >= 50) {
            statusText = 'FAIR 😐';
        } else {
            statusText = 'POOR ⚠️';
        }

        // Personalized Recommendation
        let rec = 'Pola tidurmu sudah cukup baik. Jaga hidrasi air putih setelah bangun dan konsistensi waktu tidur.';
        if (totalScore >= 85) {
            rec = 'Kualitas tidurmu luar biasa optimal! Pertahankan jadwal tidur yang konsisten untuk performa puncak hari ini.';
        } else if (dec < 6.5) {
            rec = 'Durasi tidurmu masih di bawah target 7 jam. Coba tidur 30–60 menit lebih awal malam ini untuk memulihkan energi.';
        } else if (wakeUpCount === '2–3 kali' || wakeUpCount === '>3 kali') {
            rec = 'Durasi tidurmu sudah cukup, tetapi kamu masih beberapa kali terbangun. Coba pertahankan jadwal tidur yang konsisten dan pastikan kamar sejuk.';
        } else if (fallAsleepTime === '31–60 menit' || fallAsleepTime === '>60 menit') {
            rec = 'Kamu membutuhkan waktu agak lama untuk terlelap. Hindari layar biru/gadget 30 menit sebelum tidur dan coba teknik relaksasi.';
        } else if (morningFeeling.includes('lelah')) {
            rec = 'Kondisi pagi terasa lelah. Jangan lupa minum segelas air putih hangat dan lakukan peregangan ringan agar badan lebih segar.';
        }

        return { score: totalScore, statusText, recommendation: rec };
    };

    const analysis = getSleepAnalysis();

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const payload = {
            sleep_date: sleepDate,
            sleep_time: sleepTime,
            wake_time: wakeTime,
            duration_hours: durationInfo.decimal,
            fall_asleep_time: fallAsleepTime,
            wake_up_count: wakeUpCount,
            morning_feeling: morningFeeling.replace(/^[^\s]+\s/, ''),
            score: analysis.score,
            quality: analysis.statusText.split(' ')[0],
            recommendation: analysis.recommendation,
            notes: notes,
        };

        if (setForm) {
            setForm(payload);
        }

        if (onSubmit) {
            onSubmit(e, payload);
        }

        setViewResult(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto custom-scroll animate-scale-up space-y-4">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                            <i className="ph-bold ph-moon-stars text-base"></i>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                                WELLBEING // TRACKER
                            </span>
                            <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                                {viewResult ? 'Hasil Analisis Sleep Score' : 'Form Sleep Tracker'}
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

                {/* RESULT VIEW (AFTER SUBMISSION) */}
                {viewResult ? (
                    <div className="space-y-5 animate-fade-in">
                        {/* Sleep Score Hero Card */}
                        <div className="text-center p-6 bg-[#0e0e12] text-white rounded-3xl shadow-xl relative overflow-hidden space-y-2.5 border border-white/10">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                                SLEEP SCORE EVALUATION
                            </p>

                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl sm:text-6xl font-display font-black text-white tabular-nums">
                                    {analysis.score}
                                </span>
                                <span className="text-base font-mono text-neutral-500 font-bold">/100</span>
                            </div>

                            <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-xl text-xs font-mono font-bold tracking-wider text-emerald-400">
                                {analysis.statusText}
                            </div>
                        </div>

                        {/* Breakdown Metrics Table */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs font-mono">
                            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                <span className="text-slate-500">Durasi tidur</span>
                                <span className="font-bold text-slate-900">{durationInfo.text}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                <span className="text-slate-500">Waktu tertidur</span>
                                <span className="font-bold text-slate-900">{fallAsleepTime}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                                <span className="text-slate-500">Terbangun saat tidur</span>
                                <span className="font-bold text-slate-900">{wakeUpCount}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-slate-500">Kondisi pagi</span>
                                <span className="font-bold text-slate-900">{morningFeeling}</span>
                            </div>
                        </div>

                        {/* Smart Recommendation Card */}
                        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-1">
                            <div className="flex items-center gap-1.5 text-neutral-800 text-xs font-mono font-bold">
                                <i className="ph-bold ph-lightbulb text-sm"></i>
                                <span>Rekomendasi Cerdas:</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-sans italic">
                                “{analysis.recommendation}”
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => setViewResult(false)}
                                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
                            >
                                Edit Input
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/2 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-md cursor-pointer active:scale-[0.98]"
                            >
                                Selesai & Tutup
                            </button>
                        </div>
                    </div>
                ) : (
                    /* FORM INPUT VIEW */
                    <form onSubmit={handleSubmitForm} className="space-y-4">
                        {/* 1. Tanggal */}
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                1. Tanggal
                            </label>
                            <input
                                type="date"
                                required
                                value={sleepDate}
                                onChange={(e) => setSleepDate(e.target.value)}
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                            />
                        </div>

                        {/* 2 & 3. Waktu Mulai Tidur & Waktu Bangun */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                    2. Mulai Tidur
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={sleepTime}
                                    onChange={(e) => setSleepTime(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                    3. Bangun
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={wakeTime}
                                    onChange={(e) => setWakeTime(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Auto-Calculated Duration Banner */}
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono">
                            <span className="text-slate-600">Durasi Tidur Otomatis:</span>
                            <span className="font-bold text-black bg-white px-3 py-1 rounded-xl border border-slate-200">
                                {durationInfo.text} ({durationInfo.decimal} Jam)
                            </span>
                        </div>

                        {/* 4. Berapa lama sampai tertidur? */}
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                4. Berapa lama sampai tertidur?
                            </label>
                            <select
                                value={fallAsleepTime}
                                onChange={(e) => setFallAsleepTime(e.target.value)}
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                            >
                                <option value="≤15 menit">&le; 15 menit (Cepat & Lelap)</option>
                                <option value="16–30 menit">16–30 menit (Normal)</option>
                                <option value="31–60 menit">31–60 menit (Agak Lama)</option>
                                <option value=">60 menit">&gt; 60 menit (Insomnia / Sulit Tidur)</option>
                            </select>
                        </div>

                        {/* 5. Berapa kali terbangun saat tidur? */}
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                                5. Berapa kali terbangun?
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {['0 kali', '1 kali', '2–3 kali', '>3 kali'].map((opt) => (
                                    <button
                                        type="button"
                                        key={opt}
                                        onClick={() => setWakeUpCount(opt)}
                                        className={`py-2 px-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer text-center ${
                                            wakeUpCount === opt
                                                ? 'bg-black text-white border-black shadow-xs'
                                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 6. Bagaimana perasaanmu saat bangun? */}
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                                6. Perasaan saat bangun?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { id: '😄 Sangat segar', label: '😄 Sangat segar' },
                                    { id: '🙂 Cukup segar', label: '🙂 Cukup segar' },
                                    { id: '😐 Lelah', label: '😐 Lelah' },
                                    { id: '😫 Sangat lelah', label: '😫 Sangat lelah' },
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => setMorningFeeling(item.id)}
                                        className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all border text-left cursor-pointer flex items-center gap-2 ${
                                            morningFeeling === item.id
                                                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2.5 text-xs font-mono font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer active:scale-95"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-xs font-mono font-bold bg-black hover:bg-neutral-800 text-white rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.98] flex items-center gap-2"
                            >
                                <i className="ph-bold ph-chart-line-up"></i>
                                <span>Hitung & Simpan Sleep Score</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
