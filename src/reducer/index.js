import {combineReducers} from "redux";
import {postReducer} from './postReducer'
import {createTaskReducer} from './tasks.redux'
import auth from "./auth";

export default combineReducers({postReducer,createTaskReducer,auth})
