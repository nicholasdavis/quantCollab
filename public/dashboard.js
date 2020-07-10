class Dashboard{
	



updateCharts(){

var ctx = document.getElementById('newIdeasChart').getContext('2d');
var newIdeasGeneratedChart = new Chart(ctx, {
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
var newIdeasGeneratedChart = new Chart(ctx, {
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
var newIdeasGeneratedChart = new Chart(ctx, {
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
var newIdeasGeneratedChart = new Chart(ctx, {
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
var newIdeasGeneratedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [player1.name, player2.name],
        datasets: [{
            label: 'New Ideas Accepted',
            data: [analyzer.player1CoupleFoundedAvgDepth.toFixed(1), analyzer.player2CoupleFoundedAvgDepth.toFixed(1)],
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
     		 return ["Average turns per", "idea generated"];
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
var newIdeasGeneratedChart = new Chart(ctx, {
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