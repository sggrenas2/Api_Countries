import "./App.css";
import Main from "./Components/Main.jsx";
import CountryDetail from "./Components/countryDetail.jsx";
import Landing from "./Components/Landing.jsx";
import NavBar from './Components/navBar.jsx';
import { Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<NavBar></NavBar>
			<Route path="/home" component={Main}></Route>
			<Route path="/country/:id" component={CountryDetail}></Route>
			<Route exact path="/" component={Landing}></Route>
		</div>
	);
}

export default App;
