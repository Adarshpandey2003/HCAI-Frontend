export function isEmail(str) {
  // avoid the literal regex parser hiccup by using the RegExp constructor
  const emailRe = new RegExp('\\S+@\\S+\\.\\S+');
  return emailRe.test(str);
}
