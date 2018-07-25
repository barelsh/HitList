import { call, put } from 'redux-saga/effects'
import AddTransactionActions from '../Redux/AddTransactionRedux'
// import { AddTransactionSelectors } from '../Redux/AddTransactionRedux'

const utils = require('../Lib/utils')

export function * postAddTransaction (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(AddTransactionSelectors.getData)
  // make the call to the api
  let transactionId = utils.generateGuid()
  let transactionData = {
    ...data.transaction,
    time: new Date().toISOString()
  }
  const response = yield call(api.postTransaction, transactionId, data.listId, transactionData)

  // success?
  if (response.ok) {
    //const ts = yield call(api.fetchListTransactions, data.listId)

    yield put(AddTransactionActions.addTransactionSuccess(response.data))
  } else {
    yield put(AddTransactionActions.addTransactionFailure())
  }
}
