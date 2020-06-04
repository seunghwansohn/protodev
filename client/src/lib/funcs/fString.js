export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export const spacelize = (str) => {
  var result = str.replace( /([A-Z])/g, " $1" );
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult
}