let mongoose = require('mongoose');


let classSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    num:{
        type: Number,
        required: true
    },
    somme:{
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('Classe',classSchema);
