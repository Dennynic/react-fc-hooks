import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';

export default function PostList({ posts, title, removePost }) {
  const hasPosts = !!posts.length;

  if (!hasPosts) {
    return <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => {
          return (
            <CSSTransition key={post.id} timeout={500} classNames="post">
              <PostItem removePost={removePost} post={post} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
