'use strict'; 

//(function() {

  var socket = io();
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var current = {};
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
  
  //Touch support for mobile devices
  canvas.addEventListener('touchstart', onMouseDown, false);
  canvas.addEventListener('touchend', onMouseUp, false);
  canvas.addEventListener('touchcancel', onMouseUp, false);
  canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

  socket.on('drawing', onDrawingEvent);
  socket.on('endTurn', onEndTurn); 
  socket.on('newSession', onNewSession); 
  socket.on('mousedown', mouseDownEvent); 
  socket.on('mouseup', mouseUpEvent); 

  var lineCounter = 0; 
  var lines = new Array(); 
  var previousLines = new Array(); 

  var player1 = new Player("Tom"); 
  var player2 = new Player("Jerry"); 
  var activePlayer = player1; 
  var inactivePlayer = player2; 
  console.log("Player1 Name: " + player1.name + "Player2 Name: " + player2.name); 
  var analyzer = new Analyzer(player1,player2, lines); 
  var display = new Display(analyzer); 

  var turnStart = 0; 
  var turnEnd = 0; 

  var lineStartTime = 0; 
  var lineEndTime = 0; 

  var turn; 

  var sessionID; 
  var statTime = 0; 
  var statStart = 0; 
  var statEnd= 0; 
  var statCount = 0; 
  var statScreen = false; 
  var intCoupleRecord = new Array(); 

  var showLines = false; 

  var p1Tracker = new Array(); 
  var p2Tracker = new Array(); 

  var drawingType = "multiLine";
  var firstTurn = true; 


  window.setInterval(trackPlayers, 1000); 
  window.addEventListener('resize', onResize, false);
  onResize();

  function displayLines(){
    //cycle through analyzer.turns to draw each line
    var c = document.getElementById("canvas"); 
    var context = c.getContext("2d"); 
    context.fillStyle = "white";
    context.fillRect(0,0,c.width, c.height); 

    for (var i = 0; i<analyzer.turns.length; i++){
      if(i==0){
      for (var j = 0; j<analyzer.turns[i].previousLines.length; j++){
        for(var k = 0; k<analyzer.turns[i].previousLines[j].points.length-1; k++){
        context.strokeStyle = "blue";

        if(showLines == false){
          context.strokeStyle = "black"; 
        }
        context.beginPath();
        context.moveTo(analyzer.turns[i].previousLines[j].points[k].x, analyzer.turns[i].previousLines[j].points[k].y)
        context.lineTo(analyzer.turns[i].previousLines[j].points[k+1].x, analyzer.turns[i].previousLines[j].points[k+1].y);
        context.closePath();
        context.stroke();
      }
      }
    }
      for(var j = 0; j< analyzer.turns[i].currentLines.length; j++){
        for (var k = 0; k<analyzer.turns[i].currentLines[j].points.length-1; k++){

          if(analyzer.turns[i].activePlayer == player1){
            context.strokeStyle = "blue";

          }
          else         
            context.strokeStyle = "red";
          if(showLines == false){
            context.strokeStyle = "black"; 
          }
          context.beginPath();
          context.moveTo(analyzer.turns[i].currentLines[j].points[k].x, analyzer.turns[i].currentLines[j].points[k].y)
         context.lineTo(analyzer.turns[i].currentLines[j].points[k+1].x, analyzer.turns[i].currentLines[j].points[k+1].y);
         context.closePath();
         context.stroke();
        }
      }
  }

    //Display legend
    if(showLines == true){
    context.font = "18px Arial";
    context.fillStyle = "black";
    context.fillText(player1.name+"'s lines = blue", 10, 30);
    context.fillText(player2.name+"'s lines = red", 10, 55);

  }

  }

  function onEndTurn(data){
    if(!firstTurn){
    turn = new Turn(activePlayer, inactivePlayer, lines, previousLines, turnStart, turnEnd); 
    analyzer.setDrawingType(drawingType); 
    analyzer.analyzeTurn(turn); 
  }

    if(data.activePlayer == player1.name){
      activePlayer = player2; 
      inactivePlayer = player1; 
    }else{
      activePlayer = player1; 
      inactivePlayer = player2; 
    }
    document.getElementById("playerName").innerHTML = "Player: " + activePlayer.name;

    var d = new Date(); 
    turnEnd = d.getTime(); 
    previousLines = lines; 
    lines = new Array(); 
    lineCounter = 0; 
    turnStart = d.getTime(); 
    firstTurn = false; 
  }


  function onNewSession(data){
    player1 = new Player(data.p1Name); 
    player2 = new Player(data.p2Name); 
    sessionID = data.ID; 
    activePlayer = player1; 
    drawingType = data.drawingType; 

    document.getElementById("playerName").innerHTML = "Player: " + activePlayer.name;
    //empty the elements to start a new session
    lineCounter = 0; 
    lines = new Array(); 
    analyzer = new Analyzer(player1, player2, lines); 
    display = new Display(analyzer); 

    //clear the canvas
    var width = document.getElementById('canvas').width; 
    var height = document.getElementById('canvas').height; 
    var c = document.getElementById('canvas'); 
    var ctx = c.getContext("2d"); 
    ctx.clearRect(0,0,width,height); 
    //make the canvas white not transparent
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    intCoupleRecord = new Array(); 

    if(data.drawingType == "singleLine"){
      document.getElementById('endTurnButton').style.display = "none"; 
    }
    else{
      document.getElementById('endTurnButton').style.display ="inline";
    }

  }

  function mouseDownEvent (data){
    //console.log("Mouse Down Event"); 
    var line = new Line(activePlayer); 
    var d = new Date(); 
    lineStartTime = d.getTime(); 
    lines.push(line); 

  }

  function mouseUpEvent (data){
    //console.log("Mouse Up Event"); 
    var d = new Date();
    turnEnd= d.getTime();
    lineEndTime = turnEnd; 
    //console.log("Getting end time " + turnEnd); 
    lines[lineCounter].setTime(lineStartTime,lineEndTime); 
    lines[lineCounter].updateLength();  
    activePlayer.add(lines[lineCounter]);
    lineCounter++; 

  }


  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
      color: color
    });
    
  }
