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

export const figuredNumber = (figure, chr) => {
  let result = ''
  if (figure == 'round') {
      var condition = {
          1 : '①',
          2 : '②',
          3 : '③',
          4 : '④'
      }
      result = condition[chr]
  }
  return result
}