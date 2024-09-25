import React, { Component } from 'react';

class AttachRelatedPairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      showFile: false,
      autoLoad: false,
    };
    this.exportNearMatch = this.exportNearMatch.bind(this);
  }

  exportNearMatch() {
    const prodName = this.props.record.ETCProductName;
    const url = `${this.props.contextPath}/angular/ims/ExportRelatedUnconfirmedPairs.action`;

    const args = {
      blotterKey: this.props.actionInfo.blotterKey,
      transType: this.props.actionInfo.transType,
      filterType: this.props.actionInfo.filterType,
      appID: this.props.actionInfo.appID,
      tradeProcessingGroupID: this.props.record.brokerRecipientDetails.tradeProcessingGroupID,
      clientDealingDesk: this.props.record.brokerRecipientDetails.clientDealingDesk,
      SSCInvestmentType: this.props.record.brokerRecipientDetails.SSCInvestmentType,
      clientExecutingBrokerID: this.props.record.brokerRecipientDetails.clientExecutingBrokerID,
      settlementCurrency: this.props.record.brokerRecipientDetails.settlementCurrency,
      SSCTradeCountry: this.props.record.brokerRecipientDetails.SSCTradeCountry,
      tradeCurrency: this.props.record.brokerRecipientDetails.tradeCurrency,
    };

    // Use fetch to send data to the backend
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errorMessage) {
          console.error(data.errorMessage); // handle error appropriately
          return false;
        } else if (data.resultType === 'success') {
          const downloadArgs = {
            fileName: data.fileName,
            methodName: 'getExportContent',
            tradeProcessingGroupID: this.props.record.brokerRecipientDetails.tradeProcessingGroupID,
            clientDealingDesk: this.props.record.brokerRecipientDetails.clientDealingDesk,
            SSCInvestmentType: this.props.record.brokerRecipientDetails.SSCInvestmentType,
            clientExecutingBrokerID: this.props.record.brokerRecipientDetails.clientExecutingBrokerID,
            settlementCurrency: this.props.record.brokerRecipientDetails.settlementCurrency,
            SSCTradeCountry: this.props.record.brokerRecipientDetails.SSCTradeCountry,
          };

          // Download the file
          const actionURL = `/FileDownloadServlet?${new URLSearchParams(downloadArgs).toString()}`;
          const anchor = document.createElement('a');
          anchor.href = `${this.props.contextPath}${actionURL}&csrfToken=${document.getElementById('UID').value}`;
          anchor.click();

          this.setState({
            autoLoad: true,
            showFile: true,
            fileName: data.fileName,
          });

          // Additional processing if needed
          console.log(
            'As user has attached a file for batch offline processing, the related Broker-IM combination trades will be unselected from Broker Communication Tool.'
          );
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.exportNearMatch}>Attach Related Pairs</button>
        {this.state.showFile && <p>File ready for download: {this.state.fileName}</p>}
      </div>
    );
  }
}

export default AttachRelatedPairs;
