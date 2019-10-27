import {combineReducers} from "redux";

import {sendMsgReducer} from './msg.redux'
import {createTaskReducer} from './tasks.redux'
import auth from "./auth";

export default combineReducers({sendMsgReducer,createTaskReducer,auth})
