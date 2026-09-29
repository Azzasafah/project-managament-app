import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function MascotManagerSection({ mascot = null }) {
    const defaultMascot = {
        name: mascot?.name || 'CHISA.SYS',
        role: mascot?.role || 'AI // COMPANION',
        avatar_url: mascot?.avatar_url || '/chisa.webp',
        voice_url: mascot?.voice_url || '/sounds/001_No7 Morning.wav',
        dialogue: mascot?.dialogue || 'Konnichiwa! Sistem neural azzasafah.my.id berjalan optimal. Senang bertemu denganmu!',
        subtext: mascot?.subtext || 'HOLOGRAPHIC_UNIT',
        badge_status: mascot?.badge_status || 'ACTIVE',
        tagline_left: mascot?.tagline_left || 'DATA_ENG..BACKEND',
        tagline_right: mascot?.tagline_right || 'V2026.9',
    };

    const [form, setForm] = useState(defaultMascot);
    const [avatarSource, setAvatarSource] = useState('preset'); // 'preset' | 'upload' | 'url'
    const [voiceSource, setVoiceSource] = useState('preset'); // 'preset' | 'upload' | 'url'
    const [avatarFile, setAvatarFile] = useState(null);
    const [voiceFile, setVoiceFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(defaultMascot.avatar_url);
    const [isPlaying, setIsPlaying] = useState(false);
    const [previewSpeechOpen, setPreviewSpeechOpen] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const audioRef = useRef(null);
    const avatarInputRef = useRef(null);
    const voiceInputRef = useRef(null);

    // Sync form if prop changes
    useEffect(() => {
        if (mascot) {
            setForm({
                name: mascot.name || 'CHISA.SYS',
                role: mascot.role || 'AI // COMPANION',
                avatar_url: mascot.avatar_url || '/chisa.webp',
                voice_url: mascot.voice_url || '/sounds/001_No7 Morning.wav',
                dialogue: mascot.dialogue || 'Konnichiwa! Sistem neural azzasafah.my.id berjalan optimal. Senang bertemu denganmu!',
                subtext: mascot.subtext || 'HOLOGRAPHIC_UNIT',
                badge_status: mascot.badge_status || 'ACTIVE',
                tagline_left: mascot.tagline_left || 'DATA_ENG..BACKEND',
                tagline_right: mascot.tagline_right || 'V2026.9',
            });
            setAvatarPreview(mascot.avatar_url || '/chisa.webp');
        }
    }, [mascot]);

    const avatarPresets = [
        { label: 'Chisa (WebP Default)', value: '/chisa.webp', thumb: '/chisa.webp' },
        { label: 'Chisa (PNG Quality)', value: '/chisa.png', thumb: '/chisa.png' },
        { label: 'Love / Companion (WebP)', value: '/love.webp', thumb: '/love.webp' },
        { label: 'Love / Companion (PNG)', value: '/love.png', thumb: '/love.png' },
    ];

    const voicePresets = [
        { label: 'No.7 Morning (Suara Pagi Chisa)', value: '/sounds/001_No7 Morning.wav', desc: 'Sapaan pagi yang ceria dan bersemangat' },
        { label: 'No.7 Night (Suara Malam Chisa)', value: '/sounds/002_No.7 Night.wav', desc: 'Nada santai & menenangkan untuk malam hari' },
        { label: 'No.7 Date (Suara Jalan Santai)', value: '/sounds/003_No.7 Date.wav', desc: 'Interaksi ramah dan bersahabat' },
    ];

    // Handle avatar file selection
    const handleAvatarFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const objectUrl = URL.createObjectURL(file);
            setAvatarPreview(objectUrl);
        }
    };

    // Handle voice file selection
    const handleVoiceFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setVoiceFile(file);
        }
    };

    // Handle Play Audio Test
    const handleTestVoice = () => {
        let soundUrlToPlay = form.voice_url;
        if (voiceSource === 'upload' && voiceFile) {
            soundUrlToPlay = URL.createObjectURL(voiceFile);
        }

        if (!soundUrlToPlay) return;

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        try {
            const audio = new Audio(soundUrlToPlay);
            audioRef.current = audio;
            setIsPlaying(true);
            setPreviewSpeechOpen(true);

            audio.play().then(() => {
                audio.onended = () => {
                    setIsPlaying(false);
                };
            }).catch((err) => {
                console.warn('Audio play failed:', err);
                setIsPlaying(false);
            });
        } catch (e) {
            console.error('Audio initialization error:', e);
            setIsPlaying(false);
        }
    };

    const handleStopVoice = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    // Submit mascot updates
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('role', form.role);
        formData.append('dialogue', form.dialogue);
        formData.append('subtext', form.subtext);
        formData.append('badge_status', form.badge_status);
        formData.append('tagline_left', form.tagline_left);
        formData.append('tagline_right', form.tagline_right);

        if (avatarSource === 'upload' && avatarFile) {
            formData.append('avatar_file', avatarFile);
        } else {
            formData.append('avatar_url', form.avatar_url);
        }

        if (voiceSource === 'upload' && voiceFile) {
            formData.append('voice_file', voiceFile);
        } else {
            formData.append('voice_url', form.voice_url);
        }

        router.post('/mascot-settings', formData, {
            preserveScroll: true,
            onFinish: () => setIsSaving(false),
        });
    };

    const handleResetDefaults = () => {
        if (confirm('Kembalikan maskot dan audio ke setelan default Chisa?')) {
            router.post('/mascot-settings/reset', {}, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: CUSTOMIZATION CONTROLS (7 COLS) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-7">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                                COMPANION CONFIGURATION
                            </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Kustomisasi Maskot & Voice AI
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 font-sans">
                            Ubah nama maskot, foto visual, rekaman suara, dan pesan yang muncul saat pengunjung mengklik maskot di portfolio.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleResetDefaults}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                        title="Reset ke setelan awal Chisa"
                    >
                        <i className="ph-bold ph-arrows-counter-clockwise"></i>
                        <span className="hidden sm:inline">Reset Default</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. IDENTITAS MASKOT */}
                    <div className="space-y-4">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                            1. Identitas & Label Maskot
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                    Nama Maskot (Header Kiri)
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Contoh: CHISA.SYS"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                    Sub-Label / Role (Header Kanan)
                                </label>
                                <input
                                    type="text"
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    placeholder="Contoh: AI // COMPANION"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                    Status Badge
                                </label>
                                <input
                                    type="text"
                                    value={form.badge_status}
                                    onChange={(e) => setForm({ ...form, badge_status: e.target.value })}
                                    placeholder="ACTIVE / ONLINE"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                    Tagline Kiri Bawah
                                </label>
                                <input
                                    type="text"
                                    value={form.tagline_left}
                                    onChange={(e) => setForm({ ...form, tagline_left: e.target.value })}
                                    placeholder="DATA_ENG..BACKEND"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                    Tagline Kanan Bawah
                                </label>
                                <input
                                    type="text"
                                    value={form.tagline_right}
                                    onChange={(e) => setForm({ ...form, tagline_right: e.target.value })}
                                    placeholder="V2026.9"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. GAMBAR MASKOT */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                                2. Visual / Gambar Maskot
                            </label>
                            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-[10px] font-mono">
                                <button
                                    type="button"
                                    onClick={() => setAvatarSource('preset')}
                                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                                        avatarSource === 'preset' ? 'bg-white text-black shadow-xs' : 'text-slate-500'
                                    }`}
                                >
                                    Preset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAvatarSource('upload')}
                                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                                        avatarSource === 'upload' ? 'bg-white text-black shadow-xs' : 'text-slate-500'
                                    }`}
                                >
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAvatarSource('url')}
                                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                                        avatarSource === 'url' ? 'bg-white text-black shadow-xs' : 'text-slate-500'
                                    }`}
                                >
                                    URL Luar
                                </button>
                            </div>
                        </div>

                        {avatarSource === 'preset' && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {avatarPresets.map((preset) => {
                                    const isSelected = form.avatar_url === preset.value;
                                    return (
                                        <button
                                            type="button"
                                            key={preset.value}
                                            onClick={() => {
                                                setForm({ ...form, avatar_url: preset.value });
                                                setAvatarPreview(preset.value);
                                                setAvatarFile(null);
                                            }}
                                            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer group flex flex-col items-center ${
                                                isSelected
                                                    ? 'border-black bg-neutral-900 text-white shadow-md'
                                                    : 'border-slate-200 hover:border-slate-400 bg-slate-50 text-slate-700'
                                            }`}
                                        >
                                            <div className="w-16 h-20 rounded-xl overflow-hidden mb-2 bg-slate-200 relative border border-black/10">
                                                <img
                                                    src={preset.thumb}
                                                    alt={preset.label}
                                                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-center leading-tight">
                                                {preset.label}
                                            </span>
                                            {isSelected && (
                                                <span className="mt-1 text-[8px] font-mono text-emerald-400 font-bold">
                                                    ✓ AKTIF
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {avatarSource === 'upload' && (
                            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 text-center transition-all">
                                <input
                                    type="file"
                                    ref={avatarInputRef}
                                    accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                                    onChange={handleAvatarFileChange}
                                    className="hidden"
                                />
                                <div className="space-y-2">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-700 shadow-xs">
                                        <i className="ph-bold ph-image text-xl"></i>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => avatarInputRef.current?.click()}
                                            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
                                        >
                                            Pilih File Gambar
                                        </button>
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-500">
                                        Format PNG, JPG, WebP, SVG (Maks. 5MB). Rasio ideal 4:5.
                                    </p>
                                    {avatarFile && (
                                        <p className="text-xs font-mono text-emerald-600 font-bold mt-1">
                                            ✓ Terpilih: {avatarFile.name} ({(avatarFile.size / 1024).toFixed(1)} KB)
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {avatarSource === 'url' && (
                            <div>
                                <input
                                    type="url"
                                    value={form.avatar_url}
                                    onChange={(e) => {
                                        setForm({ ...form, avatar_url: e.target.value });
                                        setAvatarPreview(e.target.value);
                                    }}
                                    placeholder="https://domain.com/path-to-image.png"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                />
                                <p className="text-[10px] font-mono text-slate-500 mt-1">
                                    Masukkan URL link gambar langsung yang valid (HTTPS).
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 3. SUARA MASKOT (AUDIO CUSTOMIZATION) */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                                3. Suara Maskot (Voice Line Audio)
                            </label>
                            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-[10px] font-mono">
                                <button
                                    type="button"
                                    onClick={() => setVoiceSource('preset')}
                                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                                        voiceSource === 'preset' ? 'bg-white text-black shadow-xs' : 'text-slate-500'
                                    }`}
                                >
                                    Preset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setVoiceSource('upload')}
                                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                                        voiceSource === 'upload' ? 'bg-white text-black shadow-xs' : 'text-slate-500'
                                    }`}
                                >
                                    Upload Suara
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setVoiceSource('url')}
                                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                                        voiceSource === 'url' ? 'bg-white text-black shadow-xs' : 'text-slate-500'
                                    }`}
                                >
                                    URL Audio
                                </button>
                            </div>
                        </div>

                        {voiceSource === 'preset' && (
                            <div className="space-y-2">
                                {voicePresets.map((preset) => {
                                    const isSelected = form.voice_url === preset.value;
                                    return (
                                        <div
                                            key={preset.value}
                                            onClick={() => {
                                                setForm({ ...form, voice_url: preset.value });
                                                setVoiceFile(null);
                                            }}
                                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                                isSelected
                                                    ? 'border-black bg-neutral-900 text-white shadow-xs'
                                                    : 'border-slate-200 hover:border-slate-400 bg-slate-50 text-slate-800'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                                    isSelected ? 'bg-white/10 text-emerald-400' : 'bg-slate-200 text-slate-700'
                                                }`}>
                                                    <i className="ph-fill ph-speaker-high text-base"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-mono font-bold leading-tight">
                                                        {preset.label}
                                                    </p>
                                                    <p className={`text-[10px] font-sans mt-0.5 ${isSelected ? 'text-neutral-400' : 'text-slate-500'}`}>
                                                        {preset.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest shrink-0">
                                                    ✓ Terpilih
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {voiceSource === 'upload' && (
                            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 text-center transition-all">
                                <input
                                    type="file"
                                    ref={voiceInputRef}
                                    accept="audio/wav,audio/mp3,audio/mpeg,audio/ogg,audio/m4a"
                                    onChange={handleVoiceFileChange}
                                    className="hidden"
                                />
                                <div className="space-y-2">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-700 shadow-xs">
                                        <i className="ph-bold ph-microphone-stage text-xl"></i>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => voiceInputRef.current?.click()}
                                            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
                                        >
                                            Pilih File Audio Suara
                                        </button>
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-500">
                                        Mendukung format WAV, MP3, OGG, M4A (Maks. 10MB).
                                    </p>
                                    {voiceFile && (
                                        <p className="text-xs font-mono text-emerald-600 font-bold mt-1">
                                            ✓ Terpilih: {voiceFile.name} ({(voiceFile.size / 1024).toFixed(1)} KB)
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {voiceSource === 'url' && (
                            <div>
                                <input
                                    type="url"
                                    value={form.voice_url}
                                    onChange={(e) => setForm({ ...form, voice_url: e.target.value })}
                                    placeholder="https://domain.com/sounds/my-custom-voice.wav"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                />
                                <p className="text-[10px] font-mono text-slate-500 mt-1">
                                    Masukkan URL direct link file audio (.wav, .mp3, dsb).
                                </p>
                            </div>
                        )}

                        {/* Test Voice Button */}
                        <div className="flex items-center gap-3 pt-2">
                            {isPlaying ? (
                                <button
                                    type="button"
                                    onClick={handleStopVoice}
                                    className="px-4 py-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                                >
                                    <i className="ph-fill ph-stop"></i>
                                    Hentikan Suara
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleTestVoice}
                                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-black text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                                >
                                    <i className="ph-fill ph-play"></i>
                                    Tes Putar Suara Maskot
                                </button>
                            )}

                            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                                {isPlaying ? (
                                    <>
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                        <span className="text-emerald-600 font-bold">Sedang memutar audio...</span>
                                    </>
                                ) : (
                                    'Klik untuk mendengarkan sampel suara'
                                )}
                            </span>
                        </div>
                    </div>

                    {/* 4. PESAN DIALOG INTERAKTIF */}
                    <div className="space-y-4 pt-3 border-t border-slate-100">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                            4. Pesan Dialog Interaktif (Balon Pesan Saat Diklik)
                        </label>

                        <div>
                            <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                Teks Pesan Dialog Maskot
                            </label>
                            <textarea
                                rows={3}
                                value={form.dialogue}
                                onChange={(e) => setForm({ ...form, dialogue: e.target.value })}
                                placeholder="Tuliskan ucapan atau pesan sambutan maskot di sini..."
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-sans font-medium focus:outline-hidden focus:ring-2 focus:ring-black leading-relaxed"
                                required
                            />
                            <p className="text-[10px] font-mono text-slate-500 mt-1">
                                Pesan ini otomatis muncul dalam terminal dialog hologram saat maskot diklik di portfolio publik.
                            </p>
                        </div>

                        <div>
                            <label className="block text-[11px] font-mono font-medium text-slate-600 mb-1">
                                Subtext / Badge Unit
                            </label>
                            <input
                                type="text"
                                value={form.subtext}
                                onChange={(e) => setForm({ ...form, subtext: e.target.value })}
                                placeholder="HOLOGRAPHIC_UNIT"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="pt-5 border-t border-slate-200 flex items-center justify-end gap-3">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-3 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
                        >
                            <i className="ph-bold ph-floppy-disk text-base"></i>
                            {isSaving ? 'Menyimpan Pengaturan...' : 'Simpan Kustomisasi Maskot'}
                        </button>
                    </div>
                </form>
            </div>

            {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW (5 COLS) */}
            <div className="lg:col-span-5 bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-800 text-white shadow-xl space-y-5 sticky top-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                            LIVE INTERACTIVE PREVIEW
                        </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                        Klik Kartu Untuk Test
                    </span>
                </div>

                <p className="text-[11px] font-sans text-neutral-400">
                    Tampilan kartu persis seperti yang akan dilihat pengunjung di halaman utama portofolio:
                </p>

                {/* THE MASCOT CARD AS IT APPEARS ON THE PORTFOLIO */}
                <div className="flex flex-col items-center">
                    <div
                        onClick={handleTestVoice}
                        role="button"
                        tabIndex={0}
                        title="Klik untuk memutar suara dan pesan dialog"
                        className="relative w-full max-w-[280px] rounded-3xl border border-white/20 hover:border-white/40 bg-[#0e0e12] p-3.5 shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-2.5 py-1.5 mb-2.5 rounded-xl border border-white/10 bg-white/5 text-[9px] font-mono text-neutral-400">
                            <span className="flex items-center gap-1.5 font-bold text-white">
                                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
                                {form.name || 'CHISA.SYS'}
                            </span>
                            <span className="font-semibold tracking-wider">{form.role || 'AI // COMPANION'}</span>
                        </div>

                        {/* Image Frame */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 bg-[#050507]">
                            <img
                                src={avatarPreview || '/chisa.webp'}
                                alt="Mascot Preview"
                                className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                onError={(e) => {
                                    e.target.src = '/chisa.webp';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-70 pointer-events-none" />

                            {/* Overlaid badges */}
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                                <span className="text-[8px] font-mono px-2 py-0.5 rounded border text-neutral-300 bg-black/70 border-white/20 backdrop-blur-xs">
                                    {form.subtext || 'HOLOGRAPHIC_UNIT'}
                                </span>
                                <span className="text-[8px] font-mono px-2 py-0.5 rounded border text-emerald-400 bg-black/70 border-emerald-500/30 font-bold">
                                    {form.badge_status || 'ACTIVE'}
                                </span>
                            </div>

                            {/* Playing pulse indicator badge */}
                            {isPlaying && (
                                <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-emerald-500/90 text-black text-[9px] font-mono font-bold flex items-center gap-1 shadow-lg animate-pulse">
                                    <i className="ph-fill ph-speaker-high"></i>
                                    <span>SPEAKING</span>
                                </div>
                            )}
                        </div>

                        {/* Footer Taglines */}
                        <div className="mt-2.5 px-1 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.15em] text-neutral-400">
                            <span>{form.tagline_left || 'DATA_ENG..BACKEND'}</span>
                            <span>{form.tagline_right || 'V2026.9'}</span>
                        </div>
                    </div>

                    {/* Interactive Speech Dialogue Box below image */}
                    {previewSpeechOpen && (
                        <div className="w-full max-w-[280px] mt-3 p-3.5 rounded-2xl border border-white/15 bg-black/70 backdrop-blur-md shadow-xl transition-all animate-in fade-in duration-300">
                            <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-white/10">
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'}`}></span>
                                    <span className="text-[9px] font-mono font-bold tracking-wider text-white">
                                        {form.name} // TRANSMISSION
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {isPlaying ? (
                                        <span className="text-[8px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                                            <i className="ph-fill ph-speaker-high animate-bounce"></i> AUDIO ON
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTestVoice();
                                            }}
                                            className="text-[8px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                                        >
                                            <i className="ph-bold ph-play"></i> REPLAY
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className="text-xs font-sans text-neutral-200 leading-relaxed font-medium">
                                "{form.dialogue}"
                            </p>

                            <div className="mt-2.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-neutral-500">
                                <span>STATUS: 200 OK</span>
                                <span>AUDIO_STREAM_READY</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 text-xs font-sans space-y-1">
                    <p className="font-mono text-[10px] text-neutral-300 font-bold uppercase tracking-wider">
                        Tip Penggunaan:
                    </p>
                    <p className="text-[11px] leading-relaxed">
                        Saat pengunjung mengklik foto maskot di halaman publik portofolio, browser akan otomatis memainkan suara yang Anda atur dan memunculkan balon pesan dialog di bawah gambar.
                    </p>
                </div>
            </div>
        </div>
    );
}
