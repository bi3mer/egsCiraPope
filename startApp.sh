#!/bin/bash
mongod | node server.js | node src/twitterApp.js