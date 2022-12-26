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

const coordinates = [41.717398, 44.719741];
let index = 0;

app.get('/cars', (req, res) => {
    let responseBody = {
        cars: [
            {
                location: {
                    latitude: coordinates[0] + index * 0.001,
                    longitude: coordinates[1] + index * 0.001
                },
                name: "Konstantine",
                imageUrl: "https://i.ibb.co/N1vgyys/profile.jpg",
                status: "DRIVING"
            }
        ]
    };
    index += 1;
    res.set("Content-Type", "application/json");
    res.send(responseBody)
})