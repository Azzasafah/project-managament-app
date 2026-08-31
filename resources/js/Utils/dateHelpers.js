// Date Formatting Helpers for Personal Hub
export const MONTH_NAMES_ID = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'
];

export const MONTH_FULL_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function parseDateObject(dateStr) {
    if (!dateStr) return new Date();
    const cleanStr = typeof dateStr === 'string' ? dateStr.split('T')[0] : dateStr;
    const parts = cleanStr.split('-');
    if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    return new Date(dateStr);
}

export function getDayNumber(dateStr) {
    if (!dateStr) return '01';
    const clean = typeof dateStr === 'string' ? dateStr.split('T')[0] : '';
    const parts = clean.split('-');
    if (parts.length === 3) {
        return parts[2].padStart(2, '0');
    }
    const d = parseDateObject(dateStr);
    return isNaN(d.getDate()) ? '01' : String(d.getDate()).padStart(2, '0');
}

export function getMonthShort(dateStr) {
    if (!dateStr) return 'LOG';
    const d = parseDateObject(dateStr);
    if (isNaN(d.getMonth())) return 'LOG';
    return (MONTH_NAMES_ID[d.getMonth()] || 'LOG').toUpperCase();
}

export function formatDateIndo(dateStr, short = false) {
    if (!dateStr) return '';
    const d = parseDateObject(dateStr);
    if (isNaN(d.getDate())) return dateStr;
    const day = d.getDate();
    const month = short ? MONTH_NAMES_ID[d.getMonth()] : MONTH_FULL_ID[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
}

export function toInputDateFormat(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    if (typeof dateStr === 'string') {
        return dateStr.split('T')[0];
    }
    return new Date(dateStr).toISOString().split('T')[0];
}

export function isDoneToday(dateString) {
    if (!dateString) return false;
    const today = new Date().toISOString().split('T')[0];
    const clean = typeof dateString === 'string' ? dateString.split('T')[0] : '';
    return clean === today;
}

export function formatRelativeDate(dateString) {
    if (!dateString) return 'Belum pernah';
    if (isDoneToday(dateString)) return 'Hari ini';
    const today = new Date();
    const d = parseDateObject(dateString);
    const diffDays = Math.ceil(Math.abs(today - d) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Kemarin';
    return `${diffDays} Hari Lalu`;
}

export function getTagColor(tag) {
    const colors = {
        Backend: 'bg-red-100 text-red-700',
        Frontend: 'bg-blue-100 text-blue-700',
        Database: 'bg-amber-100 text-amber-700',
        Cloud: 'bg-cyan-100 text-cyan-700',
        Auth: 'bg-emerald-100 text-emerald-700',
    };
    return colors[tag] || 'bg-slate-100 text-slate-700';
}
