import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import coinsReducer from "./reducers/coinsReducer"


const configureStore = () => {
    const store = createStore(combineReducers({
        coinsDetails: coinsReducer
    }), applyMiddleware(thunk))
    return store

}
export default configureStore
