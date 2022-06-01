const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({

    title :{
        type:String,
        required : true
    },

    description:{

        type : String
    },

    publishDate:{

        type:Date,
        required:false
    },

    pageCount:{

        type :Number,
        required: true
    },

    createdAt:{

        type:Date,
        required : true,
        default : Date.now
    },

    coverImage:{

        type : Buffer,
        required : true
    },

    coverImageType:{

        type:String,
        required : true
    },

    author:{

        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Author' // should be the same as 'Author' as defined in /models/author.js
    }


})

module.exports = mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath = coverImageBasePath