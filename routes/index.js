var express = require('express');
var router = express.Router();

const RequestLog = require('../db/RequestLog')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook', function (req, res, next) {
  console.log(req.body)
  
  const log = new RequestLog({
    url: req.url,
    method: req.method,
    createdAt: new Date(),
    body: req.body,
    headers: req.headers
  })

  RequestLog.create(log).then(() => {
    res.send('')
  }).catch(err => {
    next(err)
  })

});

module.exports = router;
