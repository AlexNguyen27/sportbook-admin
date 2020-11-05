export function truncateMultilineString(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const descriptionArr = text.split(" ");
  const wordArr = [];

  let resultString = "";
  for (let i = 0; i < descriptionArr.length; i += 1) {
    wordArr.push(`${descriptionArr[i]} `);
    resultString += `${descriptionArr[i]} `;
    if (resultString.length > maxLength) {
      wordArr.pop(); // remove last element
      break;
    }
  }

  resultString = "";
  wordArr.forEach((word) => {
    resultString += word;
  });

  return `${resultString.trim()}...`;
}

export function capitalizeSnakeCase(text) {
  return text
    .split(/(?=[A-Z])/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function trimObjProperties(obj) {
  return Object.keys(obj).reduce((acc, curr) => {
    acc[curr] = obj[curr].trim()
    return acc;
  }, {});
}
