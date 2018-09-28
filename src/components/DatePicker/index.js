import React, { Component } from "react";
import DatePicker from "./DatePicker";
import PropTypes from "prop-types";
import Moment from "moment";

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: this.props.initDate || "" };
    this.currentDate = Moment(new Date()).format("YYYY/MM/DD");
  }

  render() {
    return (
      <DatePicker
        style={{}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY/MM/DD"
        minDate="1650/01/01"
        maxDate={this.currentDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            right: 0,
            top: 4
          },
          dateInput: {
            marginRight: 36
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
