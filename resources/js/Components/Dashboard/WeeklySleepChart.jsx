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
                            if (val >= 7) return '#10b981'; // emerald
                            if (val >= 6) return '#18181b'; // obsidian black
                            if (val > 0) return '#f43f5e';  // rose
                            return '#e4e4e7'; // empty slate
                        },
                        borderRadius: 8,
                        borderSkipped: false,
                        barThickness: 16,
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
                        callbacks: { label: (c) => (c.raw > 0 ? `${c.raw} Jam` : 'Belum ada log') },
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
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs lg:col-span-2 flex flex-col font-sans">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">WELLBEING // SLEEP_METRICS</span>
                    <h3 className="font-display font-black text-slate-900 text-lg">Tren Tidur Mingguan</h3>
                    <p className="text-xs text-slate-500 font-sans">Target harian 7.5 jam tidur berkualitas</p>
                </div>
                <button
                    onClick={onViewDetail}
                    className="text-xs font-mono font-bold text-neutral-700 hover:text-black transition-colors cursor-pointer active:scale-95"
                >
                    Lihat Detail &rarr;
                </button>
            </div>
            <div className="flex-1 relative min-h-[220px] w-full">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
