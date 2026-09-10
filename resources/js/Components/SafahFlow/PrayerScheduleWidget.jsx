import React, { useState, useEffect, useMemo, useCallback } from 'react';

const PRESET_CITIES = [
    { id: '1301', lokasi: 'KOTA JAKARTA' },
    { id: '1219', lokasi: 'KOTA BANDUNG' },
    { id: '1638', lokasi: 'KOTA SURABAYA' },
    { id: '1433', lokasi: 'KOTA SEMARANG' },
    { id: '1505', lokasi: 'KOTA YOGYAKARTA' },
    { id: '1221', lokasi: 'KOTA DEPOK' },
    { id: '1222', lokasi: 'KOTA BEKASI' },
    { id: '1107', lokasi: 'KOTA TANGERANG' },
    { id: '1220', lokasi: 'KOTA BOGOR' },
    { id: '0228', lokasi: 'KOTA MEDAN' },
    { id: '2603', lokasi: 'KOTA MAKASSAR' },
    { id: '1635', lokasi: 'KOTA MALANG' },
    { id: '1434', lokasi: 'KOTA SURAKARTA (SOLO)' },
];

const PRAYER_ITEMS = [
    { key: 'imsak', label: 'Imsak', icon: 'ph-moon', isFardhu: false },
    { key: 'subuh', label: 'Subuh', icon: 'ph-sun-dim', isFardhu: true },
    { key: 'terbit', label: 'Terbit', icon: 'ph-sun-horizon', isFardhu: false },
    { key: 'dhuha', label: 'Dhuha', icon: 'ph-sun', isFardhu: false },
    { key: 'dzuhur', label: 'Dzuhur', icon: 'ph-sun', isFardhu: true },
    { key: 'ashar', label: 'Ashar', icon: 'ph-cloud-sun', isFardhu: true },
    { key: 'maghrib', label: 'Maghrib', icon: 'ph-sunset', isFardhu: true },
    { key: 'isya', label: 'Isya', icon: 'ph-moon-stars', isFardhu: true },
];

