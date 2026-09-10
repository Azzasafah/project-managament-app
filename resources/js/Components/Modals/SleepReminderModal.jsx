import React, { useEffect } from 'react';

export default function SleepReminderModal({ open, onClose, onSnooze }) {
    useEffect(() => {
        if (open) {
            // Play gentle night chime / voice if audio is supported
            try {
                const audio = new Audio('/sounds/otsukare.mp3');
                audio.volume = 0.6;
                audio.play().catch(() => {});
            } catch (e) {}

            // Send desktop browser notification if permitted
            if (typeof window !== 'undefined' && 'Notification' in window) {
                if (Notification.permission === 'granted') {
                    new Notification('🌙 22:00 WIB: Waktunya Istirahat & Tidur!', {
                        body: 'Aturan Emas Anti-Burnout: Tutup IDE, matikan workstation, dan istirahat malam cukup.',
                        icon: '/favicon.svg',
                    });
                } else if (Notification.permission === 'default') {
                    Notification.requestPermission();
                }
            }
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
            <div
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up text-slate-900 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Night Ambient Glow */}
                <div className="absolute -top-24 -right-24 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Header */}
                <div className="p-6 md:p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-900 text-amber-300 flex items-center justify-center text-3xl shadow-lg border border-slate-800 animate-pulse">
                        <i className="ph-bold ph-moon-stars"></i>
                    </div>

                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                            <i className="ph-bold ph-alarm"></i>
                            HARD-STOP 22:00 WIB TERCAPAI
                        </div>
                        <h3 className="font-display font-black text-2xl text-slate-900 leading-tight">
                            Waktunya Istirahat & Tidur Malam
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                            Aturan Emas Anti-Burnout • Target Tidur: 7.5 Jam
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2">
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">
                            Kerja keras hari ini sudah <strong>luar biasa</strong>! Sesuai komitmen hidup seimbang:
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1.5 font-sans pl-1">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                <span>Tutup workstation laptop & matikan IDE VSCode.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                <span>Baca Surat Al-Mulk sebelum tidur untuk ketenangan jiwa.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                <span>Recharge energi maksimal demi Shalat Tahajud & coding esok pagi.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3">
                    <button
                        type="button"
                        onClick={onSnooze}
                        className="w-full sm:w-1/2 py-3 px-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
                    >
                        ⏱️ Snooze 10 Menit
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-black text-white hover:bg-slate-800 text-xs font-mono font-bold shadow-lg transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Siap, Istirahat 🌙</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
