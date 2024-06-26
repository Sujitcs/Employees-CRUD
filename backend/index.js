const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import dotenv from "dotenv";
dotenv.config();

const CrudModel = require('./model/Crud.js');
// const db='mongodb+srv://sujitcs:sujitcs@cluster0.qxw3vj3.mongodb.net/empcrud'
const PORT = process.env.PORT || 8080;

mongoose.connect(DBHOST)
    .then(() => {
        console.log('MongoDB Connnected...')
    }).catch((err) => {
        console.log('Error while Mongo Conn..', err);
    })

const PORT =process.env.PORT || 8000;

const app = express();
app.use(cors({
    origin: {"https://employees-backendapi.vercel.app"},
    methods: {"POST", "GET", "DELETE", "PUT"},
    credentials: true
  }));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));


app.get('/',(req, res)=>{
    res.send("<h1>Welcome to Web Server</h1>");
});

//adding the data using POST api

app.post('/add',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;

    CrudModel.create({
        name:name,
        email:email,
        address:address,
        phone:phone
    })
    .then(result =>res.status(200).json(result))
    .catch(err => res.json(err))
});

//get api to show all the data 
app.get('/list',(req,res)=>{
        CrudModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

// put api to edit the data 
app.put('/edit/:id/',(req,res)=>{
    CrudModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
             .then(result => res.json(result))
             .catch(err => res.json(err))
})

//Delete api to delete a data by its id

app.delete('/del/:id',(req,res)=>{
    const {id} = req.params;
    CrudModel.findByIdAndDelete({_id:id})
             .then(result => res.json(result))
             .catch(err => res.json(err))
})

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
});
