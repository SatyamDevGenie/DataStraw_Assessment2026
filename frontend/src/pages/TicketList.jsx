import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTickets } from '../features/tickets/ticketSlice';
import StatusBadge from '../components/StatusBadge';
import { TableSkeleton } from '../components/TicketSkeleton';
import { useToast } from '../context/ToastContext';
import {
    Search,
    Filter,
    RefreshCw,
    ArrowRight,
    PlusCircle,
    Inbox,
    CircleDot,
    Clock3,
    CheckCircle2,
    Copy,
    Check,
    Calendar,
    Mail,
    Sparkles,
    X,
} from 'lucide-react';

const AVATAR_COLORS = [
    'from-indigo-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-cyan-500 to-blue-600',
    'from-rose-500 to-red-600',
    'from-violet-500 to-indigo-600',
];

function getAvatarColor(name = '') {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

function getInitials(name = '') {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || 'CU';
}

function formatDisplayDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
}

export default function TicketList() {
    const dispatch = useDispatch();
    const toast = useToast();
    const { tickets = [], isLoading, isError, message } = useSelector((state) => state.tickets);

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [copiedId, setCopiedId] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchTickets({ status, search }));
        }, 300);

        return () => clearTimeout(timer);
    }, [dispatch, search, status]);

    useEffect(() => {
        if (isError && message) {
            toast.error('Failed to load tickets', message);
        }
    }, [isError, message, toast]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        toast.info('Synchronizing Queue', 'Fetching latest ticket updates from MongoDB...');
        dispatch(fetchTickets({ status, search }))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.success('Queue Synchronized', `${res.payload?.length || 0} tickets up to date.`);
                }
            })
            .finally(() => {
                setTimeout(() => setIsRefreshing(false), 400);
            });
    };

    const handleCopyId = (e, ticketId) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard?.writeText(ticketId);
        setCopiedId(ticketId);
        toast.success('Ticket ID Copied', `${ticketId} saved to clipboard.`);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleStatusFilterClick = (newStatus) => {
        setStatus(newStatus);
        toast.info(
            `Filter Applied: ${newStatus}`,
            `Displaying tickets with status "${newStatus}".`
        );
    };

    // Calculate metrics counts from loaded tickets
    const metrics = useMemo(() => {
        const total = tickets.length;
        const open = tickets.filter((t) => t.status === 'Open').length;
        const inProgress = tickets.filter((t) => t.status === 'In Progress').length;
        const closed = tickets.filter((t) => t.status === 'Closed').length;
        return { total, open, inProgress, closed };
    }, [tickets]);

    return (
        <div className="crm-bg-mesh min-h-[calc(100vh-4rem)] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto space-y-6">
                {/* Header & Quick Action Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                Support Operations
                            </h1>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold">
                                <Sparkles className="w-3 h-3 text-indigo-500" />
                                Live Queue
                            </span>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Monitor incoming inquiries, triage customer tickets, and track resolution workflows.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-xs text-sm font-medium transition-all active:scale-95 cursor-pointer"
                            title="Refresh Tickets"
                        >
                            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing || isLoading ? 'animate-spin text-indigo-600' : ''}`} />
                            <span>Refresh</span>
                        </button>

                        <Link
                            to="/create"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 text-sm font-semibold transition-all hover:-translate-y-0.5"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>New Ticket</span>
                        </Link>
                    </div>
                </div>

                {/* KPI Metrics Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* All Tickets */}
                    <button
                        type="button"
                        onClick={() => handleStatusFilterClick('All')}
                        className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                            status === 'All'
                                ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm'
                                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                All Tickets
                            </span>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-100/80 text-indigo-600 flex items-center justify-center">
                                <Inbox className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-slate-900">
                                {status === 'All' ? tickets.length : metrics.total}
                            </span>
                            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">In Queue</span>
                        </div>
                    </button>

                    {/* Open Tickets */}
                    <button
                        type="button"
                        onClick={() => handleStatusFilterClick('Open')}
                        className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                            status === 'Open'
                                ? 'bg-emerald-50/90 border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm'
                                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                Open
                            </span>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
                                <CircleDot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-emerald-950">
                                {status === 'Open' ? tickets.length : metrics.open}
                            </span>
                            <span className="text-[11px] sm:text-xs text-emerald-600 font-medium">Pending</span>
                        </div>
                    </button>

                    {/* In Progress */}
                    <button
                        type="button"
                        onClick={() => handleStatusFilterClick('In Progress')}
                        className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                            status === 'In Progress'
                                ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-500/20 shadow-sm'
                                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-amber-700 uppercase tracking-wider">
                                In Progress
                            </span>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100/80 text-amber-600 flex items-center justify-center">
                                <Clock3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-amber-950">
                                {status === 'In Progress' ? tickets.length : metrics.inProgress}
                            </span>
                            <span className="text-[11px] sm:text-xs text-amber-600 font-medium">Active</span>
                        </div>
                    </button>

                    {/* Closed */}
                    <button
                        type="button"
                        onClick={() => handleStatusFilterClick('Closed')}
                        className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                            status === 'Closed'
                                ? 'bg-slate-100 border-slate-300 ring-2 ring-slate-400/20 shadow-sm'
                                : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Resolved
                            </span>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-slate-800">
                                {status === 'Closed' ? tickets.length : metrics.closed}
                            </span>
                            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Done</span>
                        </div>
                    </button>
                </div>

                {/* Toolbar & Filter Bar */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1 sm:max-w-sm">
                        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by ID, customer, subject..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    toast.info('Search Cleared', 'Displaying all queue results.');
                                }}
                                className="absolute right-3 top-3 p-0.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Status Filter & Count Badge */}
                    <div className="flex items-center gap-2.5">
                        <div className="relative flex-1 sm:flex-initial">
                            <Filter className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                            <select
                                value={status}
                                onChange={(e) => handleStatusFilterClick(e.target.value)}
                                className="w-full sm:w-auto py-2.5 pl-9 pr-8 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                <option value="All">All Statuses ({metrics.total})</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div className="hidden lg:flex items-center px-3 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 shrink-0">
                            {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    {isLoading ? (
                        <TableSkeleton rows={5} />
                    ) : tickets.length === 0 ? (
                        <div className="p-8 sm:p-16 text-center flex flex-col items-center justify-center max-w-md mx-auto">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
                                <Inbox className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">No Tickets Found</h3>
                            <p className="text-slate-500 text-xs sm:text-sm text-center mb-6">
                                {search || status !== 'All'
                                    ? `No tickets match your query "${search || status}". Try clearing filters or searching for something else.`
                                    : 'There are currently no tickets registered in the CRM system. Get started by creating the first one.'}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {(search || status !== 'All') && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearch('');
                                            setStatus('All');
                                            toast.info('Filters Reset', 'Showing all CRM tickets.');
                                        }}
                                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                                    >
                                        Reset Filters
                                    </button>
                                )}
                                <Link
                                    to="/create"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    New Ticket
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Mobile Card List View (Visible on < 768px screens for high readability) */}
                            <div className="block md:hidden divide-y divide-slate-100">
                                {tickets.map((ticket) => (
                                    <div
                                        key={ticket.ticket_id}
                                        className="p-4 space-y-3 hover:bg-slate-50/80 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded">
                                                    {ticket.ticket_id}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleCopyId(e, ticket.ticket_id)}
                                                    className="text-slate-400 hover:text-indigo-600 p-1"
                                                    title="Copy ID"
                                                >
                                                    {copiedId === ticket.ticket_id ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>

                                            <StatusBadge status={ticket.status} />
                                        </div>

                                        <Link
                                            to={`/ticket/${ticket.ticket_id}`}
                                            className="block font-semibold text-slate-900 text-sm hover:text-indigo-600 transition-colors line-clamp-2"
                                        >
                                            {ticket.subject}
                                        </Link>

                                        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-6 h-6 rounded-full bg-gradient-to-tr ${getAvatarColor(
                                                        ticket.customer_name
                                                    )} flex items-center justify-center text-white font-bold text-[10px]`}
                                                >
                                                    {getInitials(ticket.customer_name)}
                                                </div>
                                                <span className="font-medium text-slate-700 truncate max-w-[120px]">
                                                    {ticket.customer_name}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 text-slate-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDisplayDate(ticket.created_at)}</span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/ticket/${ticket.ticket_id}`}
                                            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white transition-colors"
                                        >
                                            <span>Inspect Case Details</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop & Tablet Table View (Visible on >= 768px screens) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-slate-50/90 border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                                            <th className="py-3.5 px-4 sm:px-6">Ticket ID</th>
                                            <th className="py-3.5 px-4 sm:px-6">Customer</th>
                                            <th className="py-3.5 px-4 sm:px-6">Subject</th>
                                            <th className="py-3.5 px-4 sm:px-6">Status</th>
                                            <th className="py-3.5 px-4 sm:px-6">Created</th>
                                            <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {tickets.map((ticket) => (
                                            <tr
                                                key={ticket.ticket_id}
                                                className="hover:bg-indigo-50/30 transition-colors group"
                                            >
                                                {/* Ticket ID */}
                                                <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50/80 border border-indigo-200/60 px-2 py-1 rounded-md">
                                                            {ticket.ticket_id}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleCopyId(e, ticket.ticket_id)}
                                                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 transition-opacity p-1 rounded hover:bg-slate-100 cursor-pointer"
                                                            title="Copy Ticket ID"
                                                        >
                                                            {copiedId === ticket.ticket_id ? (
                                                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Customer */}
                                                <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-9 h-9 rounded-full bg-gradient-to-tr ${getAvatarColor(
                                                                ticket.customer_name
                                                            )} flex items-center justify-center text-white font-bold text-xs shadow-xs`}
                                                        >
                                                            {getInitials(ticket.customer_name)}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900 text-sm leading-snug">
                                                                {ticket.customer_name}
                                                            </div>
                                                            <div className="text-xs text-slate-500 flex items-center gap-1 leading-snug">
                                                                <Mail className="w-3 h-3 text-slate-400" />
                                                                <span>{ticket.customer_email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Subject */}
                                                <td className="py-4 px-4 sm:px-6 max-w-xs xl:max-w-md">
                                                    <Link
                                                        to={`/ticket/${ticket.ticket_id}`}
                                                        className="font-medium text-slate-800 hover:text-indigo-600 transition-colors block truncate"
                                                        title={ticket.subject}
                                                    >
                                                        {ticket.subject}
                                                    </Link>
                                                </td>

                                                {/* Status */}
                                                <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                                                    <StatusBadge status={ticket.status} />
                                                </td>

                                                {/* Created Date */}
                                                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-slate-500 text-xs">
                                                    <div className="flex items-center gap-1.5" title={new Date(ticket.created_at).toLocaleString()}>
                                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>{formatDisplayDate(ticket.created_at)}</span>
                                                    </div>
                                                </td>

                                                {/* Action Button */}
                                                <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                                                    <Link
                                                        to={`/ticket/${ticket.ticket_id}`}
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white transition-all duration-150 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white"
                                                    >
                                                        <span>View Case</span>
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Table Footer Summary */}
                    {!isLoading && tickets.length > 0 && (
                        <div className="px-4 sm:px-6 py-3 bg-slate-50/60 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-slate-500">
                            <span>
                                Showing <strong className="font-semibold text-slate-700">{tickets.length}</strong> {tickets.length === 1 ? 'ticket' : 'tickets'}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                                Real-time synchronization active
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}