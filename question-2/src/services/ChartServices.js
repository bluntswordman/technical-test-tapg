const {ChartJSNodeCanvas} = require('chartjs-node-canvas');
const {parseCSV} = require('../parser/ParseCsv');
const fs = require('fs');

const width = 1000;
const height = 800;

async function createChart(csvFilePath, outputImagePath) {
    const data = await parseCSV(csvFilePath);

    const chartJSNodeCanvas = new ChartJSNodeCanvas({width, height});

    const configuration = {
        type: 'bar',
        data: {
            labels: data.map(d => d.label),
            datasets: [{
                label: 'Jumlah Populasi per Provinsi (Satuan Ribu)',
                data: data.map(d => d.value),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                },
            },
            layout: {
                padding: 20
            }
        },
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    fs.writeFileSync(outputImagePath, image);
}

module.exports = {createChart};
