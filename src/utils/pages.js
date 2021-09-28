export const getPageCount = (totalPosts, limitPerRage) => {
  const limit = limitPerRage !== 0 ? limitPerRage : totalPosts;
  return Math.ceil(totalPosts / limit);
};

export const getPagesArray = totalPages => {
  let pagesArray = [];

  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }
  return pagesArray;
};
