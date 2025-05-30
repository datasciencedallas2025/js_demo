// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Charts Page Loaded");

    const chartContainer = document.getElementById("chart-container");
    const chartFilter = document.getElementById("chart-filter");
    const userMapDataPath = "prices_and_methods.json";

    // Load data and render chart
    fetch(userMapDataPath)
        .then(response => response.json())
        .then(data => {
            renderChart(data, "Method");

            // Update chart on dropdown change
            chartFilter.addEventListener("change", function() {
                const selectedValue = this.value;
                renderChart(data, selectedValue);
            });
        })
        .catch(error => console.log("Error loading data:", error));

    function renderChart(data, selectedValue){
        var data = [
        {
            type: "indicator",
            mode: "number+gauge+delta",
            gauge: { shape: "bullet" },
            delta: { reference: 5 },
            value: 3.5,
            domain: { x: [0, 1], y: [0, 1] },
            title: { text: "Profit" }
        }
        ];

        var layout = { width: 600, height: 250 };
        Plotly.newPlot('myDiv', data, layout);
    }
});