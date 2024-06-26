const mongoose = require('mongoose');

const CrudSchema = new mongoose.Schema({
    'name':{
        type:String,
        require:true
    },
    'email':{
        type:String,
        require:true
    },
    'address':{
        type:String,
        require:true
    },
    'phone':{
        type:String,
        require:true
    }

},{versionKey:false});

module.exports = mongoose.model('crudModel',CrudSchema);
console.log('crud model working successfully...');