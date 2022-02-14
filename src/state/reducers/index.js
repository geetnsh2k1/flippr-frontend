import { combineReducers } from "redux"
import UserReducer from "./UserReducers"

const reducers = combineReducers({
    UserReducer: UserReducer,
})

export default reducers