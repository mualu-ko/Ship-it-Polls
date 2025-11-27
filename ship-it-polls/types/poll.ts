/**
 * Type definitions for Poll-related entities
 */

export type OptionId = string;
export type PollId = string;
export type UserId = string;
export type ViewType = 'list' | 'create' | 'detail';

export interface PollOption {
    id: OptionId;
    text: string;
    votes: number;
}

export interface Poll {
    id: PollId;
    question: string;
    options: PollOption[];
    voters: Record<UserId, OptionId>; // userId maps to the OptionId they voted for
    timestamp: string;
    creatorId?: UserId;
}

export interface PollCreationData {
    question: string;
    options: { id: OptionId; text: string; votes: 0 }[];
    creatorId?: UserId;
}

export interface BackendHook {
    userId: UserId | null;
    polls: Poll[];
    loading: boolean;
    createPoll: (newPollData: PollCreationData) => Promise<PollId>;
    votePoll: (pollId: PollId, optionId: OptionId) => Promise<void>;
}
