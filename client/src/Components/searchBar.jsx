import React from "react";
import searchBarStyle from "./../Css/SearchBar.module.css";

function SearchBar(props){
    return <div id={searchBarStyle.container}>
        <input type="text" placeholder={props.placeholder} id={props.idText} name={props.name}/>
        <input type="button" value={props.CTA} id={props.idButton} onClick={props.eventClick}/>
    </div>
}

export default SearchBar;