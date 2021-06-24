import { NavLink } from 'react-router-dom';
import stylePagination from './../Css/pagination.module.css';

export function Pagination(props){

    function getButtons(){
        let buttons = [];
        for(let i = 0; i <= props.pages; i++){
            buttons.push(<NavLink 
                to={(props.route) ? props.route : '#'}
                onClick={()=>props.onClick(i+1,props.options)}
                key={i}
                id={stylePagination.page}
            ><i class="fas fa-circle"></i></NavLink>)
        }
        return buttons
    }

    return <div id={stylePagination.paginationContainer}>
        {getButtons().map(el=>el)}
    </div>
}

export default Pagination;