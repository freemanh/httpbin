var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).then(()=>{
    console.log('Connected to mongodb.')
}).catch(err=>{
    console.error('Failed to connect to mongodb')
    process.exit(1);
})

