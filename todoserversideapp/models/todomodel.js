const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const todoSchema= new Schema({
                               name:String,
                               email:String,
                               number:Number
                            });
module.exports=mongoose.model('todomodel',todoSchema,'contactcollection');