const { Country, Activity } = require('./src/db.js');
const {Op} = require('sequelize');
const fetch = require('node-fetch');

async function setCountries(){
    let url = "https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;flag;region;capital;subregion;area;population"
    let data = await fetch(url);
    data = await data.json();
    data.forEach(async(country,i) => {
        data[i] = Country.create({
            id:country.alpha3Code,
            name:country.name,
            flag:country.flag,
            continent:country.region,
            capital:country.capital,
            subRegion:country.subregion,
            area:country.area,
            population:country.population,
        })
    });
    
    await Promise.all(data);

    console.log(`%s ${data.length} countries created`);
};

async function createActivities(activity){

};

module.exports = async () => {
    await setCountries();
    let countries = []
    countries[0] = await Country.findByPk('ARG');
    countries[1] = await Country.findByPk('CAN');
    countries[2] = await Country.findByPk('USA');
    countries[3] = await Country.findByPk('FRA');
    countries[4] = await Country.findByPk('FIN');
    countries[5] = await Country.findByPk('ESP');
    countries[6] = await Country.findByPk('AUS');

    let activity1 = {
        name: 'ski',
        difficulty: 2,
        duration: 240,
        season: 'winter',
    };

    let activity2 = {
        name: 'walking',
        difficulty: 1,
        duration: 60,
        season: 'all',
    };

    let activity3 = {
        name: 'surf',
        difficulty: 4,
        duration: 120,
        season: 'summer',
    };

    activity1 = await Activity.create(activity1);
    activity2 = await Activity.create(activity2);
    activity3 = await Activity.create(activity3);

    for(let i = 0; i<countries.length;i++){
        await countries[i].setActivities(activity1);
        await countries[i].setActivities(activity2);
    }
    
    await countries[6].setActivities(activity3);

    console.log("%s set activities");
}