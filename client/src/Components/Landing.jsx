
import styleLanding from './../Css/landing.module.css';
import {Link} from 'react-router-dom';
import Map from './../img/mapamundi.png'

export function Landing(){
    return <div id={styleLanding.container}>
        <h1>Api Countries</h1>
        <Link to="/home" id={styleLanding.CTA}>Check Out</Link>
        <img src={Map} alt="mapamundi"></img>
    </div>
}

export default Landing;