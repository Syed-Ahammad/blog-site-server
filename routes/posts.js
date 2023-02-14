const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');


// POST Create

router.post('/create', async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save(newPost);
        res.status(200).json(savePost);
    }
    catch(err){

    }
});


// POST Update

router.put('/update/:id', async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);
        if(req.body.username === post.username){
           try{
            const updatePost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatePost)
           }
           catch(err){
            res.status(500).json(err)
           }
        }
        else{
            res.status(401).json("you can only update your post.....")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
   
   
});
// POST delete

router.delete('/delete/:id', async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);
        if(req.body.username === post.username){
           try{
           await post.delete()
            res.status(200).json("Post has been deleted.....")
           }
           catch(err){
            res.status(500).json(err)
           }
        }
        else{
            res.status(401).json("you can only delete your post.....")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
   
   
});


// GET post
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
});

// GET All post
router.get("/", async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;

    try{
        let posts;
        if(username){
        posts = await Post.find({username});
        }
        else if(catName){
            posts = await Post.find({categories: {$in: [catName]}})
        }
        else{
            posts = await Post.find()
        }

        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})




module.exports = router;