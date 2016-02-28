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
    if(CurrentRoom == world.rooms[0]) {
      entrance(echo, socket);
    } else if (CurrentRoom == world.rooms[1]){
      dark_cave(echo, socket);
    } else if (CurrentRoom == world.rooms[2]){
      lit_cave(echo, socket);
    } else if (CurrentRoom == world.rooms[3]){
      treasure_room(echo, socket);
    } else {
      //socket.end();
    }
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
   // Refresh, otherwise the server has to restart for a new game,
   // because the variables are server globle
   inventory = []
   CurrentRoom = world.rooms[0];
});


server.listen(3000, '127.0.0.1'); //listen on port 3000
console.log('server connected'); //clarify connection



//first room
var entrance = function(echo, socket){
  if(echo.includes('take')) {
      if(world.rooms[0].items != null && InventoryAdded(0) === true){
          var items = world.rooms[0].items[0];
          inventory.push(items);
          socket.write('You picked up ' + items);
      } else {
          socket.write('Nothing to take...');
      }
  } else if (echo.includes('inventory')) {
    socket.write(inventory.toString());
  } else if (echo.includes('use')){
      var item = world.rooms[0].uses[0].item;
      if(echo.includes(item) && InventoryOwn(item) === true){
        world.rooms[0].uses[0].effect.consumed == true;
        RemoveFromInventory(item);  //remove the item from the invenotry list
        socket.write(world.rooms[0].uses[0].description + world.rooms[5].description);
        socket.write(world.rooms[5].status);
      } else {
        socket.write('Nothing to use...');
      }
  } else if (echo.includes('go')) {
    if(echo.includes('north')) {
      CurrentRoom = world.rooms[1];
      socket.write(world.rooms[1].description);
    }else{
      socket.write('Please try again');
    }
  } else {
    socket.write('Please try again');
  }
}

//second room
var dark_cave = function(echo, socket){
  if (echo.includes('inventory')) {
    socket.write('Your inventory: ' + inventory.toString());
  } else if (echo.includes('use')){
      var item = world.rooms[1].uses[0].item;
      console.log(item);
      if(echo.includes(item) && InventoryOwn(item) === true){
        world.rooms[1].uses[0].effect.consumed == true;
        CurrentRoom = world.rooms[2];
        socket.write(world.rooms[1].uses[0].description + world.rooms[2].description);
      } else {
        socket.write('Nothing to use...');
      }
  } else if (echo.includes('go')) {
    if(echo.includes('north') || echo.includes('east')||echo.includes('west')) {
      CurrentRoom = world.rooms[4];
      socket.write(world.rooms[4].description);
      socket.write(world.rooms[4].status);
    }else if (echo.includes('south')){
      CurrentRoom = world.rooms[0];
      socket.write(world.rooms[0].description);
    } else{
      socket.write('Please try again');
    }
  } else {
    socket.write('Please try again');
  }
}

//third room
var lit_cave = function(echo, socket){
  if (echo.includes('inventory')) {
    socket.write(inventory.toString());
  } else if (echo.includes('go')) {
    if(echo.includes('south')) {
      CurrentRoom = world.rooms[0];
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

//fourth room
var treasure_room = function(echo, socket){
  if(echo.includes('take')) {
      if(world.rooms[3].items != null && InventoryAdded(3) === true){
          var items = world.rooms[3].items[0];
          inventory.push(items);
          socket.write('You picked up ' + items);
      }
  } else if (echo.includes('inventory')) {
    socket.write(inventory.toString());
  } else if (echo.includes('go')) {
    if(echo.includes('south')) {
      CurrentRoom = world.rooms[0];
      socket.write(world.rooms[0].description);
    } else if (echo.includes('east')){
      CurrentRoom = world.rooms[1];
      socket.write(world.rooms[1].description);
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


