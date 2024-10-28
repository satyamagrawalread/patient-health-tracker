const PriorAuth = require('../models/PriorAuth');
const Patient = require('../models/Patient');
const createPriorAuthRequest = async(req, res, next) => {
    const user = req.user;
    try {
        const requestData = req.body;
        // console.log('line7 ', requestData);
        const addedReqestData = PriorAuth({...requestData, healthcareProviderId: user._id, healthcareProviderName: user.username});
        await addedReqestData.save();
        const patient = await Patient.findOne({_id: requestData.patientId}).lean();
        let priorAuthIds = patient.priorAuthId;
        priorAuthIds.push(addedReqestData._id);
        await Patient.updateOne({_id: requestData.patientId}, {priorAuthId: priorAuthIds}).then(updatedPatient => {
            // console.log(updatedPatient);
        }).catch(async(err) => {
            await PriorAuth.deleteOne({_id: addedReqestData._id});
            return res.status(500).send({message: "Internal Server Error"});
        });
        return res.status(201).send({message: "Request Created Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getAPriorAuthRequestData = async(req, res, next) => {
    try {
        const requestId = req.params.id;
        const requestData = await PriorAuth.findOne({_id: requestId}).lean();
        return res.status(200).send({data: requestData});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

const getAllPriorAuthRequestsByProviderId = async(req, res, next) => {
    const user = req.user;
    try {
        const allRequestData = await PriorAuth.find({healthcareProviderId: user._id}).lean();
        res.status(200).send({data: allRequestData});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

module.exports = { createPriorAuthRequest, getAPriorAuthRequestData, getAllPriorAuthRequestsByProviderId };