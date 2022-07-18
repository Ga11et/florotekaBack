const serverless = require('serverless-http')
const express = require('express')

const app = express()
const router = express.Router()


router.get('/plants', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/images', { headers: { Authorization: process.env.VUE_APP_API_KEY } })
    const data = await response.json()
    const readyData = data.records
    const readyResponse = readyData.map(el => {
        const formattedData = {
            id: el.fields.id,
            description: el.fields.description,
            name: el.fields.Name,
            img: el.fields.image[0].url
        }
        return formattedData
    })
    res.json(readyResponse)
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)