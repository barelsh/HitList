import React from 'react'
import {Button} from 'react-native-elements'
import {View, Text, FlatList, Image} from 'react-native'
import { connect } from 'react-redux'

import FetchListsActions from '../Redux/FetchListsRedux'

// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends React.PureComponent {
  state = {
    lists: {...FetchListsActions.INITIAL_STATE}
  }

  renderRow ({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.title}</Text>
        <Text style={styles.label}>{item.description}</Text>
      </View>
    )
  }

  // Render a header?
  renderHeader = () =>
    <View style={styles.titleContainer}>
      <Image source={require('../Images/main_title.png')}
             style={styles.titleImage} />
    </View>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <View/>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  fetchLists() {
    this.props.fetchLists({user: 7})
  }

  render () {
    console.log(JSON.stringify(this.props.lists))
    const isFetching = this.props.lists ? this.props.lists.fetching : false;
    const data = this.props.lists ? this.props.lists.payload ? this.props.lists.payload : [] : [];
      return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Button title={'fetch lists'} onPress={this.fetchLists.bind(this)}/>
        {isFetching ?
          <Text> Fetching Lists... </Text>
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
        {this.renderFooter()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('in mapStateToProps '+ JSON.stringify(state))
  console.log(this.props)
  return {lists: {...state.fetchLists}}
}

const mapDispatchToProps = (dispatch) => {
  console.log('in mapDispatchToProps')
  return {
    fetchLists: (data) => dispatch(FetchListsActions.fetchListsRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
