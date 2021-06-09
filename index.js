const mongoose = require('mongoose')
var express = require('express')
const router = require('./src/routes/user')
const cors = require('cors') 
var app = express()
app.use(cors())
app.use(express.json())
const db = "mongodb://localhost:27017/waiver"
mongoose.connect(
    db,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>console.log('db is connected')).catch((err)=>console.log(err))
    
    app.use('/api', router)
    

const port = 3001
app.listen(port,()=>console.log(`server is running on ${port}`))