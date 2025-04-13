export const getCids = () => {
  return JSON.parse(localStorage.getItem('cids')) || [];
};

export const saveCid = (cidObj) => {
  const current = getCids();
  const updated = [...current, cidObj];
  localStorage.setItem('cids', JSON.stringify(updated));
};
