const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')


//get all authors
router.get('/',async (req,res)=>{

    let searchOptions = {}

    

    if(req.query.name != null && req.query.name !==""){ // GET sends tp req.query andn POST sends to req.body

        searchOptions.name = new RegExp(req.query.name,'i')
    }

    try{

        authors = await Author.find(searchOptions) // {} means - no condition

        res.render('authors/index.ejs',{
        
        authors : authors,
        searchOptions : req.query
        
        })
    }
    catch{
        res.render('/');


    }
})

//get new authors
router.get('/new',(req,res)=>{

    res.render('authors/new.ejs',{author : new Author()});
})

//create a new author
router.post('/', async (req,res)=>{

   
    const author = new Author({

        name : req.body.name
    })



    try{

        const newAuthor = await author.save()

        

        res.redirect('author')

    }

    catch{
        res.render('authors/new',{

            author:author,
            errorMessage : 'Invalid Name Entered'
        })
    

    }

   
})


module.exports = router