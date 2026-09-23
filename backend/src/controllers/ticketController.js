const Ticket = require('../models/Ticket');
const Note = require('../models/Note');

// Helper to generate custom sequence ID (e.g., TKT-001)
const generateTicketId = async () => {
    const count = await Ticket.countDocuments();
    const nextNumber = count + 1;
    return `TKT-${String(nextNumber).padStart(3, '0')}`;
};

// @desc    Create a new support ticket
// @route   POST /api/tickets
// @access  Public
const createTicket = async (req, res) => {
    try {
        const { customer_name, customer_email, subject, description } = req.body;

        if (!customer_name || !customer_email || !subject || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let ticket_id = await generateTicketId();

        // Ensure uniqueness in case of race condition
        let existingTicket = await Ticket.findOne({ ticket_id });
        while (existingTicket) {
            const randomExtra = Math.floor(1000 + Math.random() * 9000);
            ticket_id = `TKT-${randomExtra}`;
            existingTicket = await Ticket.findOne({ ticket_id });
        }

        const ticket = await Ticket.create({
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
            status: 'Open',
        });

        return res.status(201).json({
            ticket_id: ticket.ticket_id,
            created_at: ticket.created_at,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all tickets (with search & filter)
// @route   GET /api/tickets
// @access  Public
const getTickets = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};

        if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
            query.status = status;
        }

        if (search && search.trim() !== '') {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { ticket_id: regex },
                { customer_name: regex },
                { customer_email: regex },
                { subject: regex },
                { description: regex },
            ];
        }

        const tickets = await Ticket.find(query).sort({ created_at: -1 });

        const response = tickets.map((t) => ({
            ticket_id: t.ticket_id,
            customer_name: t.customer_name,
            customer_email: t.customer_email,
            subject: t.subject,
            status: t.status,
            created_at: t.created_at,
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single ticket by ticket_id with notes
// @route   GET /api/tickets/:ticket_id
// @access  Public
const getTicketById = async (req, res) => {
    try {
        const { ticket_id } = req.params;
        const ticket = await Ticket.findOne({ ticket_id });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const notes = await Note.find({ ticket_id }).sort({ created_at: -1 });

        return res.status(200).json({
            ticket_id: ticket.ticket_id,
            customer_name: ticket.customer_name,
            customer_email: ticket.customer_email,
            subject: ticket.subject,
            description: ticket.description,
            status: ticket.status,
            created_at: ticket.created_at,
            updated_at: ticket.updated_at,
            notes: notes.map((n) => ({
                id: n._id,
                note_text: n.note_text,
                created_at: n.created_at,
            })),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update ticket status and optionally add a note
// @route   PUT /api/tickets/:ticket_id
// @access  Public
const updateTicket = async (req, res) => {
    try {
        const { ticket_id } = req.params;
        const { status, notes } = req.body;

        const ticket = await Ticket.findOne({ ticket_id });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
            ticket.status = status;
        }

        ticket.updated_at = Date.now();
        await ticket.save();

        if (notes && typeof notes === 'string' && notes.trim() !== '') {
            await Note.create({
                ticket_id: ticket.ticket_id,
                note_text: notes.trim(),
            });
        }

        return res.status(200).json({
            success: true,
            updated_at: ticket.updated_at,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
};