import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/TransactionsScreenStyle'

class TransactionsScreen extends React.PureComponent {

  constructor(props){
    super(props)
    this.state = {
    }
  }


  renderRow ({item}, self) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{self.props.members[item.whoPayed]}</Text>
        <Text> Payed </Text>
        <Text style={styles.boldLabel}>{item.amount}</Text>
      </View>
    )
  }


  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  render () {
    const isFetching = this.props.transactions ? this.props.transactions.fetching : false;
    const isErrorFetching = this.props.transactions ? this.props.transactions.error : false;
    const data = this.props.transactions ? this.props.transactions.payload ? this.props.transactions.payload : [] : [];

    return (
      <View style={styles.container}>
        {isErrorFetching ?
          <Text> Error when trying to Fetch Transactions :( </Text>
          :
          isFetching ?
            <Text> Fetching Transactions... </Text>
            :
            <FlatList
              contentContainerStyle={styles.listContent}
              data={data}
              renderItem={(item)=>this.renderRow(item, this)}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderSeparator}
            />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('in TransactionScreen. state: '+ JSON.stringify(state))
  const members = new Map();
  state.selectList.payload.members.forEach(({id, name}) => {members[id] = name})
  return {
    transactions: {...state.fetchTransactions},
    members: members
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen)
