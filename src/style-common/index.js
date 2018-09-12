import { StyleSheet } from 'react-native';
import { COLOR } from '../constant/Color';
//eslint-disable-next-line
export default (style = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_white: {
    flex: 1,
    backgroundColor: COLOR.COLOR_WHITE,
  },

  content_horizontal: {
    flexDirection: 'row',
    flex: 1,
  },
  card_view: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
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
  input_border: {
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
  btn_tab_active: {
    flex: 1,
    margin: 10,
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.COLOR_SKY,
    borderColor: COLOR.COLOR_SKY,
  },
  btn_tab_inActive: {
    flex: 1,
    margin: 10,
    minHeight: 40,
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.COLOR_GRAY,
    backgroundColor: COLOR.COLOR_GRAY,
  },
}));
