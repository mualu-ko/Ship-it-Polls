/**
 * Storage utility functions for persisting and retrieving data
 */

const STORAGE_KEY = 'poll_master_data';
const USER_ID_KEY = 'poll_master_uid';

export const storage = {
    getStorageKey: () => STORAGE_KEY,
    getUserIdKey: () => USER_ID_KEY,
};

export const getStoredUserId = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(USER_ID_KEY);
};

export const setStoredUserId = (userId: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_ID_KEY, userId);
};

export const getStoredPolls = <T,>(defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const setStoredPolls = <T,>(data: T): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        console.error('Failed to store polls data');
    }
};
