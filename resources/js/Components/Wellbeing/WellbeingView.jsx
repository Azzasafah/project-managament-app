import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { isDoneToday, formatRelativeDate } from '@/Utils/dateHelpers';

export default function WellbeingView({
    chartLabels,
    chartSleepData,
    avgSleep,
    sleepDebt,
    refreshingActivities = [],
    onOpenSleepModal,
    onOpenRefreshingModal,
    onMarkRefreshingDone,
    onDeleteRefreshing,
}) {
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Jam Tidur',
                        data: chartSleepData,
                        backgroundColor: function (context) {
                            const val = context.dataset.data[context.dataIndex];
                            if (val >= 7) return '#10b981'; // emerald
                            if (val >= 6) return '#18181b'; // obsidian black
                            if (val > 0) return '#f43f5e';  // rose
                            return '#e4e4e7'; // empty slate
                        },
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 24,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#09090b',
                        padding: 12,
                        titleFont: { size: 12, weight: 'bold', family: 'JetBrains Mono' },
                        bodyFont: { size: 12, family: 'Plus Jakarta Sans' },
                        cornerRadius: 10,
                        callbacks: { label: (c) => c.raw + ' Jam' },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: '#f4f4f5', drawBorder: false },
                        border: { display: false },
                        ticks: { stepSize: 2, padding: 8, font: { family: 'JetBrains Mono', size: 10 } },
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: { font: { family: 'JetBrains Mono', size: 10, weight: 'bold' } },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartLabels, chartSleepData]);

    return (
        <div className="space-y-6 max-w-6xl mx-auto font-sans">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                            WELLBEING // HEALTH_AND_BALANCE
                        </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Wellbeing & Life Balance
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
                        Lacak waktu tidur dan pastikan kamu cukup istirahat & refreshing untuk menjaga performa rekayasa data tetap optimal.
                    </p>
                </div>
                <button
                    onClick={onOpenSleepModal}
                    className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                    <i className="ph-bold ph-plus text-sm"></i> Catat Log Tidur
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7-Day Sleep Chart & Stats */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">7-DAY ANALYTICS</span>
                            <h3 className="font-display font-black text-slate-900 text-lg">Analitik Tidur Mingguan</h3>
                            <p className="text-xs font-mono text-neutral-500 mt-0.5">
                                Target: <strong className="text-black">7.5 Jam / Hari</strong>
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[250px] relative">
                        <canvas ref={canvasRef} />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                        <div className="text-center">
                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">Rata-rata</p>
                            <p className="text-xl sm:text-2xl font-display font-black text-slate-900 tabular-nums">
                                {avgSleep > 0 ? avgSleep : '0'} <span className="text-xs font-mono text-neutral-500 font-normal">Jam</span>
                            </p>
                        </div>
                        <div className="text-center border-l border-r border-slate-100">
                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">Kualitas</p>
                            <p className={`text-base sm:text-lg font-mono font-bold mt-1 ${
                                avgSleep >= 7 
                                    ? 'text-emerald-600' 
                                    : avgSleep >= 6 
                                        ? 'text-neutral-800' 
                                        : avgSleep > 0 
                                            ? 'text-amber-600' 
                                            : 'text-neutral-400'
                            }`}>
                                {avgSleep >= 7 ? 'Sangat Baik' : avgSleep >= 6 ? 'Cukup' : avgSleep > 0 ? 'Kurang' : 'Belum Dicatat'}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">Hutang Tidur</p>
                            <p className={`text-xl sm:text-2xl font-display font-black tabular-nums ${
                                sleepDebt < 0 
                                    ? 'text-rose-600' 
                                    : sleepDebt > 0 
                                        ? 'text-emerald-600' 
                                        : 'text-slate-900'
                            }`}>
                                {sleepDebt > 0 ? `+${sleepDebt}` : sleepDebt} <span className="text-xs font-mono text-neutral-500 font-normal">Jam</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Refreshing Activity Logger */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">ACTIVITIES</span>
                    <h3 className="font-display font-black text-slate-900 text-lg mb-0.5">Refreshing Logger</h3>
                    <p className="text-xs text-neutral-500 mb-5 font-sans">Aktivitas rehat agar tetap fokus & segar.</p>

                    <div className="flex-1 space-y-3">
                        {refreshingActivities.map((activity) => {
                            const completedToday = isDoneToday(activity.last_done_date);
                            return (
                                <div
                                    key={activity.id}
                                    className={`p-3.5 rounded-2xl border flex items-center justify-between group transition-all ${
                                        completedToday
                                            ? 'border-neutral-200 bg-neutral-100/60'
                                            : 'border-slate-200 bg-white hover:border-slate-400'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs text-base ${
                                                completedToday
                                                    ? 'bg-black text-white'
                                                    : 'bg-slate-100 text-slate-800'
                                            }`}
                                        >
                                            <i className={`ph-bold ${activity.icon || 'ph-game-controller'}`}></i>
                                        </div>
                                        <div>
                                            <h4
                                                className={`font-display font-bold text-slate-900 text-xs sm:text-sm ${
                                                    completedToday ? 'line-through text-slate-400' : ''
                                                }`}
                                            >
                                                {activity.title}
                                            </h4>
                                            <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 mt-0.5">
                                                {formatRelativeDate(activity.last_done_date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => onMarkRefreshingDone(activity)}
                                            title={completedToday ? 'Batalkan status' : 'Tandai selesai hari ini'}
                                            className={`w-7 h-7 rounded-lg shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                                                completedToday
                                                    ? 'bg-black text-white'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-black hover:text-white'
                                            }`}
                                        >
                                            <i className={completedToday ? 'ph-bold ph-check text-xs' : 'ph-bold ph-plus text-xs'}></i>
                                        </button>
                                        <button
                                            onClick={() => onDeleteRefreshing(activity.id)}
                                            className="text-slate-300 hover:text-rose-600 p-1 text-xs cursor-pointer"
                                            title="Hapus"
                                        >
                                            <i className="ph-bold ph-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={onOpenRefreshingModal}
                        className="w-full mt-5 py-2.5 border border-dashed border-slate-300 text-slate-500 rounded-xl text-xs font-mono font-bold hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all cursor-pointer active:scale-[0.98]"
                    >
                        + Tambah Kategori Refreshing
                    </button>
                </div>
            </div>
        </div>
    );
}
