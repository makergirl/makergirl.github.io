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

/**
* Overlapping Bars
*/
// How much do you like science?
new Chartist.Bar('.overlapping-bars-1', {
  labels: ['0', '1', '2', '3', '4', '5'],
  series: [
    [0, 1, 0, 4, 11, 25],
    [0, 0, 2, 0, 6, 23]
  ]
}, {
  seriesBarDistance: 10
},
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
);

// How much do you like technology?
new Chartist.Bar('.overlapping-bars-2', {
  labels: ['0', '1', '2', '3', '4', '5'],
  series: [
    [0, 0, 0, 4, 10, 27],
    [0, 0, 2, 0, 6, 23]
  ]
}, {
  seriesBarDistance: 10
},
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
);

// How much do you like engineering?
new Chartist.Bar('.overlapping-bars-3', {
  labels: ['0', '1', '2', '3', '4', '5'],
  series: [
    [0, 0, 3, 7, 6, 25],
    [0, 0, 1, 3, 6, 21]
  ]
}, {
  seriesBarDistance: 10
},
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
);

// How much do you like math?
new Chartist.Bar('.overlapping-bars-4', {
  labels: ['0', '1', '2', '3', '4', '5'],
  series: [
    [0, 5, 3, 10, 8, 15],
    [0, 3, 2, 5, 8, 13]
  ]
}, {
  seriesBarDistance: 10
},
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
);

// How much do you like 3D printing?
new Chartist.Bar('.overlapping-bars-5', {
  labels: ['0', '1', '2', '3', '4', '5'],
  series: [
    [0, 0, 0, 1, 4, 36],
    [0, 0, 0, 0, 3, 28]
  ]
}, {
  seriesBarDistance: 10
},
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
);

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
