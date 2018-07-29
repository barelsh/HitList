import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import {ApplicationStyles} from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listContent: {
    marginTop: Metrics.baseMargin,
    width: '80%',
    margin: '10%',
  },
  memberRow: {
    color: Colors.frost,
    backgroundColor: Colors.facebook,
    height: 40,
  }
})
