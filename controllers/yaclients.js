const moment = require('moment-timezone');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));



const ConflictError = require('../errors/сonflict-err');
const InvalidDataError = require('../errors/invalid-data-err');

const token = process.env.API_KEY;



const opts = {
  new: true,
  runValidators: true,
};



module.exports.getTimeTable = (req, res, next) => {
  const realDate = new Date
  let date = moment(realDate.toISOString()).tz("Europe/Moscow").format('YYYY-MM-DD')

  async function fetchTimeTable() {

    const response = await fetch(`https://n690156.yclients.com/api/v1/activity/652128/search/?from=${date}&till=9999-01-01`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.yclients.v2+json',
        'Authorization': `Bearer ${token}`,
      }
    });
    const data = await response.json();
    return await data
  }
  fetchTimeTable()
    .then((data) => {
      if(data.success){
        res.status(200).send({ data: data.data })
      } else{
        throw new Error('Что то пошло не так');
      }
      
      console.log(data);
    })
    .catch((err) => {
      throw new ConflictError('Что то пошло не так');
    })
    .catch(next)
}