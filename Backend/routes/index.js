var router=require('express').Router();

router.use('/api/team', require('./team'));
router.use('/api/event', require('./event'));
router.use('/api/match', require('./match'));

module.exports=router;