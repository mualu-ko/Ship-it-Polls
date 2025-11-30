/**
 * Header component with navigation
 */

'use client';

import React, { useState } from 'react';
import { BarChart2, Menu, X } from 'lucide-react';
import type { ViewType } from '@/types/poll';

interface HeaderProps {
    onNavigate: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavigate = (view: ViewType) => {
        onNavigate(view);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-sm border-b border-gray-100">
            {/* Logo */}
            <div
                className="flex items-center cursor-pointer"
                onClick={() => handleNavigate('list')}
            >
                <div className="w-6 h-6 bg-black rounded-sm mr-2 flex items-center justify-center">
                    <BarChart2 className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-black">PollMasters</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
                <button
                    onClick={() => handleNavigate('list')}
                    className="text-gray-600 hover:text-black font-medium transition"
                >
                    Home
                </button>
                <button className="text-gray-600 hover:text-black font-medium transition cursor-not-allowed opacity-50">
                    Vote
                </button>
                <button
                    onClick={() => handleNavigate('results')}
                    className="text-gray-600 hover:text-black font-medium transition"
                >
                    Results
                </button>
                <button
                    onClick={() => handleNavigate('create')}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                    New Poll
                </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-b border-gray-100 p-4 md:hidden flex flex-col space-y-4">
                    <button
                        onClick={() => handleNavigate('list')}
                        className="text-left font-medium hover:text-gray-600 transition"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleNavigate('results')}
                        className="text-left font-medium hover:text-gray-600 transition"
                    >
                        Results
                    </button>
                    <button
                        onClick={() => handleNavigate('create')}
                        className="text-left font-medium hover:text-gray-600 transition"
                    >
                        Create New
                    </button>
                </div>
            )}
        </header>
    );
};
