import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default ({postId}) => {

    const [comments,setComments] = useState([]);

    useEffect(()=>{
        fetchComments();
    },[]);



    const fetchComments= async ()=>{
        const respone = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        console.log('XXXXXXXXXX',respone);
        setComments(respone.data)

    }

  

    const renderComments = comments.map((comment)=>{
      return(
         <li key={comment.id}>{comment.content}</li>
      );
    })

    return(
        <div>
            {renderComments}
        </div>
    );


}