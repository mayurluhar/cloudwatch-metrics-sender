const AWS = require('aws-sdk');

// Configure AWS SDK with your AWS account credentials (accessKeyId and secretAccessKey)
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'YOUR_ACCESS_KEY_ID',       // Provide your AWS account accessKeyId
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY' // Provide your AWS account secretAccessKey
});

// Create an instance of the AWS CloudWatch service
const cw = new AWS.CloudWatch({});

module.exports.handler = async (event) => {
  
  try {
    console.log("Request event:", event.body);
    let params = JSON.parse(event.body);

    // Define a function to create an AWS metric object
    const getAwsMetricObj = async (data) => {
      let metricList = {
        MetricData: [],
        Namespace: "Jarvis" // Provide the metric namespace according to your need
      };

      for (const key in data) {
        let metricChildObj = {
          MetricName: key,
          Dimensions: [
            {
              Name: "mySystem",     // Provide the metric dimensions name according to your need
              Value: "System State" // Provide the metric dimensions value according to your need
            }
          ],
          Unit: data[key].type,
          Value: data[key].value,
        };

        metricList.MetricData.push(metricChildObj);
      }

      return metricList;
    };

    // Define a function to push metrics to CloudWatch
    const pushMetricToCW = async (data) => {
      return new Promise((resolve, reject) => {
        // Use the putMetricData function to push the metric object to CloudWatch
        cw.putMetricData(data, function (error, data) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    };

    let metricObj = await getAwsMetricObj(params);
    let result = await pushMetricToCW(metricObj);

    let response = {
      statusCode: 200,
      body: result
    };

    return JSON.stringify(response);
  } catch (err) {
    let response = {
      statusCode: 500,
      body: err
    };
    return JSON.stringify(response);
  }
};
