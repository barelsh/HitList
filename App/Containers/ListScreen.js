import React, { Component } from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, FlatList} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ListScreenStyle'

class ListScreen extends Component {

  state = {
    dataObjects: [
      {name: 'First Name', balance: 100},
      {name: 'Second Name', balance: -150},
      {name: 'Third Name', balance: 50},
      {name: 'Forth Name', balance: 0},
    ]
  };

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
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>ListScreen</Text>
        </KeyboardAvoidingView>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          // ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
