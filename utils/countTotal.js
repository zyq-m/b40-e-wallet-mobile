export const countTotal = arr => {
  let temp = 0;
  arr.forEach(({ amount }) => {
    temp += parseInt(amount);
  });

  return temp;
};
