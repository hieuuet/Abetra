import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { COLOR } from '../../constant/Color';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class EditView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allowEdit: false,
    };

    this.currentText = this.props.text_edit;
  }
  componentDidUpdate() {
    if (this.refs.input) this.refs.input.focus();
  }
  render() {
    console.log('render count');
    return (
      <View style={styles.wrapper}>
        <Text style={[styles.label, this.props.style_label]}>
          {this.props.label}
        </Text>
        {!this.state.allowEdit ? (
          <Text
            style={[styles.edit, this.props.style_edit]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {this.currentText}
          </Text>
        ) : (
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            returnKeyType="done"
            ref="input"
            numberOfLines={1}
            editable={this.state.allowEdit}
            defaultValue={this.currentText}
            onChangeText={(text) => {
              this.currentText = text;
              if (this.props.onChangeText) this.props.onChangeText(text);
            }}
            style={[styles.edit, this.props.style_edit]}
            onBlur={(event) => {
              this.setState({ allowEdit: false });
            }}
          />
        )}
        {this.props.isEditAble ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({ allowEdit: true });
            }}
          >
            <Icon name="edit" size={30} color={COLOR.COLOR_BLACK} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
export default EditView;

/**
 * Define props
 */
EditView.propTypes = {
  label: PropTypes.string.isRequired,
  text_edit: PropTypes.string.isRequired,
  isEditAble: PropTypes.bool,
  style_label: PropTypes.number,
  style_edit: PropTypes.number,
  onChangeText: PropTypes.func,
};

/**
 * Default props if not set parameter
 **/
EditView.defaultProps = {
  isEditAble: false,
};
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    minWidth: 100,
    color: COLOR.COLOR_BLACK,
  },
  edit: {
    color: COLOR.COLOR_BLACK,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    margin: 1,
    flex: 1,
    height: 40,
  },
});