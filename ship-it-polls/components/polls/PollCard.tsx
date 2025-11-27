/**
 * Poll card component for displaying polls in list view
 */

'use client';

import React from 'react';
import type { Poll, PollId } from '@/types/poll';
import { Button } from '@/components/common';

interface PollCardProps {
    poll: Poll;
    onSelect: (pollId: PollId) => void;
}

export const PollCard: React.FC<PollCardProps> = ({ poll, onSelect }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex flex-col justify-between h-full">
        <h3 className="text-xl font-medium text-gray-900 mb-6 leading-tight line-clamp-3">
            {poll.question}
        </h3>
        <Button
            onClick={() => onSelect(poll.id)}
            className="bg-black text-white hover:bg-gray-800"
        >
            View Results
        </Button>
    </div>
);
