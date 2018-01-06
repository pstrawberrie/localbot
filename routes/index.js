const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const coreController = require('../controllers/coreController');

/* Dashboard */
router.get('/', 
  coreController.index
);

module.exports = router;