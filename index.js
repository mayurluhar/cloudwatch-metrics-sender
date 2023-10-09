const axios = require('axios');
const {getSystemData} = require('./systemState');

// Function to make the POST API request
async function makePostRequest() {
  let res = getSystemData();
  const apiUrl = 'https://d3isb6tpgl.execute-api.us-east-1.amazonaws.com/dev/pushMetric'; // Replace with your API endpoint
  const postData = res; // API payload
  try {
    const response = await axios.post(apiUrl, postData);

    if (response.status === 200) {
      console.log('POST request successful:', response.data);
    } else {
      console.error('POST request failed:', response.status, response.data);
    }
  } catch (error) {
    console.error('Error making POST request:', error.message);
  }
}

setInterval(makePostRequest, 60000 * 1); // set the interval according to your needs
