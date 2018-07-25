import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Picker } from 'react-native'
import styles from './Styles/TransactionWhoPayedStyle'

export default class TransactionWhoPayed extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor(){
    super()
    console.log('TransactionWhoPayed constructor. props:' + JSON.stringify(this.props))
    this.state = {
      whoPayed: null
    }
  }

  whoPayedChanged(itemValue){
    this.setState({
      whoPayed: itemValue
    })
  }

  render () {
    let payer = this.state.whoPayed || this.props.defaultPayer
    console.log('TransactionWhoPayed render. payer' + JSON.stringify(payer))

    return (
      <View style={styles.container}>
        <Text>Who payed: </Text>
        <Picker style={{width:250, height:30}} mode={'dropdown'} onValueChange={this.whoPayedChanged.bind(this)}
                selectedValue={payer}>
          {
            this.props.members.map((item, index) =>
              <Picker.Item label={item.name} key={index} value={item}/>
            )
          }
        </Picker>
      </View>
    )
  }
}
