import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import axios from 'axios';

import './App.css';
import NewThread from './NewThread';

export const Thread = () => {
  const [threads, setThreads] = useState([]);
  const {threadId} = useParams();

  useEffect(() => {
const getthread = async() =>{
  try{
    const res = await axios.get('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=1');
    setThreads(res.data);
  }catch(err){
    console.log(err);
  }
   }
   getthread();
  },[]);

  return (
    <div>
      <header>
       <h1>掲示板</h1> 
       <BrowserRouter>
      <div className='addthear'> <Link to="/thread/new">新規スレッド作成</Link></div>
      <Routes>
        <Route path='/thread/new' element={<NewThread />}></Route>
      </Routes>
      </BrowserRouter>
      </header>
      <h2>新着スレッド</h2>
      {threads.length > 0 && (
        <ul className="list">
          {threads.map((thread) => (
            <li key={thread.id}>
              <div className='thread'>{thread.title}</div>
            </li>
          ))}
        </ul>
      )}
   </div>
  );
}

export default Thread;
