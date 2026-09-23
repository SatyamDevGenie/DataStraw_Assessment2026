import React from 'react';

export function TableSkeleton({ rows = 5 }) {
    return (
        <div className="divide-y divide-slate-100 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 gap-4">
                    <div className="flex items-center gap-3 w-1/4">
                        <div className="w-16 h-5 bg-slate-200 rounded-md"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                        <div className="space-y-1.5 flex-1">
                            <div className="w-24 h-4 bg-slate-200 rounded"></div>
                            <div className="w-32 h-3 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                    <div className="w-1/3 space-y-1.5">
                        <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                    </div>
                    <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
                    <div className="w-28 h-3 bg-slate-100 rounded"></div>
                    <div className="w-20 h-7 bg-slate-200 rounded-md"></div>
                </div>
            ))}
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            <div className="w-32 h-4 bg-slate-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="w-24 h-6 bg-slate-200 rounded-full"></div>
                            <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="w-3/4 h-8 bg-slate-200 rounded"></div>
                        <div className="w-full h-24 bg-slate-100 rounded-xl"></div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="w-32 h-4 bg-slate-100 rounded"></div>
                            <div className="w-32 h-4 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                        <div className="w-40 h-5 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                            <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                        <div className="w-28 h-5 bg-slate-200 rounded"></div>
                        <div className="w-full h-10 bg-slate-100 rounded-lg"></div>
                        <div className="w-full h-20 bg-slate-100 rounded-lg"></div>
                        <div className="w-full h-10 bg-slate-200 rounded-lg"></div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                        <div className="w-36 h-5 bg-slate-200 rounded"></div>
                        <div className="w-full h-12 bg-slate-100 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default { TableSkeleton, DetailSkeleton };
