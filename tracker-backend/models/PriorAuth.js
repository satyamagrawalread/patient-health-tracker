const mongoose = require('mongoose');
const insuranceDetail = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    policyNumber: {
        type: String,
        required: true
    },
    groupNumber: {
        type: String,
        required: true
    }
});
const priorAuthSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    treatmentPlan: {
        type: String,
        required: true
    },
    diagnosisCode: {
        type: String,
        required: true
    },
    insurancePlan: {
        type: insuranceDetail,
        required: true
    },
    healthcareProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    healthcareProviderName: {
        type: String,
        required: true
    },
    dateOfService: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    doctorNotes: String
}, { timestamps: true })

const PriorAuth = mongoose.model("PriorAuth", priorAuthSchema);

module.exports = PriorAuth;