const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
require('dotenv').config();

//app
const app = express();

// db
mongoose.connect(
    process.env.DATABASE,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>console.log('db is connected')).catch((err)=>console.log(err))
  
    
//middlewares
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//import routes
app.use(cookieParser())
const authRoutes = require('./routes/auth');
const Waivers = require('./routes/waiver')
// const { db } = require('./models/User');

//routes middleware
app.use('/api', authRoutes);
app.use('/api/waiver', Waivers);
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
  });

