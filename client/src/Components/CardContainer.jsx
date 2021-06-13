import React, { useEffect } from 'react';
import Card from './Cards.jsx';
import {connect} from 'react-redux';
import {getData} from './../Actions';
import containerStyle from './../Css/CardContainer.module.css';


export function CardContainer(props){

    useEffect(()=>{
        props.getData(1);
    },[])

    return <div id={containerStyle.cardsContainer}>
        {(props.isLoading)?
            <h1>loading...</h1>
            :
            props.data.map(country=>{
                return <Card
                    id={country.id}
                    name={country.name}
                    flag={country.flag}
                    continent={country.continent}
                >
                </Card>
            })
        }
    </div>
}

function mapStateToProps(state){
    return {
        data: state.dataPage,
        pages: state.pages,
        isLoading: state.isLoading,
    }
};

function mapDispatchToProps(dispatch){
    return {
        getData: (page)=>dispatch(getData(page)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardContainer); 