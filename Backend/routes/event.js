var mongoose = require('mongoose');
var router=require('express').Router();
var Event = mongoose.model('Event');

var ObjectId = mongoose.Types.ObjectId;

//Insert new event
router.post('/', (req, res, next) => {
    let type = req.body.type;
    let player = req.body.player;
    let player2 = req.body.player2;
    let time = req.body.time;
    let description = req.body.description;

    var event = new Event({
        type: type,
        player: player,
        player2: player2,
        time: time,
        description: description
    });

    event.save();
    res.send("Event submitted \n" + event);
  });

//Return all events
router.get('/', (req, res, next)=> {
    Event.find({}).then(events =>{
        if(!events) {return res.sendStatus(401);}
        return res.json({'events': events})
    })
    .catch(next);
});

//Find one event by ID
router.get('/:idEvent', (req, res, next) => {
    let idEvent = req.params.idEvent;

    Event.findById(idEvent, (err, event) => {
        if (err) {
            res.status(500).send(err);
        }
        if (event) {
            res.status(200).send(event);
        } else {
            res.status(404).send("No event found with that ID");
        }
    });
});

//Update event
router.put('/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    let type = req.body.type;
    let player = req.body.player;
    let player2 = req.body.player2;
    let time = req.body.time;
    let description = req.body.description;

    Event.findOneAndUpdate(query, {$set: {type: type, player: player, player2: player2, time: time, description: description}},{new: true},function(err, event){
        if(err){
            res.send("got an error");
        }
        else{
            res.send(event);                
        }
    });
})

//Delete one Team
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Event.findByIdAndRemove(id, (err, event)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Event successfully deleted",
                id: event._id
            };
            res.status(200).send(response);
        }
    });
});

module.exports=router;