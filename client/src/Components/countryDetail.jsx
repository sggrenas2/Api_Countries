import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCountryDetails } from "./../Actions";
import Dropdwon from "./DropdownMenu.jsx";
import styleCountry from "./../Css/countryDetail.module.css";

export function CountryDetail({ dataDetails, getCountryDetails, isLoading}) {
	const { id } = useParams();

	useEffect(() => {
		getCountryDetails(id);
	}, []);

	function formatNumber(number) {
		number = "" + number;
		let aux = [];
		let m = 1;
		for (let i = number.length - 1; i >= 0; i--) {
			aux.push(number[i]);
			if (m / 3 === 1) {
				aux.push(".");
			}
			if (m / 3 === 2) {
				aux.push("'");
			}
			m++;
		}
		number = aux.reverse().join("");
		return number;
	}

	return (
		<div id={styleCountry.container}>{
            (isLoading)
                ?
                <h2>Loading...</h2>
                :
                <>
                <div id={styleCountry.header}>
                    <h1>{dataDetails.name}</h1>
                    <h3>{dataDetails.id}</h3>
                    <img
                        src={dataDetails.flag}
                        alt={`${dataDetails.name} Flag`}
                    ></img>
                </div>
                <div className={styleCountry.container}>
                    <h2>Details</h2>
                    <fieldset>
                        <legend>Geographic</legend>
                        <p>{"Continent: " + dataDetails.continent}</p>
                        <p>{"Capital: " + dataDetails.capital}</p>
                        <p>
                            {"Area: " + formatNumber(dataDetails.area) + " Km"}
                            &sup2;
                        </p>
                    </fieldset>
                    <fieldset>
                        <legend>Demographic</legend>
                        <p>
                            {"Population: " +
                                formatNumber(dataDetails.population) +
                                " Habitants"}
                        </p>
                    </fieldset>
                </div>
                <div className={styleCountry.container} id={styleCountry.activityContainer}>
                    <h2>Activities</h2>
                    {(dataDetails.Activities && dataDetails.Activities.length !== 0) ? 
                        dataDetails.Activities.map((activity,i) => {
                            return <Dropdwon
                                id={`activity${i}`}
                                name = {activity.name}
                                difficulty = {activity.difficulty}
                                duration = {activity.duration}
                                season = {activity.season}
                            >
                            </Dropdwon>
                        })
                     : 
                        <p>No activities found</p>
                    }
                </div>
                </>
        }
		</div>
	);
}

function mapStateToProps(state) {
	return {
		dataDetails: state.dataDetails,
        isLoading: state.isLoading,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getCountryDetails: (id) => dispatch(getCountryDetails(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);
