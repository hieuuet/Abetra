import React, { Component } from "react";
import DatePicker from "./DatePicker";
import PropTypes from "prop-types";
import Moment from "moment";
import { IMAGE } from "../../constant/assets";

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: this.props.initDate || "" };
    this.currentDate = Moment(new Date()).format("YYYY/MM/DD");
  }

  render() {
    return (
      <DatePicker
        date={this.state.date}
        mode="date"
        // placeholder="select date"
        format="YYYY/MM/DD"
        minDate="1650/01/01"
        iconSource={IMAGE.btn_edit}
        maxDate={this.currentDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            right: 0,
            top: 4,
            width: 20,
            height: 20 * (70 / 54),
            marginRight: 0,
            marginLeft: 0
          },
          dateInput: {
            marginRight: 36
          },
          dateText: {
            textAlign: "left",
            alignSelf: "flex-start",
            alignContent: "center"
          },
          placeholderText: {
            textAlign: "left",
            alignSelf: "flex-start",
            alignContent: "center"
          }

          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => {
          this.setState({ date });
          this.props.onDateChange(date);
        }}
      />
    );
  }
}
MyDatePicker.propTypes = {
  onDateChange: PropTypes.func,
  initDate: PropTypes.string
};
