import React, { Component } from 'react';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; // Ensure you import Ant Design CSS

class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    
    // Simulate fetching the date from JSON
    const actualSettlementDateString = "2008-08-01T00:00:00";
    const actualSettlementDate = moment(actualSettlementDateString, "YYYY-MM-DDTHH:mm:ss");

    this.state = {
      actualSettlementDate: actualSettlementDate,
      selectedDate: actualSettlementDate,
    };
  }

  handleDateChange = (date) => {
    const { actualSettlementDate } = this.state;
    const oneDayAfterSettlement = actualSettlementDate.clone().add(1, 'days');

    if (date && date.isAfter(oneDayAfterSettlement)) {
      message.error('You can only select a date up to one day after the actual settlement date.');
      this.setState({ selectedDate: actualSettlementDate });
    } else {
      this.setState({ selectedDate: date });
    }
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <DatePicker 
        value={selectedDate} 
        format="MM/DD/YYYY" 
        onChange={this.handleDateChange} 
      />
    );
  }
}

export default MyDatePicker;
