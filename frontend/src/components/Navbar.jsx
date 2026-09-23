import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-400">
                        <Ticket className="w-6 h-6" />
                        <span>DataStraw <span className="text-white font-normal text-sm border-l border-slate-700 pl-2">CRM</span></span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'bg-slate-800 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link
                            to="/create"
                            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm shadow-indigo-500/20"
                        >
                            <PlusCircle className="w-4 h-4" />
                            New Ticket
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}