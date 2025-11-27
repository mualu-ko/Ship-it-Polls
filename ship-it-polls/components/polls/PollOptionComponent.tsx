/**
 * Poll option component for displaying individual poll options with voting
 */

'use client';

import React from 'react';
import { Check } from 'lucide-react';
import type { PollOption, PollId, OptionId, UserId } from '@/types/poll';
import { Button } from '@/components/common';

interface PollOptionProps {
    option: PollOption;
    pollId: PollId;
    totalVotes: number;
    hasVoted: boolean;
    userVotedOption: OptionId | undefined;
    onVote: (pollId: PollId, optionId: OptionId) => Promise<void>;
}

export const PollOptionComponent: React.FC<PollOptionProps> = ({
    option,
    pollId,
    totalVotes,
    hasVoted,
    userVotedOption,
    onVote
}) => {
    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
    const isVotedOption = userVotedOption === option.id;

    return (
        <div className="relative w-full">
            {/* Option Container */}
            <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden h-16 group hover:border-indigo-100 transition">
                {/* Progress Bar Background */}
                <div
                    className="absolute top-0 left-0 h-full bg-indigo-50 transition-all duration-700 ease-out"
                    style={{ width: hasVoted ? `${percentage}%` : '0%' }}
                ></div>

                {/* Main Content Layer */}
                <div className="relative z-10 flex items-center justify-between w-full px-2">
                    <span className="font-medium text-lg text-gray-800">{option.text}</span>

                    <div className="flex items-center space-x-4">
                        {hasVoted && (
                            <span className="text-gray-500 font-medium">{percentage.toFixed(0)}%</span>
                        )}

                        {!hasVoted ? (
                            <Button
                                variant="secondary"
                                onClick={() => onVote(pollId, option.id)}
                                className="w-auto px-6 py-2 rounded-lg text-base shadow-sm hover:shadow-md"
                            >
                                Vote
                            </Button>
                        ) : (
                            isVotedOption && (
                                <div className="bg-indigo-600 text-white p-1 rounded-full">
                                    <Check className="w-4 h-4" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Detailed Progress Line */}
            {hasVoted && (
                <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            )}
        </div>
    );
};
