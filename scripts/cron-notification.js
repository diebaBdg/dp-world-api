var CronJob = require('cron').CronJob;
new CronJob('10 * * * * *', function() {
//   console.log('You will see this message every second');
    console.log('You will see this message every minute');
}, null, true, 'America/Los_Angeles');