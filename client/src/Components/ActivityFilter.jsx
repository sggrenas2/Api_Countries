import React, { useEffect, useState } from "react";
import styleFiltersAct from "./../Css/ActivityFilter.module.css";
import { connect } from "react-redux";
import { getData, setFilter } from "../Actions";
import SearchBar from "./searchBar.jsx";

export function ActivityFilter({ getData, setFilter }) {
	const [filters, setFilters] = useState({});

	useEffect(() => {
		async function getFilters() {
			let data = await fetch(
				"http://localhost:3001/activity/filtersData"
			);
			data = await data.json();
			setFilters(data);
		}
		getFilters();
	}, []);

	function handleChange(ev) {
		
		if(ev.target.name === "continents"){
			setFilter("byContinent", ev.target.id);
		}else{
			let options = {
				searchValue: "",
				seasons: [],
				difficulties: [],
				durations: [],
			};
			let seasons = Array.from(document.getElementsByName("season"));
			let difficulties = Array.from(document.getElementsByName("difficulty"));
			let durations = Array.from(document.getElementsByName("duration"));
			if (ev.target.id === "searchButton") {
				options.searchValue =
					document.getElementById("activitySearch").value;
			}
			seasons.forEach((el) => {
				let obj = {};
				if (el.checked) {
					obj[el.value] = el.checked;
					options.seasons.push(obj);
				}
			});
			difficulties.forEach((el) => {
				let obj = {};
				if (el.checked) {
					obj[el.value] = el.checked;
					options.difficulties.push(obj);
				}
			});
			durations.forEach((el) => {
				let obj = {};
				if (el.checked) {
					obj[el.value] = el.checked;
					options.durations.push(obj);
				}
			});
			getData(1, options, true);
		}
	}

	return (
		<>	
			<input
				type="checkbox"
				id={styleFiltersAct.titleContinent}
				name="title"
			></input>
			<label
				htmlFor={styleFiltersAct.titleContinent}
				id={styleFiltersAct.titleContainerContinent}
			>
				<span>Continent Filter</span>
				<span id={styleFiltersAct.icon}>
					<i className="fa fa-angle-down" aria-hidden="true"></i>
				</span>
			</label>
			<input
				type="checkbox"
				id={styleFiltersAct.title}
				name="title"
			></input>
			<label
				htmlFor={styleFiltersAct.title}
				id={styleFiltersAct.titleContainer}
			>
				<span>Activity Filter</span>
				<span id={styleFiltersAct.icon}>
					<i className="fa fa-angle-down" aria-hidden="true"></i>
				</span>
			</label>
			<div id={styleFiltersAct.contentContainer}>
                <SearchBar
                    placeholder="Looking for an especific activity?"
                    name="searchActivity"
                    idText="activitySearch"
                    CTA="Search"
                    idButton="searchButton"
                    eventClick={handleChange}
                >
                </SearchBar>
				<fieldset id={styleFiltersAct.duration}>
					<legend>Duration</legend>
					{filters.durations ? (
						filters.durations.map((el) => {
							let name = Object.keys(el)[0];
							return (
								<>
									<label htmlFor={`dur${name}`}>
										{`${name} (${el[name]})`}
										<input
											type="checkbox"
											name="duration"
											id={`dur${name}`}
											className={
												styleFiltersAct.checkboxes
											}
											value={name}
											onChange={handleChange}
										></input>
									</label>
								</>
							);
						})
					) : (
						<p>loading</p>
					)}
				</fieldset>
				<fieldset id={styleFiltersAct.difficulty}>
					<legend>Difficulty</legend>
					{filters.difficulties ? (
						<>
							<label htmlFor="dif1">
								{`${filters.difficulties[0].name} (${filters.difficulties[0].count}) `}
								<input
									type="checkbox"
									name="difficulty"
									id="dif1"
									className={styleFiltersAct.checkboxes}
									value="1"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="dif2">
								{`${filters.difficulties[1].name} (${filters.difficulties[1].count}) `}
								<input
									type="checkbox"
									name="difficulty"
									id="dif2"
									className={styleFiltersAct.checkboxes}
									value="2"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="dif3">
								{`${filters.difficulties[2].name} (${filters.difficulties[2].count}) `}
								<input
									type="checkbox"
									name="difficulty"
									id="dif3"
									className={styleFiltersAct.checkboxes}
									value="3"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="dif4">
								{`${filters.difficulties[3].name} (${filters.difficulties[3].count}) `}
								<input
									type="checkbox"
									name="difficulty"
									id="dif4"
									className={styleFiltersAct.checkboxes}
									value="4"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="dif5">
								{`${filters.difficulties[4].name} (${filters.difficulties[4].count}) `}
								<input
									type="checkbox"
									name="difficulty"
									id="dif5"
									className={styleFiltersAct.checkboxes}
									value="5"
									onChange={handleChange}
								></input>
							</label>
						</>
					) : (
						<p>loading</p>
					)}
				</fieldset>
				<fieldset id={styleFiltersAct.season}>
					<legend>Season</legend>
					{filters.seasons ? (
						<>
							<label htmlFor="summer">
								{`${filters.seasons[0].name} (${filters.seasons[0].count}) `}
								<input
									type="checkbox"
									name="season"
									id="summer"
									className={styleFiltersAct.checkboxes}
									value="summer"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="winter">
								{`${filters.seasons[1].name} (${filters.seasons[1].count}) `}
								<input
									type="checkbox"
									name="season"
									id="winter"
									className={styleFiltersAct.checkboxes}
									value="winter"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="spring">
								{`${filters.seasons[2].name} (${filters.seasons[2].count}) `}
								<input
									type="checkbox"
									name="season"
									id="spring"
									className={styleFiltersAct.checkboxes}
									value="spring"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="autumn">
								{`${filters.seasons[3].name} (${filters.seasons[3].count}) `}
								<input
									type="checkbox"
									name="season"
									id="autumn"
									className={styleFiltersAct.checkboxes}
									value="autumn"
									onChange={handleChange}
								></input>
							</label>
							<label htmlFor="all">
								{`${filters.seasons[4].name} (${filters.seasons[4].count}) `}
								<input
									type="checkbox"
									name="season"
									id="all"
									className={styleFiltersAct.checkboxes}
									value="all"
									onChange={handleChange}
								></input>
							</label>
						</>
					) : (
						<p>loading</p>
					)}
				</fieldset>
			</div>
			<div id={styleFiltersAct.contentContainerContinent}>
				<fieldset id={styleFiltersAct.continents}>
					<legend>Continents</legend>
					<label htmlFor="Africa">
						Africa
						<input type="radio" name="continents" id="Africa" value="Africa" onChange={handleChange}></input>
					</label>
					<label htmlFor="Americas">
						America
						<input type="radio" name="continents" id="Americas" value="Americas" onChange={handleChange}></input>
					</label>
					<label htmlFor="Asia">
						Asia
						<input type="radio" name="continents" id="Asia" value="Asia" onChange={handleChange}></input>
					</label>
					<label htmlFor="Europe">
						Europe
						<input type="radio" name="continents" id="Europe" value="Europe" onChange={handleChange}></input>
					</label>
					<label htmlFor="Oceania">
						Oceania
						<input type="radio" name="continents" id="Oceania" value="Oceania" onChange={handleChange}></input>
					</label>
				</fieldset>
			</div>
		</>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		getData: (page, options, front) =>
			dispatch(getData(page, options, front)),
		setFilter: (option, type) => dispatch(setFilter(option,type)),
	};
}

export default connect(null, mapDispatchToProps)(ActivityFilter);
