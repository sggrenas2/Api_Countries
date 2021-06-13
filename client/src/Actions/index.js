export function getData(page=1){
    return async (dispatch) => {
        dispatch(loading());
        let data = await fetch(`http://localhost:3001/countries?page=${page}`);
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