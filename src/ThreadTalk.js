import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ThreadTalk = ({ id }) => { 
  const [posts, setPosts] = useState([]);
  const { threadId } = useParams();
  const [post, setPost] = useState("");

  const getThread = async () => {
    try {
      const res = await axios.get(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`); 
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getThread();
  }, [id]);

  const addPost = async () => {
    try {
      await axios.post(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`, { post }); 
      setPost("");
      getThread();
    } catch (error) {
      console.error('投稿エラー:', error);
    }
  };

  return (
    <>
    <div className='talkarea'>
      <h3>スレッド内容</h3>
      {posts.length > 0 && (
        <ul className="talklist">
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.post}</p>
            </li>
          ))}
        </ul>
      )}
      <input
        type='text'
        value={post}
        onChange={(e) => setPost(e.target.value)}
        name='newthreadtitle'
      />
      <button className='addbtn' onClick={addPost}>投稿する</button>
    </div>
    </>
  );
}

export default ThreadTalk;
