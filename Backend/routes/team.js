var mongoose = require('mongoose');
var router=require('express').Router();
var Team = mongoose.model('Team');

var ObjectId = mongoose.Types.ObjectId;

router.post('/', (req, res, next) => {
    let stadium=req.body.stadium;
    let name=req.body.name;
    let points =req.body.points;
    var team = new Team({
        name: name,
        stadium: stadium,
        points: points,
    });
    team.save();
    res.send("post client:"+stadium+" - name:"+name+team.name);
  });

router.get('/', function(req, res, next) {
    res.send("Equipos");
})


module.exports=router;
