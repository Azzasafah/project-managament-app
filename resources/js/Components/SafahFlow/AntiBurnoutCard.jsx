import React, { useState, useRef, useEffect } from 'react';

const MOTIVATIONAL_QUOTES = [
    {
        jp: 'お疲れ様でした！',
        romaji: 'Otsukaresama deshita!',
        quote: 'Kerja keras hari ini luar biasa! Tutup workstation laptop, besok kita taklukkan pipeline lagi dengan pikiran segar.',
        mood: '🛌 Recharge Mode'
    },
    {
        jp: '今日もお疲れ様！ゆっくり休んでね。',
        romaji: 'Kyou mo otsukare! Yukkuri yasunde ne.',
        quote: 'Bahkan cluster distributed PySpark butuh scheduled cooldown. Istirahatkan mata dan energimu.',
        mood: '⚡ Cooldown Phase'
    },
    {
        jp: 'がんばったね！偉いぞ！',
        romaji: 'Ganbatta ne! Eraizo!',
        quote: 'Satu query, satu skema data, satu langkah lebih dekat menuju World-Class Data Engineer. Kamu hebat!',
        mood: '🔥 Level Up'
    },
    {
        jp: '明日もファイトだよ！',
        romaji: 'Ashita mo faito da yo!',
        quote: '1 baris kode yang ditulis dengan kepala dingin bernilai 100 baris kode yang ditulis sambil mengantuk. Tidur cukup adalah senjata rahasia.',
        mood: '🌙 Deep Sleep'
    },
    {
        jp: '無理しないでね、おやすみ！',
        romaji: 'Muri shinaide ne, oyasumi!',
        quote: 'Data lake dan Kafka bisa menunggu di server, tapi kesehatan dan shalat malammu tak tergantikan.',
        mood: '🍵 Calming Mind'
    },
    {
        jp: '最高のエンジニアへの第一歩！',
        romaji: 'Saikou no enjinia e no daiippo!',
        quote: 'Konsistensi harianmu hari ini adalah fondasi kesuksesan portofolio Telkom ETL & Azure Realtime.',
        mood: '🚀 High Momentum'
    }
];

const PRESET_SOUNDS = [
    { id: 'morning', name: 'Selamat Pagi (No.07 Morning)', tag: 'Pagi', url: '/sounds/001_No7%20Morning.wav' },
    { id: 'date_study', name: 'Belajar (No.07 Date)', tag: 'Belajar', url: '/sounds/003_No.7%20Date.wav' },
    { id: 'night', name: 'Selamat Malam (No.07 Night)', tag: 'Malam', url: '/sounds/002_No.7%20Night.wav' },
    { id: 'tts_jp', name: 'Japanese Voice (Speech Synthesis)', tag: 'TTS', url: 'speech' },
];

