
import { useEffect, useState } from 'react';
import styleForm from './../Css/formActivity.module.css';
import {createActivity} from './../Actions';
import {connect} from 'react-redux';

export function FormActivity({createActivity, isLoading, success}){

    const [countries, setCountries] = useState([]);
    const [searchedCountries, setSearchedCountries] = useState([]);
    const [pickedCountries, setPickedCountries] = useState([]);
    const [dataSend, setDataSend] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: 0,
        countries: [],
    })

    useEffect(() => {
        async function getData(){
            let data = await fetch('http://localhost:3001/countries/codes/3');
            data = await data.json();
            setCountries(data);
        }
        getData();
        setSearchedCountries([]);
        setPickedCountries([]);
    },[]);

    function searchCountry(ev){
        let filter = [];
        if(ev.target.value !== ""){
            filter = countries.filter(el=>{
                if(el.name.includes(ev.target.value) || el.id.includes(ev.target.value)) return el.name;
            })
        }
        setSearchedCountries(filter);
    }

    function picker(ev){
        let data = [...pickedCountries, searchedCountries[ev.target.id].id];
        let aux = new Set(data);
        data = [...aux];
        setPickedCountries(data);
    }

    function remove(ev){
        let data = [];
        for(let i = 0; i < pickedCountries.length; i++){
            console.log(i+" "+ev.target.id);
            if(i!==(+ev.target.id)){
                console.log("im in");
                data.push(pickedCountries[i]);
            } 
        }
        console.log(data);
        setPickedCountries(data);
    }

    function handleChange(ev){
        let data = {...dataSend};
        if(ev.target.id === "formName") data["name"] = ev.target.value;
        if(ev.target.id === "formDuration") data["duration"] = (+ev.target.value);
        if(ev.target.name === "formDifficulty") data["difficulty"] = (+ev.target.value);
        if(ev.target.name === "formSeason") data["season"] = ev.target.value;
        setDataSend(data);
    }

    function submitData(ev){
        let error = false;
        let data = {...dataSend};
        data.countries = pickedCountries;
        setDataSend(data);
        for(let keys in dataSend){
            if(dataSend[keys] === "" || dataSend[keys] === 0 || pickedCountries.length === 0) error=true;
        }
        if(error){
            window.alert("FALTAN DATOS");
        }else{
            createActivity(data);
        }
    }

    return <div id={styleForm.formContainer}>
        {
            (isLoading) ? 
                <h1>Loading...</h1>
                :
                    (success === "") ? 
                        <>
                            <label htmlFor="formName" className={styleForm.labelContainer}>
                                <span>NAME:   </span>
                                <input type="text" id="formName" placeholder="Activity Name" onChange={handleChange}></input>
                            </label>
                            <label htmlFor="formDuration" className={styleForm.labelContainer}>
                                <span>DURATION:   </span>
                                <input type="text" id="formDuration" placeholder="Duration in minutes" onChange={handleChange}></input>
                            </label>
                            <div>
                                <div>
                                    <label className={styleForm.labelContainer}><span>DIFFICULTY</span></label>
                                </div>
                                <label htmlFor={styleForm.difficulty1} className={styleForm.labelContainer} >
                                    <span>1:   </span>
                                    <input type="radio" id={styleForm.difficulty1} name="formDifficulty" onChange={handleChange} value="1"></input>
                                </label>
                                <label htmlFor={styleForm.difficulty2} className={styleForm.labelContainer}>
                                    <span>2:   </span>
                                    <input type="radio" id={styleForm.difficulty2} name="formDifficulty" onChange={handleChange} value="2"></input>
                                </label>
                                <label htmlFor={styleForm.difficulty3} className={styleForm.labelContainer}>
                                    <span>3:   </span>
                                    <input type="radio" id={styleForm.difficulty3} name="formDifficulty" onChange={handleChange} value="3"></input>
                                </label>
                                <label htmlFor={styleForm.difficulty4} className={styleForm.labelContainer}>
                                    <span>4:   </span>
                                    <input type="radio" id={styleForm.difficulty4} name="formDifficulty" onChange={handleChange} value="4"></input>
                                </label>
                                <label htmlFor={styleForm.difficulty5} className={styleForm.labelContainer}>
                                    <span>5:   </span>
                                    <input type="radio" id={styleForm.difficulty5} name="formDifficulty" onChange={handleChange} value="5"></input>
                                </label>
                            </div>
                            <div id={styleForm.seasonContainer}>
                                <div>
                                    <label className={styleForm.labelContainer}><span>SEASON</span></label>
                                </div>
                                <label htmlFor={styleForm.SUMMER} className={styleForm.labelContainer} >
                                    <span>SUMMER</span>
                                    <input type="radio" id={styleForm.SUMMER} name="formSeason" onChange={handleChange} value="summer"></input>
                                </label>
                                <label htmlFor={styleForm.AUTUMN} className={styleForm.labelContainer}>
                                    <span>AUTUMN</span>
                                    <input type="radio" id={styleForm.AUTUMN} name="formSeason" onChange={handleChange} value="autumn"></input>
                                </label>
                                <label htmlFor={styleForm.WINTER} className={styleForm.labelContainer}>
                                    <span>WINTER</span>
                                    <input type="radio" id={styleForm.WINTER} name="formSeason" onChange={handleChange} value="winter"></input>
                                </label>
                                <label htmlFor={styleForm.SPRING} className={styleForm.labelContainer}>
                                    <span>SPRING</span>
                                    <input type="radio" id={styleForm.SPRING} name="formSeason" onChange={handleChange} value="spring"></input>
                                </label>
                                <label htmlFor={styleForm.ALL} className={styleForm.labelContainer}>
                                    <span>ALL</span>
                                    <input type="radio" id={styleForm.ALL} name="formSeason" onChange={handleChange} value="all"></input>
                                </label>
                            </div>
                            <div id={styleForm.countryPicker}>
                                <div>
                                    <label htmlFor={styleForm.search} className={styleForm.labelContainer}>
                                        <span>COUNTRIES:   </span>
                                        <input type="text" id={styleForm.search} placeholder="Pick a Country" onChange={searchCountry}></input>
                                    </label>
                                    <div id={styleForm.searchHeader}>
                                        {(searchedCountries.length!==0)?
                                            searchedCountries.map((el,i)=>{
                                                return <a id={i} onClick={picker} className={styleForm.picked}>{el.name}</a>
                                            })
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                    
                                <div id={styleForm.pickedCountries}>
                                    <h4>Selected Countries</h4>
                                    {
                                        (pickedCountries.length!==0) ? 
                                            pickedCountries.map((el, i) => {
                                                return <span className={`${styleForm.details} ${styleForm.picked}`}>{el} <a onClick={remove} id={i}>X</a></span>
                                            })
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <input type="button" id={styleForm.submit} onClick={submitData} value="CREATE"></input>
                        </>
                    :
                        <h1>Activity Created</h1>
        }
    </div>
}

function mapStateToProps(state){
    return {
        isLoading: state.isLoading,
        success: state.success,
    }
}

function mapDispatchToProps(dispatch){
    return {
        createActivity: (data) => dispatch(createActivity(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity);