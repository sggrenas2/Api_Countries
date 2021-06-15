export function getData(page=1,options){
    return async (dispatch) => {
        dispatch(loading());
        let urlBase = `http://localhost:3001/countries?page=${page}`;
        if(options !== undefined){
            for(let key in options){
                urlBase += `&${key}=${options[key]}`;
            }
        }
        console.log(urlBase);
        let data = await fetch(urlBase);
        let {dataPage, pages} = await data.json();
        dispatch(showData(dataPage, pages));
    }
}

export function loading(){
    return {
        type: 'LOADING',
    }
}

export function showData(dataPage, pages){
    return{
        type: 'SHOW_DATA',
        dataPage,
        pages
    }
}

export function setFilter(filterActive, opt){
    return {
        type: 'SET_FILTER',
        filterActive,
        opt
    }
}