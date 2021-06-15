import "./App.css";
import CardContainer from "./Components/CardContainer.jsx";
import Filters from './Components/Filters.jsx';

function App() {
	return (
		<div className="App">
			<Filters
				filterType="ByContinent"
				filterName="By Continent"
			></Filters>
      		<CardContainer></CardContainer>
		</div>
	);
}

export default App;
