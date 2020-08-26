class Dashboard{
	constructor(){
		this.newIdeasChart; 
		this.ideasAcceptedChart; 
		this.ideasRejectedChart; 
		this.elaborationCountChart; 
		this.depthIdeasChart; 
		this.influenceIdeasChart; 
	}
	

scaleCharts(){

  var chart1 = document.getElementById('newIdeasChart')
  chart1.style.width = '100%';
  chart1.style.height = '100%'; 
  chart1.width = chart1.offsetWidth;
  chart1.height = chart1.offsetHeight;

  var chart2 = document.getElementById('ideasAcceptedChart')
  chart2.style.width = '100%';
  chart2.style.height = '100%'; 
  chart2.width = chart2.offsetWidth;
  chart2.height = chart2.offsetHeight;

  var chart3 = document.getElementById('ideasRejectedChart')
  chart3.style.width = '100%';
  chart3.style.height = '100%'; 
  chart3.width = chart3.offsetWidth;
  chart3.height = chart3.offsetHeight;

  var chart4 = document.getElementById('elaborationCountChart')
  chart4.style.width = '100%';
  chart4.style.height = '100%'; 
  chart4.width = chart4.offsetWidth;
  chart4.height = chart4.offsetHeight;

  var chart5 = document.getElementById('depthIdeasChart')
  chart5.style.width = '100%';
  chart5.style.height = '100%'; 
  chart5.width = chart5.offsetWidth;
  chart5.height = chart5.offsetHeight;

  var chart6 = document.getElementById('influenceIdeasChart')
  chart6.style.width = '100%';
  chart6.style.height = '100%'; 
  chart6.width = chart6.offsetWidth;
  chart6.height = chart6.offsetHeight;
}

destroyCharts(){
	this.newIdeasChart.destroy(); 
	this.ideasAcceptedChart.destroy(); 
	this.ideasRejectedChart.destroy(); 
	this.elaborationCountChart.destroy(); 
	this.depthIdeasChart.destroy(); 
	this.influenceIdeasChart.destroy(); 

}
updateCharts(){
console.log("Updating charts"); 
this.scaleCharts();

var ctx = document.getElementById('newIdeasChart').getContext('2d');
this.newIdeasChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Generated',
            data: [analyzer.player1Offers, analyzer.player2Offers],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'New Ideas Generated'
        },
        animation: {
        duration: 0
    	},
        legend:{
          display:false
        },
        tooltips:{
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            },
            footer: function(tooltipItems, data) {
     		 return ["Turns far away from", "partner's last turn"];
   			 }
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, 
                    stepSize: 1
                }
            }]
        }
    }
});


var ctx = document.getElementById('ideasAcceptedChart').getContext('2d');
this.ideasAcceptedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Accepted',
            data: [analyzer.player1InitiateCouplingCount, analyzer.player2InitiateCouplingCount],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'New Ideas Accepted'
        },
        animation: {
        duration: 0
    	},
        legend:{
          display:false
        },
        tooltips:{
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            },
            footer: function(tooltipItems, data) {
     		 return ["Turns close to ", "partner's new idea"];
   			 }
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, 
                    stepSize: 1
                }
            }]
        }
    }
});



var ctx = document.getElementById('ideasRejectedChart').getContext('2d');
this.ideasRejectedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Accepted',
            data: [analyzer.player1Rejections, analyzer.player2Rejections],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'New Ideas Rejected'
        },
        animation: {
        duration: 0
    	},
        legend:{
          display:false
        },
        tooltips:{
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            },
            footer: function(tooltipItems, data) {
     		 return ["Turns far from ", "partner's new idea"];
   			 }
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, 
                    stepSize: 1
                }
            }]
        }
    }
});

var ctx = document.getElementById('elaborationCountChart').getContext('2d');
this.elaborationCountChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Accepted',
            data: [analyzer.player1OverallCoupling, analyzer.player2OverallCoupling],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Elaboration Count'
        },
        animation: {
        duration: 0
    	},
        legend:{
          display:false
        },
        tooltips:{
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            },
            footer: function(tooltipItems, data) {
     		 return ["Lines close to ", "partner's last turn"];
   			 }
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, 
                    stepSize:1
                }
            }]
        }
    }
});


var ctx = document.getElementById('depthIdeasChart').getContext('2d');
this.depthIdeasChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Accepted',
            data: [analyzer.player1LinesPerIdea.toFixed(1), analyzer.player2LinesPerIdea.toFixed(1)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Depth of Ideas'
        },
        animation: {
        duration: 0
    	},
        legend:{
          display:false
        },
        tooltips:{
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            },
            footer: function(tooltipItems, data) {
     		 return ["Average lines per", "accepted idea"];
   			 }
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, 
                    stepSize:1
                }
            }]
        }
    }
});


var ctx = document.getElementById('influenceIdeasChart').getContext('2d');
this.influenceIdeasChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Accepted',
            data: [analyzer.player1NumCoupledLines, analyzer.player2NumCoupledLines],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Influence of Ideas'
        },
        animation: {
        duration: 0
    	},
        legend:{
          display:false
        },
        tooltips:{
          callbacks: {
            label:function(tooltipItem){
              return tooltipItem.yLabel;
            },
            footer: function(tooltipItems, data) {
     		 return ["Lines based on ", "your ideas"];
   			 }
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, 
                    stepSize:1
                }
            }]
        }
    }
});


}

}