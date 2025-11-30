/**
 * Result card component: displays poll summary with simple SVG charts
 */

'use client';

import React from 'react';
import type { Poll } from '@/types/poll';

interface ResultCardProps {
    poll: Poll;
}

const COLORS = ['#111827', '#374151', '#4B5563', '#6B7280', '#9CA3AF'];

function PieChart({ values }: { values: number[] }) {
    const total = values.reduce((a, b) => a + b, 0) || 1;
    let cumulative = 0;

    const slices = values.map((v, i) => {
        const start = (cumulative / total) * 2 * Math.PI;
        cumulative += v;
        const end = (cumulative / total) * 2 * Math.PI;

        const largeArc = end - start > Math.PI ? 1 : 0;
        const x1 = 50 + 40 * Math.cos(start - Math.PI / 2);
        const y1 = 50 + 40 * Math.sin(start - Math.PI / 2);
        const x2 = 50 + 40 * Math.cos(end - Math.PI / 2);
        const y2 = 50 + 40 * Math.sin(end - Math.PI / 2);

        const d = `M50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

        return (
            <path key={i} d={d} fill={COLORS[i % COLORS.length]} />
        );
    });

    return (
        <svg viewBox="0 0 100 100" width="120" height="120" className="mx-auto">
            <circle cx="50" cy="50" r="40" fill="#efefef" />
            {slices}
        </svg>
    );
}

export const ResultCard: React.FC<ResultCardProps> = ({ poll }) => {
    const values = poll.options.map(o => o.votes);
    const total = values.reduce((a, b) => a + b, 0) || 0;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{poll.question}</h3>
            <p className="text-sm text-gray-500 mb-4">{poll.timestamp ? new Date(poll.timestamp).toLocaleString() : ''}</p>

            <div className="flex items-start gap-6">
                <div className="flex-none">
                    <PieChart values={values} />
                </div>

                <div className="flex-1">
                    <div className="space-y-3">
                        {poll.options.map((opt, idx) => {
                            const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                            return (
                                <div key={opt.id} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-sm" style={{ background: COLORS[idx % COLORS.length] }} />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-800">{opt.text}</div>
                                        <div className="relative h-3 bg-gray-100 rounded mt-1 overflow-hidden">
                                            <div style={{ width: `${pct}%` }} className="absolute left-0 top-0 h-full bg-black" />
                                        </div>
                                    </div>
                                    <div className="w-14 text-right text-sm text-gray-600">{pct}%</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
