import React, { useEffect, useState } from 'react';
import styleFiltersAct from './../Css/ActivityFilter.module.css';

export function ActivityFilter(){

    const [filters, setFilters] = useState({});

    useEffect(()=>{
        async function getFilters(){
            let data = await fetch('http://localhost:3001/activity/filtersData');
            data = await data.json();
            setFilters(data);
        }
        getFilters();
        console.log(filters);
    },[])

    return <>
        <input type="checkbox" id={styleFiltersAct.title} name="title"></input>
        <label htmlFor={styleFiltersAct.title} id={styleFiltersAct.titleContainer}>
            <span>Activity Filter</span>
            <span id={styleFiltersAct.icon}><i className="fa fa-angle-down" aria-hidden="true"></i></span>
        </label>
        <div id={styleFiltersAct.contentContainer}>
            <div id={styleFiltersAct.searchInput}>
                search Bar
            </div>
            <fieldset id={styleFiltersAct.duration}>
                <legend>Duration</legend>
                {
                    (filters.durations)?
                    filters.durations.map(el => {
                        let name = Object.keys(el)[0];
                        return <>
                            <label htmlFor={`dur${name}`}>{`${name} (${el[name]})`}
                                <input type="checkbox" name="duration" id={`dur${name}`} className={styleFiltersAct.checkboxes}></input>
                            </label>
                        </>
                    })
                    :
                    <p>loading</p>
                }
            </fieldset>
            <fieldset id={styleFiltersAct.difficulty}>
                <legend>Difficulty</legend>
                {
                    (filters.difficulties)?
                    <>  
                        <label htmlFor="dif1">{`${filters.difficulties[0].name} (${filters.difficulties[0].count}) `}
                            <input type="checkbox" name="difficulty" id="dif1" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="dif2">{`${filters.difficulties[1].name} (${filters.difficulties[1].count}) `}
                            <input type="checkbox" name="difficulty" id="dif2" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="dif3">{`${filters.difficulties[2].name} (${filters.difficulties[2].count}) `}
                            <input type="checkbox" name="difficulty" id="dif3" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="dif4">{`${filters.difficulties[3].name} (${filters.difficulties[3].count}) `}
                            <input type="checkbox" name="difficulty" id="dif4" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="dif5">{`${filters.difficulties[4].name} (${filters.difficulties[4].count}) `}
                            <input type="checkbox" name="difficulty" id="dif5" className={styleFiltersAct.checkboxes}></input>
                        </label>
                    </>
                        :
                        <p>loading</p>
                }
            </fieldset>
            <fieldset id={styleFiltersAct.season}>
                <legend>Season</legend>
                {
                    (filters.seasons)?
                    <>
                        <label htmlFor="summer">{`${filters.seasons[0].name} (${filters.seasons[0].count}) `}
                            <input type="checkbox" name="season" id="summer" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="winter">{`${filters.seasons[1].name} (${filters.seasons[1].count}) `}
                            <input type="checkbox" name="season" id="winter" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="spring">{`${filters.seasons[2].name} (${filters.seasons[2].count}) `}
                            <input type="checkbox" name="season" id="spring" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="autumn">{`${filters.seasons[3].name} (${filters.seasons[3].count}) `}
                            <input type="checkbox" name="season" id="autumn" className={styleFiltersAct.checkboxes}></input>
                        </label>
                        <label htmlFor="all">{`${filters.seasons[4].name} (${filters.seasons[4].count}) `}
                            <input type="checkbox" name="season" id="all" className={styleFiltersAct.checkboxes}></input>
                        </label>
                    </>
                        :
                        <p>loading</p>
                }
            </fieldset>
        </div>
    </>
};

export default ActivityFilter;