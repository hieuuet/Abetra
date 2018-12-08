import React from "react";

import store from "../store";

/**
 * Dynamically injects handle alert
 *
 * @param WrappedComponent
 */

const randomString = length_ => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
    ""
  );
  if (typeof length_ !== "number") {
    length_ = Math.floor(Math.random() * chars.length_);
  }
  let str = "";
  for (let i = 0; i < length_; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

function injectQueries(WrappedComponent) {
  return class extends React.PureComponent {
    static displayName = `injectQueries(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    showAlert = (data = {}) => {
      return store.dispatch({
        type: "SHOW_ALERT",
        payload: {
          id: randomString(10),
          isShow: true,
          ...data
        }
      });
    };

    closeAlert = (data = {}) => {
      if (store.getState().alertState.isShow) {
        store.dispatch({
          type: "CLOSE_ALERT",
          payload: {
            id: randomString(10),
            isShow: false,
            ...data
          }
        });
        return true;
      }
      return false;
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          showAlert={this.showAlert}
          closeAlert={this.closeAlert}
          {...this.props}
        />
      );
    }
  };
}

export default injectQueries;
