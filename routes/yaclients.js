const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getTimeTable, getServices
} = require('../controllers/yaclients');

router.get('/time-table', getTimeTable);
router.get('/services', getServices)

module.exports = router;
