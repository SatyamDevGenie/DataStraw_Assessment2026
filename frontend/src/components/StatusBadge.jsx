import React from 'react';

export default function StatusBadge({ status }) {
    const styles = {
        Open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
        Closed: 'bg-slate-100 text-slate-600 border-slate-200',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles.Open
                }`}
        >
            {status}
        </span>
    );
}