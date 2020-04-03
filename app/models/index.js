const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.occasions = require('./occasion.model.js')(mongoose);
db.votes = require('./vote.model.js')(mongoose);
db.results = require('./result.model.js')(mongoose);

module.exports = db;