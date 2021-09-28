import About from '../pages/About';
import Post from '../pages/Post';
import Login from '../pages/Login';
import PostPage from '../pages/PostPage';

export const privateRoutes = [
  { path: '/about', component: About, exact: false },
  { path: '/posts', component: Post, exact: true },
  { path: '/posts/:id', component: PostPage, exact: true },
];

export const publicRoutes = [
  { path: '/login', component: Login, exact: false },
];
