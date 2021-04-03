const express = require("express");
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors')
  

const app = express();
app.use(bodyParser.json());
app.use(cors())
let posts = {};

app.get('/health',(req,res)=>{
    res.send({
        version:"1.0.0",
        status:'running'
    });
})

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/posts',(req,res)=>{
    const {title} = req.body;
    const id = randomBytes(4).toString('hex');
    posts[id]={
        id,
        title
    }
    res.status(201).send(posts[id]);
})

app.listen(4000,()=>{
    console.log("Post Servive Running on Port 4000")
})



