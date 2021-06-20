import React, { useEffect, useState } from 'react';
import styleFiltersAct from './../Css/ActivityFilter.module.css';
import {connect} from 'react-redux';
import { getData } from '../Actions';

export function ActivityFilter({getData}){

    const [filters, setFilters] = useState({});

    useEffect(()=>{
        async function getFilters(){
            let data = await fetch('http://localhost:3001/activity/filtersData');
            data = await data.json();
            setFilters(data);
        }
        getFilters();
    },[])

    function handleChange(ev){
        let options = {
            searchValue: "",
            seasons: [],
            difficulties: [],
            durations: []
        }
        let seasons = Array.from(document.getElementsByName('season'));
        let difficulties = Array.from(document.getElementsByName('difficulty'));
        let durations = Array.from(document.getElementsByName('duration'));
        if(ev.target.id === "searchButton"){
            options.searchValue = document.getElementById('activitySearch').value;
        }
        seasons.forEach(el => {
            let obj = {};
            if(el.checked){
                obj[el.value] = el.checked;
                options.seasons.push(obj);
            }
        });
        difficulties.forEach(el => {
            let obj = {};
            if(el.checked){
                obj[el.value] = el.checked;
                options.difficulties.push(obj);
            }
        });
        durations.forEach(el => {
            let obj = {};
            if(el.checked){
                obj[el.value] = el.checked;
                options.durations.push(obj);
            }
        });
        getData(1, options, true);
    }

    return <>
        <input type="checkbox" id={styleFiltersAct.title} name="title"></input>
        <label htmlFor={styleFiltersAct.title} id={styleFiltersAct.titleContainer}>
            <span>Activity Filter</span>
            <span id={styleFiltersAct.icon}><i className="fa fa-angle-down" aria-hidden="true"></i></span>
        </label>
        <div id={styleFiltersAct.contentContainer}>
            <div id={styleFiltersAct.searchInput}>
                <input type="text" name="searchActivity" id="activitySearch" placeholder="looking for an especific activity?"/>
                <input type="button" value="search" id="searchButton" onClick={handleChange}/>
            </div>
            <fieldset id={styleFiltersAct.duration}>
                <legend>Duration</legend>
                {
                    (filters.durations)?
                    filters.durations.map(el => {
                        let name = Object.keys(el)[0];
                        return <>
                            <label htmlFor={`dur${name}`}>{`${name} (${el[name]})`}
                                <input type="checkbox" name="duration" id={`dur${name}`} className={styleFiltersAct.checkboxes} value={name} onChange={handleChange}></input>
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
                            <input type="checkbox" name="difficulty" id="dif1" className={styleFiltersAct.checkboxes} value="1" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="dif2">{`${filters.difficulties[1].name} (${filters.difficulties[1].count}) `}
                            <input type="checkbox" name="difficulty" id="dif2" className={styleFiltersAct.checkboxes} value="2" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="dif3">{`${filters.difficulties[2].name} (${filters.difficulties[2].count}) `}
                            <input type="checkbox" name="difficulty" id="dif3" className={styleFiltersAct.checkboxes} value="3" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="dif4">{`${filters.difficulties[3].name} (${filters.difficulties[3].count}) `}
                            <input type="checkbox" name="difficulty" id="dif4" className={styleFiltersAct.checkboxes} value="4" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="dif5">{`${filters.difficulties[4].name} (${filters.difficulties[4].count}) `}
                            <input type="checkbox" name="difficulty" id="dif5" className={styleFiltersAct.checkboxes} value="5" onChange={handleChange}></input>
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
                            <input type="checkbox" name="season" id="summer" className={styleFiltersAct.checkboxes} value="summer" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="winter">{`${filters.seasons[1].name} (${filters.seasons[1].count}) `}
                            <input type="checkbox" name="season" id="winter" className={styleFiltersAct.checkboxes} value="winter" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="spring">{`${filters.seasons[2].name} (${filters.seasons[2].count}) `}
                            <input type="checkbox" name="season" id="spring" className={styleFiltersAct.checkboxes} value="spring" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="autumn">{`${filters.seasons[3].name} (${filters.seasons[3].count}) `}
                            <input type="checkbox" name="season" id="autumn" className={styleFiltersAct.checkboxes} value="autumn" onChange={handleChange}></input>
                        </label>
                        <label htmlFor="all">{`${filters.seasons[4].name} (${filters.seasons[4].count}) `}
                            <input type="checkbox" name="season" id="all" className={styleFiltersAct.checkboxes} value="all" onChange={handleChange}></input>
                        </label>
                    </>
                        :
                        <p>loading</p>
                }
            </fieldset>
        </div>
    </>
};

function mapDispatchToProps(dispatch){
    return {
        getData : (page, options, front) => dispatch(getData(page,options, front)),
    }
}

export default connect(null, mapDispatchToProps)(ActivityFilter);