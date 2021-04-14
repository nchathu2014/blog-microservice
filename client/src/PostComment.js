import React,{useState} from 'react';
import axios from 'axios';

export default ({postId}) => {

    const [content,setContent] = useState('');

    const handleOnSubmit = async (event) =>{
       event.preventDefault();
       await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content
      })
      .then(function (response) {
        console.log(response);
        setContent(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

      setContent('');
    }

    return(
        <div>
            <form onSubmit={handleOnSubmit}>
            <label>Comment</label>
            <input 
            type='text'
            value={content}
            onChange={e=>setContent(e.target.value)}
            />
            <button>Submit</button>
            </form>
        </div>
    )
}
