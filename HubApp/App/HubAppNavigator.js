import { View, NavigationExperimental } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplicationTabs from './Containers/navigationTabContainer';
import { MemberDetails } from './Components/memberDetails';
const { CardStack: NavigationCardStack } = NavigationExperimental;

const HubAppNavigator = ({ navigation, onNavigate }) => {
  return (
    <NavigationCardStack
      direction={'vertical'}
      navigationState={navigation}
      onNavigate={onNavigate}
      renderScene={_renderScene}
      renderOverlay={_renderHeader} />
  );
};

const _renderHeader = (props) => {
  return null;
};

const _renderScene = (props) => {
  const { key } = props.scene.navigationState;

  if (key === 'applicationTabs') {
    return (
      <View style={{ flex: 1 }}>
        <ApplicationTabs />
      </View>
    );
  }

  if (key === 'new') {
  }

  if (key === 'details') {
    const { member } = props.scene.navigationState;
    return (
      <View style={{ flex: 1 }}>
        <MemberDetails member={member} />
      </View>
    );
  }
};

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    return {
      navigation: state.globalNav
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    return {
      dispatch
    };
  },

  // 😂
  (stateProps, dispatchProps, ownProps) => {
    return {
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onNavigate: (action) => {
        dispatchProps.dispatch({
          ...action,
          scope: stateProps.navigation.key
        });
      }
    };
  }
)(HubAppNavigator);

// import React from 'react';
// import {
//   NavigationExperimental,
//   StatusBar,
//   TabBarIOS,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Image,
//   View,
//   Text
// } from 'react-native';

// import MemberListFilterContainer from './Containers/memberListFilterContainer';
// import MemberListContainer from './Containers/memberListContainer';
// import ProfileContainer from './Containers/profileContainer';
// import { MemberDetails } from './Components/memberDetails';
// import { color } from './Styles/color';

// const {
//   AnimatedView: NavigationAnimatedView,
//   Card: NavigationCard,
//   Header: NavigationHeader,
//   Reducer: NavigationReducer,
//   RootContainer: NavigationRootContainer,
// } = NavigationExperimental;

// // all the possible navigation
// // states // aka screens of the app
// const Screens = {
//   Detail: 'Details',
//   Filter: 'Filter',
//   Main: 'HubApp'
// };

// // our navigator responsible for
// // rendering the currently active scene
// export const HubAppNavigator = () => {
//   StatusBar.setBarStyle('light-content', true);
//   return (
//     <NavigationRootContainer
//       reducer={NavigationBasicReducer}
//       renderNavigation={renderNavigation} />
//   );
// };

// const renderNavigation = (navigationState) => {
//   if (!navigationState) {
//     return null;
//   }

//   return (
//     <NavigationAnimatedView
//       navigationState={navigationState}
//       style={styles.animatedView}
//       renderOverlay={renderHeader}
//       renderScene={renderCard} />
//   );
// };

// const NavigationBasicReducer = NavigationReducer.StackReducer({
//   getPushedReducerForAction: (action) => {
//     if (action.key === Screens.Detail) {
//       return (state) => state || { key: action.key, member: action.member };
//     }

//     if (action.key === Screens.Filter) {
//       return (state) => state || { key: action.key };
//     }

//     return null; // nothing matched :(
//   },
//   getReducerForState: (initialState) => (state) => state || initialState,
//   initialState: {
//     index: 0,
//     key: 'HubApp',
//     children: [{ key: Screens.Main }]
//   },
// });

// const renderHeader = (props) => {
//   return (
//     <NavigationHeader
//       {...props}
//       style={{ backgroundColor: color.blue }}
//       renderTitleComponent={renderTitleComponent}
//       renderLeftComponent={renderBackButton}
//       renderRightComponent={() => {
//         return props.scene.navigationState.key === Screens.Main ?
//           renderRightComponent(props) : null;
//       }} />
//   );
// };

// const renderBackButton = (props) => {
//   if (props.scene.index === 0) {
//     return null;
//   }
//   return (
//     <TouchableOpacity style={styles.titleButtonContainer}
//       onPress={() => props.onNavigate({ type: 'BackAction' })}>
//       <Image style={styles.titleButton} source={require('./Styles/Assets/back-icon.png')} />
//     </TouchableOpacity>
//   );
// };

// const renderTitleComponent = (props) => {
//   return (
//     <NavigationHeader.Title>
//       <Text style={{ color: color.light }}>
//         { props.scene.navigationState.key }
//       </Text>
//     </NavigationHeader.Title>
//   );
// };

// const renderRightComponent = (props) => {
//   return (
//     <TouchableOpacity
//       style={styles.titleButtonContainer}
//       onPress={() => {
//         props.onNavigate({
//           key: Screens.Filter
//         });
//       }} >
//       <Text style={{ color: color.light, marginRight: 5 }}>
//         Filter
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const renderCard = (props) => {
//   return (
//     <NavigationCard
//       key={`_${props.scene.navigationState.key}`}
//       renderScene={renderScene}
//       {...props} />
//   );
// };

// const renderScene = (props) => {
//   const { navigationState } = props.scene;

//   // segue to detail screen from list view
//   if (navigationState.key === Screens.Detail) {
//     return (
//       <View style={styles.sceneContainer}>
//         <MemberDetails {...props}
//           member={navigationState.member} />
//       </View>
//     );
//   }

//   // segue to filter screen from list view
//   if (navigationState.key === Screens.Filter) {
//     return (
//       <View style={styles.sceneContainer}>
//         <MemberListFilterContainer {...props} />
//       </View>
//     );
//   }

//   // we start here => Initial View
//   return (
//     <View style={styles.sceneContainer}>
//       <TabBarIOS>
//         <TabBarIOS.Item systemIcon="featured" />
//         <TabBarIOS.Item selected systemIcon="contacts">
//           <MemberListContainer onPressDetail={(member) => {
//             props.onNavigate({
//               key: Screens.Detail,
//               member
//             });
//           }} />
//         </TabBarIOS.Item>
//         <TabBarIOS.Item systemIcon="more">
//           <ProfileContainer />
//         </TabBarIOS.Item>
//       </TabBarIOS>
//     </View>
//   );
// };

// renderTitleComponent.propTypes = { // eslint-disable-line immutable/no-mutation
//   scene: React.PropTypes.object.isRequired
// };

// renderCard.propTypes = { // eslint-disable-line immutable/no-mutation
//   scene: React.PropTypes.object.isRequired
// };

// renderHeader.propTypes = { // eslint-disable-line immutable/no-mutation
//   scene: React.PropTypes.object.isRequired
// };

// renderScene.propTypes = { // eslint-disable-line immutable/no-mutation
//   scene: React.PropTypes.object.isRequired,
//   onNavigate: React.PropTypes.func.isRequired
// };

// renderRightComponent.propTypes = { // eslint-disable-line immutable/no-mutation
//   scene: React.PropTypes.object.isRequired,
//   onNavigate: React.PropTypes.func.isRequired
// };

// renderBackButton.propTypes = { // eslint-disable-line immutable/no-mutation
//   scene: React.PropTypes.object.isRequired,
//   onNavigate: React.PropTypes.func.isRequired
// };

// const styles = StyleSheet.create({
//   sceneContainer: {
//     marginTop: NavigationHeader.HEIGHT,
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   animatedView: {
//     flex: 1,
//   },
//   titleButtonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   titleButton: {
//     height: 24,
//     width: 24,
//     margin: Platform.OS === 'ios' ? 10 : 16,
//     resizeMode: 'contain'
//   }
// });
