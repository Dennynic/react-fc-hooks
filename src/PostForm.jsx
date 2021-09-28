import React, { useState } from 'react';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

export default function PostForm({ createPost }) {
  const defaultPost = { title: '', body: '' };
  const [post, setPost] = useState(defaultPost);

  const addNewPost = e => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    createPost(newPost);
    setPost(defaultPost);
  };

  return (
    <form>
      <MyInput
        onChange={e => setPost({ ...post, title: e.target.value })}
        value={post.title}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        onChange={e => setPost({ ...post, body: e.target.value })}
        value={post.body}
        type="text"
        placeholder="Описание поста"
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
}
