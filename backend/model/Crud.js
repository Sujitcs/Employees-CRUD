const mongoose = require('mongoose');

const CrudSchema = new mongoose.Schema({
    'name':{
        type:String,
        require:true,
        trim: true
    },
    'email':{
        type:String,
        require:true,
        trim: true
    },
    'address':{
        type:String,
        require:true,
        trim: true
    },
    'phone':{
        type:Number,
        require:true,
        trim: true,
        min:[10], 
    }
},{versionKey:false});

module.exports = mongoose.model('crudModel',CrudSchema);
console.log('crud model working successfully...');
