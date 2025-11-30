'use client';

import React from 'react';
import type { Poll } from '@/types/poll';
import ResultCard from '@/components/polls/ResultCard';

interface ResultsPageProps {
    polls: Poll[];
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ polls }) => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Results</h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {polls.map(poll => (
                    <ResultCard key={poll.id} poll={poll} />
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
