
<DatePicker.RangePicker
    name={fieldObj.dbField}
    value={this.state.dateFieldsState[fieldObj.dbField]}
    onChange={(dates, dateStrings) => {
        let formVal = this.state.dateFieldsState;

        // If only the start date is selected, default the end date to the same date with 23:59 time
        if (dates && dates[0] && !dates[1]) {
            const startDate = dates[0];
            const endDate = startDate.clone().set({ hour: 23, minute: 59 });

            formVal[fieldObj.dbField] = [
                startDate.format(this.state.dateFormat + " HH:mm"),
                endDate.format(this.state.dateFormat + " HH:mm"),
            ];

            // Trigger onChange with both dates
            this.setState({ dateFieldsState: formVal });
            this.onRangeChange(fieldObj, [startDate, endDate], [
                startDate.format(this.state.dateFormat + " HH:mm"),
                endDate.format(this.state.dateFormat + " HH:mm"),
            ]);
        } else {
            // If both dates are provided, update the state as normal
            formVal[fieldObj.dbField] = dateStrings;
            this.setState({ dateFieldsState: formVal });
            this.onRangeChange(fieldObj, dates, dateStrings);
        }
    }}
    onCalendarChange={(dates, dateStrings) => {
        // Automatically handle selection when date and time are chosen
        if (dates && dates[0] && dates[1]) {
            let formVal = this.state.dateFieldsState;
            formVal[fieldObj.dbField] = dateStrings;
            this.setState({ dateFieldsState: formVal });
            this.onRangeChange(fieldObj, dates, dateStrings);
        }
    }}
    format={this.state.dateFormat.toUpperCase() + " HH:mm"}
    popupClassName="basicFormDatePicker"
    showTime={{
        defaultValue: [moment("00:00", "HH:mm"), moment("23:59", "HH:mm")],
    }}
/>
