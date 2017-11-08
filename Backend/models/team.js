var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    stadium: {type: String, required: true},
    points: {type: Number, required: true}
});

module.exports = mongoose.model('Team', schema);