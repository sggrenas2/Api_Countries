import filterStyle from './../Css/Filters.module.css';
import {setFilter} from './../Actions';
import {connect} from 'react-redux';

export function Filter(props){

    function handleChange(ev){
        let ascDec = document.getElementById(`${filterStyle.isReverse}`);
        let byName = document.getElementById(`${filterStyle.byName}`);
        let byPopulation = document.getElementById(`${filterStyle.byPopulation}`);
        if(!byPopulation.checked && !byName.checked && ascDec.checked) {
            window.alert("Select a filter Type first");
            ascDec.checked = false;
        }
        ascDec = (ascDec.checked) ? 'dec' : 'asc';
        if(byName.checked) props.setFilter("byName",ascDec);
        if(byPopulation.checked) props.setFilter("byPopulation",ascDec);
    }

    return <div id={filterStyle.filterContainer}>
        <span id={filterStyle.orderBy}>Order By:</span>
        <input type="radio" name="filter" id={filterStyle.byName} value="byName" onChange={handleChange}/>
        <label htmlFor={filterStyle.byName} className={filterStyle.labelColor}></label>
        <label htmlFor={filterStyle.byName} className={filterStyle.labelNormal}>
            <span className={filterStyle.name}>Name</span>
            <span className={filterStyle.icon}><i className="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <input type="radio" name="filter" id={filterStyle.byPopulation} value="byPopulation" onChange={handleChange}/>
        <label htmlFor={filterStyle.byPopulation} className={filterStyle.labelColor}></label>
        <label htmlFor={filterStyle.byPopulation} className={filterStyle.labelNormal}>
            <span className={filterStyle.name}>Population</span>
            <span className={filterStyle.icon}><i className="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <input type="checkbox" id={filterStyle.isReverse} value="isReverse" onChange={handleChange}/>
        <label htmlFor={filterStyle.isReverse} className={filterStyle.labelColor}></label>
        <label htmlFor={filterStyle.isReverse} className={filterStyle.labelNormal}>
            <span className={filterStyle.name}>Asc/Dec</span>
            <span className={filterStyle.icon}><i className="fa fa-check" aria-hidden="true"></i></span>
        </label>
    </div>   
}

function mapDispatchToProps(dispatch){
    return {
        setFilter: (opt,type) => dispatch(setFilter(opt,type)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);