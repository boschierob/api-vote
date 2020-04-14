
module.exports = app => {
	
	const occasions = require('../controllers/occasion.controller.js');
	const router = require("express").Router();

	//Create new occasion
	router.post('/', occasions.create);

	// Retrieve all Occasions
	router.get('/', occasions.findAll);

	// Retrieve a single Occasion with id
	router.get('/one/:id', occasions.findOne);

	// Retrieve a single Occasion with email of the initiator
	router.get('/:email', occasions.findByInitiator);

	// Update a Occasion with id
	router.put('/:id', occasions.update);

	 // Delete a Tutorial with id
	 router.delete('/:id', occasions.delete);

	 // Delete all Tutorials
	 router.delete('/', occasions.deleteAll);

	 app.use('/api/occasions', router);

}