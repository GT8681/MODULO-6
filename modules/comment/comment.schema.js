const moongose = require('mongoose');


const commentSchema = new moongose.Schema({
    content:{
        type:String,
        required:true,
        min:10
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    author:{
        type:moongose.Schema.Types.ObjectId,
        ref:'author',
        required:true

    },
    blogPost:{
        type:moongose.Schema.Types.ObjectId,
        ref:'blogPost'
    }
} , { timestamps: true,  strict: true });

module.exports=moongose.model('comment',commentSchema,"comments");