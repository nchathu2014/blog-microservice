const express = require("express");
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
  

const app = express();
app.use(bodyParser.json());
app.use(cors())
let posts = {};

app.get('/health',(req,res)=>{
    res.send({
        "version": "1.0.0",
        "name": "posts service",
        "status": "running"
    });
})

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/posts',async (req,res)=>{
    const {title} = req.body;
    const id = randomBytes(4).toString('hex');
    posts[id]={
        id,
        title
    }

    // Call to Event-Bus service
    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    })

    res.status(201).send(posts[id]);
})

//Listening to the incoming events from Event-Bus
app.post('/events',(req,res)=>{
    console.log('Event Received: ',req.body.type);
    res.send({});
});

app.listen(4000,()=>{
    console.log("Post Servive Running on Port 4000")
})



