import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketList from './pages/TicketList';
import TicketCreate from './pages/TicketCreate';
import TicketDetail from './pages/TicketDetail';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/create" element={<TicketCreate />} />
            <Route path="/ticket/:ticket_id" element={<TicketDetail />} />
          </Routes>
        </main>
        
        {/* Enterprise CRM Footer */}
        <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-xs py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">DataStraw CRM</span>
              <span className="text-slate-300">•</span>
              <span>created by Satyam Sawant</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              React 19 • Redux Toolkit • Tailwind CSS • MongoDB
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}