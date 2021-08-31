var express = require('express');
var router = express.Router();
const RequestLog = require('../db/RequestLog')

router.get('/', function (req, res, next) {

    RequestLog.find({}, null, { sort: '-createdAt', limit: 50 }, (err, logs) => {
        res.send(logs)
    })
});

module.exports = router;