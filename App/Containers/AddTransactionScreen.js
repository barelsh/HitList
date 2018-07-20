import React, { Component } from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, Picker, TextInput,} from 'react-native'
import {CheckBox, Button} from 'react-native-elements'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddTransactionScreenStyle'

class AddTransactionScreen extends Component {

  state = {
    whoPayed: null,
    forWhom: []
  }

  whoPayedChanged(itemValue){
    this.setState({
      whoPayed: itemValue
    })
  }

  forWhomPressed(item) {
    if (!this.state.forWhom.includes(item)) {
      this.setState({
        forWhom: this.state.forWhom.concat(item)
      })
    }
    else {
      this.setState({
        forWhom: this.state.forWhom.filter(memberId=>memberId != item)
      })
    }
  }

  onSubmitPress() {

  }


  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>AddTransactionScreen</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Who payed: </Text>
            <Picker style={{width:250, height:30}} mode={'dropdown'} onValueChange={this.whoPayedChanged.bind(this)}
                    selectedValue={this.state.whoPayed}>
              {
                this.props.members.map((item, index) =>
                  <Picker.Item label={item.name} key={index} value={item}/>
                )
              }
            </Picker>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>For whom: </Text>
            <View style={{width:250, flexDirection: 'column'}}>
              {
                this.props.members.map((item, index) =>
                  <CheckBox title={item.name} key={index} value={item}
                            checked={this.state.forWhom.includes(item.id)}
                            onPress={this.forWhomPressed.bind(this,item.id)}/>
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
          {/*<Button title={'submit'} onPress={this.onSubmitPress.bind(this)}/>*/}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: {...state.selectList},
    members: state.selectList.payload ? JSON.parse(JSON.stringify(state.selectList.payload.members)) : [],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen)
