export const createBoard = () => {
    const arr = [];
  
    // Creating a two-dimensional array filled with null
    for (let i = 0; i < 9; i++) {
      arr[i] = [];
      for (let j = 0; j < 10; j++) {
        arr[i].push('null');
      }
      arr.push(arr[i]);
    }
    return arr;
  };
