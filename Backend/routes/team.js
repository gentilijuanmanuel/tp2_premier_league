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

    team.save((err, team) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send("Team submitted \n" + team);
    });
  });

//Return all teams
router.get('/', (req, res, next)=> {
    Team.find({}).then(teams =>{
        if(!teams) {return res.sendStatus(401);}
        return res.json({'teams': teams})
    })
    .catch(next);
});

//Find one team by ID
router.get('/:idTeam', (req, res, next) => {
    let idTeam = req.params.idTeam;

    Team.findById(idTeam, (err, team) => {
        if (err) {
            res.status(500).send(err);
        }
        if (team) {
            res.status(200).send(team);
        } else {
            res.status(404).send("No team found with that ID");
        }
    });
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
            res.status(500).send(err);
        }
        else{
            team.save((err, team) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(team);
            });
        }
    });
})

//Delete one Team
router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Team.findByIdAndRemove(id, (err, team)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Team successfully deleted",
                id: team._id
            };
            res.status(200).send(response);
        }
    });
});

module.exports=router;