import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleSelectToday = () => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  };

  const handleSelectYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setStartDate(yesterday);
    setEndDate(yesterday);
  };

  const handleSelectPastWeek = () => {
    const today = new Date();
    const pastWeek = new Date(today);
    pastWeek.setDate(today.getDate() - 7);
    setStartDate(pastWeek);
    setEndDate(today);
  };

  return (
    <div>
      <h2>Date Range Picker</h2>
      <div>
        <label>Start Date:</label>
        <div className="date-input-container">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          {startDate && (
            <button className="clear-button" onClick={handleClearDates}>
              X
            </button>
          )}
        </div>
        <div className="date-range-buttons">
          <button onClick={handleSelectToday}>Today</button>
          <button onClick={handleSelectYesterday}>Yesterday</button>
          <button onClick={handleSelectPastWeek}>Past Week</button>
        </div>
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
