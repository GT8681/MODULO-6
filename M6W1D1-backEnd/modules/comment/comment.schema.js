const moongose = require('mongoose');


const commentSchema = new moongose.Schema({
    content:{
        type:String,
        required:true,
    
    },
    rating:{
        type:Number,
        required:false,
        min:1,
        max:5
    },
   blogPost:{
     type:moongose.Schema.Types.ObjectId,
     ref:'blogPost'
    },
    author:{
        type:moongose.Schema.Types.ObjectId,
        ref:'author'

    },
   
} , { timestamps: true,  strict: true });

module.exports=moongose.model('comment',commentSchema,"comments");