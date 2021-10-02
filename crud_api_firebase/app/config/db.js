const firebase = require('firebase');
const config = require('../../app/config/config.js');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;