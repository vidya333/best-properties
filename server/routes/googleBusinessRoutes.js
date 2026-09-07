const express = require('express');
const router = express.Router();
const { getGoogleBusinessData } = require('../controllers/googleBusinessController');

// GET /api/business/live-data
router.get('/live-data', getGoogleBusinessData);

module.exports = router;