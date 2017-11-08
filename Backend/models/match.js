var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date, required: true},
    result: {type: String},
    stadium: {type: String, required: true},
    team1: {type: Schema.Types.ObjectId, ref: 'Team'},
    team2: {type: Schema.Types.ObjectId, ref: 'Team'},
    event: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('Match', schema);