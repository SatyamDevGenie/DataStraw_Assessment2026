import React from 'react';
import { CircleDot, Clock3, CheckCircle2 } from 'lucide-react';

export default function StatusBadge({ status, size = 'sm' }) {
    const statusConfig = {
        Open: {
            container: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80 shadow-emerald-500/10',
            dot: 'bg-emerald-500 ring-emerald-400/40',
            icon: CircleDot,
            pulse: true,
        },
        'In Progress': {
            container: 'bg-amber-50/90 text-amber-700 border-amber-200/80 shadow-amber-500/10',
            dot: 'bg-amber-500 ring-amber-400/40',
            icon: Clock3,
            pulse: false,
        },
        Closed: {
            container: 'bg-slate-100/90 text-slate-600 border-slate-200/80 shadow-slate-500/10',
            dot: 'bg-slate-400 ring-slate-300/40',
            icon: CheckCircle2,
            pulse: false,
        },
    };

    const current = statusConfig[status] || statusConfig.Open;
    const IconComponent = current.icon;

    if (size === 'lg') {
        return (
            <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border shadow-xs tracking-wide transition-all ${current.container}`}
            >
                <span className="relative flex h-2 w-2">
                    {current.pulse && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`}></span>
                </span>
                <IconComponent className="w-3.5 h-3.5" />
                <span>{status}</span>
            </span>
        );
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shadow-xs tracking-wide transition-all ${current.container}`}
        >
            <span className="relative flex h-1.5 w-1.5">
                {current.pulse && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${current.dot}`}></span>
            </span>
            <span>{status}</span>
        </span>
    );
}