const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express();
app.use(bodyParser.json());
app.use(cors());

const URL_POST_SERVICE=`http://posts-clutser-srv:4000/events`;

const events = [];

app.get('/health',(req,res)=>{
    res.send(
        {
            version:"1.0.0",
            name:'event-bus service',
            status:'running'
        }
    );
});

app.get('/events',(req,res)=>{
    res.send(events);
});

app.post('/events',(req,res)=>{
    const event = req.body;

    //Store events into the events array
    events.push(event);

    axios.post(URL_POST_SERVICE,event).catch(err=>console.log(err.message));
    axios.post('http://localhost:4001/events',event).catch(err=>console.log(err.message));;
    axios.post('http://localhost:4002/events',event).catch(err=>console.log(err.message));;
    axios.post('http://localhost:4003/events',event).catch(err=>console.log(err.message));;

    res.send({status:'OK'});
});


app.listen(4005,()=>{
    console.log('v0.0.6');
    console.log('Event Bus start in 4005');
})


