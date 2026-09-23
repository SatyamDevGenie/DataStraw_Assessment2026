const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        ticket_id: {
            type: String,
            required: true,
            ref: 'Ticket',
        },
        note_text: {
            type: String,
            required: [true, 'Note text cannot be empty'],
            trim: true,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
    }
);

module.exports = mongoose.model('Note', noteSchema);