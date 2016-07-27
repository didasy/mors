# mors
A simple module to help play a text as morse code.

## Requirements
- Node.js 4 or later

## How to Install
`npm install node-mors`

## How to Use
Minimum example: 

```
const mors = require('node-mors');

mors('my text', function(toneLen, play) {
	// Your code here
});
```