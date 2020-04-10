

const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');
const User = db.users;
const JWT_KEY = require('../config/env.config.js');


//Create and Save new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Email obligatoire!" });
    return;
  }

  User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if(user.length >=1) {
				return res.status(409).json({
					message: 'this email alreday exists in our database'
				})
			} else {

				bcrypt.hash(req.body.password, 10, (err, hash)=>{
						if(err) {
							return res.status(500).json({
								error: err
							});
						} else {

							 // Create a User
						  	const user = new User({
						  	first_name: req.body.first_name,
						    last_name:req.body.last_name,
						    adress: req.body.adress,
						    postal_code: req.body.postal_code,
						    city: req.body.city,
						    email:req.body.email,
						    password: hash
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
						          err.message || "Some error occurred while creating the User."
						      });
						    });


						}



				});

				 
			}
		});
};


//Find a single Tutorial with its email

exports.findOne = (req,res) => {
	const email = req.params.email;
		User.findOne({email:email})
		.then(data => {
			if(!data)
				res.status(404).send({ message : `tutoriel avec l'email introuvable`})
			else res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message : 
				err.message ||  "une erreur s'est produite durant le processus de capture du Tutoriel"
			});
		});
};


//auth an user
exports.auth =(req,res)=> {
	User.find({email: req.body.email })
		.exec()
		.then( user =>{
			if (user.length<1){
				return res.status(401).json({
					message: 'AUTH FAILED!'
				});
			}
			bcrypt.compare(req.body.password, user[0].password,(err, result) =>{
				if(err){
					return res.status(401).json({
					message: 'AUTH FAILED!'})
				} else if (result){
					const tocken = jwt.sign({
						email: user[0].email,
						id: user[0].id
					},
					JWT_KEY.key,
					{
						expiresIn:"1h"
					}
					);
					return res.status(200).json({
					message: 'AUTH SUCCESSFUL !',
					tocken: tocken
					});
				} else {
					return res.status(401).json({
					message: 'AUTH FAILED!'});
				}
			});
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error : err
			});
		});
}



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















