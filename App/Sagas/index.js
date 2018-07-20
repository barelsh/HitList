import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import LocalStorageApi from '../Services/LocalStorageApi'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { FetchListsTypes } from '../Redux/FetchListsRedux'
import { SelectListTypes } from '../Redux/SelectListRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getFetchLists } from './FetchListsSagas'
import { getSelectedList } from './SelectListSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

const api = LocalStorageApi

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(FetchListsTypes.FETCH_LISTS_REQUEST, getFetchLists, api),
    takeLatest(SelectListTypes.SELECT_LIST_REQUEST, getSelectedList, api),
  ])
}
