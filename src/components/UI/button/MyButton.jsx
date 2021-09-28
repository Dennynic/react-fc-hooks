import React from 'react';
import classes from './MyButton.module.css';

export default function MyButton({ children, className, ...props }) {
  const classButton = className ? className : classes.myBtn;
  return (
    <button {...props} className={classButton}>
      {children}
    </button>
  );
}
