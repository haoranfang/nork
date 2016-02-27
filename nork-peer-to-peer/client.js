'use strict';

var world = require('./common/world.json');// load information about my world (the rooms, and also items) from an external JSON file
var inventory = [];
var echo = data.toString().toLowerCase();
var CurrentRoom = world.rooms[0];

//make the client
var client = new net.Socket();

client.on('data', function(data) { //when we get data
   console.log("Received: "+data); //output it
});

client.on('close', function() { //when connection closed
   console.log('Connection closed');
});


var HOST = '127.0.0.1';
var PORT;
if(CurrentRoom == world.rooms[0]) {
PORT = 3000;
} else if (CurrentRoom == world.rooms[1]){
PORT = 3001;
} else if (CurrentRoom == world.rooms[2]){
PORT = 3002;
} else if (CurrentRoom == world.rooms[3]){
PORT = 3003;
} else {
socket.end();
}
//connect to the server
client.connect(PORT, HOST, function() {
   console.log('Connected to: ' + HOST + ':' + PORT);

   //send message to server
   client.write("Hello server, I'm the client!");
});





