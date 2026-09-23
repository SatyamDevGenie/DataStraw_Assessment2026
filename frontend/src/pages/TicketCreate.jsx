import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewTicket, reset } from '../features/tickets/ticketSlice';
import { Send, ArrowLeft } from 'lucide-react';

export default function TicketCreate() {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        subject: '',
        description: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            navigate('/');
        }
    }, [isSuccess, dispatch, navigate]);

    const onChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewTicket(formData));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <h1 className="text-xl font-bold text-slate-900 mb-1">Create Support Ticket</h1>
                <p className="text-slate-500 text-sm mb-6">
                    Submit details about the customer issue to populate a trackable CRM ticket.
                </p>

                {isError && (
                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
                        {message}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                required
                                value={formData.customer_name}
                                onChange={onChange}
                                placeholder="John Doe"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                Customer Email
                            </label>
                            <input
                                type="email"
                                name="customer_email"
                                required
                                value={formData.customer_email}
                                onChange={onChange}
                                placeholder="john@example.com"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                            Issue Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={onChange}
                            placeholder="e.g. Payment Gateway Failure"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                            Issue Description
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={5}
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Detailed explanation of the problem..."
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {isLoading ? 'Creating Ticket...' : 'Submit Ticket'}
                    </button>
                </form>
            </div>
        </div>
    );
}