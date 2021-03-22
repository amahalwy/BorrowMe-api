const validArray = (arr: string | any[]) => {
  return Array.isArray(arr) && arr.length > 0;
};

export default validArray;
