import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Ticket,
    PlusCircle,
    LayoutDashboard,
    Bell,
    Sparkles,
    Menu,
    X,
    Radio,
    ExternalLink,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Navbar() {
    const location = useLocation();
    const toast = useToast();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path === '/create' && location.pathname === '/create') return true;
        return false;
    };

    const handleNotificationClick = () => {
        toast.info(
            'Notifications Center',
            'All support queues and triage workflows are currently up to date.'
        );
    };

    const handleStatusClick = () => {
        toast.success(
            'System Status: 100% Healthy',
            'MongoDB Connection: Active • API Gateway: 0ms Latency • Redux State: Synced'
        );
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg shadow-slate-950/20">
            <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Section */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
                        >
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                                        DataStraw
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/25 text-indigo-300 border border-indigo-500/30">
                                        CRM
                                    </span>
                                </div>
                                <span className="text-[10px] sm:text-[11px] text-slate-400 hidden xs:inline">
                                    Customer Support Hub
                                </span>
                            </div>
                        </Link>

                        {/* Operational Status Pill (Clickable) */}
                        <button
                            type="button"
                            onClick={handleStatusClick}
                            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Click to inspect system telemetry"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Live CRM System</span>
                        </button>
                    </div>

                    {/* Desktop Navigation Actions */}
                    <div className="hidden sm:flex items-center gap-3 lg:gap-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                                isActive('/')
                                    ? 'bg-slate-800 text-indigo-400 border border-slate-700/80 shadow-inner'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            to="/create"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md ${
                                isActive('/create')
                                    ? 'bg-indigo-500 text-white shadow-indigo-500/30 ring-2 ring-indigo-400/40'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20 hover:shadow-indigo-500/30 hover:scale-[1.02]'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>New Ticket</span>
                        </Link>

                        {/* Agent Profile & Notification Pill */}
                        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
                            <button
                                type="button"
                                onClick={handleNotificationClick}
                                className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                                title="System Notifications"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
                            </button>

                            <div className="hidden lg:flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 py-1.5 px-3 rounded-full">
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

                    {/* Mobile Menu Toggle & Fast Action Button */}
                    <div className="flex sm:hidden items-center gap-2">
                        <Link
                            to="/create"
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs"
                            title="New Ticket"
                        >
                            <PlusCircle className="w-4 h-4" />
                        </Link>

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Expandable Drawer Menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive('/')
                                    ? 'bg-slate-800 text-indigo-400 font-semibold'
                                    : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard & Tickets Queue</span>
                        </Link>

                        <Link
                            to="/create"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                isActive('/create')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Create Support Ticket</span>
                        </Link>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <button
                            type="button"
                            onClick={() => {
                                handleStatusClick();
                                setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-1.5 text-emerald-400 font-medium"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                            <span>System Operational</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                handleNotificationClick();
                                setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-1 text-slate-300 hover:text-white"
                        >
                            <Bell className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Notifications</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}