import React from 'react';
import MyButton from '../button/MyButton';
import { getPagesArray } from '../../../utils/pages';

export default function Pagination({ totalPages, page, changePage }) {
  const pagesArray = getPagesArray(totalPages);
  return (
    <div className="page__block">
      {pagesArray.map(pageUnit => {
        return (
          <MyButton
            onClick={() => changePage(pageUnit)}
            className={page === pageUnit ? 'page_current' : 'page_button'}
            key={pageUnit}
          >
            {pageUnit}
          </MyButton>
        );
      })}
    </div>
  );
}
