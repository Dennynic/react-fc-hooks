import React, { useState, useEffect, useRef } from 'react';
import PostService from '../API/PostService';
import PostList from '../components/PostList';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../PostForm';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/Pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [isShowModal, setIsShowModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, error] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];

      setTotalPages(getPageCount(totalCount, limit));
    },
  );

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = newPost => {
    setPosts([...posts, newPost]);
    setIsShowModal(false);
  };

  const deletePost = id => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const changePage = page => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: '30px' }}
        onClick={() => setIsShowModal(true)}
      >
        Создать пост
      </MyButton>
      <MyModal visible={isShowModal} setVisible={setIsShowModal}>
        <PostForm createPost={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элементов"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 20, name: '20' },
          { value: 30, name: '30' },
          { value: -1, name: 'All' },
        ]}
      />
      {error && <h1>Ошибка ${error}</h1>}
      <PostList
        removePost={deletePost}
        posts={sortedAndSearchPosts}
        title="Список постов"
      />
      <div ref={lastElement} style={{ height: '20px', background: '#ccc' }} />
      {isPostLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
