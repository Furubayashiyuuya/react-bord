import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Routes,Route,Link } from "react-router-dom";


import './App.css';
import App from './App';
import NewThread from './NewThread';

export const Test = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch( 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=1')
    .then(res => res.json())
    .then((apiData)=> setThreads(apiData));
  },[]);

 

  return (
    <div>
      <header>
       <h2>掲示板</h2> 
      <Link to="/thread/new">新規スレッド作成</Link>
      <Routes>
        <Route path='/thread/new' element={<NewThread />}></Route>
      </Routes>
      </header>

      {threads.length > 0 && (
        <ul className="list">
          {threads.map((thread) => (
            <li key={thread.id}>
              <h2>{thread.title}</h2>
            </li>
          ))}
        </ul>
      )}
   </div>
  );
}

export default Test;
