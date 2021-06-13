import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './../Reducer';


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));