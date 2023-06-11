import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export const NewThread = () => {
  const[post,setpost] = useState("");
  const {threadId} = useParams();
  const navigate = useNavigate ();

  const click = async(e) =>{
     try {
      const response = await axios.post(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/{${threadId}}/post?offset=1`, { post });
      const newThreadId = response.data.id;
      navigate(`/thread/${newThreadId}`);
    } catch (error) {
      console.error('スレッド作成エラー:', error);
    }

  }

  return (
    <div className='addbord'>
   <p>スレッド追加</p>
    <input 
    type='post'
    value={post}
    onChange={(e) =>setpost(e.target.value)}
    name='newthreadtitle'
    ></input>
   <Link to="/thread/" title={post}>
    <button onClick={click}>作成</button>
    </Link>
   
   </div>
  );
}

export default NewThread;
