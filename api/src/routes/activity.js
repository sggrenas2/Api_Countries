const {Country, Activity, conn} = require('./../db.js');
const {Router} = require('express');
const router = Router();


router.post('/activity', async (req,res)=>{
    console.log(req.body);
    let activity = {
        name: req.body.name,
        difficulty: req.body.difficulty,
        duration: req.body.duration,
        season: req.body.season
    };
    let activityB = await Activity.create(activity);
    let countries = [];
    for(let i = 0; i < req.body.countries.length; i++){
        countries[i] = await Country.findByPk(req.body.countries[i]);
    }
    activityB.setCountries(countries);
});

module.exports = router;