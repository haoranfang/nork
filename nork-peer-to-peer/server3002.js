'use strict';
var net = require('net'); //import socket module
var world = require('../common/world.json');// load information about my world (the rooms, and also items) from an external JSON file
var inventory = [];
var echo;
var CurrentRoom = world.rooms[0];
var status;
//notify (via observer!) when a a connection occurs
var server = net.createServer(function(socket) {

  //notify on data received event
  socket.on('data', function(data) {
    echo = data.toString().toLowerCase();
     //process data
      lit_cave(echo, socket);
  });
}); //create socket server

//when we start "listening" for connections
server.on('listening', function() {
   //get address info
   var addr = server.address();
   //print the info
   console.log('server listening on port %d', addr.port);
});

server.on('connection', function(socket) {
   //send a message to the socket
   socket.write('Location: ' + world.rooms[0].id + '\nWelcome! ' + world.rooms[0].description);
});


server.listen(3002, '127.0.0.1'); //listen on port 3002
console.log('server connected'); //clarify connection



//third room
var lit_cave = function(echo, socket){
  if (echo.includes('inventory')) {
    socket.write(inventory);  
  } else if (echo.includes('go')) {
    if(echo.includes('south')) {
      CurrentRoom = world.rooms[0];
      server.listen(3000, '127.0.0.1'); //listen on port 3000
      socket.write(world.rooms[0].description);
    } else if (echo.includes('west')){
      CurrentRoom = world.rooms[3];
      socket.write(world.rooms[3].description);
    } else{
      socket.write('Please try again');
    }
  } else {
    socket.write('Please try again');
  }
}



//Test if the item is already added to the inventory
var InventoryAdded = function(room){
      for(var i = 0; i <= inventory.length; i++){
        if (inventory[i]==world.rooms[room].items[0]) {
          return false;
        }
      }
      return true
}

//Test if the item user is trying to use is inside user's inventory
var InventoryOwn = function(item){
      for(var i =0; i <= inventory.length; i++){
        if (inventory[i]==item) {
          return true;
        }
      }
      return false
}

//Remove the consumed inventory from the inventory list
var RemoveFromInventory = function(item){
    for(var i =0; i < inventory.length; i++){
      if (inventory[i]==item) {
        inventory[i+1]=inventory[i+2];
      }
    }
}





