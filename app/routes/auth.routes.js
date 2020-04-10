

module.exports = app => {

	const express = require('express');
	const router = express.Router();
	const mongoose = require('mongoose');
	const bcrypt =require('bcrypt');
	const jwt = require('jsonwebtoken');

	const Auth = require('../models/auth.model');
	const JWT_KEY = require('../config/env.config.js');

	const checkAuth = require('../middleware/check-auth.js');


	router.post('/sign-up', (req, res, next) => {
		Auth.find({ email: req.body.email })
		.exec()
		.then(auth => {
			if(auth.length >=1) {
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
							const auth = new Auth({
							id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash

							});
							auth.save()
							.then(result => {
								res.status(201).json({
									message : 'new user secured'
								});
							})
							.catch(err => {
								res.status(500).json({
									error: err
								});
							});
						}
				});

			}
		});
		
	});

	router.get('/sign-up/:id', (req, res, next) => {
		const id = req.params.id;
	Auth.findById(id)
		.then(data => {
			if(!data)
				res.status(404).send({ message : `l'utilisateur avec l'id ${id} introuvable`})
			else res.send(data);
		})
		.catch( err =>{
			err
				.status(500)
				.send({ message: `une erreur s'est produite lors du chargement de l\'utilisateur dont l'id est ${id}`});
			
		});
	});


	router.get('/sign-up', (req, res, next) => {
		const email = req.query.email;
	var condition = email ? { email: {$regex: new RegExp(email), $options:"i"}} : {};

	Auth.find(condition)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message : 
				err.message ||  "une erreur s'est produite durant le processus de capture du Tutoriel"
			});
		});
	});

	router.post('/sign-in', (req, res,next) => {
		Auth.find({email : req.body.email })
		.exec()
		.then( auth => {
			if (auth.length<1){
				return res.status(401).json({
					message: 'AUTH FAILED!'
				});
			}
			bcrypt.compare(req.body.password, auth[0].password,(err, result) => {
				if(err){
					return res.status(401).json({
					message: 'AUTH FAILED!'})
				} else if (result){
					const tocken = jwt.sign({
						email: auth[0].email,
						id: auth[0]._id
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
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error : err
			});
		});

	})


	router.delete('/auth/delete/:id',checkAuth,( req, res, next) => {
		Auth.remove({ _id: req.params.id})
		.exec()
		.then( result => {
			res.status(200).json({
				message: 'User deleted'
			});
		})
		.catch( err => {
			res.status(500).json({
				error: err
			});
		});
	});

	app.use('/api', router);

}

