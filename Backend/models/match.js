var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 *  States: Not Started -> Playing -> Finished
 */

var schema = new Schema({
    date: {type: Date, required: true},
    result: {type: String},
    state: {type: String, required: true},
    stadium: {type: String, required: true},
    team1: {type: Schema.Types.ObjectId, ref: 'Team'},
    team2: {type: Schema.Types.ObjectId, ref: 'Team'},
    event: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('Match', schema);