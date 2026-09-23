import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createNewTicket, reset } from '../features/tickets/ticketSlice';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '../context/ToastContext';
import {
    Send,
    ArrowLeft,
    User,
    Mail,
    FileText,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    Clock,
    Shield,
    Eye,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

export default function TicketCreate() {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        subject: '',
        description: '',
    });

    const [showMobilePreview, setShowMobilePreview] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);

    useEffect(() => {
        if (isSuccess) {
            toast.success(
                'Support Ticket Created',
                `Ticket has been assigned to queue and registered in database.`
            );
            dispatch(reset());
            navigate('/');
        }
    }, [isSuccess, dispatch, navigate, toast]);

    useEffect(() => {
        if (isError && message) {
            toast.error('Ticket Submission Error', message);
        }
    }, [isError, message, toast]);

    const onChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!formData.customer_name.trim() || !formData.customer_email.trim() || !formData.subject.trim() || !formData.description.trim()) {
            toast.warning('Incomplete Form', 'Please fill out all required fields before submitting.');
            return;
        }

        toast.info('Dispatching Ticket', 'Registering customer inquiry in the CRM queue...');
        dispatch(createNewTicket(formData));
    };

    return (
        <div className="crm-bg-mesh min-h-[calc(100vh-4rem)] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl 2xl:max-w-6xl mx-auto space-y-5 sm:space-y-6">
                {/* Back Link & Header */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Ticket Queue</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="hidden xs:inline">CRM Portal</span>
                        <span className="text-slate-400">v2.4</span>
                    </div>
                </div>

                {/* Mobile Preview Toggle Button (Only on small screens) */}
                <div className="lg:hidden">
                    <button
                        type="button"
                        onClick={() => setShowMobilePreview(!showMobilePreview)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs"
                    >
                        <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-indigo-600" />
                            {showMobilePreview ? 'Hide Live Queue Preview' : 'Show Live Queue Preview'}
                        </span>
                        {showMobilePreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left 7 cols: Modern Ticket Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-8">
                            <div className="border-b border-slate-100 pb-4 sm:pb-5 mb-5 sm:mb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                        Create Support Ticket
                                    </h1>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                        NEW
                                    </span>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm">
                                    Submit details about the customer issue to populate a trackable CRM ticket.
                                </p>
                            </div>

                            {isError && (
                                <div className="mb-5 sm:mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-xs sm:text-sm">Failed to create ticket</p>
                                        <p className="text-xs text-rose-600 mt-0.5">{message}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
                                {/* Customer Name & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Customer Name <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                name="customer_name"
                                                required
                                                value={formData.customer_name}
                                                onChange={onChange}
                                                placeholder="e.g. John Doe"
                                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Customer Email <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                name="customer_email"
                                                required
                                                value={formData.customer_email}
                                                onChange={onChange}
                                                placeholder="john@example.com"
                                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Issue Subject */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            Issue Subject <span className="text-rose-500">*</span>
                                        </label>
                                        <span className="text-[11px] text-slate-400">
                                            {formData.subject.length}/100 chars
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            maxLength={100}
                                            value={formData.subject}
                                            onChange={onChange}
                                            placeholder="e.g. Payment Gateway Failure"
                                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Detailed Description */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            Issue Description <span className="text-rose-500">*</span>
                                        </label>
                                        <span className="text-[11px] text-slate-400">
                                            Detailed explanation
                                        </span>
                                    </div>
                                    <textarea
                                        name="description"
                                        required
                                        rows={5}
                                        value={formData.description}
                                        onChange={onChange}
                                        placeholder="Detailed explanation of the problem, steps to reproduce, or user error details..."
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all leading-relaxed"
                                    />
                                </div>

                                {/* Form Action Buttons */}
                                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="w-full sm:w-1/3 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full sm:w-2/3 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{isLoading ? 'Creating Ticket...' : 'Submit Ticket'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right 5 cols: Real-Time Preview & CRM Help */}
                    <div className={`lg:col-span-5 space-y-6 ${showMobilePreview ? 'block' : 'hidden lg:block'}`}>
                        {/* Live Preview Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-indigo-600" />
                                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                        Live Queue Preview
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                    PREVIEW
                                </span>
                            </div>

                            <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold text-indigo-600">
                                        TKT-NEW
                                    </span>
                                    <StatusBadge status="Open" />
                                </div>

                                <div>
                                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                                        Customer
                                    </div>
                                    <div className="text-sm font-bold text-slate-900 truncate">
                                        {formData.customer_name || 'Customer Name'}
                                    </div>
                                    <div className="text-xs text-slate-500 truncate">
                                        {formData.customer_email || 'customer@example.com'}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                                        Subject
                                    </div>
                                    <div className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2">
                                        {formData.subject || 'Issue subject will appear here...'}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                                        Description Preview
                                    </div>
                                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/60 line-clamp-3 italic">
                                        {formData.description || 'Description summary will render here...'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CRM SLA Best Practices Card */}
                        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md shadow-indigo-950/20">
                            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                                <span>Support Best Practices</span>
                            </div>

                            <ul className="space-y-2.5 text-xs text-slate-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Verify the customer's email address to ensure resolution notifications arrive.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Keep subject line concise and descriptive for fast search indexing.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                    <span>Standard SLA resolution target: within <strong>24 business hours</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}