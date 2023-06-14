import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ThreadTalk = ({ id }) => { 
  const [posts, setPosts] = useState([]);
  const { threadId } = useParams();
  const [post, setPost] = useState("");

 //スレッド取得
  const getTalk = async () => {
    try {
      const res = await axios.get(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`); 
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  //初期読み込み
  useEffect(() => {
    getTalk();
  }, [id]);

  const addPost = async () => {
    try {
      if (!post) {
        alert("入力してください");
        return;
      }
     //追加処理 
      await axios.post(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${id}/posts`, { post }); 
      setPost("");
    //取得呼び出し 
      getTalk();
    } catch (error) {
      console.error('投稿エラー:', error);
      alert("エラーが発生しました。");
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
              <p>ID:{post.id}</p>
              <p className='text'>{post.post}</p>
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
