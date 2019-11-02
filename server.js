let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// parse JSON :
app.use(bodyParser.json());

let mongoose = require('mongoose');

//import    routes : 
let postsRoute = require('./routes/posts');
app.use('/posts',postsRoute);

let comptesRoute = require('./routes/comptes');
app.use('/comptes',comptesRoute);

let ecrituresRoute = require('./routes/ecritures');
app.use('/ecritures',ecrituresRoute);

//Routes :
app.get('/',(req,res)=>{
    res.send('working!');
});


//DB : 
mongoose.connect('mongodb://localhost:27017/Stage',{ useNewUrlParser: true },()=> console.log('connected !!'));

//lancer le serveur 
app.listen(3000);