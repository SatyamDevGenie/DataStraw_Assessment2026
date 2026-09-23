import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, PlusCircle, LayoutDashboard, Bell, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path === '/create' && location.pathname === '/create') return true;
        return false;
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg shadow-slate-950/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Section */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                                <Ticket className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                                        DataStraw
                                    </span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                        CRM
                                    </span>
                                </div>
                                <span className="text-[11px] text-slate-400 hidden sm:inline">
                                    Customer Support Hub
                                </span>
                            </div>
                        </Link>

                        {/* Operational Status Pill */}
                        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Live CRM System</span>
                        </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isActive('/')
                                    ? 'bg-slate-800 text-indigo-400 border border-slate-700/80 shadow-inner'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>

                        <Link
                            to="/create"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md ${
                                isActive('/create')
                                    ? 'bg-indigo-500 text-white shadow-indigo-500/30 ring-2 ring-indigo-400/40'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20 hover:shadow-indigo-500/30 hover:scale-[1.02]'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>New Ticket</span>
                        </Link>

                        {/* Agent Profile & Notification Pill */}
                        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-800">
                            <button
                                type="button"
                                className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                                title="System Notifications"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 py-1.5 px-3 rounded-full">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                                    DS
                                </div>
                                <div className="text-left">
                                    <div className="text-xs font-semibold text-slate-200 leading-none">Support Desk</div>
                                    <div className="text-[10px] text-emerald-400 font-medium leading-tight">Online</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}