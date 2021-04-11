const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser =  require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

const handleEvent = (type, data) => {
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

  if(type === 'CommentUpdated'){
    const {id,content,postId,status} = data;
    const post = posts[postId];

    const comment = post.comments.find(comment=>comment.id===id);
    comment.status = status;
    comment.content = content;
  }
}

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
  handleEvent(type, data);
  res.send({});
})

app.listen(4002,async ()=>{
    console.log("Query Servive Running on Port 4002");
    const response = await axios.get('http://localhost:4005/events');
    console.log(response.data)
    for(let event of response.data){
      console.log(`Proccessing event: ${event.type}`);
      handleEvent(event.type, event.data);
    }
    
});

