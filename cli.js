#!/usr/bin/env node
const mdlinks = require('./index.js');
const typedPath = process.argv[2];

mdlinks(typedPath);

console.log('Oi, CLI');


