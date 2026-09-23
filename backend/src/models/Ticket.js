const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        ticket_id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        customer_name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
        },
        customer_email: {
            type: String,
            required: [true, 'Customer email is required'],
            trim: true,
            lowercase: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Closed'],
            default: 'Open',
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);