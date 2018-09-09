import { StyleSheet } from 'react-native';
import { COLOR } from '../constant/Color';
//eslint-disable-next-line
export default (style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content_horizontal: {
    flexDirection: 'row',
    flex: 1,
  },
  img_logo: {
    width: 50,
    height: 50,
    margin: 10,
  },
  content_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_boder: {
    borderWidth: 1,
    borderColor: COLOR.BORDER_INPUT,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'stretch',
  },
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_color_base: {
    color: COLOR.COLOR_BLACK,
  },
}));
