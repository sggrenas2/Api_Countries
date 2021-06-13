const initialState = {
    isLoading: false,
    dataPage:[],
    pages: 0,
};

const countries = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return {...state, isLoading: true};
        case 'SHOW_DATA':
            return {
                isLoading:false,
                dataPage: action.dataPage,
                pages: action.pages
            }
        default:
            return state;
    }
}

export default countries;