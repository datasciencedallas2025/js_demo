var data = [
  {
    type: "indicator",
    value: 200,
    delta: { reference: 160 },
    gauge: { axis: { visible: false, range: [0, 250] } },
    domain: { row: 0, column: 0 }
  },
  {
    type: "indicator",
    value: 120,
    gauge: {
      shape: "bullet",
      axis: {
        visible: false,
        range: [-200, 200]
      }
    },
    domain: { x: [0.1, 0.5], y: [0.15, 0.35] }
  },
  {
    type: "indicator",
    mode: "number+delta",
    value: 300,
    domain: { row: 0, column: 1 }
  },
  { type: "indicator", mode: "delta", value: 40, domain: { row: 1, column: 1 } }
];

var layout = {
  width: 600,
  height: 400,
  margin: { t: 25, b: 25, l: 25, r: 25 },
  grid: { rows: 2, columns: 2, pattern: "independent" },
  template: {
    data: {
      indicator: [
        {
          title: { text: "Speed" },
          mode: "number+delta+gauge",
          delta: { reference: 90 }
        }
      ]
    }
  }
};

Plotly.newPlot('plotDiv', data, layout);