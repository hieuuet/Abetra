import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
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
  }
  render() {
    console.log('render count');
    return (
      <View style={styles.wrapper}>
        <Text style={[styles.lable, this.props.style_lable]}>
          {this.props.lable}
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          returnKeyType="done"
          ref="input"
          numberOfLines={1}
          editable={this.state.allowEdit}
          defaultValue={this.props.text_edit}
          onChangeText={this.props.onChangeText}
          style={[styles.edit, this.props.style_edit]}
          onBlur={(event) => {
            this.setState({ allowEdit: false });
          }}
        />
        {this.props.isEditAble ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({ allowEdit: true });
              this.refs.input.focus();
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
  lable: PropTypes.string.isRequired,
  text_edit: PropTypes.string.isRequired,
  isEditAble: PropTypes.bool,
  style_lable: PropTypes.number,
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
  lable: {
    minWidth: 100,
    color: COLOR.COLOR_BLACK,
  },
  edit: {
    color: COLOR.COLOR_BLACK,
    flex: 1,
    height: 40,
  }
});
