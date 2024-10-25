var mongoose = require('mongoose')

var userSchema =new mongoose.Schema({
    username:String,
    accno:{type:Number,require:true,unique:true},
    currentbalance: { type: Number, required: true,default:0},
    date:{ type: Date, default: Date.now },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' } 
})
module.exports =mongoose.model('user',userSchema);