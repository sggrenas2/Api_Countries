import "./App.css";
import Main from "./Components/Main.jsx";
import CountryDetail from "./Components/countryDetail.jsx";
import { Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Route path="/home" component={Main}></Route>
			<Route path="/country/:id" component={CountryDetail}></Route>
		</div>
	);
}

export default App;
