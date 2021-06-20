import React, { useEffect } from 'react';
import Card from './Cards.jsx';
import {connect} from 'react-redux';
import {getData} from './../Actions';
import containerStyle from './../Css/CardContainer.module.css';


export function CardContainer({data, pages, byName, byPopulation, getData, isLoading}){

    useEffect(()=>{
        let options = {}
        if(byName==="asc" || byName==="dec") options.byName = byName;
        if(byPopulation==="asc" || byPopulation==="dec") options.byPopulation = byPopulation;
        getData(1, options);
    },[byName, byPopulation])

    return <div id={containerStyle.cardsContainer}>
        {(isLoading)?
            <h1>loading...</h1>
            :
            (data.length>0)?
                data.map(country=>{
                    return <Card
                        id={country.id}
                        name={country.name}
                        flag={country.flag}
                        continent={country.continent}
                        key = {country.id}
                    >
                    </Card>
                })
                :
                <h1>No Data Found</h1>
        }
    </div>
}

function mapStateToProps(state){
    return {
        data: state.dataPage,
        pages: state.pages,
        isLoading: state.isLoading,
        byName: state.byName,
        byPopulation: state.byPopulation,
    }
};

function mapDispatchToProps(dispatch){
    return {
        getData: (page,options)=>dispatch(getData(page,options)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardContainer); 