import React, { Component } from 'react';

class PaginationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryLimit: 25,
      includeReplyButton: true,
      currentPage: 1,
      filteredItems: 100,
      selectedSummary: { length: 100 },
      fromStr: 1,
      nextStr: 25,
    };
  }

  pageSizeChange = (e) => {
    this.setState({ entryLimit: e.target.value }, () => {
      this.pageChange();
    });
  };

  pageChange = () => {
    const { entryLimit, currentPage } = this.state;
    const fromStr = (currentPage - 1) * entryLimit + 1;
    const nextStr = currentPage * entryLimit;
    this.setState({ fromStr, nextStr });
  };

  confirmReplyButton = () => {
    this.setState((prevState) => ({
      includeReplyButton: !prevState.includeReplyButton,
    }));
  };

  submit = () => {
    // handle submit logic
    console.log("Form submitted");
  };

  close = () => {
    // handle close logic
    console.log("Modal closed");
  };

  render() {
    const { entryLimit, includeReplyButton, filteredItems, currentPage, fromStr, nextStr, selectedSummary } = this.state;

    return (
      <div className="modal-footer" style={{ padding: '5px 20px' }}>
        <div className="row" style={{ display: filteredItems > 0 ? 'block' : 'none' }}>
          <div className="col-md-12">
            <div className="col-md-1" style={{ top: '5px' }}>
              <select className="form-control" value={entryLimit} onChange={this.pageSizeChange}>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
            </div>
            <label className="col-md-2" style={{ top: '5px' }}>records per page</label>
            <label className="col-md-3" style={{ top: '5px' }}>
              Showing items {fromStr} - {nextStr} of {selectedSummary.length}
            </label>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <ul className="pagination pagination-sm" style={{ margin: '5px 0' }}>
                <li className="page-item">
                  <button className="page-link" onClick={() => this.setState({ currentPage: 1 }, this.pageChange)}>First</button>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={() => this.setState({ currentPage: currentPage - 1 }, this.pageChange)}>Previous</button>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={() => this.setState({ currentPage: currentPage + 1 }, this.pageChange)}>Next</button>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={() => this.setState({ currentPage: Math.ceil(filteredItems / entryLimit) }, this.pageChange)}>Last</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <label style={{ fontWeight: 'bold' }}>Include Reply Button In Email</label>
        <input
          type="checkbox"
          name="replyButton"
          checked={includeReplyButton}
          onChange={this.confirmReplyButton}
          style={{ padding: '50px' }}
        />
        <span>&nbsp;</span>

        <button className="btn btn-sm btn-primary" name="Submit" onClick={this.submit}>
          &nbsp; Submit &nbsp;
        </button>
        <button className="btn btn-sm btn-primary" name="Close" onClick={this.close}>
          &nbsp; Close &nbsp;
        </button>
      </div>
    );
  }
}

export default PaginationModal;
