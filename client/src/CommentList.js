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
        let content;
        if(comment.status === 'approved') content = comment.content;
        if(comment.status === 'rejected') content = "Comment rejected :(";
        if(comment.status === 'pending') content = "Comment is waiting for approval";

      return(
         <li key={comment.id}>{content}</li>
      );
    })

    return(
        <div>
            {renderComments}
        </div>
    );


}