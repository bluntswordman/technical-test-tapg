const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(path.resolve(filePath))
            .pipe(csv())
            .on('data', (data) => {
                results.push({
                    label: data['﻿provinsi'],
                    value: parseFloat(data['jumlah'].replace(',', ''))
                });
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = { parseCSV };
