import React, { Component } from 'react';

class SubmitComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [], // Stores selected trades or items
      cacheData: null, // Cache data retrieved or stored for later use
      records: {
        cache: {}, // Stores record-related cache data
        resendSummary: [], // A list of resend summary items
        resendSummaryMsg: '' // Message to be displayed for resend summaries
      },
      parent: {
        includeReplyButton: false // Whether the reply button should be included
      },
      actionInfo: {
        appID: '' // Application ID for the trade submission
      }
    };
  }

  submit = () => {
    let selectedCache = {}; // An object to hold the filtered selected cache items
    let url = `${this.props.contextPath}/angular/ims/ProcessBrokerCommunicationTool.action`; // The API endpoint to submit data

    // Check if cacheData is not null or undefined, and update the records cache
    if (this.state.cacheData !== null && this.state.cacheData !== undefined) {
      this.setState((prevState) => ({
        records: {
          ...prevState.records,
          cache: this.state.cacheData // Update cache with the existing cache data
        }
      }));
    }

    // Make a copy of selectedValues and ensure no duplicates using Set
    let selectedVals = [...this.state.selectedValues];
    let uniqueSelectedVals = [...new Set(selectedVals)]; // Filters out duplicate selections

    // Iterate over each selected value and update its cache
    uniqueSelectedVals.forEach((key) => {
      this.setState((prevState) => {
        let updatedCache = { ...prevState.records.cache }; // Copy the existing cache
        updatedCache[key].allocationDetails = undefined; // Clear allocation details
        updatedCache[key].blockDetails = undefined; // Clear block details
        selectedCache[key] = updatedCache[key]; // Add to selected cache

        return {
          records: {
            ...prevState.records,
            cache: updatedCache // Update the cache in state
          }
        };
      });
    });

    // Prepare the request payload as required by the API
    let args = {
      appID: this.state.actionInfo.appID, // Application ID
      selectedTrades: uniqueSelectedVals.toString(), // List of selected trades
      cacheData: JSON.stringify(selectedCache), // Cache data converted to JSON
      parentReplyButton: this.state.parent.includeReplyButton // Include reply button flag
    };

    // Prepare the confirmation message based on selected trades
    let confirmationMsg = 'Please confirm to submit selected trades for offline processing.';
    let result = this.state.records.resendSummary.filter((item) =>
      uniqueSelectedVals.indexOf(item) !== -1
    ); // Filter resend summary based on selected trades

    // Append resend summary message if available
    if (result !== null && result !== undefined && result.length > 0) {
      confirmationMsg = result + this.state.records.resendSummaryMsg + confirmationMsg;
    }

    // Proceed if there are selected values
    if (uniqueSelectedVals.length > 0) {
      if (window.confirm(confirmationMsg)) {
        // Show a confirmation dialog, and if confirmed, proceed with the API call

        // Use the fetch API to submit the data to the server
        fetch(url, {
          method: 'POST', // Specify the HTTP method as POST
          headers: {
            'Content-Type': 'application/json' // The content being sent is JSON
          },
          body: JSON.stringify(args) // Convert the args object to a JSON string
        })
          .then((response) => response.json()) // Convert the response to JSON format
          .then((data) => {
            // Once the response is received, display the summary page
            this.showSummaryPage(data, this.props.title);
          })
          .catch((error) => {
            // Handle any errors that might occur during the fetch request
            console.error('Error during submission:', error);
          });
      }
    } else {
      // If no values are selected, show an error alert
      alert('No row selected');
    }
  };

  // Method to display the summary page with the received data
  showSummaryPage = (data, title) => {
    // Logic to display or handle the summary data and title
    console.log('Summary data:', data);
    console.log('Title:', title);
  };

  render() {
    return (
      <div>
        {/* Button to trigger the submit function */}
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default SubmitComponent;
