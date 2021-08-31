var express = require('express');
var url = require('url');
var router = express.Router();

const RequestLog = require('../db/RequestLog')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook', function (req, res, next) {
  const fullURL = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.url
  });

  const log = new RequestLog({
    url: fullURL,
    path: req.url,
    method: req.method,
    createdAt: new Date(),
    body: req.body,
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
