'use strict';
var net = require('net'); //import socket module
var readline = require('readline');
var world = require('../common/world.json');// load information about my world (the rooms, and also items) from an external JSON file
var io = readline.createInterface({ //call the interface "io"
  input: process.stdin, //input comes from the terminal ("standard in")
  output: process.stdout //output goes to the terminal ("standard out")
});
//make the client
var client = new net.Socket();



var HOST = '127.0.0.1';
var PORT = 3000;
//connect to the server
client.connect(PORT, HOST, function() {
   console.log('Connected to: ' + HOST + ':' + PORT);
   //send message to server
});

client.on('data', function(data) { //when we get data
   if (data.toString() === "won" || data.toString() === "lost"){
		io.close();
		client.destroy(); // end connection
   } else{
        console.log(data.toString());
   		io.question('What would you like to do?', question);
   }
});

client.on('close', function() { //when connection closed
   console.log('Connection closed');
});

var question = function(answer) {
	client.write(answer);
}



