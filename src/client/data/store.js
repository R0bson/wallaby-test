import {createStore, applyMiddleware} from 'redux'
//import {createEpicMiddleware} from 'redux-most'
import chalk from 'chalk'
import {composeWithDevTools} from 'redux-devtools-extension'
//import { routerMiddleware } from 'react-router-redux'
import createReducer from './reducers'
//import rootEpic from './epics'
//import type {ReduxState} from './redux.flow'


//const epicMiddleware = createEpicMiddleware(rootEpic)
const devToolsOptions = {
  name: 'Tools',
  latency: 300,
  maxAge: 100,
  actionsBlacklist: [
    'browser/Scrolled',
  ],
  //predicate - can replace actionsBlacklist based on data and state
}
const composeEnhancers = composeWithDevTools(devToolsOptions)
function devTools() {
  if (process.env.NODE_ENV === 'development'
    && !process.env.SSR
    && typeof window === 'object'
    && typeof window.devToolsExtension !== 'undefined') {
    return window.devToolsExtension()
  }
  const identity = f => f
  return identity
}


export default (initialState, serverMiddleware) => {
  const basicMiddleware = [
    //epicMiddleware,
    //routerMiddleware(history),
  ]
  const middlewares = (serverMiddleware)
    ? basicMiddleware.concat([serverMiddleware])
    : basicMiddleware

  const enhancers = [
    applyMiddleware(...middlewares),
    //devTools(),
  ]

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )

  store.asyncReducers = {} // eslint-disable-line fp/no-mutation

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(
      './reducers', () => {
        System.import('./reducers')
        .then(reducers => store.replaceReducer(reducers.default(store.asyncReducers)))
        .catch(error => console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`))) // eslint-disable-line no-console
      }
    )

    module.hot.accept(
      './epics', () => {
        //System.import('./epics')
        //.then(epics => epicMiddleware.replaceEpic(epics.default))
        //.catch(error => console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`))) // eslint-disable-line no-console
      }
    )
  }
  return store
}
