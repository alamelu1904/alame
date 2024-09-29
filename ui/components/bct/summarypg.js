import React, { Component } from 'react';

class ModalComponent extends Component {
  render() {
    const { params, releasePage, resultSummary, modalHeight, close } = this.props;

    return (
      <div>
        <div className="modal-header" style={{ padding: '5px', marginTop: '0px' }}>
          <nav className="navbar-default" role="navigation" style={{ marginBottom: '0px' }}>
            <div className="navbar-header col-md-8">
              <a className="navbar-brand" style={{ fontFamily: "'Open Sans Condensed', sans-serif", height: '30px', padding: '3px 10px', fontStretch: 'narrower', fontSize: '15px', fontWeight: 'bold' }}>
                {params.pageTitle}
              </a>
            </div>
          </nav>
        </div>

        {releasePage && (
          <div className="modal-body" id="messagedetails" style={{ height: modalHeight(), overflowY: 'auto' }}>
            <div className="row">
              <div className="col-md-4">Total records processed: {params.totalCount}</div>
            </div>
            <div className="row">
              <div className="col-md-4">Total Failed records: {params.failedCount}</div>
            </div>
            <div className="row">
              <div className="col-md-4">Total Successful records: {params.successCount}</div>
            </div>

            {params.failedCount && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <b><span>Failed Records Summary</span></b>
                  </div>
                </div>
                {params.failedResult.map((result, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-12"><font color="red">{result.key} - {result.value}</font></div>
                  </div>
                ))}
              </div>
            )}

            {params.successCount && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <b><span>Success Records Summary</span></b>
                  </div>
                </div>
                {params.successResult.map((result, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-12"><font color="green">{result.key} - {result.value}</font></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {resultSummary && (
          <div className="modal-body" id="resultSummary" style={{ height: modalHeight(), overflowY: 'auto' }}>
            <div className="accordion" id="cntSummary">
              <div className="accordion-heading">
                <div className="row">
                  <div className="col-md-12">
                    <span>{params.summaryTitle}</span>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-bordered">
                {Object.entries(params.cntSummary).map(([key, value], index) => (
                  <tr key={index}>
                    <td style={{ verticalAlign: 'center', whiteSpace: 'nowrap' }}>
                      <span>{key}</span> <span>{value}</span>
                    </td>
                  </tr>
                ))}
              </table>
            </div>

            {params.detailSummary && (
              <div className="accordion">
                <div className="accordion-heading">
                  <div className="row">
                    <div className="col-md-12">
                      <span>Success Summary</span>
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-bordered">
                  {Object.entries(params.detailSummary).map(([key, value], index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'center', whiteSpace: 'nowrap' }}>
                        <span>{key}</span> <span>{value}</span>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            )}

            {params.errorSummary && (
              <div className="accordion">
                <div className="accordion-heading">
                  <div className="row">
                    <div className="col-md-12">
                      <span>Failure Summary</span>
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-bordered">
                  {Object.entries(params.errorSummary).map(([key, value], index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'center', whiteSpace: 'pre-wrap' }}>
                        <span>{key}</span> <span>{value}</span>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
          </div>
        )}

        <div className="modal-footer" style={{ borderTop: '1px solid #e5e5e5', padding: '5px 20px' }}>
          <button onClick={close} className="btn btn-sm btn-primary">Close</button>
        </div>
      </div>
    );
  }
}

export default ModalComponent;
