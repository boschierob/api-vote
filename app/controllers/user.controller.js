
const db = require('../models');
const User = db.users;

//Create and Save new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Email obligatoire!" });
    return;
  }

  // Create a User
  const user = new User({
  	first_name: req.body.first_name,
      last_name:req.body.last_name,
      adress: req.body.adress,
      postal_code: req.body.postal_code,
      city: req.body.city,
      email:req.body.email,
  });

  // Save User in the database
  user
    .save(user)
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
	const email = req.query.email;
	var condition = email ? { email: {$regex: new RegExp(email), $options:"i"}} : {};

	User.find(condition)
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

//Find a single User with its id
exports.findOne = (req,res) => {
	const id = req.params.id;
	User.findById(id)
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

//Update a User with the specified id in the request
exports.update = (req,res) => {
	if(! req.body) {
		return res.status(400).send({
			message: "Ne peut etre vide"
		});
	}

	const id = req.params.id;

	User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
		

//Delete a User with a specified idin the request
exports.delete = (req,res) => {
	const id = req.params.id;

	User.findByIdAndRemove(id)
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
	User.deleteMany({})
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















