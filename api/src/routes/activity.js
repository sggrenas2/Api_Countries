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

router.get('/activity/filtersData', async (req,res) =>{
    let dataSend = {
        durations: [],
        difficulties: [{name:1,count:0},{name:2,count:0},{name:3,count:0},{name:4,count:0},{name:5,count:0}],
        seasons: [{name:'summer',count:0},{name:'winter',count:0},{name:'spring',count:0},{name:'autumn',count:0},{name:'all',count:0}],
    }
    let data = await Activity.findAll();
    for(let i = 0; i < data.length; i++){
        data[i] = await data[i].toJSON();
        switch(data[i].season){
            case 'summer': dataSend.seasons[0].count +=1; break;
            case 'winter': dataSend.seasons[1].count+=1; break;
            case 'spring': dataSend.seasons[2].count+=1; break;
            case 'autumn': dataSend.seasons[3].count+=1; break;
            case 'all': dataSend.seasons[4].count+=1; break;
        }
        switch(data[i].difficulty){
            case 1: dataSend.difficulties[0].count++; break;
            case 2: dataSend.difficulties[1].count++; break;
            case 3: dataSend.difficulties[2].count++; break;
            case 4: dataSend.difficulties[3].count++; break;
            case 5: dataSend.difficulties[4].count++; break;
        }
        if(dataSend.durations.length === 0){
            let obj = {};
            obj[data[i].duration]=1;
            dataSend.durations.push(obj);
        }else{
            let obj = {};
            let ctr = true;
            for(let j = 0; j < dataSend.durations.length; j++){
                if(dataSend.durations[j].hasOwnProperty(data[i].duration)){
                    dataSend.durations[j][data[i].duration] += 1;
                    ctr = false;
                }
            }
            if(ctr){
                obj[data[i].duration]=1;
                dataSend.durations.push(obj);
            }
        }
    }
    res.status(200).json(dataSend);
});

module.exports = router;