const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

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
        await axios.post('http://localhost:4005/events',{
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