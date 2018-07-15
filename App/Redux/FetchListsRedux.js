import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchListsRequest: ['data'],
  fetchListsSuccess: ['payload'],
  fetchListsFailure: ['error']
})

export const FetchListsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const FetchListsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => {
  console.log('in request')
  return state.merge({fetching: true, data, payload: null})
}

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, error) =>
  state.merge({ fetching: false, error: error, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_LISTS_REQUEST]: request,
  [Types.FETCH_LISTS_SUCCESS]: success,
  [Types.FETCH_LISTS_FAILURE]: failure
})
