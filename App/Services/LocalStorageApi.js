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
    return {
      ok: true
    }
  } catch (error) {
    // Error saving data
    console.log('storeData. ERROR! ' + error.message)
    return {
      ok: false,
      error: error
    }
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
export async function getListTransactions(listId) {
  console.log('fetching...')
  const data = await _retrieveData(`Lists:${listId}:Transactions`);
  console.log('fetched! ' + JSON.stringify(data))
  return data;
}

export async function postAddList(userId, listId, data) {
  const userLists = await _retrieveData(`${userId}:Lists`);
  if (!userLists.ok){
    return userLists;
  }

  let store = await _storeData(`${userId}:Lists`,userLists.data.concat({id: listId, title: data.title, description: ''}))
  if (!store.ok){
    return store;
  }

  store = await _storeData(`Lists:${listId}:Members`, data.members)
  if (!store.ok){
    return store;
  }

  store = await _storeData(`Lists:${listId}:Balances`,
    data.members.map(member => {return {'memberId':member.id, 'balance': 0}}))
  if (!store.ok){
    return store;
  }

  return {ok: true}
}

export async function postTransaction(transactionId, listId, {time, whoPayed,forWhom,amount,description}) {
  console.log('storing...')
  let transactions = await _retrieveData(`Lists:${listId}:Transactions`)
  if (!transactions.ok) {
    return transactions;
  }
  transactions.data.push(transactionId)
  await _storeData(`Lists:${listId}:Transactions`, transactions.data);
  const data = await _storeData(`Lists:${listId}:Transactions:${transactionId}`,
    {
      id: transactionId,
      time,
      whoPayed,
      forWhom,
      amount,
      description
    });
  console.log('stored! ' + JSON.stringify(data))
  return data;
}

export async function postBalances(listId, balances) {
  const data = await _storeData(`Lists:${listId}:Balances`, balances);
  console.log('stored! ' + JSON.stringify(data));
  return data;
}

export default {
  fetchLists,
  setExampleLists,
  getListBalances,
  getListMembers,
  getListTransactions,
  postTransaction,
  postBalances,
  postAddList
}
