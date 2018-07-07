import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import {Colors, Metrics} from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listContent: {
    marginTop: Metrics.baseMargin,
    width: '80%',
    margin: '10%',
  },
  balanceRow : {
    flex: 1,
    backgroundColor: Colors.frost,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  balanceName: {
    fontWeight: 'bold',
  },
  positiveBalance: {
    color: '#00A012'
  },
  negativeBalance: {
    color: '#A0030A'
  },
  zeroBalance: {
    color: '#1d85c4'
  }
})
