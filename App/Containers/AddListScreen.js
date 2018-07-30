import React, { Component } from 'react'
import {View, ScrollView, Text, TextInput, FlatList} from 'react-native'
import { connect } from 'react-redux'
import Button from "react-native-elements/src/buttons/Button";

import AddListActions from "../Redux/AddListRedux";

// Styles
import styles from './Styles/AddListScreenStyle'

class AddListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      members: [],
      newMember: ''
    }
  }
  oneScreensWorth = 20

  renderMemberRow(member) {
    return (
      <View style={styles.memberRow}>
        <Text>{member.name}</Text>
      </View>
    )
  }

  renderEmpty = () =>
    <Text style={styles.label}> - No Members Yet... - </Text>
  renderSeparator = () =>
    <View/>
  keyExtractor = (item, index) => index

  onChangedTitle(text) {
    this.setState({
      title: text
    })
  }

  onNewMemberChange(text) {
    this.setState({
      newMember: text
    })
  }

  onAddMemberPressed() {
    const members = this.state.members.concat({name: this.state.newMember})
    console.log('members: ' + JSON.stringify(members))
    this.setState({
      members: members,
      newMember: ''
    })
  }

  onSubmitPressed() {
    this.props.addNewList({
      userId: this.props.navigation.state.params.user.id,
      title: this.state.title,
      members: this.state.members.map((member, index)=>{return {'name':member.name, 'id':index}}),
    })

    //TODO make this happen after transaction is set
    this.props.navigation.goBack();
  }


  render () {
    console.log(JSON.stringify(this.state))
    return (
      <ScrollView style={styles.container}>
        <Text>AddListScreen</Text>
        <View style={styles.container}>
          <TextInput placeholder="Enter List title" value={this.state.title} onChangeText={this.onChangedTitle.bind(this)} />
        </View>

        <Text>Members: </Text>
        <View>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.state.members}
            renderItem={(item)=>this.renderMemberRow(item, this)}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            // ListHeaderComponent={this.renderHeader}
            // ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>

        <View style={styles.container}>
          <TextInput placeholder="Enter member name" value={this.state.newMember}
                     onChangeText={this.onNewMemberChange.bind(this)}
                     onSubmitEditing={this.onAddMemberPressed.bind(this)} />
          <Button title={'Add Member'} onPress={this.onAddMemberPressed.bind(this)}/>
        </View>

        <Button title={'Submit new list'} onPress={this.onSubmitPressed.bind(this)}/>
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
    addNewList: (data) => dispatch(AddListActions.addListRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListScreen)
