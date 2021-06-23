export function getData(page=1,options, front){
    return async (dispatch) => {
        dispatch(loading());
        if(front){
            let data = await fetch('http://localhost:3001/activity/fulldata');
            data = await data.json();
            dispatch(orderData(page,data, options));
        }else{
            let urlBase = `http://localhost:3001/countries?page=${page}`;
            if(options !== undefined){
                for(let key in options){
                    urlBase += `&${key}=${options[key]}`;
                }
            }
            console.log(urlBase);
            let data = await fetch(urlBase);
            data = await data.json();
            if(Array.isArray(data)){
                data = {
                    dataPage: [],
                    pages: 0,
                }
            }
            let {dataPage, pages} = data;
            dispatch(showData(dataPage, pages));
        }
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

export function orderData(page,data, options){
    let filterData = [];
    data.forEach(element => {
        if(options.searchValue !== "" && element.name.includes(options.searchValue)){
            filterData.push(element);
        }
        if(options.seasons.length > 0){
            options.seasons.forEach(filter => {
                if(filter[element.season]){
                    filterData.push(element)
                } 
            })
        }
        if(options.difficulties.length > 0){
            options.difficulties.forEach(filter => {
                if(filter[element.difficulty]){
                    filterData.push(element)
                } 
            })
        }
        if(options.durations.length > 0){
            options.durations.forEach(filter => {
                if(filter[element.duration]){
                    filterData.push(element)
                } 
            })
        }
    });
    console.log(filterData);
    let countries = [];
    filterData.forEach(el => countries.push(el.Countries));
    countries = countries.flat();
    let dataSet = new Set(countries.map(JSON.stringify));
    data = Array.from(dataSet).map(JSON.parse);
    data = pagination(data);
    return {
        type: 'SHOW_DATA',
        dataPage: (data.length===0)? [] : data[page-1],
        pages: data.length
    }
}

function pagination(data, amountByPage=10){
    let aux = data;
    data = [];
    let page = [];
    let pages = Math.ceil(aux.length/amountByPage);
    let start, end;
    for(let i = 0; i<pages; i++){
        start = i*amountByPage;
        end = ((start+amountByPage)>aux.length) ? aux.length : start+amountByPage;
        page = [];
        for(start; start<end; start++){
            page.push(aux[start]);
        }
        data.push(page);
    }
    return data;
}