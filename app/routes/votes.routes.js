
module.exports = app => {
	
	const votes = require('../controllers/vote.controller.js');
	const router = require("express").Router();

	//Create new vote
	router.post('/', votes.create);

	//Push a question in  Vote with id
	router.put('/votePushQuestion/:voteId/', votes.votePushQuestion);

	// Retrieve all votes
	router.get('/', votes.findAll);

	// Retrieve a single Occasion with id
	router.get('/:id', votes.findByOccasionId);

	// Update a vote with id
	router.put('/:id', votes.update);

	 // Delete a vote with id
	 router.delete('/:id', votes.delete);

	 // Delete all votes
	 router.delete('/', votes.deleteAll);

	 //get question by id
	 router.put('/addQuestionOptions/:id/',votes.votePushOptions)

	 app.use('/api/votes', router);

}