export default function AntiBurnoutCard({ onToast }) {
    // Current Quote
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [sparkleActive, setSparkleActive] = useState(false);

    // Audio settings
    const [soundSource, setSoundSource] = useState(() => {
        const saved = localStorage.getItem('safahflow_burnout_sound_source');
        if (saved && PRESET_SOUNDS.some(s => s.id === saved)) {
            return saved;
        }
        if (saved === 'custom') return 'custom';
        return 'morning';
    });
    const [customSoundData, setCustomSoundData] = useState(() => {
        return localStorage.getItem('safahflow_custom_audio_data') || null;
    });
    const [customSoundName, setCustomSoundName] = useState(() => {
        return localStorage.getItem('safahflow_custom_audio_name') || 'custom_sound.mp3';
    });
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('safahflow_burnout_muted') === 'true';
    });

    // Sound settings modal
    const [soundModalOpen, setSoundModalOpen] = useState(false);
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);

    // Audio Element Ref
    const audioRef = useRef(null);
    const fileInputRef = useRef(null);

    const currentQuote = MOTIVATIONAL_QUOTES[currentQuoteIndex];

    // Play Sound function
    const playCheerSound = (overrideSource = null) => {
        if (isMuted) return;
        const activeSource = overrideSource || soundSource;

        try {
            // Case 1: Custom Uploaded Sound
            if (activeSource === 'custom' && customSoundData) {
                if (audioRef.current) {
                    audioRef.current.src = customSoundData;
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(e => console.log('Audio playback error:', e));
                }
                return;
            }

            // Case 2: Japanese Speech Synthesis
            if (activeSource === 'tts_jp') {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const quote = MOTIVATIONAL_QUOTES[currentQuoteIndex];
                    const utterance = new SpeechSynthesisUtterance(quote.jp || 'お疲れ様でした！');
                    utterance.lang = 'ja-JP';
                    utterance.rate = 1.05;
                    utterance.pitch = 1.2;

                    // Prefer Japanese female voices if installed
                    const voices = window.speechSynthesis.getVoices();
                    const jaVoice = voices.find(v => v.lang.includes('ja') || v.name.toLowerCase().includes('haruka') || v.name.toLowerCase().includes('ayumi') || v.name.toLowerCase().includes('japan'));
                    if (jaVoice) utterance.voice = jaVoice;

                    window.speechSynthesis.speak(utterance);
                }
                return;
            }

            // Case 3: Preset Anime Sounds
            const preset = PRESET_SOUNDS.find(s => s.id === activeSource) || PRESET_SOUNDS[0];
            if (preset && preset.url && preset.url !== 'speech') {
                if (audioRef.current) {
                    audioRef.current.src = preset.url;
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(e => {
                        console.log('Audio autoplay prevented or file unavailable, falling back to speech:', e);
                        // Fallback to speech
                        if ('speechSynthesis' in window) {
                            const u = new SpeechSynthesisUtterance('お疲れ様でした！');
                            u.lang = 'ja-JP';
                            window.speechSynthesis.speak(u);
                        }
                    });
                }
            }
        } catch (err) {
            console.error('Error playing cheer sound:', err);
        }
    };

    // Trigger Random Quote + Animation + Sound
    const handleTriggerQuote = () => {
        setIsAnimating(true);
        setSparkleActive(true);

        // Pick a different random quote
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
        } while (nextIndex === currentQuoteIndex && MOTIVATIONAL_QUOTES.length > 1);

        setCurrentQuoteIndex(nextIndex);
        playCheerSound();

        setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        setTimeout(() => {
            setSparkleActive(false);
        }, 1200);
    };

    // Handle Custom Sound File Upload
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit size to 4MB for localStorage safety
        if (file.size > 4 * 1024 * 1024) {
            if (onToast) onToast('Ukuran file maksimal 4MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target?.result;
            if (base64Data) {
                setCustomSoundData(base64Data);
                setCustomSoundName(file.name);
                setSoundSource('custom');
                localStorage.setItem('safahflow_custom_audio_data', base64Data);
                localStorage.setItem('safahflow_custom_audio_name', file.name);
                localStorage.setItem('safahflow_burnout_sound_source', 'custom');

                if (onToast) onToast(`Sound custom "${file.name}" berhasil dipasang! 🎵`, 'success');

                // Test play
                if (audioRef.current) {
                    audioRef.current.src = base64Data;
                    audioRef.current.play().catch(e => console.log(e));
                }
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSelectPreset = (id) => {
        setSoundSource(id);
        localStorage.setItem('safahflow_burnout_sound_source', id);
        if (onToast) onToast('Suara anime berhasil diubah!', 'success');
    };

    const handleToggleMute = (e) => {
        e.stopPropagation();
        const next = !isMuted;
        setIsMuted(next);
        localStorage.setItem('safahflow_burnout_muted', String(next));
        if (onToast) onToast(next ? 'Sound dinonaktifkan (Mute)' : 'Sound diaktifkan 🔊', 'info');
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            {/* Hidden Audio Element */}
            <audio ref={audioRef} preload="auto" />

            {/* Background Decorative Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/10 transition-colors"></div>

            {/* Header: Icon, Title & Sound Settings Trigger */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl shadow-xs">
                        <i className="ph-bold ph-power"></i>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={handleToggleMute}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-all cursor-pointer ${
                                isMuted
                                    ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            }`}
                            title={isMuted ? 'Nyalakan Suara Anime' : 'Matikan Suara (Mute)'}
                        >
                            <i className={`ph-bold ${isMuted ? 'ph-speaker-slash' : 'ph-speaker-high'}`}></i>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSoundModalOpen(true)}
                            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs transition-all cursor-pointer"
                            title="Pengaturan Sound Anime / Upload Audio"
                        >
                            <i className="ph-bold ph-music-notes"></i>
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <h4 className="font-display font-black text-slate-900 text-lg">
                            Aturan Emas Anti-Burnout
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-mono font-bold">
                            HARD-STOP
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Pukul <strong>22.00 WIB adalah batas akhir</strong>. Tutup workstation, matikan IDE, dan istirahat tepat waktu demi energi Shalat Tahajud & ketajaman rekayasa data esok hari.
                    </p>
                </div>

                {/* Animated Motivational Quote Card */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 relative overflow-hidden transition-all">
                    {sparkleActive && (
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-purple-500/10 animate-pulse"></div>
                    )}

                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                            <i className="ph-bold ph-sparkle text-rose-500"></i>
                            {currentQuote.mood}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[160px]" title={soundSource === 'custom' ? customSoundName : PRESET_SOUNDS.find(s => s.id === soundSource)?.name}>
                            {soundSource === 'custom' ? `🎵 ${customSoundName}` : `🔊 ${PRESET_SOUNDS.find(s => s.id === soundSource)?.name || 'Anime Voice'}`}
                        </span>
                    </div>

                    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
                        <p className="font-display font-bold text-xs text-slate-900 leading-snug">
                            "{currentQuote.quote}"
                        </p>
                        <p className="text-[11px] font-mono text-slate-500 mt-1 italic">
                            {currentQuote.jp} <span className="text-slate-400">({currentQuote.romaji})</span>
                        </p>
                    </div>
                </div>

                {/* Animated Cheer Button */}
                <div className="mt-3.5">
                    <button
                        type="button"
                        onClick={handleTriggerQuote}
                        className={`w-full py-2.5 px-4 rounded-2xl bg-black text-white text-xs font-bold shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group relative overflow-hidden ${
                            sparkleActive ? 'ring-2 ring-rose-400 ring-offset-1' : ''
                        }`}
                    >
                        <i className={`ph-bold ph-heart text-rose-400 text-sm transition-transform ${sparkleActive ? 'scale-125 animate-bounce' : 'group-hover:scale-110'}`}></i>
                        <span>Otsukaresama! Dengar Semangat</span>
                        <i className="ph-bold ph-wave-sine text-xs text-rose-400 animate-pulse"></i>
                    </button>
                </div>
            </div>

            {/* Footer Rules */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <span>Target Tidur: 7.5 Jam</span>
                <span className="text-rose-600 font-extrabold flex items-center gap-1">
                    <i className="ph-bold ph-alarm"></i>
                    Max 22:00 WIB
                </span>
            </div>

            {/* Audio Settings & Custom Upload Modal */}
            {soundModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                    <div
                        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-sm">
                                    <i className="ph-bold ph-music-notes"></i>
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-slate-900 text-base leading-tight">
                                        Pengaturan Sound Anime
                                    </h3>
                                    <p className="text-[11px] font-mono text-neutral-400">
                                        Pilih suara anime bawaan atau unggah audio custom sendiri
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSoundModalOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <i className="ph-bold ph-x text-sm"></i>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scroll">
                            {/* Preset Voices List */}
                            <div className="space-y-2.5">
                                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                    Pilihan Suara Anime Bawaan
                                </label>
                                <div className="space-y-2">
                                    {PRESET_SOUNDS.map((sound) => (
                                        <div
                                            key={sound.id}
                                            onClick={() => handleSelectPreset(sound.id)}
                                            className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                                soundSource === sound.id
                                                    ? 'border-black bg-slate-50 text-slate-900 ring-1 ring-black'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <i className={`ph-bold ${soundSource === sound.id ? 'ph-radio-button text-black' : 'ph-circle text-slate-300'}`}></i>
                                                <div>
                                                    <p className="font-bold text-slate-900">{sound.name}</p>
                                                    {sound.tag && (
                                                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                                                            Kategori: {sound.tag}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectPreset(sound.id);
                                                    playCheerSound(sound.id);
                                                }}
                                                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
                                                title="Test Suara Ini"
                                            >
                                                <i className="ph-bold ph-play"></i>
                                                <span>Test</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Sound Upload Section */}
                            <div className="space-y-2.5 pt-2 border-t border-slate-100">
                                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                    Unggah File Sound Custom (.mp3 / .wav / .ogg)
                                </label>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="audio/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-black bg-slate-50/50 hover:bg-slate-50 text-center cursor-pointer transition-all space-y-1.5"
                                >
                                    <div className="w-10 h-10 mx-auto rounded-xl bg-slate-200/70 text-slate-700 flex items-center justify-center text-lg">
                                        <i className="ph-bold ph-upload-simple"></i>
                                    </div>
                                    <p className="text-xs font-bold text-slate-800">
                                        Klik untuk Pilih File Audio Custom
                                    </p>
                                    <p className="text-[10px] font-mono text-slate-400">
                                        Format MP3, WAV, AAC, atau OGG (Maks. 4MB)
                                    </p>
                                </div>

                                {customSoundData && (
                                    <div className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                                        soundSource === 'custom'
                                            ? 'border-black bg-slate-50 text-slate-900 ring-1 ring-black'
                                            : 'border-slate-200 bg-white text-slate-700'
                                    }`}>
                                        <div
                                            className="flex items-center gap-2 cursor-pointer flex-1"
                                            onClick={() => handleSelectPreset('custom')}
                                        >
                                            <i className={`ph-bold ${soundSource === 'custom' ? 'ph-radio-button text-black' : 'ph-circle text-slate-300'}`}></i>
                                            <div className="truncate max-w-[180px]">
                                                <p className="truncate font-bold">{customSoundName}</p>
                                                <span className="text-[10px] font-mono text-emerald-600">Audio Kustom Aktif</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (audioRef.current && customSoundData) {
                                                        audioRef.current.src = customSoundData;
                                                        audioRef.current.play();
                                                    }
                                                }}
                                                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                                                title="Putar Preview"
                                            >
                                                <i className="ph-bold ph-play"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCustomSoundData(null);
                                                    setCustomSoundName('');
                                                    setSoundSource('morning');
                                                    localStorage.removeItem('safahflow_custom_audio_data');
                                                    localStorage.removeItem('safahflow_custom_audio_name');
                                                    localStorage.setItem('safahflow_burnout_sound_source', 'morning');
                                                    if (onToast) onToast('Audio custom dihapus. Menggunakan suara anime default.', 'info');
                                                }}
                                                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                                                title="Hapus Audio Kustom"
                                            >
                                                <i className="ph-bold ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <span className="text-[11px] font-mono text-neutral-400">
                                Suara otomatis diputar saat tombol ditekan
                            </span>
                            <button
                                type="button"
                                onClick={() => setSoundModalOpen(false)}
                                className="px-5 py-2 rounded-2xl bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
