const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        group: {
            type: String,
            enum: ['General', 'Family', 'Sports', 'Study', 'Work'],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);