import "./App.css";
import CardContainer from "./Components/CardContainer.jsx";
import Filters from './Components/Filters.jsx';
import ActivityFilter from "./Components/ActivityFilter";

function App() {
	return (
		<div className="App">
			<Filters
				filterType="ByContinent"
				filterName="By Continent"
			></Filters>
			<ActivityFilter></ActivityFilter>
      		<CardContainer></CardContainer>
		</div>
	);
}

export default App;
