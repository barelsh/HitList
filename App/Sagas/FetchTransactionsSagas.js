import { call, put } from 'redux-saga/effects'
import FetchTransactionsActions from '../Redux/FetchTransactionsRedux'

export function * getFetchTransactions (api, action) {
  const { data } = action

  const response = yield call(api.getListTransactions, data.listId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FetchTransactionsActions.fetchTransactionsSuccess(response.data))
  } else {
    yield put(FetchTransactionsActions.fetchTransactionsFailure())
  }
}
