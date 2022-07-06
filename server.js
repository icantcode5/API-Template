const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient 
require('dotenv').config()
//const PORT = 8000

let db
let dbConnectionString = process.env.DB_STRING
let dbName = 'Star-Wars-Quotes'
let collection

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
.then(client => {
    console.log('Connected To DB')
    db = client.db(dbName)
    collection = db.collection('quotes')
})

app.set('view engine','ejs')
app.use(express.static('Public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', async (request,response) => {
    try{
        response.render('index.ejs')
    }
    catch(error){
        response.status(500).send({message : error.message})
    }
})



app.listen(process.env.PORT || PORT, () => {
    console.log('Server is up and running ')
})