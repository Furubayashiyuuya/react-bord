import logo from './logo.svg';
import * as React from 'react'

import react, { useState } from 'react';
import './App.css';

export const App =() =>{
  const [threads, setThreads] = useState([]);
  
    
  React.useEffect (() => {
  fetch('https://virtserver.swaggerhub.com/INFO_3/BulletinBoardApplication/1.0.0/threads?offset=1')
  .then((res) => res.json())
  .then((apiData) => setThreads(apiData))
},[]); 


  const handleClick = () => {
 fetch('https://virtserver.swaggerhub.com/INFO_3/BulletinBoardApplication/1.0.0/threads?offset=1')
 .then((res) => res.json())
 .then((apiData) => setThreads(apiData))
  };

  return (
    <div>
    <header>
      <h2>掲示板</h2>
      <button type="button" onClick={handleClick}>
        作成
      </button>
    
    </header>
    {threads.length > 0 && (
      <ul class = 'list'>
   {threads.map((thread) => (
            <li key={thread.id}><h2>{thread.title}</h2></li>
          ))}
        </ul>
    )
    }
  </div>
  );
}


export default App;
