import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';

// Layout Components
import Sidebar from '@/Components/Layout/Sidebar';
import Header from '@/Components/Layout/Header';
import MobileBottomNav from '@/Components/Layout/MobileBottomNav';
import ToastContainer from '@/Components/Layout/ToastContainer';

// View Components
import WaifuBanner from '@/Components/Dashboard/WaifuBanner';
import StatCards from '@/Components/Dashboard/StatCards';
import MiniPriorities from '@/Components/Dashboard/MiniPriorities';
import WeeklySleepChart from '@/Components/Dashboard/WeeklySleepChart';
import KanbanBoard from '@/Components/Kanban/KanbanBoard';
import LearningJournalView from '@/Components/Learning/LearningJournalView';
import SpiritualView from '@/Components/Spiritual/SpiritualView';
import WellbeingView from '@/Components/Wellbeing/WellbeingView';
import PortfolioManagerView from '@/Components/PortfolioManager/PortfolioManagerView';

// Modal Components
import TaskModal from '@/Components/Modals/TaskModal';
import PortfolioModal from '@/Components/Modals/PortfolioModal';
import CertificationModal from '@/Components/Modals/CertificationModal';
import FaqModal from '@/Components/Modals/FaqModal';
import FreelanceProjectModal from '@/Components/Modals/FreelanceProjectModal';
import JournalModal from '@/Components/Modals/JournalModal';
import ReadJournalModal from '@/Components/Modals/ReadJournalModal';
import KajianModal from '@/Components/Modals/KajianModal';
import ReadNoteModal from '@/Components/Modals/ReadNoteModal';
import SleepModal from '@/Components/Modals/SleepModal';
import RefreshingModal from '@/Components/Modals/RefreshingModal';
import ConfirmDeleteModal from '@/Components/Modals/ConfirmDeleteModal';
import SplashScreenModal from '@/Components/Modals/SplashScreenModal';

// Utils
import { toInputDateFormat, isDoneToday } from '@/Utils/dateHelpers';

