fetch('your-api-endpoint')
  .then(response => response.text())  // Get the response as text
  .then(text => {
    // Fix missing commas between objects
    const withCommasBetweenObjects = text.replace(/}\s*{/g, '},{');

    // Sanitize the JSON string using a regex
    const sanitizedText = withCommasBetweenObjects.replace(/,\s*(?=[}\]])|,\s*(?=,)|(?<=\{[^{}]*),\s*(?=,)|(?<=\{)\s*,/g, '');

    try {
      // Parse the sanitized JSON string
      const data = JSON.parse(sanitizedText);
      console.log(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
