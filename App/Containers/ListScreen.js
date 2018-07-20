import React, { Component } from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, FlatList} from 'react-native'
import { connect } from 'react-redux'

const utils = require('../Lib/utils')

// Styles
import styles from './Styles/ListScreenStyle'

class ListScreen extends Component {

  renderRow ({item}) {
    let balanceStyle = item.balance > 0 ? styles.positiveBalance :
                item.balance < 0 ? styles.negativeBalance :
                styles.zeroBalance;

    return (
      <View style={styles.balanceRow}>
        <Text style={styles.balanceName}>{item.name}</Text>
        <Text> is in balance </Text>
        <Text style={balanceStyle}>{item.balance}</Text>
      </View>
    )
  }

  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>;

  renderSeparator = () =>
    <View/>;

  keyExtractor = (item, index) => index;

  render () {
    console.log('in ListScreen.render. this.props: ' + JSON.stringify(this.props));
    const listId = this.props.list.data.id;
    const isFetching = this.props.list ? this.props.list.fetching : false;
    const isErrorFetching = this.props.list ? this.props.list.error : false;
    const data = this.props.balances ? this.props.balances : [];


    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>List Id {listId}</Text>
        </KeyboardAvoidingView>
        {isErrorFetching ?
          <Text> Error when trying to fetch list details :( </Text>
          :
          isFetching ?
            <Text> Fetching List Details... </Text>
            :
            <FlatList
              contentContainerStyle={styles.listContent}
              data={data}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              // ListHeaderComponent={this.renderHeader}
              // ListFooterComponent={this.renderFooter}
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderSeparator}
            />
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('in ListScreen.mapStateToProps. state: ' + JSON.stringify(state));
  let balances = state.selectList.payload ?
    utils.joinArrays(state.selectList.payload.members, 'id',
      state.selectList.payload.balances, 'memberId',
      ({id, name}, {balance}) => {return {id, name, balance}})
    :
    [];
  console.log('in ListScreen.mapStateToProps. balances: ' + JSON.stringify(balances));
  return {
    user: {...state.fetchLists.data.user},
    list: {...state.selectList},
    balances: balances
  }
};

const mapDispatchToProps = (dispatch) => {
  console.log('in ListScreen.mapDispatchToProps. dispatch: ' + JSON.stringify(dispatch));
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
