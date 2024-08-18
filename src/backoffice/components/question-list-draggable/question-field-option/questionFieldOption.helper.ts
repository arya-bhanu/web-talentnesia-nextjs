export const createOptionId = (val: string) => {
  const arrVal = val.toLowerCase().split(' ');
  return arrVal.join('_');
};
