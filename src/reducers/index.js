import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import matches from './matches'
import admin from './admin'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  matches,
  admin
})

export default rootReducer
