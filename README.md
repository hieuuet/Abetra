# Abetra

The library emoji has issue with android
https://github.com/arronhunt/react-native-emoji-selector
Solution fix on https://github.com/arronhunt/react-native-emoji-selector/issues/5
Step:

1. Go to nodemodule
   node_modules\react-native-emoji-selector\index.js
2. Find Text on Emojicell:
   `<Text style={{ fontSize: (colSize) - 12 }}> {charFromEmojiObject(emoji)} </Text>`

3.Replace by:
`<Text style={{ color:'#ffffff', fontSize: (colSize) - 12 }}> {charFromEmojiObject(emoji)} </Text>`

- if have issue when open xcode: `config.h file not found`
  => fix by run command: `cd ./node_modules/react-native && scripts/ios-install-third-party.sh && cd third-party && cd $(ls | grep 'glog' | awk '{print $1}') && ./configure`
- If have issue with socket service like issue:
  https://github.com/facebook/react-native/issues/19569
  => Remove and add again libfishhook.a from Xcode and the path issue will resolve.

========================================================================================
inject showAlert to component:

1. import</br>
   `import {compose } from "redux";`</br>
   `import injectShowAlert from "../../constant/injectShowAlert";`</br>

export default compose(injectShowAlert)(YourComponent);

2. use</br>
   - Show:
   `this.props.showAlert({title:'title',content:'content',labelSubmit:'submit", labelClose:'close',onSubmit:()=>{},onClose:()=>{}})`
   - Close:
   `this.props.closeAlert();`
