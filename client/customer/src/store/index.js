import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducers.js'
import logger from "./middlewares/logger"

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store