/**
 * Analytics
 * This file contains Javascript code for analytics.html
 * This is not the file for Google Analytics
 */

// Pie Chart
var pieChartData = {
 series: [5, 3, 4]
};

var sum = function(a, b) { return a + b };

new Chartist.Pie('.pie-chart', pieChartData, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / pieChartData.series.reduce(sum) * 100) + '%';
  }
});

// Line Graph
new Chartist.Line('.line-graph', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [1, 2, 3, 1, -2, 0, 1, 0],
      [-2, -1, -2, -1, -3, -1, -2, -1],
      [0, 0, 0, 1, 2, 3, 2, 1],
      [3, 2, 1, 0.5, 1, 0, -1, -3]
    ]
  }, {
    high: 3,
    low: -3,
    fullWidth: true,
    // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
    axisY: {
    onlyInteger: true,
    offset: 20
  }
});

// Distribution Graph
new Chartist.Bar('.distribution-graph', {
  labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  series: [20, 60, 120, 200, 180, 20, 10]
}, {
  distributeSeries: true
});

// Bipolar Graph
new Chartist.Line('.bipolar-graph', {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [
    [1, 2, 3, 1, -2, 0, 1, 0],
    [-2, -1, -2, -1, -2.5, -1, -2, -1],
    [0, 0, 0, 1, 2, 2.5, 2, 1],
    [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
  ]
}, {
  high: 3,
  low: -3,
  showArea: true,
  showLine: false,
  showPoint: false,
  fullWidth: true,
  axisX: {
    showLabel: false,
    showGrid: false
  }
});
