import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import PropTypes from 'prop-types'

export default class ItemSlider extends React.PureComponent {

static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    width:PropTypes.number,
    height: PropTypes.number,
    
    titleStyle: PropTypes.object,
    imageStyle: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.number,
    text: PropTypes.string,
    
}

  render() {
    const style = {
      backgroundColor: this.props.backgroundColor,
      paddingTop: this.props.topSpacer,
      paddingBottom: this.props.bottomSpacer,
      width: this.props.width,
      height: this.props.height,
    }
    
    return (
      <View style={[styles.mainContent, style]}>
        <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        <Image source={this.props.image} style={this.props.imageStyle} />
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection:'column'
  },
  text: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: 16,
  }
});