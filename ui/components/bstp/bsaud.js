import React, { Component } from "react";

class JsonFixer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Stores parsed JSON data
      error: null,
    };
  }

  // Function to fix missing double quotes in JSON keys
  fixInvalidJson = (response) => {
    console.log("Raw API Response:", response);

    // Ensure response is a valid string
    if (typeof response !== "string" || response.trim() === "") {
      console.error("Invalid API response:", response);
      return "[]"; // Default to an empty JSON array
    }

    // Regex to add missing double quotes around keys
    const fixedJson = response.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

    console.log("Fixed JSON:", fixedJson);

    return fixedJson;
  };

  // Function to fetch and parse JSON
  fetchData = () => {
    fetch("https://yourapi.com/endpoint") // Replace with your actual API URL
      .then((response) => response.text()) // Get raw string response
      .then((rawData) => {
        try {
          const fixedData = this.fixInvalidJson(rawData); // Fix invalid JSON
          const parsedData = JSON.parse(fixedData); // Convert to array

          // Ensure parsedData is an array
          if (!Array.isArray(parsedData)) {
            console.warn("Parsed data is not an array. Converting...");
            this.setState({ data: [parsedData] }); // Wrap object in array
          } else {
            this.setState({ data: parsedData }); // Store valid data in state
          }
        } catch (error) {
          console.error("Final JSON Parsing Failed:", error);
          this.setState({ error: "Failed to parse JSON", data: [] }); // Set error in state
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        this.setState({ error: "Failed to fetch data", data: [] }); // Handle fetch error
      });
  };

  // Lifecycle method to fetch data on mount
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data, error } = this.state;

    return (
      <div>
        <h2>Fixed API Data</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
        <button onClick={this.fetchData}>Reload Data</button>
      </div>
    );
  }
}

export default JsonFixer;
