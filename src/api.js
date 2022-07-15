const express = require('express')
const serverless = require('serverless-http')

const app = express()

const router = express.Router()

router.get('/', (req, res) => {
    res.json([
        { id: '1', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
        { id: '2', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
        { id: '3', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
        { id: '4', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
        { id: '5', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' },
        { id: '6', name: 'Ландыш', img: plantImg, description: 'Вид травянистых цветковых растений, распространённый в регионах с умеренным климатом Северного полушария.' }
      ])
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)