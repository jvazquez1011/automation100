var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = 6;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function () {
    console.log('Today is recognized by Rebecca Black!');
});