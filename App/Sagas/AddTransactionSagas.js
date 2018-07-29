import { call, put, select } from 'redux-saga/effects'
import AddTransactionActions from '../Redux/AddTransactionRedux'
import { SelectListSelectors} from '../Redux/SelectListRedux'

const utils = require('../Lib/utils')

export function * postAddTransaction (api, action) {
  const { data } = action
  // get current data from Store
  const beforeBalances = yield select(SelectListSelectors.getBalances)
  // make the call to the api
  let transactionId = utils.generateGuid()
  let transactionData = {
    ...data.transaction,
    time: new Date().toISOString()
  }
  let balances = utils.updateBalances(beforeBalances, transactionData)
  const response = yield call(api.postTransaction, transactionId, data.listId, transactionData)

  // success?
  if (response.ok) {
    const listId =  yield select(SelectListSelectors.getListId)
    yield call(api.postBalances, listId, balances)
    yield put(AddTransactionActions.addTransactionSuccess(response.data))
  } else {
    yield put(AddTransactionActions.addTransactionFailure())
  }
}
