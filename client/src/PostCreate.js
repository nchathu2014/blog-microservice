import React,{useState} from 'react';
import axios from 'axios';

export default () => {

    const [title,setTitle] = useState('');

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          setTitle('');
    };

    return(
        <form onSubmit={handleOnSubmit}>
        <label>Post: </label>
        <input 
        type='text'  
        placeholder='Add your post title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        /><br/>
        <button>Submit</button>
    </form>
    )
}