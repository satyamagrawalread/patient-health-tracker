const Patient = require("../models/Patient");
const { searchQueryChecker } = require("../services/patient");
const addNewPatient = async (req, res, next) => {
  {
    try {
      const {
        name,
        age,
        gender,
        condition,
        diagnosisCode,
        insurancePlan,
        medicalHistory,
        treatmentPlan,
      } = req.body;

      const patient = Patient({
        name,
        age,
        gender,
        condition,
        diagnosisCode,
        insurancePlan,
        medicalHistory,
        treatmentPlan,
      });
      await patient.save();
      return res.status(201).send({ message: "Patient added Successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const { filters, searchQuery } = req.query;
    let filtersList = [];
    if (filters) {
      filtersList = filters.split(",");
    }
    const patients = await Patient.find().lean();
    // console.log(patients[0]);
    if (!!searchQuery) {
      const patientsResult = patients.reduce((acc, curr) => {
        const isAccepted = !!searchQueryChecker(curr, filtersList, searchQuery);
        if (isAccepted) {
          return [
            ...acc,
            {
              _id: curr._id,
              name: curr.name,
              age: curr.age,
              gender: curr.gender,
              condition: curr.condition,
            },
          ];
        } else {
          return [...acc];
        }
      }, []);
      res.status(200).send({ data: patientsResult });
    } else {
      const patientsResult = patients.reduce((acc, curr) => {
        return [
          ...acc,
          {
            _id: curr._id,
            name: curr.name,
            age: curr.age,
            gender: curr.gender,
            condition: curr.condition,
          },
        ];
      }, []);
      res.status(200).send({ data: patientsResult });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const patientData = await Patient.findOne({ _id: patientId });
    if (!patientData) {
      return res.status(404).send({ message: "Patient not found" });
    }
    return res.status(200).send({ data: patientData });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { addNewPatient, getAllPatients, getPatientById };
