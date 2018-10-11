# Abetra
The library emoji has issue with android
https://github.com/arronhunt/react-native-emoji-selector
Solution fix on https://github.com/arronhunt/react-native-emoji-selector/issues/5
Step:
1. Go to nodemodule
node_modules\react-native-emoji-selector\index.js
2. Find Text on Emojicell:
`<Text style={{ fontSize: (colSize) - 12 }}>
            {charFromEmojiObject(emoji)}
 </Text>`
3.Replace by:
`<Text style={{ color:'#ffffff, fontSize: (colSize) - 12 }}> {charFromEmojiObject(emoji)} </Text>`
