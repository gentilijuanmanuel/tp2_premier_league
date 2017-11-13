var router=require('express').Router();

router.use('/api/team', require('./team'));
router.use('/api/event', require('./event'));

module.exports=router;