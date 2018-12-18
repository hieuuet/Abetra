import { StyleSheet } from "react-native";
import { COLOR } from "../constant/Color";
//eslint-disable-next-line
export default (style = StyleSheet.create({
  container: {
    flex: 1
  },
  container_white: {
    flex: 1,
    backgroundColor: COLOR.COLOR_WHITE
  },

  content_horizontal: {
    flexDirection: "row",
    flex: 1
  },
  card_view: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    elevation: 1
  },
  img_logo: {
    width: 50,
    height: 50 * (437 / 488),
    margin: 10
  },
  content_center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input_border: {
    borderWidth: 1,
    borderColor: COLOR.BORDER_INPUT,
    borderRadius: 5,
    padding: 5,
    alignSelf: "stretch"
  },
  wrapper: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  text_color_base: {
    color: COLOR.COLOR_BLACK
  },
  text_color_White: {
    color: COLOR.COLOR_WHITE
  },
  btn_tab_active: {
    flex: 1,
    margin: 10,
    minHeight: 40,
    borderWidth: 0,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "white"
  },
  btn_tab_inActive: {
    flex: 1,
    margin: 10,
    minHeight: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "transparent"
  },
  line: {
    height: 1,
    backgroundColor: COLOR.COLOR_GRAY,
    marginTop: 5,
    marginBottom: 5
  },
  text_h1: {
    color: COLOR.COLOR_BLACK,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold"
  },
  btn_blue_radius: {
    borderRadius: 20,
    padding: 5,
    minWidth: 140,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#145C7A",
    borderWidth: 1,
    borderColor: COLOR.COLOR_WHITE,
    marginTop: 10
  }
}));