export default function Dashboard({
    projects = { todo: [], inProgress: [], done: [] },
    activeTasksCount = 0,
    journals = [],
    journalCount = 0,
    upcomingKajians = [],
    nearestKajian = null,
    kajianNotes = [],
    chartLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    chartSleepData = [6.5, 7.2, 5.8, 6.0, 7.5, 8.1, 7.0],
    avgSleep = 6.5,
    sleepDebt = -7.0,
    refreshingActivities = [],
    certifications = [],
    faqs = [],
    freelanceProjects = [],
}) {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Admin User', email: 'admin@personalhub.test' };

    // Navigation state
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [currentDate, setCurrentDate] = useState('');

    // Waifu Link state
    const [waifuImage, setWaifuImage] = useState(
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop'
    );
    const [isFetchingImage, setIsFetchingImage] = useState(false);
    const [feedId, setFeedId] = useState(7421);

    // First Login Welcome Splash Screen
    const [showSplash, setShowSplash] = useState(() => {
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem('safah_splash_shown');
        }
        return true;
    });

    const handleCloseSplash = () => {
        setShowSplash(false);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('safah_splash_shown', 'true');
        }
    };

    // Global Toasts
    const [toasts, setToasts] = useState([]);
    const addToast = (message, type = 'success') => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    // Modal States
    const [taskModal, setTaskModal] = useState({
        open: false,
        isEdit: false,
        form: { id: null, title: '', description: '', status: 'todo', tag: 'Backend', priority: 'medium', date_label: 'Hari Ini' },
    });

    const [portfolioModal, setPortfolioModal] = useState({
        open: false,
        taskId: null,
        form: { is_portfolio: true, portfolio_summary: '', tech_stack: '', github_url: '', live_url: '', button_display_mode: 'both' },
    });

    const [certificationModal, setCertificationModal] = useState({
        open: false,
        cert: null,
    });

    const [freelanceModal, setFreelanceModal] = useState({
        open: false,
        project: null,
    });

    const [faqModal, setFaqModal] = useState({
        open: false,
        faq: null,
    });

    const [journalModal, setJournalModal] = useState({
        open: false,
        isEdit: false,
        form: { id: null, title: '', category: 'Data Engineering', study_date: new Date().toISOString().split('T')[0], tags: '', content: '' },
    });

    const [readJournalModal, setReadJournalModal] = useState({
        open: false,
        journal: null,
    });

    const [kajianModal, setKajianModal] = useState({
        open: false,
        form: { title: '', speaker: '', event_date: new Date().toISOString().split('T')[0], time_info: '09:00 WIB', location: 'Masjid', notes: '' },
    });

    const [readNoteModal, setReadNoteModal] = useState({
        open: false,
        note: null,
    });

    const [sleepModal, setSleepModal] = useState({
        open: false,
        form: { sleep_date: new Date().toISOString().split('T')[0], duration_hours: 7.5, quality: 'Sangat Baik' },
    });

    const [refreshingModal, setRefreshingModal] = useState({
        open: false,
        form: { title: '', category: 'Gaming', icon: 'ph-game-controller', color: 'emerald' },
    });

    // Confirm Delete Modal State
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        type: 'task', // 'task' | 'journal' | 'kajian' | 'refreshing' | 'cert' | 'faq'
        id: null,
        itemName: '',
        title: 'Hapus Item Ini?',
        isDeleting: false,
    });

    // Navigation definitions
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', labelMobile: 'Home', icon: 'ph-bold ph-squares-four' },
        { id: 'projects', label: 'Projects & Kanban', labelMobile: 'Tasks', icon: 'ph-bold ph-kanban' },
        { id: 'portfolio_manager', label: 'Portfolio Content', labelMobile: 'Porto', icon: 'ph-bold ph-certificate' },
        { id: 'learning', label: 'Learning Journal', labelMobile: 'Learn', icon: 'ph-bold ph-notebook' },
        { id: 'spiritual', label: 'Spiritual & Kajian', labelMobile: 'Spirit', icon: 'ph-bold ph-mosque' },
        { id: 'wellbeing', label: 'Wellbeing & Balance', labelMobile: 'Health', icon: 'ph-bold ph-heartbeat' },
    ];

    // Realtime Clock & Date
    useEffect(() => {
        const update = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('id-ID', { hour12: false }));
            setCurrentDate(
                now.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            );
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    // Waifu API Fetch
    const fetchWaifu = async () => {
        if (isFetchingImage) return;
        setIsFetchingImage(true);
        setFeedId(Math.floor(Math.random() * 9000) + 1000);
        try {
            const res = await fetch('https://nekos.best/api/v2/waifu');
            const data = await res.json();
            if (data?.results?.length > 0) {
                const img = new Image();
                img.onload = () => {
                    setWaifuImage(data.results[0].url);
                    setIsFetchingImage(false);
                };
                img.src = data.results[0].url;
            }
        } catch (e) {
            setWaifuImage('https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop');
            setIsFetchingImage(false);
        }
    };

    useEffect(() => {
        fetchWaifu();
    }, []);

    // Quick Add trigger
    const handleQuickAdd = () => {
        if (currentTab === 'portfolio_manager') {
            setCertificationModal({
                open: true,
                cert: null,
            });
        } else if (currentTab === 'learning') {
            setJournalModal({
                open: true,
                isEdit: false,
                form: { id: null, title: '', category: 'Data Engineering', study_date: new Date().toISOString().split('T')[0], tags: '', content: '' },
            });
        } else if (currentTab === 'spiritual') {
            setKajianModal({
                open: true,
                form: { title: '', speaker: '', event_date: new Date().toISOString().split('T')[0], time_info: '09:00 WIB', location: 'Masjid', notes: '' },
            });
        } else if (currentTab === 'wellbeing') {
            setSleepModal({
                open: true,
                form: { sleep_date: new Date().toISOString().split('T')[0], duration_hours: 7.5, quality: 'Sangat Baik' },
            });
        } else {
            setTaskModal({
                open: true,
                isEdit: false,
                form: { id: null, title: '', description: '', status: 'todo', tag: 'Backend', priority: 'medium', date_label: 'Hari Ini' },
            });
        }
    };

    // Task Handlers
    const saveTask = (e) => {
        e.preventDefault();
        const url = taskModal.isEdit ? `/tasks/${taskModal.form.id}` : '/tasks';
        const method = taskModal.isEdit ? 'put' : 'post';

        router[method](url, taskModal.form, {
            preserveScroll: true,
            onSuccess: () => {
                setTaskModal((prev) => ({ ...prev, open: false }));
                addToast(taskModal.isEdit ? 'Task berhasil diperbarui.' : 'Task berhasil ditambahkan.');
            },
        });
    };

    const moveTaskStatus = (task, newStatus) => {
        router.post(
            `/tasks/${task.id}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => addToast(`Tugas dipindahkan ke ${newStatus.replace('_', ' ').toUpperCase()}!`),
            }
        );
    };

    const confirmDeleteTask = (taskId) => {
        const allTasks = [...projects.todo, ...projects.inProgress, ...projects.done];
        const target = allTasks.find((t) => t.id === taskId);
        setDeleteModal({
            open: true,
            type: 'task',
            id: taskId,
            itemName: target?.title || 'Tugas ini',
            title: 'Hapus Tugas Kanban?',
            isDeleting: false,
        });
    };

    const savePortfolio = (e) => {
        e.preventDefault();
        router.post(`/tasks/${portfolioModal.taskId}/portfolio`, portfolioModal.form, {
            preserveScroll: true,
            onSuccess: () => {
                setPortfolioModal((prev) => ({ ...prev, open: false }));
                addToast('Status portofolio berhasil diperbarui.');
            },
        });
    };

    // Journal Handlers
    const saveJournal = (e) => {
        e.preventDefault();
        const url = journalModal.isEdit ? `/journals/${journalModal.form.id}` : '/journals';
        const method = journalModal.isEdit ? 'put' : 'post';

        router[method](url, journalModal.form, {
            preserveScroll: true,
            onSuccess: () => {
                setJournalModal((prev) => ({ ...prev, open: false }));
                addToast('Entri jurnal berhasil disimpan.');
            },
        });
    };

    const confirmDeleteJournal = (id) => {
        const target = journals.find((j) => j.id === id);
        setDeleteModal({
            open: true,
            type: 'journal',
            id: id,
            itemName: target?.title || 'Jurnal ini',
            title: 'Hapus Entri Jurnal Belajar?',
            isDeleting: false,
        });
    };

    // Kajian Handlers
    const saveKajian = (e) => {
        e.preventDefault();
        router.post('/kajian', kajianModal.form, {
            preserveScroll: true,
            onSuccess: () => {
                setKajianModal((prev) => ({ ...prev, open: false }));
                addToast('Jadwal / Catatan kajian berhasil disimpan.');
            },
        });
    };

    const confirmDeleteKajian = (id) => {
        const allKajians = [...upcomingKajians, ...kajianNotes];
        const target = allKajians.find((k) => k.id === id);
        setDeleteModal({
            open: true,
            type: 'kajian',
            id: id,
            itemName: target?.title || 'Kajian ini',
            title: 'Hapus Data Kajian?',
            isDeleting: false,
        });
    };

    // Sleep Handlers
    const saveSleep = (e, customPayload = null) => {
        if (e && e.preventDefault) e.preventDefault();
        const payload = customPayload || sleepModal.form;
        router.post('/wellbeing/sleep', payload, {
            preserveScroll: true,
            onSuccess: () => {
                addToast('Log tidur & Sleep Score berhasil disimpan.');
            },
        });
    };

    // Refreshing Handlers
    const saveRefreshing = (e) => {
        e.preventDefault();
        router.post('/wellbeing/refreshing', refreshingModal.form, {
            preserveScroll: true,
            onSuccess: () => {
                setRefreshingModal((prev) => ({ ...prev, open: false }));
                addToast('Aktivitas refreshing baru ditambahkan.');
            },
        });
    };

    const markRefreshingDone = (activity) => {
        const alreadyDone = isDoneToday(activity.last_done_date);
        router.post(
            `/wellbeing/refreshing/${activity.id}/done`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (alreadyDone) {
                        addToast('Status aktivitas dikembalikan ke belum selesai.');
                    } else {
                        addToast('Aktivitas ditandai selesai hari ini! 🎉');
                    }
                },
            }
        );
    };

    const confirmDeleteRefreshing = (id) => {
        const target = refreshingActivities.find((r) => r.id === id);
        setDeleteModal({
            open: true,
            type: 'refreshing',
            id: id,
            itemName: target?.title || 'Aktivitas ini',
            title: 'Hapus Aktivitas Refreshing?',
            isDeleting: false,
        });
    };

    const confirmDeleteCert = (cert) => {
        setDeleteModal({
            open: true,
            type: 'cert',
            id: cert.id,
            itemName: cert.title || 'Kredensial ini',
            title: 'Hapus Kredensial Sertifikasi?',
            isDeleting: false,
        });
    };

    const confirmDeleteFreelance = (project) => {
        setDeleteModal({
            open: true,
            type: 'freelance',
            id: project.id,
            itemName: project.title || 'Proyek freelance ini',
            title: 'Hapus Proyek Freelance?',
            isDeleting: false,
        });
    };

    const confirmDeleteFaq = (faq) => {
        setDeleteModal({
            open: true,
            type: 'faq',
            id: faq.id,
            itemName: faq.question || 'Pertanyaan FAQ ini',
            title: 'Hapus Pertanyaan FAQ?',
            isDeleting: false,
        });
    };

    // Execute Delete Confirmation
    const handleExecuteDelete = () => {
        setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

        const urlMap = {
            task: `/tasks/${deleteModal.id}`,
            journal: `/journals/${deleteModal.id}`,
            kajian: `/kajian/${deleteModal.id}`,
            refreshing: `/wellbeing/refreshing/${deleteModal.id}`,
            cert: `/certifications/${deleteModal.id}`,
            freelance: `/freelance-projects/${deleteModal.id}`,
            faq: `/faqs/${deleteModal.id}`,
        };

        const successMsgMap = {
            task: 'Tugas berhasil dihapus.',
            journal: 'Jurnal belajar berhasil dihapus.',
            kajian: 'Data kajian berhasil dihapus.',
            refreshing: 'Aktivitas refreshing berhasil dihapus.',
            cert: 'Kredensial sertifikasi berhasil dihapus.',
            freelance: 'Proyek freelance berhasil dihapus.',
            faq: 'FAQ berhasil dihapus.',
        };

        router.delete(urlMap[deleteModal.type], {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModal({ open: false, type: 'task', id: null, itemName: '', title: '', isDeleting: false });
                addToast(successMsgMap[deleteModal.type]);
            },
            onError: () => {
                setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
                addToast('Gagal menghapus data.', 'error');
            },
        });
    };

    return (
        <div className="flex h-screen overflow-hidden font-sans">
            <Head title="Workspace Dashboard - Personal Hub" />

            {/* Global Toasts */}
            <ToastContainer toasts={toasts} />

            {/* Desktop Sidebar */}
            <Sidebar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                navItems={navItems}
                user={user}
            />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 min-w-0 relative bg-slate-100/60 overflow-hidden">
                {/* Header for Mobile & Desktop */}
                <Header
                    currentTab={currentTab}
                    navItems={navItems}
                    currentDate={currentDate}
                    onQuickAdd={handleQuickAdd}
                />

                {/* Viewport Scroll Container */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 md:p-8 pb-28 md:pb-10 custom-scroll">
                    
                    {/* TAB: DASHBOARD */}
                    {currentTab === 'dashboard' && (
                        <div className="space-y-6 max-w-7xl mx-auto">
                            <WaifuBanner
                                currentTime={currentTime}
                                projectsCount={projects.todo.length}
                                waifuImage={waifuImage}
                                isFetchingImage={isFetchingImage}
                                feedId={feedId}
                                onFetchWaifu={fetchWaifu}
                                onOpenTerminal={() => setCurrentTab('projects')}
                            />

                            <StatCards
                                activeTasksCount={activeTasksCount}
                                journalCount={journalCount}
                                nearestKajian={nearestKajian}
                                avgSleep={avgSleep}
                                onTabChange={setCurrentTab}
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <MiniPriorities
                                    todoTasks={projects.todo}
                                    onCompleteTask={(task) => moveTaskStatus(task, 'done')}
                                    onEditTask={(task) => setTaskModal({ open: true, isEdit: true, form: { ...task } })}
                                    onAddNewTask={() => setTaskModal({ open: true, isEdit: false, form: { id: null, title: '', description: '', status: 'todo', tag: 'Backend', priority: 'medium', date_label: 'Hari Ini' } })}
                                    onViewAllTasks={() => setCurrentTab('projects')}
                                />

                                <WeeklySleepChart
                                    chartLabels={chartLabels}
                                    chartSleepData={chartSleepData}
                                    onViewDetail={() => setCurrentTab('wellbeing')}
                                />
                            </div>
                        </div>
                    )}

                    {/* TAB: PROJECTS (KANBAN) */}
                    {currentTab === 'projects' && (
                        <KanbanBoard
                            projects={projects}
                            onAddNewTask={(colStatus) => setTaskModal({ open: true, isEdit: false, form: { id: null, title: '', description: '', status: colStatus || 'todo', tag: 'Backend', priority: 'medium', date_label: 'Hari Ini' } })}
                            onEditTask={(task) => setTaskModal({ open: true, isEdit: true, form: { ...task } })}
                            onDeleteTask={confirmDeleteTask}
                            onMoveStatus={moveTaskStatus}
                            onOpenPortfolio={(task) =>
                                setPortfolioModal({
                                    open: true,
                                    taskId: task.id,
                                    form: {
                                        is_portfolio: task.is_portfolio ? true : true,
                                        portfolio_summary: task.portfolio_summary || task.description || '',
                                        tech_stack: Array.isArray(task.tech_stack) ? task.tech_stack.join(', ') : task.tech_stack || '',
                                        github_url: task.github_url || '',
                                        live_url: task.live_url || '',
                                        button_display_mode: task.button_display_mode || 'both',
                                    },
                                })
                            }
                        />
                    )}

                    {/* TAB: PORTFOLIO CONTENT CMS */}
                    {currentTab === 'portfolio_manager' && (
                        <PortfolioManagerView
                            certifications={certifications}
                            freelanceProjects={freelanceProjects}
                            faqs={faqs}
                            onAddCert={() => setCertificationModal({ open: true, cert: null })}
                            onEditCert={(cert) => setCertificationModal({ open: true, cert })}
                            onDeleteCert={confirmDeleteCert}
                            onAddFreelance={() => setFreelanceModal({ open: true, project: null })}
                            onEditFreelance={(project) => setFreelanceModal({ open: true, project })}
                            onDeleteFreelance={confirmDeleteFreelance}
                            onAddFaq={() => setFaqModal({ open: true, faq: null })}
                            onEditFaq={(faq) => setFaqModal({ open: true, faq })}
                            onDeleteFaq={confirmDeleteFaq}
                        />
                    )}

                    {/* TAB: LEARNING JOURNAL */}
                    {currentTab === 'learning' && (
                        <LearningJournalView
                            journals={journals}
                            onAddNewJournal={() =>
                                setJournalModal({
                                    open: true,
                                    isEdit: false,
                                    form: { id: null, title: '', category: 'Data Engineering', study_date: new Date().toISOString().split('T')[0], tags: '', content: '' },
                                })
                            }
                            onEditJournal={(journal) =>
                                setJournalModal({
                                    open: true,
                                    isEdit: true,
                                    form: {
                                        id: journal.id,
                                        title: journal.title,
                                        category: journal.category,
                                        study_date: toInputDateFormat(journal.study_date),
                                        tags: Array.isArray(journal.tags) ? journal.tags.join(', ') : journal.tags || '',
                                        content: journal.content,
                                    },
                                })
                            }
                            onDeleteJournal={confirmDeleteJournal}
                            onReadFullJournal={(journal) => setReadJournalModal({ open: true, journal })}
                        />
                    )}

                    {/* TAB: SPIRITUAL */}
                    {currentTab === 'spiritual' && (
                        <SpiritualView
                            upcomingKajians={upcomingKajians}
                            kajianNotes={kajianNotes}
                            onAddNewKajian={() =>
                                setKajianModal({
                                    open: true,
                                    form: { title: '', speaker: '', event_date: new Date().toISOString().split('T')[0], time_info: '09:00 WIB', location: 'Masjid', notes: '' },
                                })
                            }
                            onDeleteKajian={confirmDeleteKajian}
                            onReadNote={(note) => setReadNoteModal({ open: true, note })}
                        />
                    )}

                    {/* TAB: WELLBEING */}
                    {currentTab === 'wellbeing' && (
                        <WellbeingView
                            chartLabels={chartLabels}
                            chartSleepData={chartSleepData}
                            avgSleep={avgSleep}
                            sleepDebt={sleepDebt}
                            refreshingActivities={refreshingActivities}
                            onOpenSleepModal={() =>
                                setSleepModal({
                                    open: true,
                                    form: { sleep_date: new Date().toISOString().split('T')[0], duration_hours: 7.5, quality: 'Sangat Baik' },
                                })
                            }
                            onOpenRefreshingModal={() =>
                                setRefreshingModal({
                                    open: true,
                                    form: { title: '', category: 'Gaming', icon: 'ph-game-controller', color: 'emerald' },
                                })
                            }
                            onMarkRefreshingDone={markRefreshingDone}
                            onDeleteRefreshing={confirmDeleteRefreshing}
                        />
                    )}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                navItems={navItems}
            />

            {/* Modals */}
            <TaskModal
                isOpen={taskModal.open}
                isEdit={taskModal.isEdit}
                form={taskModal.form}
                setForm={(form) => setTaskModal((prev) => ({ ...prev, form }))}
                onClose={() => setTaskModal((prev) => ({ ...prev, open: false }))}
                onSubmit={saveTask}
            />

            <PortfolioModal
                isOpen={portfolioModal.open}
                form={portfolioModal.form}
                setForm={(form) => setPortfolioModal((prev) => ({ ...prev, form }))}
                onClose={() => setPortfolioModal((prev) => ({ ...prev, open: false }))}
                onSubmit={savePortfolio}
            />

            <JournalModal
                isOpen={journalModal.open}
                isEdit={journalModal.isEdit}
                form={journalModal.form}
                setForm={(form) => setJournalModal((prev) => ({ ...prev, form }))}
                onClose={() => setJournalModal((prev) => ({ ...prev, open: false }))}
                onSubmit={saveJournal}
            />

            <ReadJournalModal
                isOpen={readJournalModal.open}
                journal={readJournalModal.journal}
                onClose={() => setReadJournalModal({ open: false, journal: null })}
            />

            <KajianModal
                isOpen={kajianModal.open}
                form={kajianModal.form}
                setForm={(form) => setKajianModal((prev) => ({ ...prev, form }))}
                onClose={() => setKajianModal((prev) => ({ ...prev, open: false }))}
                onSubmit={saveKajian}
            />

            <ReadNoteModal
                isOpen={readNoteModal.open}
                note={readNoteModal.note}
                onClose={() => setReadNoteModal({ open: false, note: null })}
            />

            <SleepModal
                isOpen={sleepModal.open}
                form={sleepModal.form}
                setForm={(form) => setSleepModal((prev) => ({ ...prev, form }))}
                onClose={() => setSleepModal((prev) => ({ ...prev, open: false }))}
                onSubmit={saveSleep}
            />

            <RefreshingModal
                isOpen={refreshingModal.open}
                form={refreshingModal.form}
                setForm={(form) => setRefreshingModal((prev) => ({ ...prev, form }))}
                onClose={() => setRefreshingModal((prev) => ({ ...prev, open: false }))}
                onSubmit={saveRefreshing}
            />

            <CertificationModal
                isOpen={certificationModal.open}
                certification={certificationModal.cert}
                onClose={() => setCertificationModal({ open: false, cert: null })}
            />

            <FreelanceProjectModal
                isOpen={freelanceModal.open}
                project={freelanceModal.project}
                onClose={() => setFreelanceModal({ open: false, project: null })}
            />

            <FaqModal
                isOpen={faqModal.open}
                faq={faqModal.faq}
                onClose={() => setFaqModal({ open: false, faq: null })}
            />

            {/* Custom Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={deleteModal.open}
                title={deleteModal.title}
                itemName={deleteModal.itemName}
                isLoading={deleteModal.isDeleting}
                onClose={() => setDeleteModal((prev) => ({ ...prev, open: false }))}
                onConfirm={handleExecuteDelete}
            />

            {/* First Login Welcome Splash Screen */}
            <SplashScreenModal
                isOpen={showSplash}
                userName={user.name ? (user.name.split(' ')[0] || 'Safah') : 'Safah'}
                onClose={handleCloseSplash}
            />
        </div>
    );
}
