'use client';

import { useCallback, useState } from 'react';
import { useLocalBackend } from '@/lib/hooks';
import type { ViewType, PollId, PollCreationData, UserId } from '@/types/poll';
import { Header, Footer } from '@/components/common';
import { HomePage } from './HomePage';
import { CreatePollPage } from './CreatePollPage';
import { PollDetailPage } from './PollDetailPage';

export default function App() {
    // Backend data layer
    const { userId, polls, loading, createPoll, votePoll } = useLocalBackend();

    // Routing state
    const [view, setView] = useState<ViewType>('list');
    const [selectedPollId, setSelectedPollId] = useState<PollId | null>(null);

    // Navigation handlers
    const handleNavigate = useCallback((path: ViewType) => {
        setView(path);
    }, []);

    const handleSelectPoll = useCallback((pollId: PollId) => {
        setSelectedPollId(pollId);
        setView('detail');
    }, []);

    const handleCreate = useCallback(
        async (data: PollCreationData | null) => {
            if (!data) {
                // Cancel case
                handleNavigate('list');
                return;
            }

            try {
                const newId = await createPoll(data);
                setSelectedPollId(newId);
                setView('detail');
            } catch (error) {
                console.error('Failed to create poll:', error);
            }
        },
        [createPoll, handleNavigate]
    );

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    // Main layout
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col text-gray-900 selection:bg-indigo-100">
            <Header onNavigate={handleNavigate} />

            <main className="grow container mx-auto px-4 py-8">
                {/* Router switch */}
                {view === 'list' && (
                    <HomePage
                        polls={polls}
                        onNavigate={handleNavigate}
                        onSelectPoll={handleSelectPoll}
                    />
                )}

                {view === 'create' && (
                    <CreatePollPage
                        userId={userId}
                        onCreate={handleCreate}
                        onCancel={() => handleNavigate('list')}
                    />
                )}

                {view === 'detail' && (
                    <PollDetailPage
                        userId={userId}
                        poll={polls.find(p => p.id === selectedPollId)}
                        onVote={votePoll}
                        onBack={() => handleNavigate('list')}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}
