const axios = require('axios');

// Define the API endpoint and body
const apiUrl = 'http://example.com/api';
const requestBody = { key: 'value' };
const numberOfCalls= 10;

// Function to make API post call and log response
async function makeAPICall() {
    try {
        const response = await axios.post(apiUrl, requestBody);
        return { status: response.status, body: response.data };
    } catch (error) {
        return { status: error.response.status, body: error.response.data };
    }
}

// Function to perform n API post calls in parallel
async function performParallelAPICalls(n) {
    const promises = [];
    for (let i = 0; i < n; i++) {
        promises.push(makeAPICall());
    }

    const responses = await Promise.all(promises);

    // Log the responses
    responses.forEach((response, index) => {
        console.log(`API Call ${index + 1}:`);
        console.log(`Status Code: ${response.status}`);
        console.log(`Response Body:`, response.body);
        console.log('----------------------------------------');
    });

    // Group responses by status code and count
    const statusCounts = responses.reduce((acc, response) => {
        acc[response.status] = (acc[response.status] || 0) + 1;
        return acc;
    }, {});

    // Print status of all calls grouping them by status code
    console.log('Status of all calls grouping them by status code:');
    Object.entries(statusCounts).forEach(([statusCode, count]) => {
        console.log(`Status Code ${statusCode}: ${count} calls`);
    });
}

// Example: Perform n API calls in parallel
performParallelAPICalls(numberOfCalls);
