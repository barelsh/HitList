/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import FetchListsActions from '../Redux/FetchListsRedux'
import { FetchListsSelectors } from '../Redux/FetchListsRedux'

export function * getFetchLists (api, action) {
  console.log(`in saga! got an action! ` + JSON.stringify(action, Object.getOwnPropertyNames(action)))
  const { data } = action
  // const currentData = select(FetchListsSelectors.getData)

  //yield call(api.setExampleLists, data.user.id)
  const response = yield call(api.fetchLists, data.user.id)

  console.log(`in saga! responded! ` +JSON.stringify(response))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FetchListsActions.fetchListsSuccess(response.data))
  } else {
    yield put(FetchListsActions.fetchListsFailure())
  }
}
