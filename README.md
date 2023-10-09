# AWS CloudWatch Metric Pusher

![AWS CloudWatch Logo](https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2018/10/13/cloudwatch.png)

## Overview

This repository contains code for pushing custom metrics to AWS CloudWatch. The metrics are generated using JavaScript and pushed to CloudWatch to help monitor and analyze the performance of your applications or systems.

## Repository Files

- **awsCloudWatchLambda.js**: This file contains code for creating CloudWatch metrics by generating metric objects and pushing them to AWS CloudWatch.

- **index.js**: Use this file to set up periodic API calls or any specific actions, such as pushing metrics, in a loop (e.g., `setInterval`).

- **systemState.js**: This file contains a function that provides information about the current system state, including CPU load, CPU average load, and more.

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mayurluhar/cloudwatch-metrics-sender.git
