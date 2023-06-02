exports.query_gen = (data) => {
  const keys = Object.keys(data);
  let updateQuery = "";

  keys.forEach((key, index) => {
    if (data[key] === "") return;
    if (index !== 0) {
      updateQuery += ", ";
    }

    const value = data[key];
    const cleanedStr = typeof value === 'string' ? value.replace('"', '//"') : value;

    updateQuery += `${key}="${cleanedStr}"`;
  });

  return updateQuery;
};