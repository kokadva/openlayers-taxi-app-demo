const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Taxi Demo APP (Node.js, Openlayers)')
})

const coordinates = [[41.720324, 44.719381], [41.720983, 44.726595], [41.721974, 44.736683], [41.723571, 44.739242], [41.724609, 44.750029], [41.726110, 44.764210]];
let index = 0;

app.get('/cars', (req, res) => {
    index = (index +  1) % coordinates.length;
    let responseBody = {
        cars: [
            {
                location: {
                    latitude: coordinates[index][0],
                    longitude: coordinates[index][1]
                },
                date:  new Date(),
                name: "Konstantine",
                imageUrl: "https://i.ibb.co/N1vgyys/profile.jpg",
                status: "DRIVING"
            }
        ]
    };

    res.set("Content-Type", "application/json");
    res.send(responseBody)
})