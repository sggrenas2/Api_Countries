
import styleNav from './../Css/navBar.module.css';
import {Link} from "react-router-dom";
import { useState } from 'react';
import FormActivity from './FormActivity.jsx';
import {cleanSuccess} from './../Actions';
import { connect } from 'react-redux';

export function NavBar({cleanSuccess}){

    const [createActive, setCreateActive] = useState(false);

    function handleClick(){
        cleanSuccess();
        setCreateActive(!createActive);
        document.getElementById(styleNav.createActivity).style.display = (createActive) ? "flex" : "none";
    }

    return <div id={styleNav.container}>
        <Link id={styleNav.link} to="/home">HOME</Link>
        <Link id={styleNav.link} to="/">LANDING</Link>
        <a id={styleNav.link} onClick={handleClick}>CREATE ACTIVITY</a>
        <div id={styleNav.createActivity}>
            <a
                onClick={handleClick}
                id={styleNav.close}
            >X</a>
            <FormActivity></FormActivity>
        </div>
    </div>
}

function mapDispatchToProps(dispatch){
    return {
        cleanSuccess: ()=>dispatch(cleanSuccess()),
    }
}

export default connect(null, mapDispatchToProps)(NavBar);