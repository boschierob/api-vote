
module.exports = app => {
	
	const users = require('../controllers/user.controller.js');
	const router = require("express").Router();

	//Create new users
	router.post('/', users.create);

	//Sign in user
	router.post('/signin', users.auth);


	// Retrieve a single User with id
	router.get('/:email', users.findOne);

	
	//Push a occasion in  User with id
	router.put('/PushOccasion/:userId/:occasionId', users.userPushOccasion);

	// Update a User with id
	router.put('/:id', users.update);


	 // Delete a User with id
	 router.delete('/:id', users.delete);

	 // Delete all Users
	 router.delete('/', users.deleteAll);

	 app.use('/api/users', router);
}