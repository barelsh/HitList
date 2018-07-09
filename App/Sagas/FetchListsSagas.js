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

export function * getFetchLists (action) {
  const { data } = action
  // get current data from Store
  const currentData = yield select(FetchListsSelectors.getData)
  // make the call to the api
  //const response = yield call(api.getfetchLists, data)

  const response = {
    ok: true,
    data:
      [
        {title: 'First List', description: 'First Description'},
        {title: 'Second List', description: 'Second Description'},
        {title: 'Third List', description: 'Third Description'},
        {title: 'Fourth List', description: 'Fourth Description'},
      ]
  }


  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FetchListsActions.fetchListsSuccess(response.data))
  } else {
    yield put(FetchListsActions.fetchListsFailure())
  }
}
