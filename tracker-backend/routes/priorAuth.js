const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();
const { createPriorAuthRequest, getAPriorAuthRequestData, getAllPriorAuthRequestsByProviderId } = require('../controllers/priorAuth');

router.post('/request/create', authenticate, createPriorAuthRequest);
router.get('/request/:id', authenticate, getAPriorAuthRequestData)
router.get('/requests', authenticate, getAllPriorAuthRequestsByProviderId);

module.exports = router;