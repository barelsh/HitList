import { StackNavigator } from 'react-navigation'
import AddTransactionScreen from '../Containers/AddTransactionScreen'
import ListScreen from '../Containers/ListScreen'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AddTransactionScreen: { screen: AddTransactionScreen },
  ListScreen: { screen: ListScreen },
  MainScreen: { screen: MainScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
});

export default PrimaryNav
