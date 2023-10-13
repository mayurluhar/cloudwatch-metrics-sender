const { getSystemData } = require("./systemState");

const getAwsMetricObj = async (data) => {
  let metricList = {
    MetricData: [],
    Namespace: "Jarvis", // Provide the metric namespace according to your need
  };

  for (const key in data) {
    let metricChildObj = {
      MetricName: key,
      Dimensions: [
        {
          Name: "mySystem", // Provide the metric dimensions name according to your need
          Value: "System State", // Provide the metric dimensions value according to your need
        },
      ],
      Unit: data[key].type,
      Value: data[key].value,
    };

    metricList.MetricData.push(metricChildObj);
  }

  return metricList;
};

setInterval(async () => {
  let sysData = await getSystemData();
  let metricObject = await getAwsMetricObj(sysData);

  console.log("data", JSON.stringify(metricObject, undefined, 4));
}, 1000);
