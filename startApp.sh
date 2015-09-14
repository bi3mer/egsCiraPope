#!/bin/bash
gulp
mongod & node server.js & node src/twitterApp.js
