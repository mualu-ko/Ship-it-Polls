/**
 * Seed data for initial polls
 */

import { Poll } from '@/types/poll';

export const INITIAL_POLLS: Poll[] = [
    {
        id: 'p1',
        question: 'What is your favorite season?',
        options: [
            { id: 'o1', text: 'Summer', votes: 12 },
            { id: 'o2', text: 'Winter', votes: 8 },
            { id: 'o3', text: 'Autumn', votes: 5 }
        ],
        voters: {},
        timestamp: new Date().toISOString()
    },
    {
        id: 'p2',
        question: 'Who is your favorite superhero?',
        options: [
            { id: 'o1', text: 'Batman', votes: 45 },
            { id: 'o2', text: 'Superman', votes: 30 },
            { id: 'o3', text: 'Spiderman', votes: 55 }
        ],
        voters: {},
        timestamp: new Date().toISOString()
    },
    {
        id: 'p3',
        question: 'Do you prefer coffee or tea?',
        options: [
            { id: 'o1', text: 'Coffee', votes: 60 },
            { id: 'o2', text: 'Tea', votes: 40 }
        ],
        voters: {},
        timestamp: new Date().toISOString()
    }
];
