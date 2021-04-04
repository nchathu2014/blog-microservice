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
        {id:commentId,content,status:'pending'}
    );
    commentsByPostId[postId]=comments;

    //Call to Event-Bus service
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id: commentId,
            content,
            postId,
            status:'pending'
        }
    })

    res.status(201).send(comments);
});

//Listening to the incoming events from Event-Bus
app.post('/events',async (req,res)=>{
    const {type,data} = req.body;
  
    if(type==='CommentModerated'){
        console.log(data)
      
       const {id, postId,status,content} = data;
       const comments = commentsByPostId[postId]

       const comment = comments.find(item=>item.id === id)
       comment.status = status;

       await axios.post('http://localhost:4005/events',{
            type:"CommentUpdated",
            data:{
                id, postId, status,content
            }
       })

       console.log('comment',comment)
    }
    res.send({});
});
 


app.listen(4001,()=>{
    console.log("Comment Servive Running on Port 4001")
})


