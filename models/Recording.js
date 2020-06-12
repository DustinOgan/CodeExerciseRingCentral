const mongoose = require('mongoose');

RecordingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    toNo: {
        type: String,
        required: true
    },
    fromNo: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true
    },
    robocallIndicator : {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number,
        required: true,
    }

});

module.exports = mongoose.model('Recordings',RecordingSchema);