import { registerUserReducer } from "./reducers/userReducers";
import {combineReducers} from 'redux';
import {createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const finalReducer = combineReducers({
    registerUserReducer : registerUserReducer
})

export default finalReducer;