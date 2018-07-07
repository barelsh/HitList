import React, { Component } from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, Picker, TextInput,} from 'react-native'
import {CheckBox} from 'react-native-elements'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddTransactionScreenStyle'

class AddTransactionScreen extends Component {

  state = {
    names: [
      {name: 'First Name'},
      {name: 'Second Name'},
      {name: 'Third Name'},
      {name: 'Forth Name'},
    ]
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>AddTransactionScreen</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Who payed: </Text>
            <Picker style={{width:250, height:30}} mode={'dropdown'}>
              {
                this.state.names.map((item, index) =>
                  <Picker.Item label={item.name} key={index}/>
                )
              }
            </Picker>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>For whom: </Text>
            <View style={{width:250, flexDirection: 'column'}}>
              {
                this.state.names.map((item, index) =>
                  <CheckBox title={item.name} key={index} />
                )
              }
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>How much: </Text>
            <TextInput style={{width:40}} keyboardType={'numeric'}/>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>What for: </Text>
            <TextInput style={{width:150}} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen)
