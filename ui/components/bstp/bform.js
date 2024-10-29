import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFormData: {},
            opened: false,
        };
    }

    componentDidMount() {
        // Initialize state with field data, replace with actual field data
        this.setState({
            searchFormData: this.initializeFieldData(),
        });
    }

    initializeFieldData = () => {
        // Function to initialize form data, adjust as needed
        return {
            fieldName_From: this.initDate(),
            fieldName_To: this.initDate(),
            // add other fields here
        };
    };

    initDate = () => {
        // Initialize date if needed
        return new Date();
    };

    clearCalendar = (fieldName) => {
        this.setState((prevState) => ({
            searchFormData: { ...prevState.searchFormData, [fieldName]: '' },
        }));
    };

    openDatePicker = (event, openState) => {
        event.preventDefault();
        this.setState({ opened: openState });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            searchFormData: { ...prevState.searchFormData, [name]: value },
        }));
    };

    handleCreateTemplate = () => {
        // Handle create template logic
        console.log('Create template clicked');
    };

    handleReset = () => {
        // Reset form data
        this.setState({ searchFormData: this.initializeFieldData() });
    };

    handleSaveSearchTemplate = () => {
        // Handle save search template logic
        console.log('Save search template clicked');
    };

    handleLoadSavedSearchTemplate = () => {
        // Handle load saved search template logic
        console.log('Load saved search template clicked');
    };

    render() {
        const { searchFormData, opened } = this.state;

        return (
            <form role="form" className="form-horizontal">
                <div className="row">
                    <div className="col-md-12">
                        {/* Example Input Field */}
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="fieldName">Field Label</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    name="fieldName"
                                    className="form-control"
                                    value={searchFormData.fieldName || ''}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter field description"
                                />
                            </div>
                        </div>

                        {/* Date Picker Example (From - To) */}
                        <div className="form-group">
                            <label className="col-xs-1">From</label>
                            <div className="col-xs-5">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="fieldName_From"
                                        className="form-control"
                                        value={searchFormData.fieldName_From || ''}
                                        onChange={this.handleInputChange}
                                        placeholder="Select start date"
                                    />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-default" onClick={() => this.clearCalendar('fieldName_From')}>
                                            <i className="glyphicon glyphicon-remove"></i>
                                        </button>
                                        <button type="button" className="btn btn-default" onClick={(e) => this.openDatePicker(e, true)}>
                                            <i className="glyphicon glyphicon-calendar"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>

                            <label className="col-xs-1">To</label>
                            <div className="col-xs-5">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="fieldName_To"
                                        className="form-control"
                                        value={searchFormData.fieldName_To || ''}
                                        onChange={this.handleInputChange}
                                        placeholder="Select end date"
                                    />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-default" onClick={() => this.clearCalendar('fieldName_To')}>
                                            <i className="glyphicon glyphicon-remove"></i>
                                        </button>
                                        <button type="button" className="btn btn-default" onClick={(e) => this.openDatePicker(e, true)}>
                                            <i className="glyphicon glyphicon-calendar"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleCreateTemplate}>
                            <i className="glyphicon glyphicon-file"></i> Create Template
                        </button>
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleReset}>
                            <i className="glyphicon glyphicon-repeat"></i> Reset
                        </button>
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleSaveSearchTemplate}>
                            <i className="glyphicon glyphicon-file"></i> Save Search Query
                        </button>
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.handleLoadSavedSearchTemplate}>
                            <i className="glyphicon glyphicon-file"></i> Your Saved Search Queries
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchForm;
