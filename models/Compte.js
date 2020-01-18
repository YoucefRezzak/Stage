let mongoose = require('mongoose');


let compteSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    mat:{
        type: Number,
        required: true
    },
    somme:{
        type: Number,
        default: 0
    },
    soldein:{
        type: Number,
        default: 0
    },
    classe:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Compte',compteSchema);
