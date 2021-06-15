const initialState = {
    isLoading: false,
    dataPage:[],
    pages: 0,
    byName: false,
    byPopulation: false,
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
            console.log("filterActive= "+action.filterActive);
            console.log("option= "+action.opt);
            if(action.filterActive==="byName"){
                newState.byName = action.opt;
                newState.byPopulation = false;
            }else{
                newState.byName = false;
                newState.byPopulation = action.opt;
            }
            return newState;
        default:
            return state;
    }
}

export default countries;