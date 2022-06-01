const express = require('express')
const router = express.Router()
const Book = require('../models/book.js')
const Author = require('../models/author.js')
const multer = require('multer')
const path = require('path')
const uploadPath = path.join('public',Book.coverImageBasePath)
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const upload = multer({

    dest : uploadPath,

    fileFilter : (req,file,callback)=>{

        callback(null,imageMimeTypes.includes(file.mimetype))
    }

})


//get all books
router.get('/',async (req,res)=>{

    res.render('books/index.ejs')

   
})

//get new books
router.get('/new',async (req,res)=>{

    renderNewPages(res,new Book(),false)
})

//create a new book
router.post('/', upload.single('cover'),async (req,res)=>{

    const fileName = req.fileName != null ? req.fileName : "random";

   /* console.log(fileName)
    console.log(req.body.title)
    console.log(req.body.description)
    console.log((req.body.date))
    console.log(req.body.pageCount)*/

    const book = new Book({

        title : req.body.title,
        description : req.body.description,
        publishDate : new Date(req.body.date),
        pageCount : req.body.pageCount,
        author : req.body.author,
        coverImageName : fileName
    })

    try{

        const newBook =  await book.save();
        res.redirect('books');
    }

    catch(err){
        console.log(err)
        renderNewPages(res,book,true)

    }
 
})

async function renderNewPages(res,book,hasError){

    try{

        const authors = await Author.find({})
        //const book = new Book()

        const params ={

            authors : authors,
            book : book
        }

        //console.log(hasError)

        if(hasError) errorMessage = 'Error creating Book'

        res.render('books/new',params)

    }

    catch{

        res.redirect('books')
    }
}


module.exports = router