import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function WeeklySleepChart({ chartLabels, chartSleepData, onViewDetail }) {
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
                            return '#e2e8f0'; // slate-200 (hari kosong)
                        },
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 18,
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
                        callbacks: { label: (c) => (c.raw > 0 ? `${c.raw} Jam` : 'Belum ada log') },
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
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100 lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">Tren Tidur Mingguan</h3>
                    <p className="text-sm text-slate-400">Modul Wellbeing (Target 7.5 Jam)</p>
                </div>
                <button
                    onClick={onViewDetail}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                    Lihat Detail
                </button>
            </div>
            <div className="flex-1 relative min-h-[220px] w-full">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
