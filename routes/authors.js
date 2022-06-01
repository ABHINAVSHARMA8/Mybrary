const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')
const { route } = require('./index.js')


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

router.get('/:id',(req,res)=>{

    res.send(req.params.id)


})

router.get('/:id/edit',async (req,res)=>{
    
    
    try{
        const author = await Author.findById(req.params.id)

        res.render('authors/edit.ejs',{author:author})
    }

    catch{
        res.redirect('author')
    }
    
})

router.put('/:id', async (req,res)=>{
    let author; // should be avaliable inside catch block

    try{

        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/author/${author.id}`)
    }

    catch{

        if(author== null){

            res.redirect('/')
        }

        else{

            res.render('author/edit',{

                author:author,
                errorMessage: "Error in updating author"
            })
        }
    }

    
})

router.delete('/:id', async (req,res)=>{
    let author; // should be avaliable inside catch block

    try{

        author = await Author.findById(req.params.id)
        
        await author.remove()
        res.redirect('/author')
    }

    catch{

        if(author== null){

            res.redirect('/')
        }

        else{

            res.render(`author/${author.id}`)
        }
    }

    
})





module.exports = router