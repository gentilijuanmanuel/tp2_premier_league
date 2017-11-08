var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
type: {type: String, required: true},
player: {type: String, required: true},
player2: {type: String},
time: {type: Number, required:true},
description: {type: String}
});

module.exports = mongoose.model('Event', schema);