export default function PrayerScheduleWidget({ onToast }) {
    // City selection state
    const [city, setCity] = useState(() => {
        try {
            const saved = localStorage.getItem('safahflow_prayer_city');
            if (saved) return JSON.parse(saved);
        } catch (e) {}
        return { id: '1301', lokasi: 'KOTA JAKARTA' };
    });

    // Schedule data
    const [jadwal, setJadwal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // City Selector Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    // Live clock for next prayer computation
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 30);
        return () => clearInterval(timer);
    }, []);

    // Fetch Prayer Schedule for today
    const fetchSchedule = useCallback(async (cityId) => {
        setLoading(true);
        setError(null);
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');

            const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${year}/${month}/${day}`);
            const data = await res.json();

            if (data.status && data.data && data.data.jadwal) {
                setJadwal(data.data.jadwal);
            } else {
                setError('Gagal memuat jadwal dari Kemenag.');
            }
        } catch (err) {
            console.error('Error fetching prayer schedule:', err);
            setError('Koneksi ke API Kemenag bermasalah.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (city && city.id) {
            fetchSchedule(city.id);
        }
    }, [city, fetchSchedule]);

    // Search City via API
    const handleSearch = async (e) => {
        e?.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;

        setSearching(true);
        try {
            const res = await fetch(`https://api.myquran.com/v2/sholat/kota/cari/${encodeURIComponent(q)}`);
            const data = await res.json();
            if (data.status && Array.isArray(data.data)) {
                setSearchResults(data.data);
            } else {
                setSearchResults([]);
            }
        } catch (err) {
            console.error('Error searching city:', err);
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    // Choose City
    const handleSelectCity = (selected) => {
        setCity(selected);
        try {
            localStorage.setItem('safahflow_prayer_city', JSON.stringify(selected));
        } catch (e) {}
        setModalOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        if (onToast) onToast(`Wilayah diubah ke ${selected.lokasi}`, 'success');
    };

    // Calculate next prayer
    const nextPrayerInfo = useMemo(() => {
        if (!jadwal) return null;

        const now = currentTime;
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTotalMinutes = currentHours * 60 + currentMinutes;

        const prayerList = [
            { key: 'subuh', label: 'Subuh', time: jadwal.subuh },
            { key: 'terbit', label: 'Terbit', time: jadwal.terbit },
            { key: 'dzuhur', label: 'Dzuhur', time: jadwal.dzuhur },
            { key: 'ashar', label: 'Ashar', time: jadwal.ashar },
            { key: 'maghrib', label: 'Maghrib', time: jadwal.maghrib },
            { key: 'isya', label: 'Isya', time: jadwal.isya },
        ];

        for (const p of prayerList) {
            if (!p.time) continue;
            const [h, m] = p.time.split(':').map(Number);
            const prayerMinutes = h * 60 + m;

            if (prayerMinutes > currentTotalMinutes) {
                const diff = prayerMinutes - currentTotalMinutes;
                const diffHours = Math.floor(diff / 60);
                const diffMins = diff % 60;
                let countdown = '';
                if (diffHours > 0) countdown += `${diffHours} jam `;
                countdown += `${diffMins} mnt lagi`;

                return {
                    key: p.key,
                    label: p.label,
                    time: p.time,
                    countdown,
                };
            }
        }

        // If after Isya, next is tomorrow's Subuh
        return {
            key: 'subuh',
            label: 'Subuh Esok',
            time: jadwal.subuh,
            countdown: 'Menjelang Fajar',
        };
    }, [jadwal, currentTime]);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            {/* Header: Title, City badge & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-sm shadow-xs">
                            <i className="ph-bold ph-mosque"></i>
                        </div>
                        <h3 className="font-display font-black text-lg text-slate-900 leading-tight">
                            Jadwal Sholat Hari Ini
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono font-bold tracking-wider">
                            API KEMENAG RI
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">
                        Sumber data resmi Bimas Islam Kementerian Agama RI • {jadwal?.tanggal || 'Hari Ini'}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                        title="Ubah Kota / Wilayah"
                    >
                        <i className="ph-bold ph-map-pin text-black"></i>
                        <span className="font-mono uppercase max-w-[150px] truncate">{city.lokasi}</span>
                        <i className="ph-bold ph-caret-down text-slate-400 text-xs"></i>
                    </button>

                    <button
                        onClick={() => fetchSchedule(city.id)}
                        disabled={loading}
                        className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                        title="Muat Ulang Jadwal"
                    >
                        <i className={`ph-bold ph-arrows-clockwise ${loading ? 'animate-spin' : ''}`}></i>
                    </button>
                </div>
            </div>

            {/* Next Prayer Highlight Banner */}
            {nextPrayerInfo && !loading && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg text-amber-400">
                            <i className="ph-bold ph-bell-ringing"></i>
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                Waktu Sholat Berikutnya
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-display font-black text-base text-white">
                                    {nextPrayerInfo.label} • {nextPrayerInfo.time} WIB
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono font-bold text-xs">
                            ⏳ {nextPrayerInfo.countdown}
                        </span>
                    </div>
                </div>
            )}

            {/* Error banner if any */}
            {error && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="ph-bold ph-warning-circle text-base"></i>
                        <span>{error}</span>
                    </div>
                    <button
                        onClick={() => fetchSchedule(city.id)}
                        className="text-xs font-bold underline hover:no-underline cursor-pointer"
                    >
                        Coba Lagi
                    </button>
                </div>
            )}

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {PRAYER_ITEMS.map((item) => {
                    const time = jadwal ? jadwal[item.key] : '--:--';
                    const isNext = nextPrayerInfo?.key === item.key;

                    return (
                        <div
                            key={item.key}
                            className={`p-3 rounded-2xl border transition-all flex flex-col justify-between text-center relative overflow-hidden ${
                                isNext
                                    ? 'border-black bg-slate-50 ring-2 ring-black shadow-xs'
                                    : 'border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                            }`}
                        >
                            {isNext && (
                                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            )}

                            <div className="flex flex-col items-center gap-1 mb-2">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                                    isNext ? 'bg-black text-white' : 'bg-slate-200/70 text-slate-700'
                                }`}>
                                    <i className={`ph-bold ${item.icon}`}></i>
                                </div>
                                <span className="text-[11px] font-mono font-bold text-slate-600 uppercase">
                                    {item.label}
                                </span>
                            </div>

                            <div>
                                <span className={`text-base sm:text-lg font-display font-black tracking-tight ${
                                    isNext ? 'text-slate-900' : 'text-slate-800'
                                }`}>
                                    {loading ? (
                                        <span className="inline-block w-12 h-5 bg-slate-200 animate-pulse rounded"></span>
                                    ) : (
                                        time
                                    )}
                                </span>
                                {item.isFardhu && (
                                    <span className="block text-[9px] font-mono text-neutral-400 uppercase mt-0.5">
                                        Fardhu
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* City Selection Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                    <div
                        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-sm">
                                    <i className="ph-bold ph-map-pin-line"></i>
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-slate-900 text-base leading-tight">
                                        Pilih Kota / Kabupaten
                                    </h3>
                                    <p className="text-[11px] font-mono text-neutral-400">
                                        Jadwal sholat otomatis disesuaikan dengan hisab Kemenag RI
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <i className="ph-bold ph-x text-sm"></i>
                            </button>
                        </div>

                        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scroll">
                            {/* Search Form */}
                            <form onSubmit={handleSearch} className="space-y-2">
                                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                    Cari Nama Kota / Kabupaten
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <i className="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Contoh: Bandung, Sleman, Medan..."
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={searching || !searchQuery.trim()}
                                        className="px-4 py-2.5 rounded-2xl bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
                                    >
                                        {searching ? (
                                            <i className="ph-bold ph-arrows-clockwise animate-spin"></i>
                                        ) : (
                                            <i className="ph-bold ph-magnifying-glass"></i>
                                        )}
                                        <span>Cari</span>
                                    </button>
                                </div>
                            </form>

                            {/* Search Results */}
                            {searchResults.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                        Hasil Pencarian ({searchResults.length})
                                    </span>
                                    <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scroll">
                                        {searchResults.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleSelectCity(item)}
                                                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                                    city.id === item.id
                                                        ? 'border-black bg-slate-50 text-slate-900'
                                                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <i className="ph-bold ph-map-pin text-slate-400"></i>
                                                    <span>{item.lokasi}</span>
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-400">
                                                    ID: {item.id}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Preset Cities */}
                            <div className="space-y-2">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                    Pilihan Kota Cepat
                                </span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {PRESET_CITIES.map((preset) => (
                                        <button
                                            key={preset.id}
                                            onClick={() => handleSelectCity(preset)}
                                            className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer truncate ${
                                                city.id === preset.id
                                                    ? 'border-black bg-black text-white shadow-xs'
                                                    : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700 hover:border-slate-300'
                                            }`}
                                        >
                                            {preset.lokasi}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50/50">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
