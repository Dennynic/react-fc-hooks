import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

export default function Navbar() {
  const { setIsAuth } = useContext(AuthContext);
  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };
  return (
    <div className="navbar">
      <MyButton onClick={logOut}>Выйти</MyButton>
      <div className="navbar__links">
        <Link to="/posts">Посты</Link>
        <Link to="/about">О сайте</Link>
      </div>
    </div>
  );
}
