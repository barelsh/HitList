import { AsyncStorage } from 'react-native'


_retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem('@HitList:'+key);
    if (value !== null) {
      return {
        ok: true,
        data: JSON.parse(value)
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
        {id: 2, title: 'Third List', description: 'Third Description'},
        {id: 3, title: 'Fourth List', description: 'Fourth Description'},
      ])
}

export default {
  fetchLists,
  setExampleLists
}
