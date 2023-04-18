import { combineReducers } from "redux";
import { reducer } from '../reducer';


const reducerModule = combineReducers({
    attackerDetails: reducer,
})

export default reducerModule;