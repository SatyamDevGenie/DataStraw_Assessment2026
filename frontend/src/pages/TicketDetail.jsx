import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketById, updateTicketDetails } from '../features/tickets/ticketSlice';
import StatusBadge from '../components/StatusBadge';
import { DetailSkeleton } from '../components/TicketSkeleton';
import { useToast } from '../context/ToastContext';
import {
    ArrowLeft,
    MessageSquare,
    Save,
    User,
    Mail,
    Calendar,
    Clock,
    Copy,
    Check,
    CheckCircle2,
    CircleDot,
    Clock3,
    Sparkles,
    ChevronRight,
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

function formatDetailDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}

export default function TicketDetail() {
    const { ticket_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const { currentTicket, isLoading, isError, message } = useSelector((state) => state.tickets);

    const [status, setStatus] = useState('');
    const [noteText, setNoteText] = useState('');
    const [copiedId, setCopiedId] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        dispatch(fetchTicketById(ticket_id));
    }, [dispatch, ticket_id]);

    useEffect(() => {
        if (currentTicket) {
            setStatus(currentTicket.status);
        }
    }, [currentTicket]);

    useEffect(() => {
        if (isError && message) {
            toast.error('Failed to load ticket', message);
        }
    }, [isError, message, toast]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setIsSaving(true);
        toast.info('Saving Ticket Updates', 'Persisting status changes and activity notes to MongoDB...');

        dispatch(
            updateTicketDetails({
                ticket_id,
                updateData: { status, notes: noteText },
            })
        )
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.success(
                        'Ticket Updated Successfully',
                        `Status set to "${status}" and activity notes logged.`
                    );
                } else {
                    toast.error('Update Failed', res.payload || 'Failed to update ticket');
                }
            })
            .finally(() => {
                setIsSaving(false);
            });

        setNoteText('');
    };

    const handleQuickStatusChange = (newStatus) => {
        setStatus(newStatus);
        toast.info(
            `Status Selected: ${newStatus}`,
            'Click "Post Update & Save" or "Apply Status Update" to commit changes.'
        );
    };

    const handleCopyTicketId = () => {
        navigator.clipboard?.writeText(ticket_id);
        setCopiedId(true);
        toast.success('Ticket ID Copied', `${ticket_id} saved to clipboard.`);
        setTimeout(() => setCopiedId(false), 2000);
    };

    const handleCopyEmail = () => {
        if (!currentTicket?.customer_email) return;
        navigator.clipboard?.writeText(currentTicket.customer_email);
        setCopiedEmail(true);
        toast.success('Customer Email Copied', `${currentTicket.customer_email} saved to clipboard.`);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    if (isLoading || !currentTicket) {
        return <DetailSkeleton />;
    }

    return (
        <div className="crm-bg-mesh min-h-[calc(100vh-4rem)] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl 2xl:max-w-screen-2xl mx-auto space-y-5 sm:space-y-6">
                {/* Top Breadcrumbs & Back Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-500">
                        <Link to="/" className="hover:text-indigo-600 transition-colors">
                            Dashboard
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        <Link to="/" className="hover:text-indigo-600 transition-colors">
                            Tickets
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono font-semibold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                            {currentTicket.ticket_id}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer self-start sm:self-auto group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Ticket Queue</span>
                    </button>
                </div>

                {/* Main Grid: Left (Case Data & Timeline), Right (Customer & Controls) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left 8 Columns on Desktop */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Case Main Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-8 space-y-5 sm:space-y-6">
                            {/* Case Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5">
                                <div className="flex items-center gap-2.5">
                                    <span className="font-mono text-xs sm:text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-lg">
                                        {currentTicket.ticket_id}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleCopyTicketId}
                                        className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                                        title="Copy Ticket ID"
                                    >
                                        {copiedId ? (
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <StatusBadge status={currentTicket.status} size="lg" />
                            </div>

                            {/* Subject & Description */}
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-3">
                                    {currentTicket.subject}
                                </h1>

                                <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 sm:p-5 text-slate-700 text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                                    {currentTicket.description}
                                </div>
                            </div>

                            {/* Date Timestamps Bar */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>
                                        Reported:{' '}
                                        <strong className="font-medium text-slate-700">
                                            {formatDetailDate(currentTicket.created_at)}
                                        </strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>
                                        Last Updated:{' '}
                                        <strong className="font-medium text-slate-700">
                                            {formatDetailDate(currentTicket.updated_at)}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Timeline & Internal Notes */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-8 space-y-5 sm:space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm sm:text-base font-bold text-slate-900">
                                            Activity & Internal Notes
                                        </h2>
                                        <p className="text-[11px] sm:text-xs text-slate-500">
                                            Audit trail and private notes logged by support agents.
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    {currentTicket.notes?.length || 0} {currentTicket.notes?.length === 1 ? 'Note' : 'Notes'}
                                </span>
                            </div>

                            {/* Timeline Stream */}
                            <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto pr-1 sm:pr-2">
                                {currentTicket.notes && currentTicket.notes.length > 0 ? (
                                    currentTicket.notes.map((note, index) => (
                                        <div
                                            key={note.id || index}
                                            className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2 relative transition-all hover:bg-slate-50"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                                        DS
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-800">
                                                        Support Agent
                                                    </span>
                                                </div>
                                                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    {formatDetailDate(note.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-slate-700 text-xs sm:text-sm whitespace-pre-line leading-relaxed pl-7">
                                                {note.note_text}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 sm:p-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs sm:text-sm">
                                        <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                        <p className="font-medium text-slate-600">No activity notes recorded yet.</p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Log the first internal note or resolution update below.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Add Note & Update Form inside Timeline view */}
                            <form onSubmit={handleUpdate} className="pt-4 border-t border-slate-100 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                        Append Internal Note / Update
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        placeholder="Record status updates, customer phone notes, or troubleshooting findings..."
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all leading-relaxed"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider shrink-0">
                                            Set Status:
                                        </label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full sm:w-auto py-2 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        <span>{isSaving ? 'Saving...' : 'Post Update & Save'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right 4 Columns on Desktop */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Customer 360 Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-600" />
                                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                        Customer 360
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                    Verified Contact
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr ${getAvatarColor(
                                        currentTicket.customer_name
                                    )} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-xs shrink-0`}
                                >
                                    {getInitials(currentTicket.customer_name)}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-slate-900 text-sm truncate">
                                        {currentTicket.customer_name}
                                    </div>
                                    <div className="text-xs text-slate-500">Contact Requester</div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                                    <div className="flex items-center gap-2 text-slate-700 truncate min-w-0">
                                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <a
                                            href={`mailto:${currentTicket.customer_email}`}
                                            className="text-indigo-600 hover:underline truncate"
                                            title="Send email"
                                        >
                                            {currentTicket.customer_email}
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCopyEmail}
                                        className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors cursor-pointer shrink-0"
                                        title="Copy Email"
                                    >
                                        {copiedEmail ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Status Transition Panel */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                                Quick Workflow Transition
                            </h3>

                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleQuickStatusChange('Open')}
                                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                        status === 'Open'
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold ring-2 ring-emerald-500/20'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                                    } text-xs`}
                                >
                                    <CircleDot className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                                    <span>Open</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleQuickStatusChange('In Progress')}
                                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                        status === 'In Progress'
                                            ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold ring-2 ring-amber-500/20'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                                    } text-xs`}
                                >
                                    <Clock3 className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                                    <span>In Progress</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleQuickStatusChange('Closed')}
                                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                        status === 'Closed'
                                            ? 'bg-slate-100 border-slate-300 text-slate-800 font-bold ring-2 ring-slate-400/20'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                                    } text-xs`}
                                >
                                    <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-slate-600" />
                                    <span>Closed</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={handleUpdate}
                                disabled={isSaving}
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Save className="w-3.5 h-3.5" />
                                <span>Apply Status Update</span>
                            </button>
                        </div>

                        {/* Audit Info Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-3 text-xs text-slate-600">
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                                Case Audit Metadata
                            </h3>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span className="text-slate-400">Database Record</span>
                                <span className="font-mono text-slate-700">MongoDB Atlas</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-50">
                                <span className="text-slate-400">System Channel</span>
                                <span className="font-medium text-slate-700">CRM Web Portal</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-slate-400">Assigned Queue</span>
                                <span className="font-medium text-indigo-600">General Tier-1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}