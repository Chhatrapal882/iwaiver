const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//app
const app = express();
//import routes
const authRoutes = require('./routes/auth');
const { db } = require('./models/User');


// db
mongoose.connect(
    process.env.DATABASE,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>console.log('db is connected')).catch((err)=>console.log(err))
  
    
//middlewares
app.use(bodyParser.json());
app.use(cors())

//routes middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
  });

