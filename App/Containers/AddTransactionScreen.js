import React, { Component } from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, TextInput, Picker,} from 'react-native'
import {CheckBox, Button} from 'react-native-elements'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import AddTransactionActions from '../Redux/AddTransactionRedux'

// Styles
import styles from './Styles/AddTransactionScreenStyle'

class AddTransactionScreen extends Component {
  constructor(){
    super()
    console.log('AddTransactionScreen constructor this.props')

    this.state = {
      whoPayed: null, //this.props.members[0],
      forWhom: [],
      amount: 0,
      description: ''
    }
  }

  onPressForWhom(memberId) {
    if (!this.state.forWhom.includes(memberId)) {
      this.setState({
        forWhom: this.state.forWhom.concat(memberId)
      })
    }
    else {
      this.setState({
        forWhom: this.state.forWhom.filter(mId=>mId != memberId)
      })
    }
  }

  onChangedWhoPayed(member){
    this.setState({
      whoPayed: member
    })
  }

  onChangedHowMach(text) {
    this.setState({
      amount: parseFloat(text)
    })
  }

  onChangedDescription(text) {
    this.setState({
      description: text
    })
  }

  onSubmitPress() {
    this.props.addTransaction({
        whoPayed: this.state.whoPayed.id,
        forWhom: this.state.forWhom.map(mId => mId),
        amount: this.state.amount,
        description: this.state.description,
      },
      this.props.list.data.id);

    //TODO make this happen after transaction is set
    this.props.navigation.goBack();
  }

  initStateFromProps() {
    this.setState({
      whoPayed: this.props.members[0],
      forWhom: this.props.members.map(m=>{return m.id})
    })
  }

  render () {
    console.log('in AddTransactionScreen render. state ' + JSON.stringify(this.state))
    console.log('in AddTransactionScreen render. props ' + JSON.stringify(this.props))
    if (this.state.whoPayed == null) {
      this.initStateFromProps();
      return null;
    }

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>AddTransactionScreen</Text>

          <View style={styles.container}>
            <Text>Who payed: </Text>
            <Picker style={{width:250, height:30}} mode={'dropdown'} onValueChange={this.onChangedWhoPayed.bind(this)}
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
                            onPress={this.onPressForWhom.bind(this,item.id)}/>
                )
              }
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>How much: </Text>
            <TextInput style={{width:40}} keyboardType={'numeric'} onChangeText={this.onChangedHowMach.bind(this)}/>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>What for: </Text>
            <TextInput style={{width:150}} onChangeText={this.onChangedDescription.bind(this)} />
          </View>
          <Button title={'submit'} onPress={this.onSubmitPress.bind(this)}/>
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
    addTransaction: (transaction, listId) => dispatch(AddTransactionActions.addTransactionRequest({transaction, listId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen)
