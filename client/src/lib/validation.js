export const hasWhiteSpace = (s) => {
    return s.indexOf(' ') >= 0;
}
  
export const maxValue = (value, min) => {
    return value && value > Math.pow(10, min) ? true : false
}
  