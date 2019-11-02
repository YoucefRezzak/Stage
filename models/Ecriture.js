let mongoose = require('mongoose');

let EcritureSchema = mongoose.Schema({
    num:{
        type: Number,
        required: true
    },
    somme:{
        type: Number,
        required: true
    },
    compteSmat:{
        type: Number,
        required: true
    },
    compteVMat: {
        type: Number,
        required: true
    },
    motif: {
        type: String,
        default : ""
    },
    date : {
        type : Date,
        default: Date.now()
    } 
});


module.exports = mongoose.model('Ecriture',EcritureSchema);
