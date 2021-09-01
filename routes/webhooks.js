var express = require('express');
var router = express.Router();

const RequestLog = require('../db/RequestLog')

router.get('/', function (req, res, next) {
  const log = new RequestLog({
    url: req.originalUrl,
    path: req.originalUrl,
    method: req.method,
    createdAt: new Date(),
    // when request body is empty, req.body return a empty object
    body: typeof req.body === 'string' ? req.body : null,
    headers: req.headers
  })

  RequestLog.create(log).then(() => {
    res.send('')
    req.app.get('io').emit('refresh')
  }).catch(err => {
    next(err)
  })

});

module.exports = router;
