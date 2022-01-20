const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getTimeTable
} = require('../controllers/yaclients');

router.get('/time-table', getTimeTable);

module.exports = router;
