const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;

function encode(num) {
  if (num === 0) return ALPHABET[0];
  
  let encoded = '';
  while (num > 0) {
    encoded = ALPHABET[num % BASE] + encoded;
    num = Math.floor(num / BASE);
  }
  
  return encoded;
}

module.exports = {
  encode,
};
