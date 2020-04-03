
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



//connect db
const db = require('./app/models');
db.mongoose
	.connect(db.url,{
		useNewUrlParser: true,
    useUnifiedTopology: true
	})
	.then( () => {
		console.log('base de donnée connectée')
	})
	.catch( err => {
		console.log('impossible de se connecter a la base de donnee', err);
		process.exit();
	});



//simple route for test
app.get('/', (req, res)=>{
	res.json({message : " Bienvenue sur l'application de vote en ligne d'avril 2020"})
});

const PORT = process.env.PORT || 4000 ;

const routes = require('./app/routes/occasions.routes.js')(app);
const routes2 = require('./app/routes/votes.routes')(app);
const routes3 = require('./app/routes/results.routes')(app);

app.listen(PORT, () => {
	console.log('le serveur est lancé sur le port '+PORT)
});