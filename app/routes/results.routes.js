
module.exports = app => {
	
	const results = require('../controllers/result.controller.js');
	const router = require("express").Router();

	//Create new result
	router.post('/', results.create);

	// Retrieve all results
	router.get('/', results.findAll);

	// Retrieve a single Occasion with id
	router.get('/:id', results.findOne);

	// Update a result with id
	router.put('/:id', results.update);

	 // Delete a result with id
	 router.delete('/:id', results.delete);

	 // Delete all results
	 router.delete('/', results.deleteAll);

	 app.use('/api/results', router);

}