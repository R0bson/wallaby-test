import {toUpper, compose} from '../../utils/toolbox'


//export const createAction =
// (type, payload = undefined, meta = undefined) => ({ type, payload,
// meta }) export const createWrappedAction = (type) => (payload,
// meta) => ({ type, payload, meta }) export const
// makeConstantBuilder = curry((system: string, module: string,
// action:string): string => `${system}/${module}/${toUpper(action)}`
// ) export const passPayload = f => action => f(action.payload)


const composeTypeAndPayload = type => payload => ({type, payload})


export const actionCreator = module => (name, creator, reducer) => {
  const actionType = `${module}/${name}`
  const newCreator = compose(
    composeTypeAndPayload(actionType),
    creator
  )
  newCreator.type = actionType //eslint-disable-line fp/no-mutation
  newCreator.reducer = reducer //eslint-disable-line fp/no-mutation
  return newCreator
}

export function createReducer(initialState, actions, standardReducer) {
  return (state = initialState, action) => {
    for (const a of actions) { // eslint-disable-line
      if (a.type === action.type) {
        return a.reducer(state, action.payload)
      }
    }
    return standardReducer
      ? standardReducer(state, action)
      : state
  }
}

export const reducerNoOp = state => state
export const assignToObject = obj => state => ({...state, ...obj})
export const reducerAssignToObject = obj => state => ({...state, ...obj})
export const reducerAssignPayload = (state, payload) => ({...state, ...payload})
export const reducerAppendToArray = obj => state => [...state, ...obj]
export const reducerPrependToArray = obj => state => [...obj,
  ...state]
export const actionEmpty = () => ({})
