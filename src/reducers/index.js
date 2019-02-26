import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import matches from './matches'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  matches
})

export default rootReducer
