import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import PropTypes from 'prop-types';
export default class MenuItem extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[{ flexDirection: 'row' }, this.props.style]}
      >
        <Icon
          name={this.props.nameIcon}
          size={25}
          style={[
            { minWidth: 30, alignSelf: 'flex-start' },
            this.props.style_icon,
          ]}
          color={this.props.icon_color}
        />

        <Text
          style={[
            {
              flex: 1,
              fontSize: 17,
              color: this.props.title_color,
              marginLeft: 5,
            },
            this.props.style_title,
          ]}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  style: PropTypes.number,
  nameIcon: PropTypes.string.isRequired,
  icon_color: PropTypes.string,
  title_color: PropTypes.string.isRequired,
  title: PropTypes.string,
  style_icon: PropTypes.number,
  style_title: PropTypes.number,
};
MenuItem.defaultProps = {
  style: {
    marginLeft: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_color: '#616161',
  title_color: '#616161',
};
