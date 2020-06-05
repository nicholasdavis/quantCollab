class Turn{
	constructor(activePlayer, inactivePlayer, currentLine, previousLine, turnStart, turnEnd){
		this.activePlayer = activePlayer; 
		this.inactivePlayer = inactivePlayer; 
		this.currentLine = currentLine; 
		this.previousLine = previousLine; 
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
		this.distance = this.currentLine.distance(this.previousLine); 
		//console.log("Distance from last line:  " + this.distance); 
		if (this.distance < 100)
			this.proximity = "near"; 
		else this.proximity = "far"; 
	}

	calculateTurnTime(){
		//console.log("TurnendTime: " +this.turnEnd + "TurnStart: " + this.turnStart)
		this.turnTime = (this.turnEnd - this.turnStart) /1000
		//console.log("Total time in seconds for the turn: " + this.turnTime )
	}

	calculateSimilarity(){
		if(Math.abs(this.currentLine.length - this.previousLine.length) < 50){
			//console.log('Deemed similar. Calculation is: ' + Math.abs(this.currentLine.length - this.previousLine.length))
			this.similarity = "similar"; 
		}
		else{
			this.similarity = "unsimilar"; 
			//console.log("The lines were unsimilar. The similarity is: " + this.similarity);
		}
	}
	updatePlayer(){
		if(this.proximity == "near")
			this.activePlayer.addNearLine(); 
		if(this.similarity == "similar")
			this.activePlayer.addSimilarLine(); 
	}

	calculateThinkingTime(){
		this.drawingTime = this.currentLine.totalTime/1000; 
		//console.log("This.turnTime:  " + this.turnTime); 
		this.thinkingTime = this.turnTime - this.drawingTime; 
		//console.log("DrawingTIme: "+this.drawingTime+" Thinking Time: " + this.thinkingTime); 
	}

}