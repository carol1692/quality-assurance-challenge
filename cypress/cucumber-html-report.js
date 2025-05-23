const report = require('multiple-cucumber-html-reporter');

const today = new Date();
const date = `${today.getDate()}${(today.getMonth()+1)}${today.getFullYear()}`;
const time = `${today.getHours()}${ today.getMinutes()}${today.getSeconds()}`;
const dateTime = date+'_'+time;

report.generate({
  jsonDir: './cypress/cucumber-json/',
  reportPath: "./cypress/reports/report_"+dateTime+".html",
  reportName: `Report Firefox ${dateTime}`,
  metadata:{
        browser: {
            name: 'Firefox',
            version: '86.0.4240.75'
        },
        device: 'Local test machine',
        platform: {
            name: 'Windows',
            version: '10'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'OneRPM QA Challenge'},
            {label: 'Release', value: '1.0.1'},
            {label: 'Execution Start Time', value: `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}, ${today.getHours()}:${ today.getMinutes()}:${today.getSeconds()}h`},
            {label: 'Execution End Time', value: `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}, ${today.getHours()}:${ today.getMinutes()}:${today.getSeconds()}h`}
        ]
    }
});

