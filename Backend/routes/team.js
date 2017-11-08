var mongoose = require('mongoose');
var router=require('express').Router();
var Team = mongoose.model('Team');

var ObjectId = mongoose.Types.ObjectId;


//Insert new team
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

//Return all teams
router.get('/', (req, res, next)=> {
    Team.find({}).then(teams =>{
        if(!teams){return res.sendStatus(401);}
        return res.json({'teams': teams})
})
.catch(next);
});


//Update Team
//Lo hice por ID porque por Name no me funcionaba, creo que el campo tiene que ser declarado como unique para poder
//usar el metodo findOneAndUpdate, habria que modificar el modelo.
router.put('/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    let name = req.body.name;
    let stadium = req.body.stadium;
    let points = req.body.points;

    Team.findOneAndUpdate(query, {$set: {name: name, stadium:stadium, points:points}},{new: true},function(err, team){
        if(err){
            res.send("got an error");
        }
        else{
            res.send(team);                
        }
    });

})

module.exports=router;
