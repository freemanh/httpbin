const mongoose = require('mongoose')

const { Schema } = mongoose;

const schema = new Schema({
    url: String,
    method: String,
    headers: {
        type: Map,
        of: String
    },
    body: String,
    createdAt: Date

});

module.exports = mongoose.model('RequestLog', schema)