import { call, put, select } from 'redux-saga/effects'
import AddListActions from '../Redux/AddListRedux'
// import { AddListSelectors } from '../Redux/AddListRedux'

const utils = require('../Lib/utils')

export function * postAddList (api, action) {
  const { data } = action

  let listId = utils.generateGuid()
  const response = yield call(api.postAddList, data.userId, listId, data)

  // success?
  if (response.ok) {
    yield put(AddListActions.addListSuccess(response.data))
  } else {
    yield put(AddListActions.addListFailure())
  }
}
