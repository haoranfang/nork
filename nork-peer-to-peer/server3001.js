'use strict';
var net = require('net'); //import socket module

var server = net.createServer(); //create socket server

var world = require('./common/world.json');// load information about my world (the rooms, and also items) from an external JSON file


//when we start "listening" for connections
server.on('listening', function() {
   //get address info
   var addr = server.address();
   //print the info
   console.log('server listening on port %d', addr.port);
});

server.listen(3001, '127.0.0.1'); //listen on port 3000


//notify (via observer!) when a a connection occurs
server.on('connection', function(socket) {

   //we've established a socket to use

   //send a message to the socket
   socket.write('Welcome!\n' + world.rooms[0].id + world.rooms[0].description);
   socket.write('What would you like to do？');
   //close the connection
   socket.end();

});


/* when a socket is connected... */

//notify on data received event
socket.on('data', function(data) {
  echo = data.toString().toLowerCase();
  if (echo.includes('inventory')) {
    socket.write(inventory);  
  } else if (echo.includes('use')){
      var item = world.rooms[1].uses[0].item;
      if(echo.includes(item) && InventoryOwn(item) === true){
        socket.write(world.rooms[1].uses[0].description);
        world.rooms[1].uses[0].effect.consumed == true;
        CurrentRoom = world.rooms[2];
        socket.write(world.room[2].description);
      }
  } else if (echo.includes('go')) {
    if(echo.includes('north') || echo.includes('east')||echo.includes('west')) {
      CurrentRoom = world.rooms[4];
      socket.write(world.room[4].description);
      socket.end(); ////////////////////????????END
    }else if (echo.includes('south')){
      CurrentRoom = world.rooms[0];
      socket.write(world.room[0].description);
    } else{
      socket.write('Please try again');
    }
  } else {
    socket.write('Please try again');
  }
});



//Test if the item is already added to the inventory
var InventoryAdded = function(room){
      for(var i = 0; i <= inventory.length(); i++){
        if (inventory[i]==world.rooms[room].items[0]) {
          return false;
        }
      }
      return true
}

//Test if the item user is trying to use is inside user's inventory
var InventoryOwn = function(item){
      for(int i =0; i <= inventory.length(); i++){
        if (inventory[i]==item) {
          return true;
        }
      }
      return false
}

//Remove the consumed inventory from the inventory list
var RemoveFromInventory = function(item){
    for(int i =0; i < inventory.length(); i++){
      if (inventory[i]==item) {
        inventory[i+1]=inventory[i+2];
      }
    }
}


