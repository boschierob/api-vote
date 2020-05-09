
const db = require('../models');
const Vote = db.votes;


//Create and Save new Vote
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Vote
  const vote = new Vote({
  	title:req.body.title,
  	questions:req.body.questions,
   // question: req.body.question,
      voters: req.body.voters,
      limit_date: req.body.limit_date,
      occasion: req.body.occasion
  });

  // Save Vote in the database
  vote
    .save(vote)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vote."
      });
    });
};

exports.votePushQuestion =  (req,res) => {
	//console.log(req.params);
	console.log(`la quest: ${req.body.question}`);
	const question=req.body.question;
	Vote.findByIdAndUpdate({_id: req.params.voteId},
		{ $push: { questions: {question:question}}},{ new: true, useFindAndModify: false })
	.then(data =>{
		res.send({
			message: `question added inside this votes' questions array`
		});
	})
	.catch(err => {
			res.status(500).send({
				message: `une erreur s'est produite`
			});
	});
};	

exports.votePushOptions =  (req,res) => {
	console.log(req.params);
	console.log(req.body.question);
	console.log(req.body.options)
	Vote.findByIdAndUpdate({_id: req.params.id},
		{ $push: { 
			questions: req.body}},{ new: true, useFindAndModify: false })
	.then(data =>{
		res.send({
			message: `good`
		});
	})
	.catch(err => {
			res.status(500).send({
				message: `une erreur s'est produite`
			});
	});
};	
//Retrieve all Tutorials
exports.findAll = (req,res) => {
	//const vote = req.query.vote.title;
	//var condition = vote ? { vote: {$regex: new RegExp(vote), $options:"i"}} : {};

	Vote.find()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message : 
				err.message ||  "une erreur s'est produite durant le processus de capture du Tutoriel"
			});
		});

};

//Find a single Vote with its id
exports.findByOccasionId = (req,res) => {
	const id = req.params.id;
	Vote.find({occasion:id})
		.then(data => {
			if(!data)
				res.status(404).send({ message : `tutoriel avec l'id ${id} introuvable`})
			else res.send(data);
		})
		.catch( err =>{
			err
				.status(500)
				.send({ message: `une erreur s'est produite lors du chargement dtutoriel avec l'id ${id}`});
			
		});
};

//Update a Vote with the specified id in the request
exports.update = (req,res) => {
	if(! req.body) {
		return res.status(400).send({
			message: "Ne peut etre vide"
		});
	}

	const id = req.params.id;

	Vote.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Impossible de mettre a jour le Tutoriel avec l'id ${id}.`
				});
			} else 
				res.send({
					message :`Tutoriel mis a jour avec succes`
				});
			})
		.catch(err => {
			res.status(500).send({
				message: `une erreur s'est produite lors de la mise a jour du tutoriel dont l'id est ${id}`
			});
		});
};
		
exports.getQuestionById = (req,res) =>{
	Vote.find({_id:req.params.voteId})
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Impossible `
				});
			} else 
				res.send({
					message :`succes`
				});
			})
		.catch(err => {
			res.status(500).send({
				message: `une erreur s'est produite`
			});
		});
}

//Delete a Vote with a specified idin the request
exports.delete = (req,res) => {
	const id = req.params.id;

	Vote.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message:`Tutoriel avec l'id ${id} introuvable.`
				});
			} else {
				res.send({
					message: `Tutoriel avec l'id ${id} supprime avec succes`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Suppression impossible"
			});
		});
};

//Delete all Tutorials from teh database
exports.deleteAll = (req,res) => {
	Vote.deleteMany({})
		.then(data =>{
		res.send({
			message: `${data.deletedCount} tutoriels ont ete supprimes`
		});
	})
		.catch(err => {
			res.statut(500).send({
				message:
					err.message || `erreur lors de l'operation de suppression`
			});

		});
};















