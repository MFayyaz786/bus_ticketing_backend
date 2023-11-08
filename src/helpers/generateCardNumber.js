const crypto = require('crypto');

const generateCardNumber=()=>{
  const currentTimestamp = Date.now().toString();
  const randomNumber = crypto.randomBytes(4).toString('hex');
  return currentTimestamp + randomNumber;
}

console.log(generateCardNumber());

module.exports = generateCardNumber;
