import React from "react";

function SearchBar(props){
    return <div id="searchInput">
        <input type="text" placeholder={props.placeholder} id={props.idText} name={props.name}/>
        <input type="button" value={props.CTA} id={props.idButton} onClick={props.eventClick}/>
    </div>
}

export default SearchBar;