import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import PostCreate from './PostCreate';
import PostList from './PostList';

export default ()=>{


   

    return(
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
       <PostCreate/>
       <hr/>
       <PostList/>
      </Container>
    </React.Fragment>
    )
}