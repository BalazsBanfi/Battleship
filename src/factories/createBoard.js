// Creating a two-dimensional array filled with null
export const createBoard = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    let temp = [];
    for (let j = 0; j < 10; j++) {
      temp[j] = 'null';
    }
    arr.push(temp);
  }
  return arr;
};