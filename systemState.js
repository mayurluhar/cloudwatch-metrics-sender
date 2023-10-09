const os = require('os');

// function to get current system state
const getSystemData = () => {
    // Get memory usage
    const used = process.memoryUsage();
  
    // Get CPU information
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;
  
    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
  
    // Calculate CPU load as a percentage
    const cpuLoad = parseFloat(((1 - totalIdle / totalTick) * 100).toFixed(2));
  
    // Create and return the systemStats object
    const systemStats = {
        rss: {value: Math.round(used.rss / 1024 / 1024 * 100) / 100 , type: "Megabytes"},
        heapTotal: {value: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100, type: "Megabytes"},
        heapUsed: { value: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100, type: "Megabytes"},
        averageLoad: {value: os.loadavg()[0], type: "Percent"},
        cpuLoad: { value: cpuLoad, type: "Percent"},
    };
  
    return systemStats;
};

module.exports = {
    getSystemData
}

