const {Country, Activity, conn} = require('./../db.js');
const {Router} = require('express');
const { QueryTypes } = require('sequelize');
const router = Router();


async function getData(name = undefined){
    let data;
    if(!name){
        data = await Country.findAll({
            include:{
                model: Activity,
                through: {
                    attributes: [],
                }
            }
        });
    }else{
        data = await conn.query(`select * from "Countries" where name like '${name}%' or name like '%${name}%' or name like '%${name}'`,
            {type:QueryTypes.SELECT});
        for(let i = 0; i < data.length; i++){
            data[i] = await Country.findByPk(data[i].id,{
                include:{
                    model: Activity,
                    through: {
                        attributes: [],
                    }
                }
            });
            data[i] = data[i].toJSON();
        }
    }
    if(data.length!=0 && data[0].toJSON){
        for(let i=0; i<data.length; i++){
            data[i] = data[i].toJSON();
        }
    }
    return data;
}

function filterData(data, byContinent = undefined, byActivity = undefined){
    
    if(byContinent){
        data = data.filter(country => country.continent === byContinent);
    }
    if(byActivity){
        data = data.filter(country => {
            let found = false;
            for(let i = 0; i < country.Activities.length; i++){
                if(country.Activities[i].name.includes(byActivity)) {
                    found = true;
                    break;
                }
            }
            if(found) return country;
        })
    }
    return data;
}

function orderBy(data, byName = undefined, byPopulation = undefined){
    let isReverse;
    if(byName){
        data = data.sort((countryA, countryB)=>{
            if(countryA.name<countryB.name) return -1;
            if(countryA.name>countryB.name) return 1;
            return 0;
        })
        isReverse = byName;
    }
    if(byPopulation){
        data = data.sort((countryA,countryB)=>countryA.population-countryB.population);
        isReverse = byPopulation;
    }
    data = (isReverse==='dec') ? data.reverse() : data;
    return data;
}

function pagination(data, amountByPage = 10){
    let aux = data;
    data = [];
    let page = [];
    let pages = Math.ceil(aux.length/amountByPage);
    let start, end;
    for(let i = 0; i<pages; i++){
        start = i*amountByPage;
        end = ((start+amountByPage)>aux.length) ? aux.length : start+amountByPage;
        page = [];
        for(start; start<end; start++){
            page.push(aux[start]);
        }
        data.push(page);
    }
    return data;
}

router.get('/countries', async (req, res) => {
    let data;
    try{
        data = (req.query.name)?
            await getData(req.query.name)
            :
            await getData();
        if(req.query.byContinent || req.query.byActivity) data = filterData(data, req.query.byContinent, req.query.byActivity);
        if(req.query.byName || req.query.byPopulation) data = orderBy(data, req.query.byName, req.query.byPopulation);
        data = pagination(data);
        data = (data.length === 0) ? 
                []
                :                
                {
                    dataPage: data[req.query.page-1],
                    pages: data.length-1,
                }
    }catch(e){
        res.status(500).json({status:500, e:e.toString(),});
    }
    res.status(200).json(data);
});

router.get('/countries/:id', async (req,res)=>{
    let data;
    try{
        data = await Country.findByPk(req.params.id,{
            include:{
                model: Activity,
            }
        });
    }catch(e){
        res.status(500).json({status:500,e:e.toString()});
    }
    res.status(200).json(data)
});

router.get('/countries/codes/3', async (req,res)=>{
    let data = await Country.findAll({
        attributes: ["id","name"],
    });
    res.status(200).json(data);
});

module.exports = router;
