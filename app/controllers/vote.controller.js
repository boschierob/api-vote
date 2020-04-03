
const db = require('../models');
const Vote = db.votes;

//Create and Save new Vote
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Vote
  const vote = new Vote({
    question: req.body.question,
      options:req.body.options,
      voters: req.body.voters,
      limit_date: req.body.limit_date
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
//Retrieve all Tutorials
exports.findAll = (req,res) => {
	const question = req.query.question;
	var condition = question ? { question: {$regex: new RegExp(question), $options:"i"}} : {};

	Vote.find(condition)
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
exports.findOne = (req,res) => {
	const id = req.params.id;
	Vote.findById(id)
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















