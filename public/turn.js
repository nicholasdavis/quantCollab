class Turn{
	constructor(activePlayer, inactivePlayer, currentLines, previousLines, turnStart, turnEnd){
		this.activePlayer = activePlayer; 
		this.inactivePlayer = inactivePlayer; 
		this.currentLines = currentLines; 
		this.previousLines = previousLines; 
		this.distance; 
		this.proximity;
		this.similarity; 
		this.fluidity; 
		this.turnStart = turnStart; 
		this.turnEnd = turnEnd; 
		this.turnTime; 
		this.thinkingTime; 
		this.drawingTime; 
		this.calculateSimilarity(); 
		this.calculateProximity(); 
		this.updatePlayer();
		this.calculateTurnTime(); 
		this.calculateThinkingTime();
		this.calculateFluidity();
		//console.log("Turn Start: " + turnStart + "Turn end: " + turnEnd); 
	}

	setTurnStart(startTime){
		this.turnStart = startTime; 
	}

	calculateFluidity(){
		if(this.thinkingTime < 3){
			this.fluidity = "fluid"; 
		}else
		this.fluidity = "unfluid"; 
	}

	calculateProximity(){

		var minDist = 100000; 
		for(var i =0; i< this.currentLines.length; i++){
			for(var j = 0; j<this.previousLines.length; j++){
				var curDist = this.currentLines[i].distance(this.previousLines[j])
				if(curDist < minDist){
					minDist = curDist; 
				}
			}

		}
		//console.log("MinDist: :" + minDist); 
		if(minDist < 100){
			this.proximity = "near"; 
		}else{
			this.proximity = "far"; 
		}

		//console.log("Proximity: " + this.proximity); 
		this.distance = minDist; 


/*
		this.distance = this.currentLine.distance(this.previousLine); 
		//console.log("Distance from last line:  " + this.distance); 
		if (this.distance < 100)
			this.proximity = "near"; 
		else this.proximity = "far"; 
		*/
	}

	calculateTurnTime(){
		//console.log("TurnendTime: " +this.turnEnd + "TurnStart: " + this.turnStart)
		this.turnTime = (this.turnEnd - this.turnStart) /1000
		//console.log("Total time in seconds for the turn: " + this.turnTime )
	}

	calculateSimilarity(){
		var sum = 0; 
		for (var i = 0; i<this.currentLines.length; i++){
			sum += this.currentLines[i].length; 
		}
		var activePlayerAvgLength = sum / this.currentLines.length; 
		//console.log("ActivePlayer avg: " + activePlayerAvgLength); 

		var sum2 = 0; 
		for (var i = 0; i<this.previousLines.length; i++){
			sum2 += this.previousLines[i].length; 
		}
		var inactivePlayerAvgLength = sum2 / this.currentLines.length; 
		//console.log("Inactive Player avg: " + inactivePlayerAvgLength); 

		if(Math.abs(activePlayerAvgLength - inactivePlayerAvgLength) < 50){
			this.similarity = "similar"; 
		}else{
			this.similarity = "unsimilar"
		}
		//console.log("Similarity: " + this.similarity); 



/*
		if(Math.abs(this.currentLine.length - this.previousLine.length) < 50){
			//console.log('Deemed similar. Calculation is: ' + Math.abs(this.currentLine.length - this.previousLine.length))
			this.similarity = "similar"; 
		}
		else{
			this.similarity = "unsimilar"; 
			//console.log("The lines were unsimilar. The similarity is: " + this.similarity);
		}
		*/
	}
	updatePlayer(){
		if(this.proximity == "near")
			this.activePlayer.addNearLine(); 
		if(this.similarity == "similar")
			this.activePlayer.addSimilarLine(); 
	}

	calculateThinkingTime(){
		var sumDrawingTime = 0; 
		for(var i = 0; i<this.currentLines.length; i++){
			sumDrawingTime += this.currentLines[i].totalTime; 

		}
		this.drawingTime = sumDrawingTime/1000; 
		//console.log("DrawingTime: " + this.drawingTime); 

		this.thinkingTime = this.turnTime - this.drawingTime; 
		//console.log("Turn time: " + this.turnTime); 
		//console.log("Thinking time: " + this.thinkingTime); 

/*
		this.drawingTime = this.currentLine.totalTime/1000; 
		//console.log("This.turnTime:  " + this.turnTime); 
		this.thinkingTime = this.turnTime - this.drawingTime; 
		//console.log("DrawingTIme: "+this.drawingTime+" Thinking Time: " + this.thinkingTime); 
		*/
	}

}