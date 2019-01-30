export default function sortItems(item) {
  let sortOrder = 1;
  let currItem;

  if (item[0] === '-') {
    sortOrder = -1;
    currItem = item.substr(1);
  }
  return (a, b) => {
    if (sortOrder === -1) {
      return b[item].localeCompare(a[currItem]);
    }
    return a[item].localeCompare(b[currItem]);
  };
}
