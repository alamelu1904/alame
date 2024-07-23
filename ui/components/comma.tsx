fetch('your-api-endpoint')
  .then(response => response.text())  // Get the response as text
  .then(text => {
    // Sanitize the JSON string using a single regex
    const sanitizedText = text.replace(/,\s*(?=[}\]])|,\s*(?={)|(?<=\{[^}]*),\s*,/g, function(match) {
      return match.includes(',,') ? ',' : '';
    });

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
