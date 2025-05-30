fetch('cleaned_data.json')
.then(response => response.json())
.then(jsonData => {
    const dates = jsonData.map(d => d.date);
    const values = jsonData.map(d => d.close);

    const trace = {
    x: dates,
    y: values,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Time Series'
    };

    const layout = {
    title: 'Time Series Chart',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Value' }
    };

    Plotly.newPlot('myDiv', [trace], layout);
})
.catch(err => console.error("Error loading JSON:", err));

