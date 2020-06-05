class Display{
	constructor(analyzer){
		this.analyzer = analyzer; 
		//this.display(); 
		//console.log("In Display");
	}

	display(){
		  //document.getElementById("displayName1").value = this.analyzer.player1.name;
		  //console.log("Setting display to "+ this.analyzer.player1.name); 


//Player 1
		  document.getElementById("player1Name").innerHTML = "Player: " + this.analyzer.player1.name;
		  document.getElementById("player1Lines").innerHTML = "# of Lines: " + this.analyzer.player1.lines.length;
		  document.getElementById("plyaer1AverageLine").innerHTML = "Avg. line length: " + Math.round(this.analyzer.player1.averageLine());
		  document.getElementById("player1numberNear").innerHTML = "# of near contributions: " + this.analyzer.player1.nearLines;
		  document.getElementById("player1numberSimilar").innerHTML = "# of similar contributions: " + this.analyzer.player1.similarLines;
		  document.getElementById("player1initiateCoupling").innerHTML = "# of couplings initiated: " + this.analyzer.player1InitiateCouplingCount;
		  document.getElementById("player1Decouplings").innerHTML = "# of decouplings initiated: " + this.analyzer.player1DecoupleCount;
		  document.getElementById("player1PatternInitiate").innerHTML = "# of patterns initiated: " + this.analyzer.player1InitiateCouplingCount;
		  document.getElementById("player1PatternDecouple").innerHTML = "# of patterns ended: " + this.analyzer.player1DecoupleCount;
		  document.getElementById("player1AvgTurnTime").innerHTML = "Avg. time per turn: " + this.analyzer.player1AverageTurnLength.toFixed(1) + "s";
		  document.getElementById("player1AvgDrawingTime").innerHTML = "Avg. drawing time: " + this.analyzer.player1AvgDrawingTime.toFixed(1) + "s";
		  document.getElementById("player1TotalDrawingTime").innerHTML = "Total drawing time: " + this.analyzer.player1TotalDrawingTime.toFixed(1) + "s";
		  document.getElementById("player1AvgThinkingTime").innerHTML = "Avg. thinking time: " + this.analyzer.player1AvgThinkingTime.toFixed(1) + "s";
		  document.getElementById("player1TotalThinkingTime").innerHTML = "Total thinking time: " + this.analyzer.player1TotalThinkingTime.toFixed(1) + "s";
		  document.getElementById("player1NumFluidLines").innerHTML = "# of fluid lines: " + this.analyzer.player1FluidLines;


//Player 2
		  document.getElementById("player2Name").innerHTML = "Player: " + this.analyzer.player2.name;
		  document.getElementById("player2Lines").innerHTML = "# of Lines: " + this.analyzer.player2.lines.length;
		  document.getElementById("plyaer2AverageLine").innerHTML = "Avg. line length: " + Math.round(this.analyzer.player2.averageLine());
		  document.getElementById("player2numberNear").innerHTML = "# of near contributions: " + this.analyzer.player2.nearLines;
		  document.getElementById("player2numberSimilar").innerHTML = "# of similar contributions: " + this.analyzer.player2.similarLines;
		  document.getElementById("player2initiateCoupling").innerHTML = "# of couplings initiated: " + this.analyzer.player2InitiateCouplingCount;
		  document.getElementById("player2Decouplings").innerHTML = "# of decouplings initiated: " + this.analyzer.player2DecoupleCount;
		  document.getElementById("player2PatternInitiate").innerHTML = "# of patterns initiated: " + this.analyzer.player2InitiateCouplingCount;
		  document.getElementById("player2PatternDecouple").innerHTML = "# of patterns ended: " + this.analyzer.player2DecoupleCount;
		  document.getElementById("player2AvgTurnTime").innerHTML = "Avg. time per turn: " + this.analyzer.player2AverageTurnLength.toFixed(1) + "s";
		  document.getElementById("player2AvgDrawingTime").innerHTML = "Avg. drawing time: " + this.analyzer.player2AvgDrawingTime.toFixed(1) + "s";
		  document.getElementById("player2TotalDrawingTime").innerHTML = "Total drawing time: " + this.analyzer.player2TotalDrawingTime.toFixed(1) + "s";
		  document.getElementById("player2AvgThinkingTime").innerHTML = "Avg. thinking time: " + this.analyzer.player2AvgThinkingTime.toFixed(1) + "s";
		  document.getElementById("player2TotalThinkingTime").innerHTML = "Total thinking time: " + this.analyzer.player2TotalThinkingTime.toFixed(1) + "s";
		  document.getElementById("player2NumFluidLines").innerHTML = "# of fluid lines: " + this.analyzer.player2FluidLines;

//Collaboration Statistics 
		  document.getElementById("totalLines").innerHTML = "The total number of lines is: " + (this.analyzer.player1.lines.length + this.analyzer.player2.lines.length);
		  document.getElementById("totalTime").innerHTML = "The total time elapsed: " + (this.analyzer.totalSessionTime);
		  document.getElementById("totalSimilarLines").innerHTML = "The total number of similar lines is: " + this.analyzer.similarInteractions;
		  document.getElementById("totalNearLines").innerHTML = "The total number of near lines is: " + (this.analyzer.player1.nearLines + this.analyzer.player2.nearLines);
		  document.getElementById("interactionCoupling").innerHTML = "# of interaction couplings: " + this.analyzer.interactionStorage.length;
		  document.getElementById("numStructuralCoupling").innerHTML = "Tightly coupled interactions: " + this.analyzer.structuralCouplingCount;
		  document.getElementById("percentCoupled").innerHTML = "Percent of turns coupled: " + this.analyzer.percentCoupled.toFixed(1) +"%";
		  document.getElementById("avgTurnPerCoupling").innerHTML = "Average turns per coupling: " + this.analyzer.calculateAverageCoupledInteraction().toFixed(1);
		  document.getElementById("longestCoupling").innerHTML = "Longest interaction coupling in turns: " + this.analyzer.calculateLongestInteraction();
		  document.getElementById("avgSimilarPerCoupling").innerHTML = "The average number of similar lines per coupling is: " + this.analyzer.calculateAverageSimilarLineCoupling().toFixed(1);
		  document.getElementById("numberPatterns").innerHTML = "# of patterns: " + this.analyzer.patternStorage.length;
		  document.getElementById("avgTurnPerPattern").innerHTML = "Average turns per pattern: " + this.analyzer.calculateAveragePatternTurns().toFixed(1);
		  document.getElementById("dominantPlayer").innerHTML = "Dominant Player: " + this.analyzer.dominantPlayer.name; 
		  document.getElementById("dominantPercent").innerHTML = "Percent of lines by dominant player: " + this.analyzer.dominantPercent.toFixed(1) + "%"; 

//Interactions 
		  document.getElementById("interactionText").innerHTML = this.analyzer.getInteractionCouplingData();

//Interaction Dynamics 
		  document.getElementById("collaborationType").innerHTML = "Collaboration Type: " + this.analyzer.collaborationType;

		  document.getElementById("player1Name2").innerHTML = "Player: " + this.analyzer.player1.name;
		  document.getElementById("player1CollaboratorType").innerHTML = "Collaborator Type: " + this.analyzer.player1CollaboratorType;
		  document.getElementById("player1Offers").innerHTML = "New Ideas Generated: " + this.analyzer.player1Offers;
		  document.getElementById("player1OffersAccepted").innerHTML = "New Ideas Accepted: " + this.analyzer.player1InitiateCouplingCount;
		  document.getElementById("player1OffersRejected").innerHTML = "New Ideas Rejected: " + (this.analyzer.player2Offers - this.analyzer.player1InitiateCouplingCount);
		  document.getElementById("player1CoupledTurnBasedOnOffer").innerHTML = "Turns Dedicated to Your Ideas: " + this.analyzer.player1CoupledStartedCount;
		  document.getElementById("player1AvgCoupleFounded").innerHTML = "Turns Per Idea: " + this.analyzer.player1CoupleFoundedAvgDepth.toFixed(1);
		  document.getElementById("player1NewIdeasAddedTo").innerHTML = "Lines Adding to New Ideas: " + this.analyzer.player1LinesAddedToNewIdeas;


		  document.getElementById("player2Name2").innerHTML = "Player: " + this.analyzer.player2.name;
		  document.getElementById("player2CollaboratorType").innerHTML = "Collaborator Type: " + this.analyzer.player2CollaboratorType;
		  document.getElementById("player2Offers").innerHTML = "New Ideas Generated: " + this.analyzer.player2Offers;
		  document.getElementById("player2OffersAccepted").innerHTML = "New Ideas Accepted: " + this.analyzer.player2InitiateCouplingCount;
		  document.getElementById("player2OffersRejected").innerHTML = "New Ideas Rejected: " + (this.analyzer.player1Offers - this.analyzer.player2InitiateCouplingCount);
		  document.getElementById("player2CoupledTurnBasedOnOffer").innerHTML = "Turns Dedicated to Your Ideas: " + this.analyzer.player2CoupledStartedCount;
		  document.getElementById("player2AvgCoupleFounded").innerHTML = "Turns Per Idea: " + this.analyzer.player2CoupleFoundedAvgDepth.toFixed(1);
		  document.getElementById("player2NewIdeasAddedTo").innerHTML = "Lines Adding to New Ideas: " + this.analyzer.player2LinesAddedToNewIdeas;


		  if(analyzer.drawingType == "multiLine"){
		  	document.getElementById("player1CoupledLinesBasedOnOffer").innerHTML = "Lines Dedicated to Your Ideas: " + this.analyzer.player1NumCoupledLines;
		  	document.getElementById("player1AvgLinesPerCoupledTurn").innerHTML = "Lines Per Idea: " + this.analyzer.player1LinesPerIdea.toFixed(1);
		  	document.getElementById("player2CoupledLinesBasedOnOffer").innerHTML = "Lines Dedicated to Your Ideas: " + this.analyzer.player2NumCoupledLines;
		  	document.getElementById("player2AvgLinesPerCoupledTurn").innerHTML = "Lines Per Idea: " + this.analyzer.player2LinesPerIdea.toFixed(1);
		  }


	}
}