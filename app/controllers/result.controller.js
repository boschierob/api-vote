
const db = require('../models');
const Result = db.results;

//Create and Save new Result
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Result
  const result = new Result({
    id_question: req.body.id_question,
      result:req.body.result,
  });

  // Save Result in the database
  result
    .save(result)
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
	const id_question = req.query.id_question;
	var condition = id_question ? { id_question: {$regex: new RegExp(id_question), $options:"i"}} : {};

	Result.find(condition)
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

//Find a single Result with its id
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

//Update a Result with the specified id in the request
exports.update = (req,res) => {
	if(! req.body) {
		return res.status(400).send({
			message: "Ne peut etre vide"
		});
	}

	const id = req.params.id;

	Result.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
		

//Delete a Result with a specified idin the request
exports.delete = (req,res) => {
	const id = req.params.id;

	Result.findByIdAndRemove(id)
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
	Result.deleteMany({})
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















