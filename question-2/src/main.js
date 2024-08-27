const path = require('path');
const { createChart } = require('./services/chartServices');

const csvFilePath = path.resolve(__dirname, '../assets/jumlah-penduduk-indonesia-2024-per-provinsi.csv');
const outputImagePath = path.resolve(__dirname, 'indonesia-population-chart.png');

createChart(csvFilePath, outputImagePath)
    .then(() => {
        console.log('Chart has been generated and saved as indonesia-population-chart.png');
    })
    .catch((error) => {
        console.error('Error generating chart:', error);
    });
