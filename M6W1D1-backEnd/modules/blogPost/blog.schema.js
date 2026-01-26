const mongoose=require('mongoose');

const BlogPost=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        min: 5
    },
    cover:{
        type:String,
        required:true,
        default:""
    
    },
    readTime:{
        value:{
            type:String,
            default:"",
            required:false
        },
        unit:{
            type:Number,
            required:false,
            default:0
        }
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'author',
        required:true
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ],
    content:{
        type:String,
        required:true,
    
   
    }
} , { timestamps: true,  strict: true });

module.exports=mongoose.model('blogPost',BlogPost,"blogPosts");
