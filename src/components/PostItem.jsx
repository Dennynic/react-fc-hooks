import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from './UI/button/MyButton';

export default function PostItem(props) {
  const { post, removePost } = props;
  const deletePost = () => {
    removePost(post.id);
  };
  const router = useHistory();
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id}. {post.title}{' '}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router.push(`/posts/${post.id}`)}>
          Open
        </MyButton>
        <MyButton onClick={deletePost}>Delete</MyButton>
      </div>
    </div>
  );
}
