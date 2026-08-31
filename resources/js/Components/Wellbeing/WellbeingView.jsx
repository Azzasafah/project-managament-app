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
                            if (val >= 7) return '#10b981'; // emerald-500
                            if (val >= 6) return '#6366f1'; // indigo-500
                            if (val > 0) return '#f43f5e';  // rose-500
                            return '#e2e8f0'; // slate-200 (kosong)
                        },
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 28,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        padding: 12,
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        callbacks: { label: (c) => c.raw + ' Jam' },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: '#f1f5f9', drawBorder: false },
                        border: { display: false },
                        ticks: { stepSize: 2, padding: 10 },
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
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
        <div className="space-y-6 max-w-6xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Wellbeing & Life Balance</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Lacak waktu tidur dan pastikan kamu cukup istirahat & refreshing untuk menjaga performa kerja.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7-Day Sleep Chart & Stats */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Analitik Tidur (7 Hari Terakhir)</h3>
                            <p className="text-sm font-medium text-slate-400 mt-0.5">
                                Target harian: <span className="text-indigo-600 font-bold">7.5 Jam</span>
                            </p>
                        </div>
                        <button
                            onClick={onOpenSleepModal}
                            className="w-full sm:w-auto px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i className="ph-bold ph-plus"></i> Input Manual
                        </button>
                    </div>

                    <div className="flex-1 w-full min-h-[250px] relative">
                        <canvas ref={canvasRef} />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                        <div className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Rata-rata</p>
                            <p className="text-xl sm:text-2xl font-extrabold text-slate-800">
                                {avgSleep > 0 ? avgSleep : '0'} <span className="text-xs text-slate-500 font-medium">Jam</span>
                            </p>
                        </div>
                        <div className="text-center border-l border-r border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Kualitas</p>
                            <p className={`text-lg sm:text-xl font-bold mt-1 ${
                                avgSleep >= 7 
                                    ? 'text-emerald-500' 
                                    : avgSleep >= 6 
                                        ? 'text-indigo-500' 
                                        : avgSleep > 0 
                                            ? 'text-amber-500' 
                                            : 'text-slate-400'
                            }`}>
                                {avgSleep >= 7 ? 'Sangat Baik' : avgSleep >= 6 ? 'Cukup' : avgSleep > 0 ? 'Kurang' : 'Belum Dicatat'}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Hutang Tidur</p>
                            <p className={`text-xl sm:text-2xl font-extrabold ${
                                sleepDebt < 0 
                                    ? 'text-rose-500' 
                                    : sleepDebt > 0 
                                        ? 'text-emerald-500' 
                                        : 'text-slate-800'
                            }`}>
                                {sleepDebt > 0 ? `+${sleepDebt}` : sleepDebt} <span className="text-xs text-slate-500 font-medium">Jam</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Refreshing Activity Logger */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col">
                    <h3 className="font-bold text-slate-800 text-lg mb-1">Refreshing Logger</h3>
                    <p className="text-xs font-medium text-slate-400 mb-6">Agar tetap segar & produktif setelah coding.</p>

                    <div className="flex-1 space-y-4">
                        {refreshingActivities.map((activity) => {
                            const completedToday = isDoneToday(activity.last_done_date);
                            return (
                                <div
                                    key={activity.id}
                                    className={`p-4 rounded-2xl border-2 flex items-center justify-between group transition-colors ${
                                        completedToday
                                            ? 'border-blue-50 bg-blue-50/50'
                                            : 'border-emerald-50 bg-emerald-50/30 hover:border-emerald-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                                                completedToday
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-emerald-100 text-emerald-600'
                                            }`}
                                        >
                                            <i className={`ph-fill ${activity.icon || 'ph-game-controller'} text-xl`}></i>
                                        </div>
                                        <div>
                                            <h4
                                                className={`font-bold text-slate-700 text-sm ${
                                                    completedToday ? 'line-through text-slate-500' : ''
                                                }`}
                                            >
                                                {activity.title}
                                            </h4>
                                            <p
                                                className={`text-[10px] font-bold uppercase tracking-wide mt-0.5 ${
                                                    completedToday
                                                        ? 'text-blue-600'
                                                        : 'text-emerald-600/70'
                                                }`}
                                            >
                                                {formatRelativeDate(activity.last_done_date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => onMarkRefreshingDone(activity)}
                                            title={completedToday ? 'Klik untuk membatalkan (menjadi belum)' : 'Tandai selesai hari ini'}
                                            className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all cursor-pointer ${
                                                completedToday
                                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                                    : 'bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                            }`}
                                        >
                                            <i className={completedToday ? 'ph-bold ph-check' : 'ph-bold ph-plus'}></i>
                                        </button>
                                        <button
                                            onClick={() => onDeleteRefreshing(activity.id)}
                                            className="text-slate-300 hover:text-rose-500 p-1 text-sm cursor-pointer"
                                            title="Hapus Kategori"
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
                        className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-600 hover:border-slate-300 transition-colors cursor-pointer"
                    >
                        + Tambah Kategori
                    </button>
                </div>
            </div>
        </div>
    );
}
