let express = require('express');
let router = express.Router();
let Ecriture = require('../models/Ecriture');

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
        //find retourne les donnée du type Ecriture (le model)
        console.log('rani b3at');
        let ecriture = await Ecriture.find();
        res.json(ecriture);
    }catch(err){
        res.json({message : err});
    }
});

//recupere une donnée précise : 
router.get('/:EcritureId',async (req,res)=>{
    try{
    let ecriture = await Ecriture.findById(req.params.EcritureId);
    res.json(Ecriture);
    }catch(err){
        res.json({message: err});
    }
});
/*
//supprimer une donnée : 
router.delete('/:EcritureId',async (req,res)=>{
    try{
        let removedEcriture = await Ecriture.remove({_id : req.params.EcritureId});
        res.json(removedEcriture);
        }catch(err){
            res.json({message: err});
        }
})*/
router.delete('/EcritureTitle',async (req,res)=>{
    try{
        let removedEcriture = await Ecriture.remove({title : req.params.EcritureTitle});
        res.json(removedEcriture);
        }catch(err){
            res.json({message: err});
        }
})
//update une donnée : 
router.patch('/:EcritureId',async (req,res)=>{
    try{
        let updatedEcriture = await Ecriture.updateOne(
            {_id : req.params.EcritureId},
            {$set :{title : req.body.title}}
            );
        res.json(updatedEcriture);
        }catch(err){
            res.json({message: err});
        }
})

//recevoir la donnée, la Ecritureer dans la bdd: 
router.post('/',async (req,res)=>{
    console.log('3aytoli!');
    res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    //recevoir : 
    let ecriture = new Ecriture({
        num: req.body.num,
        somme: req.body.somme,
        compteSmat: req.body.compteSmat,
        compteVMat: req.body.compteVMat,
        motif: req.body.motif
    });
    console.log('i got it ! '+req.body);
    //Ecritureer :
    try{
        //Ecritureer en bdd:
        const savedEcriture = await ecriture.save();
        //Ecritureer reponse Ecritureman : 
        res.json(savedEcriture);
    }catch(err){
        res.json({message : err});
    }
});

module.exports = router;
