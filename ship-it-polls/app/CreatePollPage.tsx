/**
 * Create poll page component
 */

'use client';

import React, { useState } from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';
import type { UserId, PollCreationData } from '@/types/poll';
import { Button } from '@/components/common';

interface CreatePollPageProps {
    userId: UserId | null;
    onCreate: (data: PollCreationData | null) => Promise<void>;
    onCancel: () => void;
}

export const CreatePollPage: React.FC<CreatePollPageProps> = ({ userId, onCreate, onCancel }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleRemoveOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validOptions = options.map(o => o.trim()).filter(o => o.length > 0);

        if (question.trim().length === 0 || validOptions.length < 2) {
            alert('Please enter a question and at least 2 options');
            return;
        }

        setIsSubmitting(true);

        const pollData: PollCreationData = {
            question: question.trim(),
            options: validOptions.map(text => ({
                id: Math.random().toString(36).substr(2, 9),
                text,
                votes: 0
            })),
            creatorId: userId ?? 'anonymous'
        };

        try {
            await onCreate(pollData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <button
                onClick={onCancel}
                className="text-gray-500 mb-6 flex items-center hover:text-black transition"
            >
                <ChevronLeft className="w-4 h-4 mr-1" /> Cancel
            </button>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-medium text-gray-900 mb-8">Create New Poll</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Question Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Question
                        </label>
                        <input
                            type="text"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            placeholder="e.g. What is your favorite programming language?"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition disabled:opacity-50"
                        />
                    </div>

                    {/* Options Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Options
                        </label>
                        {options.map((option, index) => (
                            <div key={index} className="flex mb-3 gap-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={e => handleOptionChange(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                    required={index < 2}
                                    disabled={isSubmitting}
                                    className="grow px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition disabled:opacity-50"
                                />
                                {options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOption(index)}
                                        disabled={isSubmitting}
                                        aria-label="Remove option"
                                        className="px-3 py-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition disabled:opacity-50"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddOption}
                            disabled={isSubmitting}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 mt-3 flex items-center transition disabled:opacity-50"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Option
                        </button>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Poll'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
