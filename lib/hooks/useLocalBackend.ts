/**
 * Custom hook for managing poll data and operations
 * Simulates backend/server actions with localStorage persistence
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BackendHook, Poll, PollCreationData, PollId, OptionId, UserId } from '@/types/poll';
import {
    delay,
    generateUserId,
    generatePollId,
    generateOptionId,
    getStoredUserId,
    setStoredUserId,
    getStoredPolls,
    setStoredPolls
} from '@/lib/utils';
import { INITIAL_POLLS } from '@/lib/utils/seed';

export const useLocalBackend = (): BackendHook => {
    const [userId, setUserId] = useState<UserId | null>(null);
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Initialize user ID and load polls
    useEffect(() => {
        const init = async () => {
            // Initialize or retrieve user ID
            let storedUid = getStoredUserId();
            if (!storedUid) {
                storedUid = generateUserId();
                setStoredUserId(storedUid);
            }
            setUserId(storedUid);

            // Load polls from storage or use seed data
            const storedPolls = getStoredPolls<Poll[]>(INITIAL_POLLS);
            setPolls(storedPolls);

            // Simulate network delay
            await delay(400);
            setLoading(false);
        };

        init();
    }, []);

    // Persist polls to storage whenever they change
    useEffect(() => {
        if (!loading) {
            setStoredPolls(polls);
        }
    }, [polls, loading]);

    /**
     * Create a new poll
     */
    const createPoll = useCallback(
        async (newPollData: PollCreationData): Promise<PollId> => {
            await delay(300);

            const newPoll: Poll = {
                ...newPollData,
                id: generatePollId(),
                timestamp: new Date().toISOString(),
                voters: {}
            };

            setPolls(prev => [newPoll, ...prev]);
            return newPoll.id;
        },
        []
    );

    /**
     * Cast a vote on a poll option
     */
    const votePoll = useCallback(
        async (pollId: PollId, optionId: OptionId): Promise<void> => {
            if (!userId) return;

            setPolls(prev =>
                prev.map(poll => {
                    if (poll.id !== pollId) return poll;

                    // Prevent duplicate votes
                    if (poll.voters && poll.voters[userId]) return poll;

                    // Increment vote count
                    const updatedOptions = poll.options.map(opt => {
                        if (opt.id === optionId) {
                            return { ...opt, votes: opt.votes + 1 };
                        }
                        return opt;
                    });

                    return {
                        ...poll,
                        options: updatedOptions,
                        voters: { ...poll.voters, [userId]: optionId }
                    };
                })
            );
        },
        [userId]
    );

    return {
        userId,
        polls,
        loading,
        createPoll,
        votePoll
    };
};
