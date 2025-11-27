/**
 * Home page component - displays list of polls
 */

'use client';

import React from 'react';
import type { Poll, PollId, ViewType } from '@/types/poll';
import { Button } from '@/components/common';
import { PollCard } from '@/components/polls';

interface HomePageProps {
    polls: Poll[];
    onNavigate: (view: ViewType) => void;
    onSelectPoll: (pollId: PollId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ polls, onNavigate, onSelectPoll }) => {
    return (
        <div className="max-w-6xl mx-auto">
            {polls.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {polls.map(poll => (
                            <PollCard key={poll.id} poll={poll} onSelect={onSelectPoll} />
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Button
                            onClick={() => onNavigate('create')}
                            className="w-full md:w-auto px-8 py-3 rounded-full"
                        >
                            Create New Poll
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full md:w-auto px-8 py-3 rounded-full shadow-none"
                        >
                            View All Results
                        </Button>
                    </div>
                </>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg mb-4">No polls available yet</p>
                    <Button
                        onClick={() => onNavigate('create')}
                        className="w-auto px-8 py-3"
                    >
                        Create First Poll
                    </Button>
                </div>
            )}
        </div>
    );
};
