import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import { BrowserRouter,Routes,Route,Link } from "react-router-dom";

import './App.css';
import NewThread from './NewThread';

export const Thread = () => {
  const [threads, setThreads] = useState([]);
  const {threadId} = useParams();

  useEffect(() => {
    
   fetch( 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=0')
    .then(res => res.json())
    .then((apiData)=> setThreads(apiData)); 
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
