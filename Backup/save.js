class Save{
	constructor(analyzer){
		this.analyzer = analyzer;
	}

	save(){

		var saveText = "Player: " + this.analyzer.player1.name +"\n"+
		  "# of Lines: " + this.analyzer.player1.lines.length + "\n" + 
		  "Average line length: " + Math.round(this.analyzer.player1.averageLine()) + "\n"+
		  "# of near contributions: " + this.analyzer.player1.nearLines + "\n"+
		  "# of similar contributions: " + this.analyzer.player1.similarLines + "\n"+
		  "# of couplings initiated: " + this.analyzer.player1InitiateCouplingCount + "\n" +
		  "# of decouplings initiated: " + this.analyzer.player1DecoupleCount + "\n" + 
		  "# of patterns initiated: " + this.analyzer.player1InitiateCouplingCount + "\n" + 
		  "# of patterns ended: " + this.analyzer.player1DecoupleCount + "\n"+
		  "Avg. time per turn: " + this.analyzer.player1AverageTurnLength.toFixed(1) + "s" +"\n"+
		  "Avg. drawing time: " + this.analyzer.player1AvgDrawingTime.toFixed(1) + "s" + "\n" + 
		  "Total drawing time: " + this.analyzer.player1TotalDrawingTime.toFixed(1) + "s" + "\n"+
		  "Avg. thinking time: " + this.analyzer.player1AvgThinkingTime.toFixed(1) + "s" + "\n" +
		  "Total thinking time: " + this.analyzer.player1TotalThinkingTime.toFixed(1) + "s" + "\n"+
		  "# of fluid lines: " + this.analyzer.player1FluidLines + "\n\n" +



		  "Player: " + this.analyzer.player2.name + "\n" + 
		  "# of Lines: " + this.analyzer.player2.lines.length + "\n"+
		  "Average line length: " + Math.round(this.analyzer.player2.averageLine())+ "\n"+
		  "# of near contributions: " + this.analyzer.player2.nearLines + "\n" + 
		  "# of similar contributions: " + this.analyzer.player2.similarLines +"\n"+
		  "# of couplings initiated: " + this.analyzer.player2InitiateCouplingCount + "\n" +
		  "# of decouplings initiated: " + this.analyzer.player2DecoupleCount + "\n" + 
		  "# of patterns initiated: " + this.analyzer.player2InitiateCouplingCount + "\n" +
		  "# of patterns ended: " + this.analyzer.player2DecoupleCount + "\n" +
		  "Avg. time per turn: " + this.analyzer.player2AverageTurnLength.toFixed(1) + "s" +"\n"+
		  "Avg. drawing time: " + this.analyzer.player2AvgDrawingTime.toFixed(1) + "s" + "\n" + 
		  "Total drawing time: " + this.analyzer.player2TotalDrawingTime.toFixed(1) + "s" + "\n"+
		  "Avg. thinking time: " + this.analyzer.player2AvgThinkingTime.toFixed(1) + "s" + "\n" +
		  "Total thinking time: " + this.analyzer.player2TotalThinkingTime.toFixed(1) + "s" + "\n"+
		  "# of fluid lines: " + this.analyzer.player2FluidLines + "\n\n" +

		  "Collaboration Statistics" + "\n" + 
		  "The total number of lines is: " + (this.analyzer.player1.lines.length + this.analyzer.player2.lines.length) + "\n"  + 
		  "The total time elapsed: " + (this.analyzer.totalSessionTime)+"\n"+
		  "The total number of similar lines is: " + this.analyzer.similarInteractions + "\n"+
		  "The total number of near lines is: " + (this.analyzer.player1.nearLines + this.analyzer.player2.nearLines)+"\n"+


		  "# of interaction couplings: " + this.analyzer.interactionStorage.length+"\n"+
		  "Percent of interactions coupled: " + this.analyzer.percentCoupled.toFixed(1) + "%" + "\n" +
		  "Average turns per coupling: " + this.analyzer.calculateAverageCoupledInteraction()+"\n"+
		  "Longest interaction coupling in turns: " + this.analyzer.calculateLongestInteraction()+"\n"+
		  "The average number of similar lines per coupling is: " + this.analyzer.calculateAverageSimilarLineCoupling() +"\n"+

		  "# of patterns: " + this.analyzer.patternStorage.length+"\n"+
		  "Average turns per pattern: " + this.analyzer.calculateAveragePatternTurns() +"\n"+
		  "Dominant Player: " + this.analyzer.dominantPlayer.name + "\n" +  
		  "Percent of lines by dominant player: " + this.analyzer.dominantPercent.toFixed(1) + "%" +"\n" + 
		  "Time spent in stats screen: " + this.analyzer.statTime + "s"+"\n" +
		  "Number of times stats screen active: " + this.analyzer.statCount + "\n\n"; 


		  saveText = saveText.concat(this.analyzer.getInteractionCouplingDataHTML()); 
		return saveText; 

	}
}


		  