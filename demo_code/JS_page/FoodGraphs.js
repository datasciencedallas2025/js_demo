document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("chart-filter");
    const dataPath = "prices_and_methods.json";
    let methods = [];

    fetch(dataPath)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            methods = data;
            dropdown.innerHTML = "";

            methods.forEach(item => {
                const option = document.createElement("option");
                option.value = item.Method;
                option.textContent = item.Method;
                dropdown.appendChild(option);
            });

            updateCharts(methods[0]);

            dropdown.addEventListener("change", function () {
                const selectedMethod = this.value;
                const methodObj = methods.find(m => m.Method === selectedMethod);
                if (methodObj) {
                    updateCharts(methodObj);
                }
            });
        })
        .catch(err => {
            console.error("Error fetching JSON:", err);
            dropdown.innerHTML = "<option disabled>Error loading data</option>";
        });

    function updateCharts(methodObj) {
        renderGauge(methodObj);
        renderBullet(methodObj);
    }

    function renderGauge(methodObj) {
        const gaugeData = [
            {
                type: "indicator",
                mode: "number+gauge",
                value: methodObj.avg_price,
                title: {
                    text: `Average Price (${methodObj.Method})`,
                    font: { size: 24 }
                },
                gauge: {
                    shape: "bullet",
                    axis: { range: [0, 6] },
                    bar: { color: "orange" },
                    steps: [
                        { range: [0, 2], color: "#d3f2e1" },
                        { range: [2, 4], color: "#9be7c4" },
                        { range: [4, 6], color: "#52b788" }
                    ],
                    threshold: {
                        line: { color: "red", width: 2 },
                        thickness: 0.75,
                        value: methodObj.avg_price
                    }
                },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        const gaugeLayout = {
            margin: { t: 60, r: 30, l: 60, b: 40 },
            title: { xanchor: 'center', x: 0.5 }
        };

        Plotly.react("gauge", gaugeData, gaugeLayout);
    }

    function renderBullet(methodObj) {
        const bulletData = [
            {
                type: "indicator",
                mode: "number+gauge+delta",
                value: methodObj.avg_price,
                delta: { reference: 3.5 },
                title: {
                    text: `${methodObj.Method} vs. Stewed`,
                    font: { size: 18 }
                },
                gauge: {
                    shape: "bullet",
                    axis: { range: [0, 6] },
                    bar: { color: "steelblue" },
                    threshold: {
                        line: { color: "red", width: 2 },
                        thickness: 0.75,
                        value: methodObj.avg_price
                    }
                },
                domain: { x: [0, 1], y: [0, 1] }
            }
        ];

        const layout = {
            width: 600,
            height: 250,
            margin: { t: 60, r: 30, l: 80, b: 40 },
            title: { xanchor: 'center', x: 0.5 }
        };

        Plotly.react("myDiv", bulletData, layout);
    }
});
