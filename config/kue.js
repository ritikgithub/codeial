const kue = require('kue');
const jobs = kue.createQueue();

module.exports = jobs;