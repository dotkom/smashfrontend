import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import matches from './matches'
import admin from './admin'
import characters from './characters'
import users from './users'
import matchregister from './matchregister'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  matches,
  admin,
  users,
  characters,
  matchregister
})

export default rootReducer
