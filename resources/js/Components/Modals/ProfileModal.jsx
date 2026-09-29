import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ProfileModal({ open, user, onClose, onToast }) {
    if (!open) return null;

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPasswords, setShowPasswords] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        router.put('/profile', form, {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitting(false);
                if (onToast) onToast('Profil & Kredensial berhasil diperbarui!');
                setForm((prev) => ({
                    ...prev,
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                }));
                onClose();
            },
            onError: (err) => {
                setSubmitting(false);
                setErrors(err);
                if (onToast) onToast('Gagal memperbarui profil. Periksa data kembali.', 'error');
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
            <div className="bg-[#111116] border border-white/15 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
                
                {/* Header Modal with Chisa Techwear Accent */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#09090b]/80">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg">
                            <i className="ph-bold ph-user-gear"></i>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-display font-extrabold text-base tracking-tight text-white">
                                    Pengaturan Profil & Keamanan
                                </h3>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                                    AUTH_V2
                                </span>
                            </div>
                            <p className="text-xs text-neutral-400 font-mono">Ubah nama, email, dan kata sandi akses akun Anda</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-base"></i>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scroll flex-1">
                    
                    {/* Chisa Tip Note */}
                    <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-center gap-3">
                        <img
                            src="/chisa.png"
                            alt="Chisa"
                            className="w-9 h-9 rounded-xl object-cover object-top border border-indigo-400/30 shrink-0"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=150&auto=format&fit=crop';
                            }}
                        />
                        <p className="text-xs text-indigo-200/90 leading-relaxed font-sans">
                            <span className="font-bold text-indigo-300 font-mono">Chisa Companion:</span> "Gunakan email aktif dan password yang kuat agar workspace Safah tetap aman terkendali ya! ✨"
                        </p>
                    </div>

                    {/* Basic Info Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
                            <i className="ph-bold ph-identification-card text-indigo-400"></i> Informasi Akun
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-sans"
                                placeholder="Muhammad Hafizh Azzasafah"
                            />
                            {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold">
                                Alamat Email Login
                            </label>
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-mono"
                                placeholder="admin@example.com"
                            />
                            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
                                <i className="ph-bold ph-lock-key text-amber-400"></i> Ganti Kata Sandi (Opsional)
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPasswords(!showPasswords)}
                                className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                <i className={`ph-bold ${showPasswords ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                                {showPasswords ? 'Sembunyikan' : 'Lihat'}
                            </button>
                        </div>
                        <p className="text-[11px] text-neutral-500 -mt-2">
                            Biarkan kosong jika Anda tidak ingin mengubah kata sandi saat ini.
                        </p>

                        <div>
                            <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                                Kata Sandi Saat Ini
                            </label>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                value={form.current_password}
                                onChange={(e) => setForm({ ...form, current_password: e.target.value })}
                                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-mono"
                                placeholder="Masukkan password lama..."
                            />
                            {errors.current_password && <p className="text-rose-400 text-xs mt-1">{errors.current_password}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                                    Kata Sandi Baru
                                </label>
                                <input
                                    type={showPasswords ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-mono"
                                    placeholder="Min. 6 karakter"
                                />
                                {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                                    Konfirmasi Sandi Baru
                                </label>
                                <input
                                    type={showPasswords ? 'text' : 'password'}
                                    value={form.password_confirmation}
                                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                                    className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-mono"
                                    placeholder="Ulangi sandi baru"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-extrabold shadow-lg transition-transform active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <i className="ph-bold ph-spinner animate-spin"></i> Menyimpan...
                                </>
                            ) : (
                                <>
                                    <i className="ph-bold ph-floppy-disk text-sm"></i> Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
