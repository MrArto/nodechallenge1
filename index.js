const app = require('express')();
const PORT = 8080;
const fetch = require("node-fetch");

app.listen(PORT, () => console.log(`Alive on http://localhost:${PORT}`))  

async function getRequestedFlagData() {
    const location  = "Armenia";
    const url = "https://restcountries.eu/rest/v2/name/";

    const data = await fetch(url+location)
                .then(response => response.json())
                .then(data => data[0].flag);
    return data;                     
};


app.get('/', async (req, res) => {
 try {
        let results = await getRequestedFlagData();
        res.status(200).send(results);
    } catch (error) {
        res.json({message: error.message});
    }
});
