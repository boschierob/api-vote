const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
	//id: mongoose.Schema.Types.ObjectId,
	email: { type: String, required : true, unique: true,
		validate: {
	      validator: function(v) {
	        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)
	      },
	      message: props => `${props.value} is incorrect email!`
    	},
	},
	password: {type: String, required : true, unique: true}
});


module.exports =mongoose.model('Auth', authSchema);