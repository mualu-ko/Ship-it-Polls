/**
 * Poll detail page component - displays poll with voting functionality
 */

'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { Poll, PollId, OptionId, UserId } from '@/types/poll';
import { PollOptionComponent } from '@/components/polls';

interface PollDetailPageProps {
    userId: UserId | null;
    poll: Poll | undefined;
    onVote: (pollId: PollId, optionId: OptionId) => Promise<void>;
    onBack: () => void;
}

export const PollDetailPage: React.FC<PollDetailPageProps> = ({
    userId,
    poll,
    onVote,
    onBack
}) => {
    if (!poll) {
        return (
            <div className="max-w-3xl mx-auto py-10 px-4 text-center">
                <p className="text-gray-500">Poll not found</p>
            </div>
        );
    }

    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
    const userVotedOption = userId && poll.voters ? poll.voters[userId] : undefined;
    const hasVoted = Boolean(userVotedOption);

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="mb-8 flex items-center text-gray-500 hover:text-black transition"
            >
                <ChevronLeft className="w-5 h-5 mr-1" /> Back
            </button>

            {/* Question */}
            <h2 className="text-3xl font-medium text-gray-900 mb-10">{poll.question}</h2>

            {/* Options */}
            <div className="space-y-6 mb-12">
                {poll.options.map(option => (
                    <PollOptionComponent
                        key={option.id}
                        option={option}
                        pollId={poll.id}
                        totalVotes={totalVotes}
                        hasVoted={hasVoted}
                        userVotedOption={userVotedOption}
                        onVote={onVote}
                    />
                ))}
            </div>

            {/* Total Votes */}
            <div className="text-center text-gray-400 text-sm">
                Total votes: {totalVotes}
            </div>
        </div>
    );
};
