import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketList from './pages/TicketList';
import TicketCreate from './pages/TicketCreate';
import TicketDetail from './pages/TicketDetail';
import { ToastProvider } from './context/ToastContext';
import './App.css';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            <Routes>
              <Route path="/" element={<TicketList />} />
              <Route path="/create" element={<TicketCreate />} />
              <Route path="/ticket/:ticket_id" element={<TicketDetail />} />
            </Routes>
          </main>

          {/* Enterprise CRM Responsive Footer */}
          <footer className="border-t border-slate-200/80 bg-white/90 backdrop-blur-md py-5 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 mt-auto">
            <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-slate-800">DataStraw CRM</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Enterprise Customer Support Hub</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-indigo-600 font-medium hidden sm:inline">Assessment Edition</span>
              </div>
              <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                <span>Production Ready</span>
                <span>•</span>
                <span>MERN Architecture</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ToastProvider>
  );
}