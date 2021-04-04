const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser =  require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

app.get('/health',(req,res)=>{
    res.send(
        {
            version:"1.0.0",
            name:'query service',
            status:'running'
        }
    );
});

app.get('/posts',(req,res)=>{
   res.send(posts).status(200);
})

app.post('/events',(req,res)=>{
  const {type,data} = req.body;
  if(type==='PostCreated'){
    const {id,title} = data;
    posts[id]={
        id, title,comments:[]
    }
  }

  if(type==='CommentCreated'){
    const {id,content,postId,status} = data;
    const post = posts[postId];
    post.comments.push({
        id,content,status
    });
  }

  res.send({});

})



app.listen(4002,()=>{
    console.log("Query Servive Running on Port 4002")
});

