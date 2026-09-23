import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tickets';

const getTickets = async (statusFilter = '', searchQuery = '') => {
    const params = new URLSearchParams();
    if (statusFilter && statusFilter !== 'All') {
        params.append('status', statusFilter);
    }
    if (searchQuery) {
        params.append('search', searchQuery);
    }

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
};

const getTicketById = async (ticket_id) => {
    const response = await axios.get(`${API_URL}/${ticket_id}`);
    return response.data;
};

const createTicket = async (ticketData) => {
    const response = await axios.post(API_URL, ticketData);
    return response.data;
};

const updateTicket = async (ticket_id, updateData) => {
    const response = await axios.put(`${API_URL}/${ticket_id}`, updateData);
    return response.data;
};

const ticketService = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
};

export default ticketService;