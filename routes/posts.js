let express = require('express');
let router = express.Router();
let Post = require('../models/posts');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: application/json, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
 
//recuperer les données a partir de la bdd, et l'afficher : 
router.get('/', async (req,res)=>{
    try{
        //find retourne les donnée du type Post (le model)
        console.log('rani b3at');
        let post = await Post.find();
        res.json(post);
    }catch(err){
        res.json({message : err});
    }
});

//recupere une donnée précise : 
router.get('/:postId',async (req,res)=>{
    try{
    let post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.json({message: err});
    }
});
/*
//supprimer une donnée : 
router.delete('/:postId',async (req,res)=>{
    try{
        let removedPost = await Post.remove({_id : req.params.postId});
        res.json(removedPost);
        }catch(err){
            res.json({message: err});
        }
})*/
router.delete('/postTitle',async (req,res)=>{
    try{
        let removedPost = await Post.remove({title : req.params.postTitle});
        res.json(removedPost);
        }catch(err){
            res.json({message: err});
        }
})
//update une donnée : 
router.patch('/:postId',async (req,res)=>{
    try{
        let updatedPost = await Post.updateOne(
            {_id : req.params.postId},
            {$set :{title : req.body.title}}
            );
        res.json(updatedPost);
        }catch(err){
            res.json({message: err});
        }
})

//recevoir la donnée, la poster dans la bdd: 
router.post('/',async (req,res)=>{
    console.log('3aytoli!');
    res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    //recevoir : 
    let post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    console.log('i got it ! '+req);
    //poster :
    try{
        //poster en bdd:
        const savedPost = await post.save();
        //poster reponse postman : 
        res.json(savedPost);
    }catch(err){
        res.json({message : err});
    }
});

module.exports = router;
