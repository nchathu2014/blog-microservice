import React,{useState,useEffect} from 'react';
import axios from 'axios';
import PostComment from './PostComment';
import CommentList from './CommentList';


export default () => {

const [posts,setPosts] = useState({});

useEffect(()=>{
    fetchPosts()
},[]);

const fetchPosts = async () => {
    await axios.get('http://posts.com/posts')
    .then(function (response) {
      // handle success
      console.log(response);
      setPosts(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}    

const renderedPosts = Object.values(posts).map(post=>{
    return (
        <div key={post.id} style={{border:'1px solid black',margin:5}}>
            <h3>{post.title}</h3>
            <CommentList comments={post.comments}/>
            <PostComment postId={post.id}/>
        </div>
    )
});


    return(
        <div>
            {renderedPosts}
        </div>
    )
}