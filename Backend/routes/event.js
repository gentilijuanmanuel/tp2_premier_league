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


//Update event
router.put('/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    let type = req.body.type;
    let player = req.body.player;
    let player2 = req.body.player2;
    let time = req.body.time;
    let description = req.body.description;

    Team.findOneAndUpdate(query, {$set: {type: type, player: player, player2: player2, time: time, description: description}},{new: true},function(err, team){
        if(err){
            res.send("got an error");
        }
        else{
            res.send(team);                
        }
    });
})

module.exports=router;