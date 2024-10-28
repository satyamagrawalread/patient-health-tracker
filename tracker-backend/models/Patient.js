const mongoose = require("mongoose");
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

const medicalDetail = new mongoose.Schema({
    treatment: {
        type: String,
        required: true
    },
    medications: {
        type: [String],
        default: []
    },
    dateOfService: {
        type: String,
        required: true
    },
    labResults: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
})
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    diagnosisCode: {
        type: String,
        required: true,
    },
    insurancePlan: {
        type: insuranceDetail,
        default: {}
    },
    medicalHistory: {
        type: [medicalDetail],
        default: []
    },
    treatmentPlan: {
        type: String,
        required: true
    },
    priorAuthId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PriorAuth',
        default: []
    }

})

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;