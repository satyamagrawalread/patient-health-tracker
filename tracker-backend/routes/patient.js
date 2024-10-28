const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();
const { addNewPatient, getAllPatients, getPatientById } = require('../controllers/patient');

router.post('/patient', authenticate, addNewPatient);
router.get('/patients', authenticate, getAllPatients);
router.get('/patient/:id', authenticate, getPatientById);

module.exports = router;