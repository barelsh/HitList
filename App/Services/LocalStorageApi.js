import { AsyncStorage } from 'react-native'


_retrieveData = async (key) => {
  try {
    console.log('getting '+ '@HitList:'+key)
    const value = await AsyncStorage.getItem('@HitList:'+key);
    if (value !== null) {
      return {
        ok: true,
        data: JSON.parse(value)
      }
    }
    else {
      return {
        ok: true,
        data: []
      }
    }
  } catch (error) {
    return {
      ok: false,
      error: error
    }
  }
}

_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem('@HitList:'+key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    console.log('storeData. ERROR! ' + error.message)
  }
}

export async function fetchLists(userId){
  console.log('fetching...')
  const data = await _retrieveData(`${userId}:Lists`);
  console.log('fetched! ' + JSON.stringify(data))
  return data;
}

export async function setExampleLists(userId){
  await _storeData(`${userId}:Lists`,
      [
        {id: 0, title: 'First List', description: 'First Description'},
        {id: 1, title: 'Second List', description: 'Second Description'},
      ])

  await _storeData(`Lists:0:Members`,
    [
      {id:0, name: 'barel'},
      {id:1, name: 'shmuel'},
      {id:2, name: 'susu'},
      {id:3, name: 'batata'},
    ])
  await _storeData(`Lists:0:Balances`,
    [
      {memberId: 0, balance: 100},
      {memberId: 1, balance: -150},
      {memberId: 2, balance: 50},
      {memberId: 3, balance: 0},
    ])

  await _storeData(`Lists:1:Members`,
    [
      {id:0, name: 'barel'},
      {id:1, name: 'boris'},
    ])
  await _storeData(`Lists:1:Balances`,
    [
      {memberId: 0, balance: 400},
      {memberId: 1, balance: -400},
    ])
}

export async function getListMembers(listId){
  console.log('fetching...')
  const data = await _retrieveData(`Lists:${listId}:Members`);
  console.log('fetched! ' + JSON.stringify(data))
  return data;
}

export async function getListBalances(listId){
  console.log('fetching...')
  const data = await _retrieveData(`Lists:${listId}:Balances`);
  console.log('fetched! ' + JSON.stringify(data))
  return data;
}

//TODO test
export async function fetchListTransactions(listId) {
  console.log('fetching...')
  const data = await _retrieveData(`Lists:${listId}:Transactions`);
  console.log('fetched! ' + JSON.stringify(data))
  return data;
}

export default {
  fetchLists,
  setExampleLists,
  getListBalances,
  getListMembers
}
