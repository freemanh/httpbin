const mongoose = require('mongoose')

const { Schema } = mongoose;

const schema = new Schema({
    url: String,
    path: String,
    method: String,
    headers: {
        type: Map,
        of: String
    },
    body: String,
    createdAt: Date

});

module.exports = mongoose.model('RequestLog', schema)