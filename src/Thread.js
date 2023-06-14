import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import axios from 'axios';

import './App.css';
import NewThread from './NewThread';
import ThreadTalk from './ThreadTalk';
export const Thread = () => {
  const [threads, setThreads] = useState([]);
  const {threadId} = useParams();

  useEffect(() => {
const getthread = async() =>{
  try{
    const res = await axios.get('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=1');
    setThreads(res.data);
    threadId(res.id);
  }catch(err){
    console.log(err);
  }
   }
   getthread();
  },[]);

  return (
    <div>
      <header>
       <h1>ThreadBord</h1> 
       <BrowserRouter>
      <div className='addthear'> <Link to="/thread/new">新規スレッド作成</Link>
      <Routes>
        <Route path='/thread/new' element={<NewThread />}></Route>
      </Routes>
      </div>
      </BrowserRouter>
      </header>
      <h2>新着スレッド</h2>
      
      <BrowserRouter>
      {threads.length > 0 && (
        <ul className="list">
          {threads.map((thread) => (
            <li key={thread.id}>
            <Link to = {`/thread/${thread.id}`}>
              <div className='thread'>{thread.title}</div>
            </Link>
            <Routes>
              <Route path = {`/thread/${thread.id}`} element = {<ThreadTalk id={thread.id}/>}></Route>
              
            </Routes>
            </li>
          ))}
        </ul>
      )}
</BrowserRouter>
   </div>
  );
}

export default Thread;
