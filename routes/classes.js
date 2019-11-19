let express = require('express');
let router = express.Router();
let Classe = require('../models/Classe');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: application/json, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
 
//recuperer les données a partir de la bdd, et l'afficher : 
router.get('/', async (req,res)=>{
    try{
        //find retourne les donnée du type compte (le model)
        console.log('yadra?');
        let classe = await Classe.find();
        res.json(classe);
    }catch(err){
        res.json({message : err});
    }
});
/*
router.get('/:comteId',async (req,res)=>{
    try{
    let compte = await Compte.findById(req.params.compteId);
    res.json(compte);
    }catch(err){
        res.json({message: err});
    }
});*/
/*
//supprimer une donnée : 
router.delete('/:compteId',async (req,res)=>{
    try{
        let removedcompte = await compte.remove({_id : req.params.compteId});
        res.json(removedcompte);
        }catch(err){
            res.json({message: err});
        }
})*/
router.delete('/num',async (req,res)=>{
    try{
        let removedclasse = await Classe.remove({title : req.params.num});
        res.json(removedclasse);
        }catch(err){
            res.json({message: err});
        }
})
//update une donnée : 
router.patch('/:num',async (req,res) => {
    try{
        console.log('update!' + req.body.num);
        res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
        let updatedClasse = await Classe.updateOne(
            {num : req.params.num},
            {$set :{nom : req.body.nom , somme : req.body.somme}}
            );
        res.json(updatedClasse);
        }catch(err){
            res.json({message: err});
        }
})

//recevoir la donnée, la compteer dans la bdd: 
router.post('/',async (req,res)=>{
    console.log('3aytoli!' + req);
    res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    //recevoir : 
    let classe = new Classe({
        nom: req.body.nom,
        num: req.body.num,
        somme: req.body.somme,
    });
    console.log('i got it ! '+req.nom);
    //compteer :
    try{
        //compteer en bdd:
        const savedClass = await classe.save();
        //compteer reponse compteman : 
        res.json(savedClass);
    }catch(err){
        res.json({message : err});
    }
});

module.exports = router;
