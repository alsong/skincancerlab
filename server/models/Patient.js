const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    age: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sex: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


patientSchema.index({
    name: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient }