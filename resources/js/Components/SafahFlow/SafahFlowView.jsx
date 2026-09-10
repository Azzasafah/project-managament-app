import React, { useState, useEffect, useRef, useMemo } from 'react';
import { router } from '@inertiajs/react';
import PhaseManagerModal from '../Modals/PhaseManagerModal';
import PrayerScheduleWidget from './PrayerScheduleWidget';
import AntiBurnoutCard from './AntiBurnoutCard';

export default function SafahFlowView({
    deProjects = [],
    overallDeProgress = 0,
    bootcampSessions = [],
    nextLiveClass = null,
    todayDailyLog = null,
    todaySpiritualLog = null,
    todayChoreLog = null,
    safahFlowStats = { total_sessions: 36, attended_count: 7, watched_count: 0, progress_pct: 19 },
    onAddProject,
    onEditProject,
    onAddSession,
    onEditSession,
    onAddMilestone,
    onToast,
}) {
    const [subTab, setSubTab] = useState('overview'); // 'overview' | 'projects' | 'curriculum' | 'spiritual' | 'chores'

    // Curriculum Filter & Search & Dynamic Phase Manager
    const [phaseFilter, setPhaseFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
    const [customPhases, setCustomPhases] = useState(() => {
        try {
            const saved = localStorage.getItem('safahflow_custom_phases');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    // Daily Log Form
    const [dailyForm, setDailyForm] = useState({
        day_type: todayDailyLog?.day_type || 'FULL_LAB',
        effective_study_minutes: todayDailyLog?.effective_study_minutes || 240,
        key_output: todayDailyLog?.key_output || '',
        error_and_solution: todayDailyLog?.error_and_solution || '',
        git_commit_hash: todayDailyLog?.git_commit_hash || '',
        energy_level: todayDailyLog?.energy_level || 5,
    });
    const [savingDaily, setSavingDaily] = useState(false);

    // Sync dailyForm when todayDailyLog updates
    useEffect(() => {
        if (todayDailyLog) {
            setDailyForm({
                day_type: todayDailyLog.day_type || 'FULL_LAB',
                effective_study_minutes: todayDailyLog.effective_study_minutes || 240,
                key_output: todayDailyLog.key_output || '',
                error_and_solution: todayDailyLog.error_and_solution || '',
                git_commit_hash: todayDailyLog.git_commit_hash || '',
                energy_level: todayDailyLog.energy_level || 5,
            });
        }
    }, [todayDailyLog]);

    // Pomodoro Timer 25 Min
    const [timerSeconds, setTimerSeconds] = useState(25 * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const timerRef = useRef(null);

    // Synthesize gentle chime using Web Audio API
    const playChimeSound = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
        } catch (e) {
            console.log('Audio chime not supported');
        }
    };

    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setTimerSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setIsTimerRunning(false);
                        playChimeSound();
                        if (onToast) onToast('Waktu beres-beres 25 menit selesai! Kembali ke workstation 💻', 'success');
                        // Log Pomodoro to backend
                        router.post('/safahflow/chores/pomodoro', { minutes: 25 }, { preserveScroll: true });
                        return 25 * 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isTimerRunning]);

    const formatTimer = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // Toggle session attendance
    const handleToggleSession = (session) => {
        router.post(`/safahflow/sessions/${session.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (onToast) onToast(`Kehadiran Sesi ${session.session_number} diperbarui.`, 'success');
            },
        });
    };

    // Delete session
    const handleDeleteSession = (session) => {
        if (confirm(`Hapus Sesi #${session.session_number} (${session.session_name})?`)) {
            router.delete(`/safahflow/sessions/${session.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (onToast) onToast(`Sesi #${session.session_number} berhasil dihapus.`, 'success');
                },
            });
        }
    };

    // Delete project
    const handleDeleteProject = (project) => {
        if (confirm(`Hapus proyek "${project.name}" beserta seluruh milestonenya?`)) {
            router.delete(`/safahflow/projects/${project.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (onToast) onToast(`Proyek '${project.name}' berhasil dihapus.`, 'success');
                },
            });
        }
    };

    // Toggle milestone
    const handleToggleMilestone = (milestone) => {
        router.post(`/safahflow/milestones/${milestone.id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (onToast) onToast(`Milestone '${milestone.title}' diperbarui!`, 'success');
            },
        });
    };

    // Delete milestone
    const handleDeleteMilestone = (milestone) => {
        if (confirm(`Hapus milestone "${milestone.title}"?`)) {
            router.delete(`/safahflow/milestones/${milestone.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (onToast) onToast('Milestone berhasil dihapus.', 'success');
                },
            });
        }
    };

    // Toggle spiritual
    const handleToggleSpiritual = (field) => {
        router.post('/safahflow/spiritual/toggle', { field }, {
            preserveScroll: true,
            onSuccess: () => {
                if (onToast) onToast('Catatan ibadah diperbarui.', 'success');
            },
        });
    };

    // Toggle chore
    const handleToggleChore = (field) => {
        router.post('/safahflow/chores/toggle', { field }, {
            preserveScroll: true,
            onSuccess: () => {
                if (onToast) onToast('Catatan kebersihan diperbarui.', 'success');
            },
        });
    };

    // Submit Daily Log
    const handleSaveDailyLog = (e) => {
        e.preventDefault();
        setSavingDaily(true);
        router.post('/safahflow/daily-log', dailyForm, {
            preserveScroll: true,
            onSuccess: () => {
                setSavingDaily(false);
                if (onToast) onToast('Misi harian berhasil disimpan!', 'success');
            },
            onError: () => setSavingDaily(false),
        });
    };

    // Spiritual definitions
    const spiritualFields = useMemo(() => [
        { id: 'tahajud_witir', label: 'Shalat Tahajud & Witir', icon: 'ph-moon-stars' },
        { id: 'dzikir_pagi', label: 'Dzikir Pagi (Ba\'da Subuh)', icon: 'ph-sun-dim' },
        { id: 'dzikir_petang', label: 'Dzikir Petang (Ba\'da Maghrib)', icon: 'ph-cloud-sun' },
        { id: 'al_mulk', label: 'Surat Al-Mulk (Sebelum Tidur)', icon: 'ph-book-open' },
        { id: 'al_kahfi', label: 'Surat Al-Kahfi (Malam / Hari Jumat)', icon: 'ph-bookmark-simple', note: 'Khusus Jumat' },
        { id: 'kajian_pagi', label: 'Kajian Pagi (Rabu & Minggu 05.30)', icon: 'ph-chalkboard-teacher' },
        { id: 'kajian_malam', label: 'Kajian Malam (Rabu & Minggu)', icon: 'ph-users-three' },
    ], []);

    const spiritualDoneList = useMemo(() => {
        return spiritualFields.filter((f) => todaySpiritualLog && todaySpiritualLog[f.id]);
    }, [spiritualFields, todaySpiritualLog]);

    const spiritualDoneCount = spiritualDoneList.length;

    const spiritualSummaryText = useMemo(() => {
        if (spiritualDoneList.length === 0) return 'Belum ada checklist ibadah';
        return spiritualDoneList
            .map((f) => f.label.replace(/\(.*?\)/g, '').trim())
            .slice(0, 3)
            .join(', ') + (spiritualDoneList.length > 3 ? '...' : '');
    }, [spiritualDoneList]);

    // Attended & Next Session calculations for dynamic overview
    const attendedSessions = useMemo(() => {
        return bootcampSessions.filter((s) => s.attendance_status === 'ATTENDED' || s.attendance_status === 'WATCHED_RECORDING');
    }, [bootcampSessions]);

    const lastAttendedSession = useMemo(() => {
        const onlyAttended = bootcampSessions.filter((s) => s.attendance_status === 'ATTENDED');
        return onlyAttended.length > 0 ? onlyAttended[onlyAttended.length - 1] : (attendedSessions[attendedSessions.length - 1] || null);
    }, [bootcampSessions, attendedSessions]);

    const nextUnattendedSession = useMemo(() => {
        return bootcampSessions.find((s) => s.attendance_status !== 'ATTENDED' && s.attendance_status !== 'WATCHED_RECORDING') || null;
    }, [bootcampSessions]);

    // Dynamic Phase & Module Slider Filters based on database sessions and user custom choices
    const dynamicPhaseFilters = useMemo(() => {
        const list = [{ id: 'ALL', label: 'Semua Sesi', count: bootcampSessions.length }];

        const defaultPhaseLabels = {
            PRA_BOOTCAMP: 'Pra-Bootcamp',
            CORE: 'Core & Foundation',
            STREAMING: 'Streaming Kafka',
            PROCESSING: 'PySpark Processing',
            LAKE_ORCHESTRATION: 'MinIO & Airflow',
            CONSULTATION: 'Konsultasi Proyek',
            GRAND_DEMO_DAY: 'Grand Demo Day',
            CAREER: 'Career Coaching',
            USER_TEST: 'User Test',
        };

        // User custom phases map
        const customPhaseMap = new Map();
        if (customPhases && Array.isArray(customPhases) && customPhases.length > 0) {
            customPhases.forEach((cp) => {
                customPhaseMap.set(cp.id, cp.label);
            });
        }

        // Group sessions by phase
        const phaseMap = new Map();
        bootcampSessions.forEach((s) => {
            const key = s.phase || 'CORE';
            if (!phaseMap.has(key)) {
                let label = customPhaseMap.get(key) || defaultPhaseLabels[key] || key.replace(/_/g, ' ');

                phaseMap.set(key, {
                    id: key,
                    label: label,
                    count: 0,
                    minSession: s.session_number,
                    maxSession: s.session_number,
                });
            }
            const item = phaseMap.get(key);
            item.count += 1;
            item.minSession = Math.min(item.minSession, s.session_number);
            item.maxSession = Math.max(item.maxSession, s.session_number);
        });

        // Also include any custom category configured by user with 0 sessions
        if (customPhases && Array.isArray(customPhases)) {
            customPhases.forEach((cp) => {
                if (!phaseMap.has(cp.id)) {
                    phaseMap.set(cp.id, {
                        id: cp.id,
                        label: cp.label,
                        count: 0,
                        minSession: 9999,
                        maxSession: 9999,
                    });
                } else {
                    // Update label if user modified it in modal
                    phaseMap.get(cp.id).label = cp.label;
                }
            });
        }

        // Sort by starting session number
        const sortedPhases = Array.from(phaseMap.values()).sort((a, b) => a.minSession - b.minSession);

        sortedPhases.forEach((val) => {
            const range = val.count === 0 ? '(0 Sesi)' : (val.minSession === val.maxSession ? `(#${val.minSession})` : `(#${val.minSession}-${val.maxSession})`);
            list.push({
                id: val.id,
                label: `${val.label} ${range}`,
                count: val.count,
            });
        });

        // Dynamic status tabs
        const attendedTotal = bootcampSessions.filter((s) => s.attendance_status === 'ATTENDED').length;
        const scheduledTotal = bootcampSessions.filter((s) => s.attendance_status === 'SCHEDULED').length;
        const watchedTotal = bootcampSessions.filter((s) => s.attendance_status === 'WATCHED_RECORDING').length;

        list.push({ id: 'FILTER_ATTENDED', label: `✅ Hadir (${attendedTotal})` });
        list.push({ id: 'FILTER_SCHEDULED', label: `⏳ Belum Hadir (${scheduledTotal})` });
        if (watchedTotal > 0) {
            list.push({ id: 'FILTER_WATCHED', label: `▶️ Rekaman (${watchedTotal})` });
        }

        return list;
    }, [bootcampSessions, customPhases]);

    // Filter sessions
    const filteredSessions = useMemo(() => {
        return bootcampSessions.filter((s) => {
            let matchesPhase = true;
            if (phaseFilter === 'ALL') {
                matchesPhase = true;
            } else if (phaseFilter === 'FILTER_ATTENDED') {
                matchesPhase = s.attendance_status === 'ATTENDED';
            } else if (phaseFilter === 'FILTER_SCHEDULED') {
                matchesPhase = s.attendance_status === 'SCHEDULED';
            } else if (phaseFilter === 'FILTER_WATCHED') {
                matchesPhase = s.attendance_status === 'WATCHED_RECORDING';
            } else {
                matchesPhase = s.phase === phaseFilter;
            }

            const matchesSearch =
                searchQuery === '' ||
                s.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (s.mentor_name && s.mentor_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                s.session_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (s.target_project && s.target_project.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesPhase && matchesSearch;
        });
    }, [bootcampSessions, phaseFilter, searchQuery]);

    // Chore schedule definition (Senin - Minggu)
    const choreSchedule = [
        { day: 'Senin', dow: 1, title: 'Kamar Tidur & Meja Kerja', desc: 'Rapikan kabel, lap meja kerja, ventilasi kasur', icon: 'ph-desktop' },
        { day: 'Selasa', dow: 2, title: 'Dapur & Area Kompor', desc: 'Bersihkan minyak kompor, lap kulkas & sink piring', icon: 'ph-cooking-pot' },
        { day: 'Rabu', dow: 3, title: 'Laundry Pakaian & Jemuran', desc: 'Cuci pakaian, jemur, lipat & rapikan lemari', icon: 'ph-t-shirt' },
        { day: 'Kamis', dow: 4, title: 'Kamar Mandi & Wastafel', desc: 'Sikat lantai, bersihkan kloset, wastafel & cermin', icon: 'ph-drop' },
        { day: 'Jumat', dow: 5, title: 'Deep Clean Mingguan', desc: 'Sapu langit-langit, bersihkan debu sudut tersembunyi', icon: 'ph-sparkle' },
        { day: 'Sabtu', dow: 6, title: 'Pel Lantai Seluruh Area', desc: 'Sapu & pel lantai kamar, ruang tengah & lorong', icon: 'ph-broom' },
        { day: 'Minggu', dow: 0, title: 'Ganti Sprei & Reset Ruangan', desc: 'Ganti sprei & sarung bantal, reset workstation esok', icon: 'ph-bed' },
    ];

    const currentDow = new Date().getDay();

    return (
        <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
            {/* Top Command Bar & Sub-navigation */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-black text-white">
                            SAFAHFLOW
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                            Bootcamp Mastery & Life Balance Hub
                        </span>
                    </div>
                    <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight mt-1">
                        Bootcamp Tracker & Command Center
                    </h2>
                </div>

                {/* Subtabs Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto custom-scroll shrink-0">
                    {[
                        { id: 'overview', label: 'Ikhtisar & Misi', icon: 'ph-squares-four' },
                        { id: 'projects', label: 'Proyek Portofolio', icon: 'ph-stack' },
                        { id: 'curriculum', label: 'Kurikulum Sesi', icon: 'ph-graduation-cap' },
                        { id: 'spiritual', label: 'Ibadah & Sunnah', icon: 'ph-moon-stars' },
                        { id: 'chores', label: 'Beres Rumah & Timer', icon: 'ph-broom' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSubTab(tab.id)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                                subTab === tab.id
                                    ? 'bg-black text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                            }`}
                        >
                            <i className={`ph-bold ${tab.icon}`}></i>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* TAB 1: OVERVIEW & DAILY MISSION */}
            {subTab === 'overview' && (
                <div className="space-y-6">
                    {/* Hero Banner Misi Hari Ini */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-100 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="space-y-2 max-w-2xl">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                                        MODE SEKOLAH HARI INI
                                    </span>
                                    <span className="text-xs font-mono font-bold text-neutral-500">
                                        {dailyForm.day_type === 'FULL_LAB'
                                            ? 'FULL LAB PRAKTIKUM'
                                            : dailyForm.day_type === 'LIVE_CLASS_NIGHT'
                                            ? 'LIVE CLASS MALAM'
                                            : dailyForm.day_type === 'DEEP_WORK'
                                            ? 'DEEP WORK CODING'
                                            : dailyForm.day_type === 'STUDY_LIGHT'
                                            ? 'STUDY LIGHT & REVIEW'
                                            : dailyForm.day_type === 'AUDIT_CLEAN'
                                            ? 'AUDIT & REFACTORING'
                                            : (dailyForm.day_type || 'FULL LAB PRAKTIKUM').replace(/_/g, ' ')}
                                    </span>
                                </div>
                                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                    {todayDailyLog?.key_output
                                        ? `Fokus Utama: ${todayDailyLog.key_output}`
                                        : 'Fokus Utama: Belajar & Praktikum Hari Ini'}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                                    {todayDailyLog?.error_and_solution ? (
                                        todayDailyLog.error_and_solution
                                    ) : nextLiveClass ? (
                                        <>
                                            Live terdekat adalah <strong>{nextLiveClass.session_name}: {nextLiveClass.topic}</strong> bersama <strong>{nextLiveClass.mentor_name || 'Mentor'}</strong> pada {nextLiveClass.day_name}, {nextLiveClass.scheduled_date} pukul {nextLiveClass.start_time} WIB.
                                            {nextUnattendedSession && nextUnattendedSession.session_number < nextLiveClass.session_number && (
                                                <span> Selesaikan catch-up Sesi #{nextUnattendedSession.session_number} sebelum kelas live dimulai.</span>
                                            )}
                                        </>
                                    ) : (
                                        'Jadwalkan blok 4 jam coding intensif untuk implementasi tugas praktikum, testing kode, serta penyelesaian milestone portofolio.'
                                    )}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                                <div className="text-center px-3 border-r border-slate-200">
                                    <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Progres DE</p>
                                    <p className="text-2xl font-display font-black text-slate-900 tabular-nums">
                                        {overallDeProgress}%
                                    </p>
                                </div>
                                <div className="text-center px-3 border-r border-slate-200">
                                    <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Sesi Lulus</p>
                                    <p className="text-2xl font-display font-black text-slate-900 tabular-nums">
                                        {safahFlowStats.attended_count}<span className="text-xs font-mono font-normal text-neutral-400">/{safahFlowStats.total_sessions || bootcampSessions.length}</span>
                                    </p>
                                </div>
                                <div className="text-center px-3">
                                    <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Ibadah</p>
                                    <p className="text-2xl font-display font-black text-slate-900 tabular-nums">
                                        {spiritualDoneCount}<span className="text-xs font-mono font-normal text-neutral-400">/{spiritualFields.length}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4 Small Tiles (AdminLTE style with Clean Minimal Look) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Tile 1: Status Kurikulum */}
                        <div
                            onClick={() => setSubTab('curriculum')}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-sm">
                                    <i className="ph-bold ph-graduation-cap"></i>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">KURIKULUM</span>
                            </div>
                            <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Kurikulum Sesi</p>
                            <p className="text-xl font-display font-black text-slate-900 mt-1 leading-tight">
                                {lastAttendedSession ? `Sesi ${lastAttendedSession.session_number} Lulus ✅` : (attendedSessions.length > 0 ? `${attendedSessions.length} Sesi Lulus ✅` : 'Belum Ada Sesi Lulus')}
                            </p>
                            <p className="text-[11px] text-amber-600 font-mono mt-1 font-bold truncate">
                                {nextUnattendedSession ? `⚡ Sesi #${nextUnattendedSession.session_number} Next` : '🎉 Semua Sesi Lulus!'}
                            </p>
                        </div>

                        {/* Tile 2: Live Class Terdekat */}
                        <div
                            onClick={() => setSubTab('curriculum')}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-rose-400 flex items-center justify-center text-lg shadow-sm">
                                    <i className="ph-bold ph-broadcast"></i>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest">LIVE NEXT</span>
                            </div>
                            <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Live Terdekat</p>
                            <p className="text-sm font-bold text-slate-900 mt-1 truncate leading-tight">
                                {nextLiveClass ? `${nextLiveClass.session_name}: ${nextLiveClass.topic}` : 'Belum ada jadwal'}
                            </p>
                            <p className="text-[11px] text-neutral-500 font-mono mt-1">
                                {nextLiveClass ? `${nextLiveClass.day_name}, ${nextLiveClass.scheduled_date} • ${nextLiveClass.start_time} WIB` : '-'}
                            </p>
                        </div>

                        {/* Tile 3: Ibadah Sunnah */}
                        <div
                            onClick={() => setSubTab('spiritual')}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-amber-400 flex items-center justify-center text-lg shadow-sm">
                                    <i className="ph-bold ph-moon-stars"></i>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">SPIRITUAL</span>
                            </div>
                            <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Ibadah Sunnah</p>
                            <p className="text-xl font-display font-black text-slate-900 mt-1 tabular-nums">
                                {spiritualDoneCount} / {spiritualFields.length} <span className="text-xs font-mono font-normal text-neutral-500">Tercapai</span>
                            </p>
                            <p className="text-[11px] text-neutral-500 font-mono mt-1 truncate">
                                {spiritualSummaryText}
                            </p>
                        </div>

                        {/* Tile 4: Fokus Rumah Tangga */}
                        <div
                            onClick={() => setSubTab('chores')}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:-translate-y-1 hover:border-slate-400 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-emerald-400 flex items-center justify-center text-lg shadow-sm">
                                    <i className="ph-bold ph-broom"></i>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">CHORES</span>
                            </div>
                            <p className="text-neutral-500 text-xs font-mono font-semibold uppercase tracking-wider">Fokus Rumah Hari Ini</p>
                            <p className="text-sm font-bold text-slate-900 mt-1 truncate leading-tight">
                                {todayChoreLog?.focus_area?.replace(/\(.*?\)/g, '').trim() || choreSchedule.find(c => c.dow === currentDow)?.title || 'Rutin Rumah Tangga'}
                            </p>
                            <p className="text-[11px] text-emerald-600 font-mono mt-1 font-bold">
                                {todayChoreLog?.morning_done && todayChoreLog?.evening_done ? '✅ Selesai Hari Ini' : '⏱️ Timer 25 Menit Siap'}
                            </p>
                        </div>
                    </div>

                    {/* Anti-Burnout Rule + Daily Log Reflection */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Interactive Anti-Burnout Golden Rule with Anime Cheer Sound & Custom Upload */}
                        <AntiBurnoutCard onToast={onToast} />

                        {/* Daily Log Quick Reflection Form */}
                        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                <div>
                                    <h4 className="font-display font-extrabold text-slate-900 text-base">
                                        Refleksi & Log Belajar Hari Ini
                                    </h4>
                                    <p className="text-[11px] font-mono text-neutral-400">
                                        Catat output rekayasa data & error yang berhasil diselesaikan
                                    </p>
                                </div>
                                <span className="text-xs font-mono font-bold text-neutral-500">
                                    {todayDailyLog?.log_date}
                                </span>
                            </div>

                            <form onSubmit={handleSaveDailyLog} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Mode Hari Ini
                                        </label>
                                        <select
                                            value={dailyForm.day_type}
                                            onChange={(e) => setDailyForm({ ...dailyForm, day_type: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                        >
                                            <option value="FULL_LAB">FULL LAB PRAKTIKUM</option>
                                            <option value="LIVE_CLASS_NIGHT">LIVE CLASS MALAM</option>
                                            <option value="DEEP_WORK">DEEP WORK CODING</option>
                                            <option value="STUDY_LIGHT">STUDY LIGHT & REVIEW</option>
                                            <option value="AUDIT_CLEAN">AUDIT & REFACTORING</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Waktu Belajar (Menit)
                                        </label>
                                        <input
                                            type="number"
                                            value={dailyForm.effective_study_minutes}
                                            onChange={(e) => setDailyForm({ ...dailyForm, effective_study_minutes: parseInt(e.target.value) || 0 })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Git Commit Hash
                                        </label>
                                        <input
                                            type="text"
                                            value={dailyForm.git_commit_hash}
                                            onChange={(e) => setDailyForm({ ...dailyForm, git_commit_hash: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all font-mono"
                                            placeholder="Contoh: f318af6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Key Output / Capaian Teknis Hari Ini
                                    </label>
                                    <input
                                        type="text"
                                        value={dailyForm.key_output}
                                        onChange={(e) => setDailyForm({ ...dailyForm, key_output: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                        placeholder="Contoh: Menyelesaikan DAG Airflow ingestion Bronze & Gold Mart"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Tantangan Error & Solusi
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={dailyForm.error_and_solution}
                                        onChange={(e) => setDailyForm({ ...dailyForm, error_and_solution: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all resize-none"
                                        placeholder="Contoh: Issue memory leak pada PySpark partition, teratasi dengan repartitioning dan tuning broadcast join."
                                    />
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={savingDaily}
                                        className="px-5 py-2.5 rounded-2xl bg-black text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                                    >
                                        {savingDaily ? 'Menyimpan...' : 'Simpan Log Harian'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: PORTFOLIO PROJECTS */}
            {subTab === 'projects' && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-display font-black text-xl text-slate-900">
                                Proyek Portofolio & Praktikum
                            </h3>
                            <p className="text-xs text-slate-500 font-sans">
                                Pelacakan deliverables proyek, capstone, dan target capaian pekanan.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-3.5 py-2 bg-slate-100 rounded-2xl text-xs font-mono font-bold text-slate-800 shrink-0">
                                Progres Agregat: {overallDeProgress}%
                            </div>
                            <button
                                onClick={() => onAddProject && onAddProject()}
                                className="px-4 py-2 rounded-2xl bg-black text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
                            >
                                <i className="ph-bold ph-plus"></i>
                                <span>Tambah Proyek</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {deProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
                            >
                                <div className="space-y-4">
                                    {/* Top Metadata */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-black text-white">
                                                    BOBOT {project.weight_percentage}%
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                                    project.status === 'COMPLETED'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : project.status === 'IN_PROGRESS'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <h4 className="font-display font-black text-lg text-slate-900 leading-tight">
                                                {project.name}
                                            </h4>
                                        </div>

                                        {/* Project Actions (Edit & Delete) */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => onEditProject && onEditProject(project)}
                                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
                                                title="Edit Proyek"
                                            >
                                                <i className="ph-bold ph-pencil-simple"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project)}
                                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
                                                title="Hapus Proyek"
                                            >
                                                <i className="ph-bold ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="space-y-1.5 pt-2">
                                        <div className="flex justify-between text-xs font-mono font-bold">
                                            <span className="text-slate-500">Progress Milestone</span>
                                            <span className="text-slate-900 tabular-nums">{project.progress_percentage}%</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-black rounded-full transition-all duration-500"
                                                style={{ width: `${project.progress_percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Milestones List */}
                                    <div className="pt-3 border-t border-slate-100 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                                                Daftar Deliverable Milestone ({project.milestones.length})
                                            </span>
                                            <button
                                                onClick={() => onAddMilestone && onAddMilestone(project)}
                                                className="text-[11px] font-mono font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
                                            >
                                                <i className="ph-bold ph-plus"></i> Tambah
                                            </button>
                                        </div>

                                        <div className="space-y-2 max-h-64 overflow-y-auto custom-scroll pr-1">
                                            {project.milestones.map((m) => (
                                                <div
                                                    key={m.id}
                                                    className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                                                        m.is_completed
                                                            ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
                                                            : 'bg-white border-slate-200 shadow-2xs'
                                                    }`}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleMilestone(m)}
                                                        className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                                                            m.is_completed
                                                                ? 'bg-black border-black text-white'
                                                                : 'border-slate-300 hover:border-slate-500 bg-white'
                                                        }`}
                                                    >
                                                        {m.is_completed && <i className="ph-bold ph-check text-xs"></i>}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-mono font-bold text-neutral-400">
                                                                W{m.week_number}
                                                            </span>
                                                            <p className={`text-xs font-semibold truncate ${
                                                                m.is_completed ? 'line-through text-slate-400' : 'text-slate-900'
                                                            }`}>
                                                                {m.title}
                                                            </p>
                                                        </div>
                                                        {m.description && (
                                                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                                                {m.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteMilestone(m)}
                                                        className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                                                        title="Hapus milestone"
                                                    >
                                                        <i className="ph-bold ph-trash text-xs"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 3: 36 SESSIONS CURRICULUM */}
            {subTab === 'curriculum' && (
                <div className="space-y-6">
                    {/* Header & Controls */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-display font-black text-xl text-slate-900">
                                    Kurikulum & Sesi Belajar Bootcamp
                                </h3>
                                <p className="text-xs text-slate-500 font-sans">
                                    Tracking materi, jadwal live class, mentor, dan status kehadiran sesi belajar.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                <span className="px-3.5 py-2 rounded-2xl bg-slate-100 text-xs font-mono font-bold text-slate-800 shrink-0">
                                    Lulus: {safahFlowStats.attended_count} / {bootcampSessions.length} Sesi ({safahFlowStats.progress_pct}%)
                                </span>
                                <button
                                    onClick={() => setIsPhaseModalOpen(true)}
                                    className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
                                    title="Edit Kategori & Pilihan Slider"
                                >
                                    <i className="ph-bold ph-sliders"></i>
                                    <span>Edit Kategori Slider</span>
                                </button>
                                <button
                                    onClick={() => onAddSession && onAddSession()}
                                    className="px-4 py-2 rounded-2xl bg-black text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
                                >
                                    <i className="ph-bold ph-plus"></i>
                                    <span>Tambah Sesi</span>
                                </button>
                            </div>
                        </div>

                        {/* Search & Phase Filter */}
                        <div className="flex flex-col md:flex-row gap-3 pt-2 border-t border-slate-100">
                            <div className="relative flex-1">
                                <i className="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari topik materi, mentor (Mas Bayuzen, Bachtiyar, Yuli, Wulan)..."
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-1.5 overflow-x-auto custom-scroll pb-1 max-w-full">
                                {dynamicPhaseFilters.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setPhaseFilter(p.id)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                                            phaseFilter === p.id
                                                ? 'bg-black text-white shadow-xs'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sessions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSessions.map((session) => {
                            const isAttended = session.attendance_status === 'ATTENDED';
                            const isWatched = session.attendance_status === 'WATCHED_RECORDING';
                            const isCatchUp = !isAttended && !isWatched && nextLiveClass && session.session_number < nextLiveClass.session_number;
                            const isLiveNext = nextLiveClass && nextLiveClass.session_number === session.session_number;

                            return (
                                <div
                                    key={session.id}
                                    className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col justify-between transition-all hover:border-slate-400 ${
                                        isLiveNext
                                            ? 'ring-2 ring-black border-transparent shadow-md'
                                            : isCatchUp
                                            ? 'border-amber-300 bg-amber-50/20'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <div className="space-y-3">
                                        {/* Badges */}
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-7 h-7 rounded-xl bg-black text-white text-xs font-mono font-black flex items-center justify-center">
                                                    #{session.session_number}
                                                </span>
                                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                                                    {session.phase.replace('_', ' ')}
                                                </span>
                                            </div>

                                            <div>
                                                {isAttended && (
                                                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                                                        SELESAI 🌸
                                                    </span>
                                                )}
                                                {isWatched && (
                                                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                                                        REKAMAN 📺
                                                    </span>
                                                )}
                                                {isCatchUp && !isWatched && (
                                                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                                                        CATCH-UP ⚡
                                                    </span>
                                                )}
                                                {!isAttended && !isWatched && !isCatchUp && (
                                                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-100 text-slate-600">
                                                        TERJADWAL
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Topic */}
                                        <div>
                                            <h4 className="font-display font-extrabold text-slate-900 text-sm leading-snug">
                                                {session.topic}
                                            </h4>
                                            {session.target_project && (
                                                <p className="text-[11px] font-mono text-neutral-400 mt-1">
                                                    Target: <span className="text-slate-700 font-bold">{session.target_project}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Schedule Info */}
                                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] font-mono space-y-1">
                                            <div className="flex items-center justify-between text-slate-600">
                                                <span><i className="ph-bold ph-calendar-blank mr-1"></i> {session.day_name}, {session.scheduled_date}</span>
                                                <span className="font-bold">{session.start_time} WIB</span>
                                            </div>
                                            {session.mentor_name && (
                                                <div className="text-slate-500 truncate">
                                                    <i className="ph-bold ph-user mr-1"></i> {session.mentor_name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
                                        <button
                                            onClick={() => handleToggleSession(session)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                                                isAttended
                                                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                    : 'bg-black text-white hover:bg-slate-800'
                                            }`}
                                        >
                                            <i className={`ph-bold ${isAttended ? 'ph-check-circle' : 'ph-circle'}`}></i>
                                            <span>{isAttended ? 'Hadir' : 'Tandai Hadir'}</span>
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {session.zoom_url && (
                                                <a
                                                    href={session.zoom_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 flex items-center justify-center text-sm transition-colors"
                                                    title="Buka Zoom"
                                                >
                                                    <i className="ph-bold ph-video-camera"></i>
                                                </a>
                                            )}
                                            {session.recording_url && (
                                                <a
                                                    href={session.recording_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 flex items-center justify-center text-sm transition-colors"
                                                    title="Buka Rekaman"
                                                >
                                                    <i className="ph-bold ph-play"></i>
                                                </a>
                                            )}
                                            <button
                                                onClick={() => onEditSession && onEditSession(session)}
                                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
                                                title="Edit Link & Data Sesi"
                                            >
                                                <i className="ph-bold ph-pencil-simple"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSession(session)}
                                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
                                                title="Hapus Sesi"
                                            >
                                                <i className="ph-bold ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* TAB 4: SPIRITUAL & SUNNAH */}
            {subTab === 'spiritual' && (
                <div className="space-y-6">
                    {/* Official Kemenag Prayer Times Widget with Configurable City */}
                    <PrayerScheduleWidget onToast={onToast} />

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-display font-black text-xl text-slate-900">
                                Komitmen Ibadah & Doa Sunnah Tetap
                            </h3>
                            <p className="text-xs text-slate-500 font-sans">
                                Menjaga keseimbangan spiritual & ketenangan batin sebagai fondasi hidup dan ketajaman rekayasa data.
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-slate-100 rounded-2xl text-xs font-mono font-bold text-slate-800 shrink-0">
                            Capaian Hari Ini: {spiritualDoneCount} / 7 Amalan
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {spiritualFields.map((field) => {
                            const isDone = todaySpiritualLog && todaySpiritualLog[field.id];
                            return (
                                <div
                                    key={field.id}
                                    onClick={() => handleToggleSpiritual(field.id)}
                                    className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                                        isDone
                                            ? 'bg-slate-50/80 border-slate-300'
                                            : 'bg-white border-slate-200 hover:border-slate-400 shadow-xs'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${
                                            isDone
                                                ? 'bg-black text-white'
                                                : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                                        }`}>
                                            <i className={`ph-bold ${field.icon}`}></i>
                                        </div>
                                        <div>
                                            <p className={`font-display font-bold text-sm ${
                                                isDone ? 'text-slate-900' : 'text-slate-800'
                                            }`}>
                                                {field.label}
                                            </p>
                                            {field.note && (
                                                <span className="text-[10px] font-mono font-bold text-amber-600">
                                                    {field.note}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-all ${
                                        isDone
                                            ? 'bg-black border-black text-white'
                                            : 'border-slate-300 group-hover:border-slate-500 bg-white'
                                    }`}>
                                        {isDone && <i className="ph-bold ph-check text-xs"></i>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* TAB 5: CHORES & 25-MIN POMODORO */}
            {subTab === 'chores' && (
                <div className="space-y-6">
                    {/* Pomodoro Timer 25 Min Box */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs text-center relative overflow-hidden">
                        <div className="max-w-md mx-auto space-y-4">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                                POMODORO BERSIH-BERSIH RUMAH TANGGA
                            </span>
                            <h3 className="font-display font-black text-2xl text-slate-900">
                                Timer 25 Menit Stay-at-Home
                            </h3>
                            <p className="text-xs text-slate-500">
                                Bereskan satu fokus ruangan secara cepat dan terarah sebelum melanjutkan sesi coding intensif.
                            </p>

                            {/* Digits Display */}
                            <div className="text-6xl sm:text-7xl font-display font-black tracking-tight text-slate-900 tabular-nums py-2">
                                {formatTimer(timerSeconds)}
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-3 pt-2">
                                <button
                                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                                    className="px-6 py-3 rounded-2xl bg-black text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                                >
                                    <i className={`ph-bold ${isTimerRunning ? 'ph-pause' : 'ph-play'}`}></i>
                                    <span>{isTimerRunning ? 'Jeda' : 'Mulai 25m'}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsTimerRunning(false);
                                        setTimerSeconds(25 * 60);
                                    }}
                                    className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                                >
                                    Reset
                                </button>
                            </div>

                            <p className="text-[11px] font-mono text-neutral-400">
                                Total waktu tercatat hari ini: <span className="font-bold text-slate-800">{todayChoreLog?.timer_minutes || 0} Menit</span>
                            </p>
                        </div>
                    </div>

                    {/* Today's Chore Checklist */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h4 className="font-display font-black text-lg text-slate-900">
                                    Checklist Tugas Kebersihan Hari Ini
                                </h4>
                                <p className="text-xs text-slate-500">
                                    {todayChoreLog?.focus_area}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: 'morning_done', label: 'Sesi Pagi (15-25m)', desc: 'Rapikan & bersihkan debu' },
                                { id: 'evening_done', label: 'Sesi Sore / Malam', desc: 'Cuci piring & buang sampah' },
                                { id: 'weekly_deep_done', label: 'Weekly Deep Clean', desc: 'Sikat tuntas sudut ruangan' },
                            ].map((task) => {
                                const isDone = todayChoreLog && todayChoreLog[task.id];
                                return (
                                    <div
                                        key={task.id}
                                        onClick={() => handleToggleChore(task.id)}
                                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 active:scale-95 ${
                                            isDone ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200 hover:border-slate-400'
                                        }`}
                                    >
                                        <div className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                                            isDone ? 'bg-black border-black text-white' : 'border-slate-300 bg-white'
                                        }`}>
                                            {isDone && <i className="ph-bold ph-check text-xs"></i>}
                                        </div>
                                        <div>
                                            <p className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                                {task.label}
                                            </p>
                                            <p className="text-[10px] text-slate-500 mt-0.5">{task.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Weekly Schedule Rotation Table */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                        <h4 className="font-display font-black text-lg text-slate-900">
                            Jadwal Rotasi Fokus Harian (Senin — Minggu)
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {choreSchedule.map((item) => {
                                const isToday = currentDow === item.dow;
                                return (
                                    <div
                                        key={item.day}
                                        className={`p-4 rounded-2xl border transition-all ${
                                            isToday
                                                ? 'border-black bg-slate-50 shadow-sm ring-1 ring-black'
                                                : 'border-slate-200 bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                                                {item.day}
                                            </span>
                                            {isToday && (
                                                <span className="px-2 py-0.5 rounded-full bg-black text-white text-[9px] font-mono font-bold">
                                                    HARI INI
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-bold text-slate-900 leading-tight">
                                            {item.title}
                                        </p>
                                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal to manage & edit curriculum slider categories dynamically */}
            <PhaseManagerModal
                open={isPhaseModalOpen}
                onClose={() => setIsPhaseModalOpen(false)}
                currentPhases={customPhases}
                sessionPhases={bootcampSessions.map((s) => s.phase)}
                onSavePhases={(updated) => {
                    setCustomPhases(updated);
                    try {
                        localStorage.setItem('safahflow_custom_phases', JSON.stringify(updated));
                    } catch (e) {
                        console.error(e);
                    }
                }}
                onToast={onToast}
            />
        </div>
    );
}
