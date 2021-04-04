const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/health',(req,res)=>{
    res.send(
        {
            version:"1.0.0",
            name:'comment service',
            status:'running'
        }
    );
});

app.get('/posts/:id/comments',(req,res)=>{
   const comments = commentsByPostId[req.params.id] || [];
   res.status(200).send(comments);
});


app.post('/posts/:id/comments',async (req,res)=>{
    const {content} = req.body;
    const postId = req.params.id;
    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[postId] || [];
    comments.push(
        {id:commentId,content}
    );
    commentsByPostId[postId]=comments;

    //Call to Event-Bus service
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id: commentId,
            content,
            postId
        }
    })

    res.status(201).send(comments);
});

//Listening to the incoming events from Event-Bus
app.post('/events',(req,res)=>{
    console.log('Event Received: ',req.body.type);
    res.send({});
});
 


app.listen(4001,()=>{
    console.log("Comment Servive Running on Port 4001")
})


