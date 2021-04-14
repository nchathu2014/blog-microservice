const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const EVENT_BUS_URL = `http://eventbus-cluster-srv:4005/events`;

app.get('/health',(req,res)=>{
    res.send({
        "version": "1.0.0",
        "name": "moderate service",
        "status": "running"
    });
})

app.post('/events',async (req,res)=>{
   
    const {type,data} = req.body;
    if(type==='CommentCreated'){
        const status = data.content.includes('orange')?'rejected':'approved';
        await axios.post(EVENT_BUS_URL,{
        type:'CommentModerated',
        data:{
            id:data.id,
            postId:data.postId,
            status,
            content:data.content
        }
    })

    }
    res.send({});

})

app.listen(4003,()=>{
    console.log("Moderate Servive Running on Port 4003")
});