export const getWord = (singularWord = '', value = 0) => {
  value = Number(value);

  return `${singularWord}${value === 1 ? '' : 's'}`;
};
