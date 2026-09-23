import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketList from './pages/TicketList';
import TicketCreate from './pages/TicketCreate';
import TicketDetail from './pages/TicketDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/create" element={<TicketCreate />} />
            <Route path="/ticket/:ticket_id" element={<TicketDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}