import CardContainer from "./CardContainer.jsx";
import Filters from './Filters.jsx';
import ActivityFilter from "./ActivityFilter";
import SearchBar from "./searchBar.jsx";
import { connect } from "react-redux";
import { getData } from './../Actions';

function Main({byName, byPopulation, getData}) {

    function handleClick(ev){
        let options = {};
        if(ev.target.id === "searchButton"){
            options.name = document.getElementById("nameSearch").value;
        }
        if(byName==="asc" || byName==="dec") options.byName = byName;
        if(byPopulation==="asc" || byPopulation==="dec") options.byPopulation = byPopulation;
        getData(1, options);
    }

	return (
		<div className="App">
			<Filters
				filterType="ByContinent"
				filterName="By Continent"
			></Filters>
            <SearchBar
                placeholder="Looking for an especific Country?"
                name="searchCountry"
                idText="nameSearch"
                CTA="Get Country"
                idButton="searchButton"
                eventClick={handleClick}
            ></SearchBar>
			<ActivityFilter></ActivityFilter>
      		<CardContainer></CardContainer>
		</div>
	);
}

function mapStateToProps(state){
    return {
        byName: state.byName,
        byPopulation: state.byPopulation,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getData: (page,options)=>dispatch(getData(page,options)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);