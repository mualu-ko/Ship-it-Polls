/**
 * Helper utility functions
 */

export const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

export const generateId = (): string =>
    Math.random().toString(36).substr(2, 9);

export const generateUserId = (): string =>
    'user_' + generateId();

export const generatePollId = (): string =>
    'poll_' + generateId();

export const generateOptionId = (): string =>
    'opt_' + generateId();
