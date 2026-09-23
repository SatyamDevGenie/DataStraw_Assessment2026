import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketById, updateTicketDetails } from '../features/tickets/ticketSlice';
import StatusBadge from '../components/StatusBadge';
import { ArrowLeft, MessageSquare, Save, User, Mail, Calendar, Clock } from 'lucide-react';

export default function TicketDetail() {
    const { ticket_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentTicket, isLoading } = useSelector((state) => state.tickets);

    const [status, setStatus] = useState('');
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        dispatch(fetchTicketById(ticket_id));
    }, [dispatch, ticket_id]);

    useEffect(() => {
        if (currentTicket) {
            setStatus(currentTicket.status);
        }
    }, [currentTicket]);

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            updateTicketDetails({
                ticket_id,
                updateData: { status, notes: noteText },
            })
        );
        setNoteText('');
    };

    if (isLoading || !currentTicket) {
        return (
            <div className="p-12 text-center text-slate-500">Loading ticket details...</div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Columns: Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                            <span className="font-mono text-sm font-bold text-indigo-600">{currentTicket.ticket_id}</span>
                            <StatusBadge status={currentTicket.status} />
                        </div>

                        <h1 className="text-xl font-bold text-slate-900 mb-2">{currentTicket.subject}</h1>
                        <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                            {currentTicket.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                Created: {new Date(currentTicket.created_at).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                Updated: {new Date(currentTicket.updated_at).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Internal Notes Timeline */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-indigo-600" />
                            Activity Notes ({currentTicket.notes?.length || 0})
                        </h2>

                        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            {currentTicket.notes && currentTicket.notes.length > 0 ? (
                                currentTicket.notes.map((note) => (
                                    <div key={note.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                        <p className="text-slate-800 text-sm">{note.note_text}</p>
                                        <span className="text-[10px] text-slate-400 mt-1 block">
                                            {new Date(note.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-sm italic">No internal notes added yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions & Customer Info */}
                <div className="space-y-6">
                    {/* Action Box */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Update Ticket
                        </h2>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    Add Internal Note
                                </label>
                                <textarea
                                    rows={3}
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Enter update notes here..."
                                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded-lg text-sm transition-colors"
                            >
                                <Save className="w-4 h-4" /> Save Updates
                            </button>
                        </form>
                    </div>

                    {/* Customer Metadata */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Customer Details
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-slate-700">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="font-medium">{currentTicket.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 truncate">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <a href={`mailto:${currentTicket.customer_email}`} className="text-indigo-600 hover:underline">
                                    {currentTicket.customer_email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}