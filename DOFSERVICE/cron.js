var cron = require('node-schedule');
var rule = new cron.RecurrenceRule();

var rule2 = new cron.RecurrenceRule();
rule2.dayOfWeek = [1,2,3,4,5,6,0];
rule2.hour = 10;
rule2.minute = 16;

console.log(rule2.dayOfWeek);



cron.scheduleJob(rule2, function(){
    console.log('This runs at 3:10AM every lunes, martes and Sunday.');
});

/*
rule.second = 30;
cron.scheduleJob(rule, function () {
    console.log(new Date(), 'The 30th second of the minute.');
});*/