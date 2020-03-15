const initialId = 0;

module.exports = (id = null) => {
  let currentId;
  if (id) {
    currentId = id;
  } else {
    currentId = initialId;
  }
  return (rows = []) => {
    return rows.map(row => {
      currentId++;
      return {
        id: currentId,
        created_at: new Date(),
        updated_at: new Date(),
        ...row
      };
    });
  };
};
