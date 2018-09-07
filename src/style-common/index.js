import { StyleSheet } from "react-native";
export default (style = StyleSheet.create({
  container: {
    flex: 1
  },
  content_horizontal: {
    flexDirection: "row",
    flex: 1
  },
  img_logo: {
    width: 50,
    height: 50,
    margin: 10
  },
  content_center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
      boder: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5
  }
}));
