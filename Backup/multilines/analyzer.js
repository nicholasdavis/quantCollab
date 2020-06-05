class Analyzer{
	constructor(player1, player2, lines){
		this.player1 = player1; 
		this.player2 = player2; 
		this.turnDistances = new Array(); 
		this.lines = lines; 
		this.drawingType; 
		this.interactionSequence = false; 
		this.interactionStorage = new Array(); 
		this.interactionChain = new InteractionCoupling(); 
		this.patternSequence = false; 
		this.patternStorage = new Array(); 
		this.pattern = new Array();
		this.similarInteractions = 0; 
		this.turns = new Array(); 
		this.totalSessionTime = 0; 
		this.dominantPlayer; 
		this.dominantPercent; 
		this.statTime; 
		this.statCount; 
		this.percentCoupled; 
		this.collaborationDynamicLabels; 
		this.collaborationType = ""; 
		this.structuralCouplingCount = 0; 
		this.player1NumCoupledLines = 0; 
		this.player1SimilarLineCount = 0; 
		this.player1CoupleFoundedAvgDepth = 0; 
		this.player1Offers = 1; 
		this.player1OfferCountLabel = ""; 
		this.player1AcceptCountLabel = ""; 
		this.player1RejectCountLable = ""; 
		this.player1CoupledStartedCount = 0; 
		this.player1InitiateCouplingCount = 0; 
		this.player1DecoupleCount = 0; 
		this.player1PatternCount = 0; 
		this.player1DecouplePatternCount = 0; 
		this.player1AverageTurnLength = 0; 
		this.player1AvgThinkingTime = 0; 
		this.player1AvgDrawingTime = 0; 
		this.player1TotalThinkingTime = 0; 
		this.player1TotalDrawingTime = 0; 
		this.player1FluidLines = 0;
		this.player1AvgLinesPerCoupledTurn = 0; 
		this.player1LinesPerIdea = 0; 
		this.player1LinesAddedToNewIdeas = 0; 
		this.player1CollaboratorType = ""; 
		this.player2NumCoupledLines = 0; 
		this.player2SimilarLineCount = 0; 
		this.player2Offers = 0; 
		this.player2OfferCountLabel = ""; 
		this.player2AcceptCountLabel = ""; 
		this.player2RejectCountLabel = ""; 
		this.player2CoupleFoundedAvgDepth = 0; 
		this.player2CoupledStartedCount = 0; 
		this.player2InitiateCouplingCount = 0; 
		this.player2DecoupleCount = 0; 	
		this.player2PatternCount = 0; 
		this.player2DecouplePatternCount = 0; 
		this.player2AverageTurnLength = 0; 
		this.player2AvgThinkingTime = 0; 
		this.player2AvgDrawingTime= 0; 
		this.player2TotalThinkingTime = 0; 
		this.player2TotalDrawingTime= 0; 
		this.player2FluidLines = 0;
		this.player2NumCoupledLines = 0; 
		this.player1AvgLinesPerCoupledTurn = 0; 
		this.player2LinesPerIdea = 0; 
		this.player2LinesAddedToNewIdeas = 0; 
		this.player2CollaboratorType = ""; 

	}

	analyzeTurn(turn){
		//method for calling all the analysis 
		//var turn = new Turn(activePlayer, currentLine, previousLine, turnStart, turnEnd); 
		this.turns.push(turn); 
		this.calculateInteractions(); 
		this.calculateSimilarInteractions();
		this.calculateCouplingCounts(); 
		this.calculatePatternInteractions(); 
		this.calculateAverageTurnLengths(); 
		this.getInteractionCouplingData();
		this.calculateDrawingTimes(); 
		this.calculateThinkingTimes(); 
		this.calculateFluidLines(); 
		this.calculateTotalSessionTime(); 
		this.calculateDominantPlayer(); 
		this.calculatePercentCoupled(); 
		this.calculateCoupledStartCount(); 
		this.calculateOffers(); 
		this.calculateCoupleFoundedAvgDepth(); 
		this.calculateStructuralCouplingCount(); 
		this.calculateOfferCountLabels(); 
		this.calculateCollaborationType(); 
		this.calculateNumCoupledLines(); 
		this.calculateCollaboratorType(); 
		this.calculateLinesAddedToNewIdeas(); 
		this.calculateLinesPerIdea(); 
		console.log("Analyzer activated"); 
	}

	calculateLinesPerIdea(){
		var p1Lines = 0; 
		var p2Lines = 0; 
		var p1IdeaCount = 0; 
		var p2IdeaCount = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
			if(this.interactionStorage[i].turns[0].inactivePlayer == player1){
				p1Lines += this.interactionStorage[i].getNumLines(); 
				p1IdeaCount++;
			} else if(this.interactionStorage[i].turns[0].inactivePlayer == player2){
				p2Lines += this.interactionStorage[i].getNumLines(); 
				p2IdeaCount++; 
			}
		}
		if(p1IdeaCount == 0){
			this.player1LinesPerIdea = 0; 
		} else {
			this.player1LinesPerIdea = p1Lines/p1IdeaCount; 
		}
		if(p2IdeaCount == 0){
			this.player2LinesPerIdea = 0; 
		} else {
			this.player2LinesPerIdea = p2Lines/p2IdeaCount; 
		}

	}

	calculateLinesAddedToNewIdeas(){
		var p1Lines = 0; 
		var p2Lines = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
			for(var j = 0; j<this.interactionStorage[i].turns.length; j++){
				if(this.interactionStorage[i].turns[0].inactivePlayer == player1){
					if(this.interactionStorage[i].turns[j].activePlayer == player2){
						p2Lines += this.interactionStorage[i].turns[j].currentLines.length; 
					}

				} else if(this.interactionStorage[i].turns[0].inactivePlayer == player2){
					if(this.interactionStorage[i].turns[j].activePlayer == player1){
						p1Lines += this.interactionStorage[i].turns[j].currentLines.length;  
					}

				}
			}
		}
		this.player1LinesAddedToNewIdeas = p1Lines; 
		this.player2LinesAddedToNewIdeas = p2Lines; 
		console.log("P1 Lines Added: " + this.player1LinesAddedToNewIdeas + "P2 Lines added: "+ this.player2LinesAddedToNewIdeas); 
	}

	calculateCollaboratorType(){

//check type p1
			console.log("P1 Accept label before if statements :"+ this.player1AcceptCountLabel); 

			console.log("P1 CollabType Label before if statements :"+ this.player1CollaboratorType); 

		if(this.player1OfferCountLabel == "high" && this.player1AcceptCountLabel == "low" && this.player1RejectCountLabel == "high" && this.player2OfferCountLabel == "high" && this.player2AcceptCountLabel == "low" && this.player2RejectCountLabel == "high"){
			this.player1CollaboratorType = "Isolated"; 
		}else if(this.player1OfferCountLabel == "high" && this.player1AcceptCountLabel == "low" && this.player1RejectCountLabel == "high" ){
			this.player1CollaboratorType = "Dominant";
			console.log("P1 Accept label :"+ this.player1AcceptCountLabel)
		}else if(this.player1OfferCountLabel == "high" && this.player1RejectCountLabel == "low"){
			console.log("In Leader If statement"); 
			this.player1CollaboratorType = "Leader"; 

		}else if(this.player1OfferCountLabel == "low" && this.player1AcceptCountLabel == "high" && this.player1RejectCountLabel == "low"){
			this.player1CollaboratorType = "Follower"; 
		}else{
			console.log("Nothing found, reverting back to" + this.player1CollaboratorType); 
		}

		if(this.player1OfferCountLabel == "high" && this.player1AcceptCountLabel == "low" && this.player1RejectCountLabel == "high" && this.player2OfferCountLabel == "high" && this.player2AcceptCountLabel == "low" && this.player2RejectCountLabel == "high"){
			this.player2CollaboratorType = "Isolated"; 
		}else if(this.player2OfferCountLabel == "high" && this.player2AcceptCountLabel == "low" && this.player2RejectCountLabel == "high"){
			this.player2CollaboratorType = "Dominant";
		}else if(this.player2OfferCountLabel == "high" && this.player2RejectCountLabel == "low"){
			this.player2CollaboratorType = "Leader"; 
		}else if(this.player2OfferCountLabel == "low" && this.player2AcceptCountLabel == "high" && this.player2RejectCountLabel == "low"){
			this.player2CollaboratorType = "Follower"; 
		}




	}
	calculateNumCoupledLines(){
		var p1Coupled = 0; 
		var p2Coupled = 0; 
		var p1Turns = 0; 
		var p2Turns = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
			for(var j = 0; j<this.interactionStorage[i].turns.length; j++)
			if(this.interactionStorage[i].turns[0].inactivePlayer == player1){
				//console.log("Inactive Player == Player1"); 
				p1Coupled += this.interactionStorage[i].turns[j].currentLines.length; 
				p1Turns++; 
			}else{
				//console.log("Inactive Player == Player2"); 
				p2Coupled += this.interactionStorage[i].turns[j].currentLines.length; 
				p2Turns++; 
			}
		}

		this.player1NumCoupledLines = p1Coupled; 
		this.player2NumCoupledLines = p2Coupled; 
		this.player1AvgLinesPerCoupledTurn = p1Coupled / p1Turns; 
		this.player2AvgLinesPerCoupledTurn = p2Coupled / p2Turns; 

		//console.log("P1 Coupled Lines: " + this.player1NumCoupledLines + "P2 Coupled Lines: " + this.player2NumCoupledLines); 
		//console.log("P1 Avg Lines Per Coupled Turn: " + this.player1AvgLinesPerCoupledTurn + "P2 Avg Lines per coupled turn " + this.player2AvgLinesPerCoupledTurn); 
	}

	calculateOfferCountLabels(){
		var p1Turns = 0; 
		var p2Turns = 0; 
		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == player1){
				p1Turns++; 
			}else {
				p2Turns++; 
			}
		}

		var p1OfferPercent = (this.player1Offers / (this.player1Offers + this.player2Offers))*100; 
		var p2OfferPercent = (this.player2Offers / (this.player1Offers + this.player2Offers))*100; 

		//console.log("p1OfferPercent: " + p1OfferPercent + " p2OfferPercent: " + p2OfferPercent); 

		if(p1OfferPercent >= 50){
			this.player1OfferCountLabel = "high"; 
		} else {
			this.player1OfferCountLabel = "low"; 
		}
		if(p2OfferPercent >= 50){
			this.player2OfferCountLabel = "high"; 
		} else{
			this.player2OfferCountLabel = "low"; 
		}
		
		//console.log("Player 1 offer count lavbel: " + this.player1OfferCountLabel + "P2 Offer count label: "+ this.player2OfferCountLabel); 

		var p1AcceptPercent = (this.player1InitiateCouplingCount / this.player2Offers) * 100; 
		var p2AcceptPercent = (this.player2InitiateCouplingCount / this.player1Offers) * 100; 
		//console.log("p1AcceptPercent: " + p1AcceptPercent + " p2AcceptPercent: " + p2AcceptPercent); 

		if(p1AcceptPercent >= 50){
			this.player1AcceptCountLabel = "high"; 
		}else{
			this.player1AcceptCountLabel = "low"; 
		}
		if(p2AcceptPercent >= 50){
			this.player2AcceptCountLabel = "high"; 
		}else{
			this.player2AcceptCountLabel = "low"; 
		}
		
		console.log("P1 Accent Count label: " + this.player1AcceptCountLabel + "P2 Accept count label: " + this.player2AcceptCountLabel); 

		var p1RejectPercent = ((this.player2Offers - this.player1InitiateCouplingCount)/this.player2Offers)*100; 
		var p2RejectPercent = ((this.player1Offers - this.player2InitiateCouplingCount)/this.player1Offers)*100; 

		if(p1RejectPercent == 0){
			this.player1RejectCountLabel = "low"; 
		}
		else if(p1RejectPercent >= 50){
			this.player1RejectCountLabel = "high"; 
		}else{
			this.player1RejectCountLabel = "low"; 
		}
		if(p2RejectPercent == 0){
			this.player2RejectCountLabel = "low"; 
		}
		else if(p2RejectPercent >= 50){
			this.player2RejectCountLabel = "high"; 
		}else{
			this.player2RejectCountLabel = "low"; 
		}

		console.log("P1 rejct Count label: " + this.player1RejectCountLabel + "P2 Reject count label: " + this.player2RejectCountLabel); 
	this.collaborationDynamicLabels = {
		"player1OfferCountLabel": this.player1OfferCountLabel, 
		"player2OfferCountLabel": this.player2OfferCountLabel,
		"player1AcceptCountLabel": this.player1AcceptCountLabel, 
		"player2AcceptCountLabel": this.player2AcceptCountLabel, 
		"player1RejectCountLabel": this.player1RejectCountLabel, 
		"player2RejectCountLabel": this.player2RejectCountLabel 
	}
	//console.log("CollabType.p2OFfer: " + this.collaborationDynamicLabels.player2OfferCountLabel); 
	}

	calculateCollaborationType(){
		//console.log("P1AcceptCount Label: " + this.collaborationDynamicLabels.player1AcceptCountLabel); 
		//console.log("P2AcceptCount Label: " + this.collaborationDynamicLabels.player2AcceptCountLabel); 

		var equalDrawing = false; 

		//var p1OfferPercent = (this.player1Offers / (this.player1Offers + this.player2Offers) ) *100; 
		var diff = (Math.abs(this.player1Offers-this.player2Offers) / (this.player1Offers + this.player2Offers) ) *100; 
		//console.log("Diff: " + diff); 
		if(diff < 30 ){
			equalDrawing = true; 
		}
		//console.log("equalDrawing: " + equalDrawing); 


		if(this.player1AcceptCountLabel == "low" & this.player2AcceptCountLabel == "low"){
			this.collaborationType =  "Isolated Collaboration"; 
		}else if( equalDrawing && this.player1AcceptCountLabel == "high" && this.player2AcceptCountLabel == "high" ){
			this.collaborationType = "Balanced Collaboration"; 
		}else if((this.player1OfferCountLabel == "high" && this.player1RejectCountLabel == "high") || (this.player2OfferCountLabel == "high" && this.player2RejectCountLabel == "high")){
			this.collaborationType = "Dominant Collaboration"; 
		}else if ((this.player1OfferCountLabel == "high" && this.player2AcceptCountLabel == "high") || (this.player2OfferCountLabel=="high" && this.player1AcceptCountLabel == "high" )){
			this.collaborationType = "Follow the Leader Collaboration"; 
		}else{
			console.log("No types found"); 
		}

		//console.log("Collaboration Type: " + this.collaborationType); 

/*
		switch(this.collaborationDynamicLabels){
			case (this.collaborationDynamicLabels.player1AcceptCountLabel == "low" && this.collaborationDynamicLabels.player2AcceptCountLabel =="low" ): 
				this.collaborationType = "Isolated Collaboration"; 
				console.log("CollabType Iso"); 
				break; 
		}
		*/
	}

	calculateStructuralCouplingCount(){

		var sum = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
			//console.log("interactionStorage i: " + i + this.interactionStorage[i].getStructuralCoupling()); 
			if(this.interactionStorage[i].getStructuralCoupling() == "tight"){
				sum++; 
				//console.log("Sum:" + sum)
			}
		}
		this.structuralCouplingCount = sum; 
		//console.log("Tight couplings: " + this.structuralCouplingCount ); 

	}
	calculateCoupleFoundedAvgDepth(){
		var p1sum = 0; 
		var p1count = 0; 
		var p2sum = 0; 
		var p2count = 0; 
		var turnTotal = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
			if(this.interactionStorage[i].turns[0].inactivePlayer == player1){
				p1sum += this.interactionStorage[i].turns.length; 
				p1count++; 
				//console.log("p1sum: "+ p1sum); 
			} else{
				p2sum += this.interactionStorage[i].turns.length; 
				p2count++; 
				//console.log("p2sum: "+ p2sum); 
			}
			turnTotal += this.interactionStorage[i].turns.length
			//console.log("Turn total: "+ turnTotal); 
		}
		if(p1count == 0){
			var p1avg = 0; 
		} else {
			var p1avg = p1sum / p1count; 
		}
		if(p2count == 0 ){
			var p2avg = 0; 
		}else {
			var p2avg = p2sum / p2count; 
		}

		this.player1CoupleFoundedAvgDepth = p1avg;
		this.player2CoupleFoundedAvgDepth = p2avg;  

		//console.log("P1 avg depth: "+this.player1CoupleFoundedAvgDepth); 
		//console.log("P2 avg depth: "+ this.player2CoupleFoundedAvgDepth);
		//console.log("Int Storage Length: " + this.interactionStorage.length); 
	}


	calculateOffers(){
		var p1Offer = 1; 
		var p2Offer = 0; 
		for(var i=0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == player1 && this.turns[i].proximity == "far"){
				p1Offer++; 
				//console.log("Just Incremented offer: " + p1Offer); 
			}
			if (this.turns[i].activePlayer == player2 && this.turns[i].proximity == "far"){
				p2Offer++; 
				//console.log("Just Incremented offer: " + p2Offer); 
			}

			
		}
		this.player1Offers = p1Offer; 
		this.player2Offers = p2Offer; 
		//console.log("p1Off: " + this.player1Offers + "p2Offer:" + p2Offer); 
	}

	calculateCoupledStartCount(){
		var p1CoupledStartCount = 0; 
		var p2CoupledStartCount = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
			//console.log("foundedBy: " + this.interactionStorage[i].getFoundedBy()); 
			if(this.interactionStorage[i].getFoundedBy() == player1){
				p1CoupledStartCount += this.interactionStorage[i].turns.length; 
			}else{
				p2CoupledStartCount += this.interactionStorage[i].turns.length; 
			}
		}
		this.player1CoupledStartedCount = p1CoupledStartCount; 
		this.player2CoupledStartedCount = p2CoupledStartCount; 
		//console.log("P1 CoupledStart Count: " + this.player1CoupledStartedCount + "P2 Coupl Start " + this.player2CoupledStartedCount); 
	}

	calculatePercentCoupled(){
		var total = 0; 
		var near = 0; 
		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].proximity == "near"){
				near++;
			}
			total++
		}
		this.percentCoupled = (near / total) * 100; 
		//console.log("percent coupled: " + this.percentCoupled)
	}

	setStatTime(statTime){
		this.statTime = statTime; 
	}

	setStatCount(statCount){
		this.statCount = statCount; 
	}

	setDrawingType(drawingType){
		this.drawingType = drawingType; 
	}

	calculateDominantPlayer(){
		var p1Lines = 0; 
		var p2Lines = 0; 

		for(var i = 0; i<this.turns.length; i++){
			for(var j = 0; j<this.turns[i].currentLines.length;j++){
			if(this.turns[i].activePlayer == this.player1){
				p1Lines += this.turns[i].currentLines[j].length
			}
			else {
				p2Lines += this.turns[i].currentLines[j].length
			}
		}
		}

/*

		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == this.player1){
				p1Lines += this.turns[i].currentLine.length
			}
			else {
				p2Lines += this.turns[i].currentLine.length
			}
		}
*/

		if(p1Lines > p2Lines){
			this.dominantPlayer = this.player1; 
			this.dominantPercent = (p1Lines / (p1Lines + p2Lines))*100; 
		} else {
			this.dominantPlayer = this.player2; 
			this.dominantPercent = (p2Lines / (p1Lines + p2Lines))*100; 
		}
	}

	calculateTotalSessionTime(){
		var totalTime = 0; 
		for (var i = 0; i<this.turns.length; i++){
			totalTime += this.turns[i].turnTime; 
		}
		var minutes = Math.trunc(totalTime / 60); 
		var seconds = Math.round(totalTime % 60); 
		if(seconds < 10){
			var time = minutes + ":" + "0"+seconds; 
		}
		else var time = minutes + ":" + seconds; 
		this.totalSessionTime = time; 
		return this.totalSessionTime; 
	}
	calculateFluidLines(){
		var sum1 = 0;
		var sum2 = 0; 
		for(var i=0; i<this.turns.length; i++){
			if(this.turns[i].fluidity == "fluid" && this.turns[i].activePlayer == this.player1){
				sum1++
			}
			else if(this.turns[i].fluidity == "fluid" && this.turns[i].activePlayer == this.player2){
				sum2++
			}
		}

		this.player1FluidLines = sum1; 
		this.player2FluidLines = sum2; 
	}
	calculateThinkingTimes(){
		var p1sum = 0; 
		var p2sum = 0; 
		for(var i=0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == this.player1){
				p1sum += this.turns[i].thinkingTime; 
			}
			else {
				p2sum += this.turns[i].thinkingTime; 
			}
		}
		this.player1AvgThinkingTime = p1sum/(this.turns.length/2); 
		this.player2AvgThinkingTime = p2sum/(this.turns.length/2); 

		var p1TotalThinkingTime = 0; 
		var p2TotalThinkingTime = 0; 
		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == this.player1){
				p1TotalThinkingTime += this.turns[i].thinkingTime; 
			}
			else {
				p2TotalThinkingTime += this.turns[i].thinkingTime; 
			}

		}
		this.player1TotalThinkingTime = p1TotalThinkingTime; 
		this.player2TotalThinkingTime = p2TotalThinkingTime; 
	}


	calculateDrawingTimes(){
		var p1sum = 0; 
		var p2sum = 0; 
		for(var i=0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == this.player1){
				p1sum += this.turns[i].drawingTime; 
			}
			else {
				p2sum += this.turns[i].drawingTime; 
			}
		}
		this.player1AvgDrawingTime = p1sum/(this.turns.length/2); 
		this.player2AvgDrawingTime = p2sum/(this.turns.length/2); 

		var p1TotalDrawingTime = 0; 
		var p2TotalDrawingTime = 0; 
		for(var i = 0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == this.player1){
				p1TotalDrawingTime += this.turns[i].drawingTime; 
			}
			else {
				p2TotalDrawingTime += this.turns[i].drawingTime; 
			}

		}
		this.player1TotalDrawingTime = p1TotalDrawingTime; 
		this.player2TotalDrawingTime = p2TotalDrawingTime; 
	}

	getInteractionCouplingData(){
		var interactionText = ""; 

		for(var i = 0; i<this.interactionStorage.length; i++){
			var currentText = 
			"<b>Interaction Coupling " + i + "</b><br>" +
			"Num Turns: " + this.interactionStorage[i].getNumTurns() + "<br>" +  
			"Avg Line Length: " + Math.round(this.interactionStorage[i].getAvgLineLength()) + "<br>" + 
			"Total Line Length: " + Math.round(this.interactionStorage[i].getTotalLineLength()) + "<br>" + 
			"Total Time: "+ this.interactionStorage[i].getTotalTime().toFixed(1) + "s"+"<br>" + 
			"Num Similar Lines: " + this.interactionStorage[i].getNumSimilarLines() + "<br>" +  
			"Area Covered: " + this.interactionStorage[i].getAreaCovered() + "<br>" + 
			"Quadrant Location: " + this.interactionStorage[i].getLocation() + "<br>" +
			"Percent Fluid Interactions: " + this.interactionStorage[i].getPercentFluid().toFixed(1) +"%"+ "<br>"+ 
			"Dominant Player: " + this.interactionStorage[i].getDominantPlayer() + "<br>"+
			"Percent Dominant: " + this.interactionStorage[i].dominantPercent.toFixed(1) + "%" + "<br>" + 
			"Initiated By: " + this.interactionStorage[i].getInitiatedBy().name + "<br>" ; 


			if(this.interactionStorage[i].getDecoupledBy() != null){
				currentText = currentText.concat("Decoupled By: "+ this.interactionStorage[i].getDecoupledBy().name+ "<br><br>");  
			}
			interactionText = interactionText.concat(currentText); 
		}
		return interactionText; 
	}

	getInteractionCouplingDataHTML(){
		var interactionText = ""; 

		for(var i = 0; i<this.interactionStorage.length; i++){
			var currentText = 
			"Interaction Coupling " + i + "\n" +
			"Num Turns: " + this.interactionStorage[i].getNumTurns() + "\n" +  
			"Avg Line Length: " + Math.round(this.interactionStorage[i].getAvgLineLength()) + "\n" + 
			"Total Line Length: " + Math.round(this.interactionStorage[i].getTotalLineLength()) + "\n" + 
			"Total Time: "+ this.interactionStorage[i].getTotalTime().toFixed(1) + "s"+"\n" + 
			"Num Similar Lines: " + this.interactionStorage[i].getNumSimilarLines() + "\n" +  
			"Area Covered: " + this.interactionStorage[i].getAreaCovered() + "\n" + 
			"Quadrant Location: " + this.interactionStorage[i].getLocation() + "\n" +
			"Percent Fluid Interactions: " + this.interactionStorage[i].getPercentFluid().toFixed(1) +"%"+ "\n"+ 
			"Dominant Player: " + this.interactionStorage[i].getDominantPlayer() + "\n"+
			"Percent Dominant: " + this.interactionStorage[i].dominantPercent.toFixed(1) + "%" + "\n" + 
			"Initiated By: " + this.interactionStorage[i].getInitiatedBy().name + "\n" ; 


			if(this.interactionStorage[i].getDecoupledBy() != null){
				currentText = currentText.concat("Decoupled By: "+ this.interactionStorage[i].getDecoupledBy().name+ "\n\n");  
			}
			interactionText = interactionText.concat(currentText); 
		}
		return interactionText; 
	}

	calculateCouplingCounts(){
		this.player1InitiateCouplingCount = 0; 
		this.player2InitiateCouplingCount = 0; 
		for(var i = 0; i<this.interactionStorage.length; i++){
				var interactionCoupling = this.interactionStorage[i]
			//	console.log("The activePlayer for i = " + i + interactionCoupling.turns[0].activePlayer.name)
				if (interactionCoupling.turns[0].activePlayer == this.player1){
					//console.log("P1 recognized. Adding to couplingP1")
					this.player1InitiateCouplingCount++; 
				}
				else this.player2InitiateCouplingCount++; 

		}
		//console.log("Couple Counts: P1: " + this.player1InitiateCouplingCount); 
		//console.log("Couple Counts: P2: " + this.player2InitiateCouplingCount); 
	}

	calculateAverageTurnLengths(){
		var player1Turns = new Array();   
		var player2Turns = new Array(); 
		for (var i = 0; i<this.turns.length; i++){
			if(this.turns[i].activePlayer == player1)
				player1Turns.push(this.turns[i])
			else 
				player2Turns.push(this.turns[i])
		}
		var p1Sum = 0;
		for (var i = 0; i<player1Turns.length; i++){
			p1Sum+= player1Turns[i].turnTime; 
		}
		var p2Sum = 0;

		for (var i = 0; i<player2Turns.length; i++){
			p2Sum+= player2Turns[i].turnTime; 
		}
		this.player1AverageTurnLength = p1Sum/player1Turns.length; 
		this.player2AverageTurnLength = p2Sum/player2Turns.length; 
		//console.log("P1 Avg turn length: " + this.player1AverageTurnLength); 
	}

	calculatePatternInteractions(){
		this.player1PatternCount = 0; 
		this.player2PatternCount= 0; 
		for(var i = 0; i<this.patternStorage.length; i++){
				var pattern = this.patternStorage[i]
				//console.log("The activePlayer for i = " + i + pattern[0].activePlayer.name)
				if (pattern[0].activePlayer == this.player1){
					//console.log("P1 recognized. Adding to couplingP1")
					this.player1PatternCount++; 
				}
				else this.player2PatternCount++; 

		}
		//console.log("Pattern Counts: P1: " + this.player1PatternCount); 
		//console.log("Pattern Counts: P2: " + this.player2PatternCount); 
	}


	calculateSimilarInteractions(){
		var similarInteractions = 0; 
		var p1Sim = 0; 
		var p2Sim = 0; 
		for(var i = 0; i<this.turns.length; i++){
			//console.log("In if, similarity is: " + this.turns[i].similarity);
			if (this.turns[i].similarity =="similar"){
				similarInteractions++;
			}
			if(this.turns[i].activePlayer == player1 && this.turns[i].similarity =="similar"){
				p1Sim++; 
			}else if (this.turns[i].activePlayer == player2 && this.turns[i].similarity =="similar"){
				p2Sim++; 
			}
		}
		this.similarInteractions = similarInteractions;
		this.player1SimilarLineCount = p1Sim; 
		this.player2SimilarLineCount = p2Sim; 
		//console.log("P1 similarLineCounts: " + this.player1SimilarLineCount + "P2 similarLineCounts: "+ this.player2SimilarLineCount ); 
	}

	calculateAverageCoupledInteraction(){
		var sum = 0; 
		for (var i= 0; i<this.interactionStorage.length; i++){
			sum = sum + this.interactionStorage[i].turns.length; 
			//console.log("Sum: " + sum);
		}
		var average = sum / this.interactionStorage.length; 
		return average; 
	}

	calculateAveragePatternTurns(){
		var sum = 0; 
		for (var i= 0; i<this.patternStorage.length; i++){
			sum = sum + this.patternStorage[i].length; 
		}
		var average = sum / this.patternStorage.length; 
		return average; 
	}

	calculateAverageSimilarLineCoupling(){
		var similarLineCounts = new Array(); 
		var sum = 0; 

		for (var i = 0; i<this.interactionStorage.length; i++){
			var count = 0; 
			for(var j=0; j<this.interactionStorage[i].turns.length; j++){
				var interaction = this.interactionStorage[i].turns;
				if(interaction[j].similarity == "similar"){
					count++; 
				}
			}
			sum  = count + sum; 
		}
		return sum/this.interactionStorage.length; 
	}

	calculateLongestInteraction(){
		var longestSequence = 0;
		for (var i= 0; i<this.interactionStorage.length; i++){
			if(this.interactionStorage[i].turns.length > longestSequence)
				longestSequence = this.interactionStorage[i].turns.length;
		}
		return longestSequence; 
	}

	calculateInteractions(){
		//console.log("This.turn.length: "+ this.turns.length); 

	if(this.turns.length == 1){
		if(this.turns[this.turns.length -1].proximity == "near"){
			this.interactionSequence = true; 
			this.interactionChain = new InteractionCoupling(this.player1,this.player2); 
			//console.log("InteractionChain: " + this.interactionChain.player1); 
			this.interactionChain.add(this.turns[this.turns.length-1])
			this.interactionStorage.push(this.interactionChain);
		}
	}else if(this.turns.length>1){
				//console.log("Current turn turn proximity" + this.turns[this.turns.length-1].proximity); 
				//console.log("Last turn proximity" + this.turns[this.turns.length-2].proximity); 
/*
			if(this.turns.length == 2 && this.turns[this.turns.length-1].proximity == "near" && this.turns[this.turns.length-2].proximity == "near"){
				this.interactionSequence = true; 
				this.interactionChain = new InteractionCoupling(this.player1,this.player2); 
				//console.log("InteractionChain: " + this.interactionChain)
				this.interactionStorage.push(this.interactionChain)
				/*
				if(this.turns[this.turns.length-1].inactivePlayer == player1){
					console.log("Player1Offers: " + this.player1Offers)
					this.player1Offers++; 
				}else{
					this.player2Offers++; 
					console.log("Player1Offers: " + this.player2Offers)
				}
				/
			}*/
		if(this.interactionSequence == true){
			//check near near
			//if near near, push to ineractionChain
			//else set to false
			if(this.turns[this.turns.length-1].proximity == "near" && this.turns[this.turns.length-2].proximity == "near"){
			//	console.log("Inside near near if");
				this.interactionChain.add(this.turns[this.turns.length-1]);
				this.interactionSequence = true; 
				//console.log("Just added to the interactionChain. The Current size is: " +this.interactionChain.length);
			}
			else{
				this.interactionSequence = false; 
			//	console.log('in else, interactionSequence = ' + this.interactionSequence); 
				//starting a new interactionChain
				//this.interactionChain = new Array(); 
				this.interactionChain.setDecoupledBy(this.turns[this.turns.length-1].activePlayer);

			}

			if(this.turns[this.turns.length-1].proximity == "far" && this.turns[this.turns.length-2].proximity == "near"){
				//console.log("Detected a decoupling, adding to player count")
				if(this.turns[this.turns.length-1].activePlayer == player1)
					this.player1DecoupleCount++; 
				else this.player2DecoupleCount++; 
				this.interactionChain.setDecoupledBy(this.turns[this.turns.length-1].activePlayer);
				//console.log("DecouplePlayer1: " + this.player1DecoupleCount); 
			}

		}
		else{
			//check near
			//if yes, store old, and create new
		//	console.log("Inside first elf state interactionSequence false");
			if(this.turns[this.turns.length-1].proximity == "near" && this.turns[this.turns.length-2].proximity == "far"){
				//start a new intereactionSequence
				this.interactionSequence = true; 
				this.interactionChain = new InteractionCoupling(this.player1, this.player2); 
				//console.log("Inside if near and far1. Interaction Chain: " + this.interactionChain); 
				this.interactionChain.add(this.turns[this.turns.length-1]);
				this.interactionStorage.push(this.interactionChain); 
				//console.log("InteractionStorage: " + this.interactionStorage)
				//console.log("Inside if near and far. Interaction Chain: " + this.interactionChain); 

		}
		else 
			this.interactionSequence = false; 
		}



//Pattern checking
		if(this.turns.length == 2 && this.turns[this.turns.length-1].similarity == "similar" && this.turns[this.turns.length-2].similarity == "similar"){
				this.patternSequence = true; 
				this.patternStorage.push(this.pattern)
			}
		if(this.patternSequence == true){
			if(this.turns[this.turns.length-1].similarity == "similar" && this.turns[this.turns.length-2].similarity == "similar"){
				this.pattern.push(this.turns[this.turns.length-1]);
				this.patternSequence = true; 
				//console.log("Just added to the pattern. The Current size is: " +this.pattern.length);
			}
			else{
				this.patternSequence = false; 
				this.pattern = new Array(); 
			}
			if(this.turns[this.turns.length-1].similarity == "unsimilar" && this.turns[this.turns.length-2].similarity == "similar"){
				//console.log("Detected a decoupling, adding to player count")
				if(this.turns[this.turns.length-1].activePlayer == player1)
					this.player1DecouplePatternCount++; 
				else this.player2DecouplePatternCount++; 
				//console.log("DecouplePlayer1: " + this.player1DecoupleCount); 
			}

		}
		else{
			if(this.turns[this.turns.length-1].similarity == "similar" && this.turns[this.turns.length-2].similarity == "unsimilar"){
				//start a new intereactionSequence
				this.patternSequence = true; 
				this.pattern.push(this.turns[this.turns.length-1]);
				this.patternStorage.push(this.pattern); 
		}
		else 
			this.patternSequence = false; 
		}

		//console.log("The number of total coupled interaction is: " + this.interactionStorage.length); 
		//console.log("The average number of turns per coupling is: " + this.calculateAverageCoupledInteraction()); 
		//console.log("The longest coupled interaction was " + this.calculateLongestInteraction() + " turns long");
		//console.log("The currentLine length is: " + this.turns[this.turns.length-1].currentLine.length);  
		//console.log("The current turn was " + this.turns[this.turns.length-1].similarity + " to the last one"); 
		//console.log("The number of similar interactions is: " + this.similarInteractions); 
		//console.log("Player 1 similar lines: " + this.player1.similarLines + " and near lines: " + this.player1.nearLines);
		//console.log("Player 2 similar lines: " + this.player2.similarLines + " and near lines: " + this.player2.nearLines);
		//console.log("The number of patterns is " + this.patternStorage.length); 
		//console.log("Decoupled Patterns p1: " + this.player1DecouplePatternCount + " P2: " + this.player2DecouplePatternCount)
	}
}
}