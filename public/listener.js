
  var p1ClampRecord = new Array(); 
  var p2ClampRecord = new Array(); 

  function trackPlayers(){
    var p1State = 0; 
    var p2State = 0; 

    if(drawing == true){
      if(activePlayer ==player1){
        p1State = 0; 
        p2State = 1; 
      }else{
        p1State = 1; 
        p2State = 0; 
      }
    }else{
      if(activePlayer == player1){
        p1State = .5; 
        p2State = 1; 
      }else{
        p1State = 1; 
        p2State = .5; 
      }
    }

    //console.log("p1State: " + p1State + "p1State: " + p2State); 
    if(statScreen == false){
      p1Tracker.push({"y": p1State}); 
      p2Tracker.push({"y": p2State}); 
      p1ClampRecord.push(analyzer.player1ClampRate); 
      p2ClampRecord.push(analyzer.player2ClampRate); 
      //console.log("p1ClampRecord" + p1ClampRecord); 
      //console.log("p2ClampRecord" + p2ClampRecord); 
  }
    if(statScreen == false && analyzer.interactionSequence==true){
      intCoupleRecord.push({"y": 1}); 
    }
    else if(statScreen == false && analyzer.interactionSequence==false){
      intCoupleRecord.push({"y":0}); 
    }

    //Each time step define two variables as current activity of 
  }

  var statModeCheckbox = document.getElementById("statMode"); 
  statModeCheckbox.onclick = function(){
    if(document.getElementById("statMode").checked == true){
      socket.emit('statMode', true);
    }else{
      socket.emit('statMode', false);

    }

  }

  var endTurnButton = document.getElementById("endTurnButton"); 
  endTurnButton.onclick = function(){
    //console.log("In endTurnButton onclick"); 
    

/*
    if (activePlayer == player1){
        inactivePlayer = player1;
        activePlayer = player2; 
    }
    else{
      activePlayer = player1;
      inactivePlayer = player2;  
    }*/
    document.getElementById("playerName").innerHTML = "Player: " + activePlayer.name;


    var players = {
      activePlayer : activePlayer.name, 
      inactivePlayer: inactivePlayer.name
    }
    //var stringPlayer = JSON.stringify(players);
    console.log("Players.active Player: " + players.activePlayer.name + "Players.inactivePlayer: " + players.inactivePlayer.name); 
    socket.emit('endTurn', players); 


  }

  var submitButton = document.getElementById("submitButton")
  submitButton.onclick = function(){
    //close window
    //document.getElementById('exampleModal').style.display='none'

    //Enter player names, session ID
    var p1Name = document.getElementById('player1NameInput').value; 
    var p2Name= document.getElementById('player2NameInput').value; 
    sessionID = document.getElementById('sessionIDInput').value; 
    drawingType = document.getElementById('drawingTypeInput').value; 


    var data = {
      p1Name : p1Name, 
      p2Name : p2Name, 
      ID : sessionID,
      drawingType: drawingType
    }
    socket.emit('newSession', data)

  }
  var showLinesButton = document.getElementById("showLinesButton"); 
  showLinesButton.onclick = function(){

      if(showLines == false){
        showLines = true; 
        showLinesButton.innerHTML = "Hide Lines"; 
        console.log("showlines: " + showLines); 
      } else {
        console.log("In else"); 
        showLines = false; 
        showLinesButton.innerHTML = "Show Lines"; 
      }
      displayLines();
  }

  var statButton = document.getElementById("statButton"); 
  statButton.onclick = function(){
    //console.log("In the onclick for location");
    //location.href='stats.html';
    document.getElementById('id01').style.display='block'
    display.display(); 
    var d = new Date(); 
    var time = d.getTime(); 
    startStart = time; 
    statCount++; 
    analyzer.setStatCount(statCount); 
    statScreen = true; 
    var chart = new Charts(player1, player2); 
    chart.interactionStateChart(p1Tracker, p2Tracker); 
    displayDistanceChart(); 
    displayLineLengthChart(); 
    displayInteractionCouplingChart(); 

    }


  var closeButton = document.getElementById("closeButton")
  closeButton.onclick = function(){
    document.getElementById('id01').style.display='none'
    //start over playerturn timer
    var d = new Date(); 
    turn.setTurnStart(d.getTime()); 
    turnStart = d.getTime(); 

    //end the timer for stat window
    var d = new Date(); 
    var time = d.getTime(); 
    statEnd = time; 
    statTime += (statEnd - startStart) /1000
    analyzer.setStatTime(statTime); 
    statScreen = false; 
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  var saveButton = document.getElementById("saveButton"); 
  //saveButton.setAttribute('download', 'MintyPaper.png');
  //saveButton.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  saveButton.click(); 
  saveButton.onclick = function(){
    var save = new Save(analyzer); 
    var saveText = save.save(); 
    download(sessionID, saveText); 

    //save the canvas to PNG
    var canavs = document.getElementById('canvas'); 
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href=image; // it will save locally
  /*
    var link = document.getElementById('saveButton');
    link.setAttribute('download', 'MintyPaper.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
  */

  }


  function displayInteractionCouplingChart(){

    var chart = new Charts(player1, player2); 
    chart.intCoupleChart(intCoupleRecord); 

  }

  function displayLineLengthChart(){
    var p1LineLength = new Array(); 
    var p2LineLength = new Array(); 
    var minY = 10000; 
    var maxY = 0; 
    for(var i = 0; i<analyzer.turns.length; i++){    
        var p1total = 0; 
        var p2total = 0; 
      for(var j = 0; j<analyzer.turns[i].currentLines.length; j++){
        if(analyzer.turns[i].activePlayer ==player1){
          p1total += analyzer.turns[i].currentLines[j].length;
          //console.log("p1total: " + p1total);
        }else{
          p2total += analyzer.turns[i].currentLines[j].length;
          //console.log("p2total: " + p2total);
        }

        if(p1total > maxY){
          maxY = p1total; 
        } 
        if(p2total > maxY){
          maxY = p2total; 
        }
        if(p1total < minY){
          minY = p1total; 
        }
        if(p2total < minY){
          minY = p2total; 
        }
      }
      if(analyzer.turns[i].activePlayer == player1){
        p1LineLength.push({"y": p1total})
      } else {
        p2LineLength.push({"y": p2total})
      }

    }

    var chart = new Charts(player1, player2); 
    chart.lineLengthChart(p1LineLength, p2LineLength, minY, maxY); 
  }

  function displayDistanceChart(){
    var p1Dist = new Array(); 
    var p2Dist = new Array(); 
    var maxY = 0; 
    for(var i = 0; i< analyzer.turns.length; i++){
        if(analyzer.turns[i].activePlayer == player1){
          //console.log("In p1 if distance:  " + analyzer.turns[i].distance); 
          var dist = {"y": analyzer.turns[i].distance}; 
          //console.log("Dist:" + dist.y); 
          p1Dist.push(dist); 
          //console.log("P1Distance: " + p1Dist[0].y);
        }else{
          var dist2 = {"y": analyzer.turns[i].distance}
          //console.log('P2 Dist: ' + dist2 .y); 
          p2Dist.push(dist2); 
          //console.log("In p2 if distance:  " + analyzer.turns[i].distance); 
          //console.log("P2Distance: " + p2Dist[0].y)

        }
        if(analyzer.turns[i].distance > maxY){
          maxY = analyzer.turns[i].distance; 
        }
        //console.log("Distance from turn: " + analyzer.turns[i].distance); 
        //console.log("P1Distance: " + p1Distance[i].y + "p2Distance: " + p2Distance[i].y); 
    }

    var chart = new Charts(player1, player2); 
    chart.distanceChart(maxY, p1Dist, p2Dist)
  }