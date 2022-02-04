const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getTimeTable, getServices, getStaff
} = require('../controllers/yaclients');

router.get('/time-table', getTimeTable);
router.get('/services', getServices);
router.post('/staff', celebrate({
  body: Joi.object().keys({
      staff_id: Joi.string().required(),
  }),
}), getStaff)

module.exports = router;
