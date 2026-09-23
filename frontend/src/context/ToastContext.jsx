import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    CheckCircle2,
    AlertCircle,
    Info,
    AlertTriangle,
    X,
    Sparkles,
} from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        ({
            title,
            description = '',
            type = 'info', // 'success' | 'error' | 'info' | 'warning' | 'custom'
            duration = 4000,
            icon = null,
        }) => {
            const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
            const newToast = { id, title, description, type, duration, icon };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }

            return id;
        },
        [removeToast]
    );

    const toast = {
        success: (title, description, duration) =>
            addToast({ title, description, type: 'success', duration }),
        error: (title, description, duration) =>
            addToast({ title, description, type: 'error', duration }),
        info: (title, description, duration) =>
            addToast({ title, description, type: 'info', duration }),
        warning: (title, description, duration) =>
            addToast({ title, description, type: 'warning', duration }),
        custom: (title, description, icon, duration) =>
            addToast({ title, description, type: 'custom', icon, duration }),
        dismiss: removeToast,
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {/* Toast Container - Mobile-first responsive placement */}
            <div
                aria-live="polite"
                className="fixed top-4 right-4 left-4 sm:left-auto sm:right-6 sm:top-6 z-[9999] pointer-events-none flex flex-col items-center sm:items-end gap-2.5 max-w-sm w-full"
            >
                {toasts.map((item) => (
                    <ToastItem key={item.id} toast={item} onDismiss={() => removeToast(item.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onDismiss }) {
    const typeConfig = {
        success: {
            border: 'border-emerald-500/30',
            bg: 'bg-slate-900/95 text-white',
            icon: CheckCircle2,
            iconColor: 'text-emerald-400',
            glow: 'shadow-emerald-500/10',
            badgeBg: 'bg-emerald-500/20 text-emerald-300',
            badge: 'Success',
            progressBg: 'bg-emerald-500',
        },
        error: {
            border: 'border-rose-500/30',
            bg: 'bg-slate-900/95 text-white',
            icon: AlertCircle,
            iconColor: 'text-rose-400',
            glow: 'shadow-rose-500/10',
            badgeBg: 'bg-rose-500/20 text-rose-300',
            badge: 'Error',
            progressBg: 'bg-rose-500',
        },
        warning: {
            border: 'border-amber-500/30',
            bg: 'bg-slate-900/95 text-white',
            icon: AlertTriangle,
            iconColor: 'text-amber-400',
            glow: 'shadow-amber-500/10',
            badgeBg: 'bg-amber-500/20 text-amber-300',
            badge: 'Warning',
            progressBg: 'bg-amber-500',
        },
        info: {
            border: 'border-indigo-500/30',
            bg: 'bg-slate-900/95 text-white',
            icon: Info,
            iconColor: 'text-indigo-400',
            glow: 'shadow-indigo-500/10',
            badgeBg: 'bg-indigo-500/20 text-indigo-300',
            badge: 'Info',
            progressBg: 'bg-indigo-500',
        },
        custom: {
            border: 'border-purple-500/30',
            bg: 'bg-slate-900/95 text-white',
            icon: Sparkles,
            iconColor: 'text-purple-400',
            glow: 'shadow-purple-500/10',
            badgeBg: 'bg-purple-500/20 text-purple-300',
            badge: 'Notice',
            progressBg: 'bg-purple-500',
        },
    };

    const config = typeConfig[toast.type] || typeConfig.info;
    const IconComponent = toast.icon || config.icon;

    return (
        <div
            className={`pointer-events-auto w-full backdrop-blur-xl border ${config.border} ${config.bg} p-4 rounded-2xl shadow-2xl ${config.glow} transform transition-all duration-300 ease-out animate-in slide-in-from-top-3 sm:slide-in-from-right-3 overflow-hidden relative group`}
        >
            <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-xl bg-slate-800/80 shrink-0 ${config.iconColor}`}>
                    <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-xs font-bold text-slate-100 tracking-tight leading-snug">
                            {toast.title}
                        </h4>
                        <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${config.badgeBg}`}>
                            {config.badge}
                        </span>
                    </div>

                    {toast.description && (
                        <p className="text-xs text-slate-300 leading-relaxed break-words line-clamp-3">
                            {toast.description}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onDismiss}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors shrink-0 cursor-pointer"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Countdown animation bar */}
            {toast.duration > 0 && (
                <div
                    className={`absolute bottom-0 left-0 h-[2px] ${config.progressBg} opacity-80`}
                    style={{
                        animation: `shrinkWidth ${toast.duration}ms linear forwards`,
                    }}
                />
            )}
        </div>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
