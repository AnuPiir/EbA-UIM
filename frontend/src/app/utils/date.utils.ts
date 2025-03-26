// Utility function to format time since last modified

export function formatTimeAgo(date: Date | string | number, currentLang: string = 'et'): string {
    if (!date) return '';

    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();

    // Time differences in milliseconds
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.436875); // Average days in a month
    const diffYears = Math.floor(diffDays / 365.25); // Account for leap years

    // Format depending on the difference
    if (currentLang === 'et') {
        // Estonian language formatting
        if (diffSeconds < 60) return 'äsja';
        if (diffMinutes < 60) return `${diffMinutes} ${diffMinutes === 1 ? 'minut' : 'minutit'} tagasi`;
        if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'tund' : 'tundi'} tagasi`;
        if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'päev' : 'päeva'} tagasi`;
        if (diffWeeks < 4) return `${diffWeeks} ${diffWeeks === 1 ? 'nädal' : 'nädalat'} tagasi`;
        if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'kuu' : 'kuud'} tagasi`;
        return `${diffYears} ${diffYears === 1 ? 'aasta' : 'aastat'} tagasi`;
    } else {
        // English language formatting
        if (diffSeconds < 60) return 'just now';
        if (diffMinutes < 60) return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
        if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
        if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
        if (diffWeeks < 4) return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
        if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
        return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
    }
}

// Return full date in format "DD.MM.YYYY HH:MM" for accessibility and detailed view
export function formatFullDate(date: Date | string | number, currentLang: string = 'et'): string {
    if (!date) return '';

    const dateObj = date instanceof Date ? date : new Date(date);

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    if (currentLang === 'et') {
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    } else {
        // Standard international format for English users
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}