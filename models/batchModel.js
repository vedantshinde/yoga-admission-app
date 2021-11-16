const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Batch must belong to a User!'],
        },
        start_time: {
            type: String,
            default: '7:00AM',
            trim: true
        },
        end_time: {
            type: String,
            default: '8:00AM',
            trim: true
        },
        activation_date:{
            type:Date,
            default: Date.now()
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        }
    }
);

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;