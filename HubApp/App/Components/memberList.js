import React from 'react';
import {
  ListView,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from 'react-native';

import { Text } from '../Styles/text';
import { color } from '../Styles/color';
import { Tag } from '../Styles/tag';
import { Searchbar } from './searchbar';

export const MemberList = ({ members, filters, onClearFilters, onSearch, ...props }) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });

  const membersWithSections = groupMembersByCategories(members);
  const dataSource = ds.cloneWithRowsAndSections(membersWithSections);

  return (
    <View style={styles.list}>
      <Searchbar search={onSearch} />
      { renderActiveFilters(filters, onClearFilters) }
      <ListView
        enableEmptySections
        renderSectionHeader={renderSectionHeader}
        renderRow={(member) => renderMemberRow(member, () => {
          props.onNavigate({
            member,
            type: 'push',
            route: {
              key: `details_${member.id}`,
              title: `Details for ${member.firstname}`,
              showBackButton: true,
              member
            }
          });
        })}
        dataSource={dataSource} />
    </View>
  );
};

const renderActiveFilters = (filters, onClearFilters) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  if (filters.length === 0) {
    return null;
  }

  return (
    <View style={ styles.activeFilter }>
      <ScrollView horizontal>
        <Text style={{ color: color.light, marginLeft: 5 }}>{filters.join(', ')}</Text>
      </ScrollView>
      <TouchableOpacity onPress={onClearFilters}>
        <Text style={{ color: color.light, marginRight: 5 }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const groupMembersByCategories = (members) => {
  const groupSections = [];
  members.forEach((member) => {
    // add section if not yet there
    if (!groupSections[member.category]) {
      groupSections[member.category] = [];  // eslint-disable-line immutable/no-mutation
    }
    // and then push the member to this category
    groupSections[member.category].push(member);
  });

  return groupSections.sort();
};

const renderSectionHeader = (sectionData, sectionName) => (
  <View style={{ backgroundColor: color.lightblue }}>
    <Text style={{ color: color.light, paddingLeft: 5 }}>{sectionName}</Text>
  </View>
);

const renderMemberRow = (member, onPressDetail) => {
  return (
    <TouchableOpacity onPress={() => onPressDetail()}>
      <View style={styles.memberRowContainer}>
        <Image source={{ uri: member.picture }}
          defaultSource={require('../Styles/Assets/ic_account_circle.png')}
          style={styles.profilePicture} />
        <View style={styles.memberDescription}>
          <Text>{`${member.firstname} ${member.lastname}`}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
            {
              member.skills.map(skill => {
                return (
                  <Tag key={skill.id}>{`${skill.name}`}</Tag>
                );
              })
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MemberList.propTypes = { // eslint-disable-line immutable/no-mutation
  members: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired,
  onClearFilters: React.PropTypes.func.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  memberDescription: {
    flex: 1,
    paddingLeft: 10,
  },
  memberRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.light,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  profilePicture: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  activeFilter: {
    backgroundColor: color.green,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 25,
  },
  tagContainer: {
    backgroundColor: color.blue,
    marginRight: 3,
    marginBottom: 3,
    borderRadius: 55,
    height: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagCaption: {
    fontSize: 12,
    color: color.light
  }
});
