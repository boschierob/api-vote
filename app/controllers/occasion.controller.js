
const db = require('../models');
const Occasion = db.occasions;


//Create and Save new Occasion
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Occasion
  const occasion = new Occasion({
    title: req.body.title,
    initiator: req.body.initiator,
    userId: req.body.userId,
    description: req.body.description,
    date: req.body.date,
    limit_date:req.body.limit_date
  });

  // Save Occasion in the database
  occasion
    .save(occasion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Occasion."
      });
});
};
//Retrieve all Tutorials
exports.findAll = (req,res) => {
	const title = req.query.title;
	var condition = title ? { title: {$regex: new RegExp(title), $options:"i"}} : {};

	Occasion.find(condition)
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


//Find a single Occasion with its id
exports.findOne = (req,res) => {
	const id = req.params.id;
	Occasion.findById(id)
		.then(data => {
			if(!data)
				res.status(404).send({ message : `tutoriel avec l'id ${id} introuvable`})
			else res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message : 
				err.message ||  "une erreur s'est produite durant le processus de capture du Tutoriel"
			});
		});
};

//Find a single Occasion with initiator's email
exports.findByInitiator = (req,res) => {
	const email = req.params.email;
	Occasion.find({"initiator":email})
		.then(data => {
			if(!data)
				res.status(404).send({ message : ` evenement introuvable`})
			else res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message : 
				err.message ||  "une erreur s'est produite durant le processus de capture du Tutoriel"
			});
		});
};

//Update a Occasion with the specified id in the request
exports.update = (req,res) => {
	if(! req.body) {
		return res.status(400).send({
			message: "Ne peut etre vide"
		});
	}

	const id = req.params.id;

	Occasion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
		

//Delete a Occasion with a specified idin the request
exports.delete = (req,res) => {
	const id = req.params.id;

	Occasion.findByIdAndRemove(id, { useFindAndModify: false })
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
	Occasion.deleteMany({})
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















