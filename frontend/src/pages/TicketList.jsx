import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTickets } from '../features/tickets/ticketSlice';
import StatusBadge from '../components/StatusBadge';
import { Search, Filter, RefreshCw, ArrowRight } from 'lucide-react';

export default function TicketList() {
    const dispatch = useDispatch();
    const { tickets, isLoading } = useSelector((state) => state.tickets);

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchTickets({ status, search }));
        }, 300);

        return () => clearTimeout(timer);
    }, [dispatch, search, status]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage customer inquiries and track resolution workflows.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full sm:w-auto py-2 pl-3 pr-8 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                        <span>Loading tickets...</span>
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No tickets match your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
                                    <th className="py-3.5 px-4">Ticket ID</th>
                                    <th className="py-3.5 px-4">Customer</th>
                                    <th className="py-3.5 px-4">Subject</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Created At</th>
                                    <th className="py-3.5 px-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.ticket_id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-medium text-indigo-600">
                                            {ticket.ticket_id}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-medium text-slate-900">{ticket.customer_name}</div>
                                            <div className="text-xs text-slate-500">{ticket.customer_email}</div>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-800 max-w-xs truncate">
                                            {ticket.subject}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <StatusBadge status={ticket.status} />
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-500 text-xs">
                                            {new Date(ticket.created_at).toLocaleString()}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                to={`/ticket/${ticket.ticket_id}`}
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                            >
                                                View Details
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}