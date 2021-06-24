const initialState = {
    isLoading: false,
    dataPage:[],
    pages: 0,
    byName: false,
    byPopulation: false,
    byContinent: false,
    dataDetails: {},
};

const countries = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return {...state, isLoading: true};
        case 'SHOW_DATA':
            return { 
                ...state,
                isLoading:false,
                dataPage: action.dataPage,
                pages: action.pages
            }
        case 'SET_FILTER':
            let newState = {
                ...state
            }
            if(action.filterActive==="byName"){
                newState.byName = action.opt;
                newState.byPopulation = false;
            }else{
                newState.byName = false;
                newState.byPopulation = action.opt;
            }
            if(action.filterActive==="byContinent"){
                newState.byContinent = action.opt;
            }
            return newState;
        case 'SET_COUNTRY_DETAILS':
            return {...state, dataDetails: action.data}
        default:
            return state;
    }
}

export default countries;