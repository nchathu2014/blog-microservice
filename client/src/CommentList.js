import React from 'react';

export default ({comments}) => {

   // const [comments,setComments] = useState([]);

    //useEffect(()=>{
       // fetchComments();
   // },[]);


    //No Need
    //const fetchComments= async ()=>{
        //const respone = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        //console.log('XXXXXXXXXX',respone);
        //setComments(respone.data)

   // }

  

    const renderComments = comments.map((comment)=>{
      return(
         <li key={comment.id}>{comment.content}-{comment.status === 'pending'?'Waiting for approval':''}</li>
      );
    })

    return(
        <div>
            {renderComments}
        </div>
    );


}