/**
 * Footer component
 */

'use client';

import React from 'react';

export const Footer: React.FC = () => (
    <footer className="bg-gray-200 py-12 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 mb-2">© 2025 PollMaster. All rights reserved.</p>
            <div className="space-x-4 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-800 transition">
                    About Us
                </a>
                <a href="#" className="hover:text-gray-800 transition">
                    Contact
                </a>
                <a href="#" className="hover:text-gray-800 transition">
                    Privacy Policy
                </a>
            </div>
        </div>
    </footer>
);
