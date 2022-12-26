const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Taxi Demo APP (Node.js, Openlayers)')
})

const coordinates = [
    [78.65, -32.65], [-98.65, 12.65]
];
let index = 0;

app.get('/cars', (req, res) => {
    let responseBody = {
        latitude: coordinates[index][0],
        longitude: coordinates[index][1]
    };
    index = (index + 1) % coordinates.length;
    res.set("Content-Type", "application/json");
    res.send(responseBody)
})