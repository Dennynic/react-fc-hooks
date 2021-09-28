import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async id => {
    const response = await PostService.getOne(id);
    setPost(response.data);
  });

  const [fetchComments, isCommentLoading, commError] = useFetching(async id => {
    const response = await PostService.getComments(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div className="post__wrapper">
      <h1>Страница отдельного поста ID = {post.id}</h1>
      <div className="post__title">{post.title}</div>
      <div className="post__body">{post.body}</div>
      {isLoading && <Loader />}
      <hr />
      <div className="post__comment__wrapper">
        <h2>коментарии</h2>
        {isCommentLoading && <Loader />}
        <div className="post__comment__body">
          {comments.map(comment => {
            return (
              <div className="post__comment__item" key={comment.id}>
                <a href={comment.email}>{comment.email}</a>
                <div className="comment__item__body">
                  <h4>{comment.name}</h4>
                  <p>{comment.body}</p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