var yOffset = $("#headerContainer").outerHeight(); 

  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
    current.y -= yOffset; 
    //var point = new Point(current.x, current.y); 

   // line.points.push(point); 


    socket.emit('mousedown','this is a test'); 

  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, (e.clientY - yOffset)||(e.touches[0].clientY - yOffset), current.color, true);
    
    //line = new Array(); 
    //lineCounter++; 
    socket.emit('mouseup', 'Mouse has been lifted'); 
    //console.log("Drawing type is: " + drawingType); 
  if(drawingType == "singleLine"){
    var players = {
      activePlayer : activePlayer.name, 
      inactivePlayer: inactivePlayer.name
    }
    //var stringPlayer = JSON.stringify(players);
    //console.log("Players.active Player: " + players.activePlayer.name + "Players.inactivePlayer: " + players.inactivePlayer.name); 
    socket.emit('endTurn', players);

    //console.log("Current player: " + activePlayer.name)
    //$('#playerName').value = activePlayer.name;
  }


  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, (e.clientY - yOffset)||(e.touches[0].clientY - yOffset), current.color, true);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY-yOffset||e.touches[0].clientY - yOffset;
    //var point = new Point(current.x, current.y); 
    //lines[lineCounter].points.push(point);
  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){
    var point = new Point(data.x0 ,data.y0); 
    lines[lineCounter].points.push(point);
    //console.log("LineCounter: " + lineCounter); 
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0, data.y0, data.x1, data.y1, data.color);


  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(analyzer.turns.length >= 1){
      displayLines(); 
    }
  }

//})();


