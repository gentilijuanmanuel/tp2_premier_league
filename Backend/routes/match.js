var mongoose = require('mongoose');
var router=require('express').Router();
var Match = mongoose.model('Match');

var ObjectId = mongoose.Types.ObjectId;


router.get('/', (req, res, next)=> {
    Match.find({}).populate('team1').populate('team2').then(matches =>{
        if (!matches) { return res.sendStatus(401); }
        return res.json(matches) 
    })
    .catch(next);
});


//Seleccionar los partidos activos
//Suponemos que el estado del partido es "Playing"
router.get('/active', (req, res, next) => {
    Match.find({ 'state':'Playing' }).populate('team1').populate('team2').then(match => {
        if (!match) { return res.sendStatus(401); }
        return res.json(match)
    })
        .catch(next);
});

//Lo comento porque lo agarra primero en vez de /active

router.get('/:idMatch', (req, res, next) => {
    let idMatch = req.params.idMatch;
    console.log(idMatch);
    Match.findById(idMatch).populate('event').populate('team1').populate('team2').exec((err, match) => {
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

//Create Match
/*
 *  States: Not Started -> Playing -> Finished
 */
router.post('/new', (req, res, next) => {
    let date = req.body.date;
    let team1 = req.body.team1;
    let team2 = req.body.team2;
    let stadium = req.body.stadium;
    let state = req.body.state;

    var match = new Match({
        date: date,
        state: state,
        stadium: stadium,
        team1: team1,
        team2: team2
    });

    match.save((err, match) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send("Match submitted \n" + match);
    });
});

//End Match: parece que no funciona
/*
 * State: Finished.
 */
router.put('/end/:id', (req, res, next) => {
    let _id = req.params.id;

    Match.findOneAndUpdate({id: _id}, {$set:{state: "Finished"}},{new: true},function(err, match){
        if(err){
            res.status(500).send(err);
        }
        else{
            match.save((err, match) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(match);
            });
        } 
    });
    //console.log("Match con id " + _id + " ha sido finalizado con éxito.");
});

//Add Event
router.post('/event/', (req, res, next) => {
    let idMatch = req.params.idMatch;
    let idEvent = req.params.idEvent;
    Match.findOneAndUpdate(idMatch, {$set: {event: idEvent}},{new: true},function(err, match){
        if(err){
            res.status(500).send(err);
        }
        else{
            match.save((err, match) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(match);
                console.log(idEvent);
            });
        }
    });
});

//Delete Match
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Match.findByIdAndRemove(id, (err, match)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Match successfully deleted",
                id: match._id
            };
            res.status(200).send(response);
        }
    });
});

module.exports=router;