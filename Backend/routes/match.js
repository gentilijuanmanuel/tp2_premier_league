var mongoose = require('mongoose');
var router=require('express').Router();
var Match = mongoose.model('Match');

var ObjectId = mongoose.Types.ObjectId;


//Deberia funcionar, hay que testear una vez que tengamos el alta de partidos y pueda insertar un registro
router.get('/:idMatch', (req, res, next) => {
    let idMatch = req.params.idMatch;
    console.log(idMatch);
    Match.findById(idMatch, (err, match) => {
        if (err) {
            res.status(500).send(err);
        }
        if (match) {
            res.status(200).send(match);
        } else {
            res.status(404).send("No match found with that ID");
        }
    });
});



module.exports=router;