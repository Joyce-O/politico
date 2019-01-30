const sortItems = item => {
  let sortOrder = 1;

  if (item[0] === '-') {
    sortOrder = -1;
    item = item.substr(1);
  }
  return (a, b) => {
    if (sortOrder === -1) {
      return b[item].localeCompare(a[item]);
    }
    return a[item].localeCompare(b[item]);
  };
};
export default sortItems;
