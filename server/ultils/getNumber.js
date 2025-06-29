
const getNumber = (str) => {
  // Check if the string is empty
  if (!str) {
    return null;
  }

  let numb = str.match(/\d/g);
  numb = numb.join("");

  return numb;
}

module.exports = getNumber;