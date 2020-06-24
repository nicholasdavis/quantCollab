
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket){
  socket.on('drawing', (data) => io.emit('drawing', data));
  //socket.on('endTurn', (data) => socket.broadcast.emit('endTurn', data)); 
  socket.on('endTurn', function(data){
  	//console.log("Data:" + data); 
  	io.emit('endTurn', data); 
  }); 
  socket.on('newSession', function(data){
  	console.log("Starting New Session"); 
 	io.emit('newSession', data); 
  }); 
  socket.on('mousedown', function(data){
  	//console.log("Data: " + data); 
  	io.emit('mousedown', data); 
  }); 
  socket.on('mouseup', function(data){
  	io.emit('mouseup', data); 
  }); 
  socket.on('statMode', function(data){
  	io.emit('statMode', data); 
  }); 


}



io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
