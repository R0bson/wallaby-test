/* @flow */
import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
//import { routerReducer } from 'react-router-redux'

//import entities from './entities/reducers'
//import browser from './browser/browser'

//import type {ReduxState, ReduxAction} from './redux.flow'



export default function createReducer() {
  return combineReducers({
    form,
  })
}

/* eslint-disable */
// Using for injecting the async reducers
//export const injectReducer = (store: Object, name: string, reducer: Function) => {
//  store.asyncReducers[name] = reducer
//  store.replaceReducer(createReducer(store.asyncReducers))
//}
/* eslint-enable */
