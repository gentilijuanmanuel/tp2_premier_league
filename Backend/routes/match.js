var mongoose = require('mongoose');
var router=require('express').Router();
var Match = mongoose.model('Match');

var ObjectId = mongoose.Types.ObjectId;

//Return all matches
// router.get('/', (req, res, next)=> {
//     Match.find({}).then(matches =>{
//         if(!matches) {return res.sendStatus(401);}
//         return res.json(matches)
//     })
//     .catch(next);
// });

router.get('/', (req, res, next)=> {
    Match.find({}).populate('team1').populate('team2').then(matches =>{
        if (!matches) { return res.sendStatus(401); }
        return res.json(matches) 
    })
    .catch(next);
});


//Deberia funcionar, hay que testear una vez que tengamos el alta de partidos y pueda insertar un registro
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


// //Select all matches
// router.get('/', (req, res, next) => {
//     Event.find({}).then(match => {
//         if (!match) { return res.sendStatus(401); }
//         return res.json({ 'match': match })
//     })
//         .catch(next);
// });

//select matches ended
//Suponemos que el estado del partido es "Playing"
router.get('/active', (req, res, next) => {
    Event.find({ 'state':'Playing' }).then(match => {
        if (!match) { return res.sendStatus(401); }
        return res.json({ 'match': match })
    })
        .catch(next);
});

//Create Match
/*
 *  States: Not Started -> Playing -> Finished
 */
router.post('/new', (req, res, next) => {
    let date = req.body.date;
    let team1=req.body.team1;
    let team2=req.body.team2;
    let stadium =req.body.stadium;
    let state = "Not Started";

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

//End Match
/*
 * State: Finished.
 */
router.put('/end/:id', (req, res, next) => {
    let _id = req.params.id;

    Match.findOneAndUpdate(_id, {$set: {state: "Finished"}},{new: true},function(err, match){
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

module.exports=router;