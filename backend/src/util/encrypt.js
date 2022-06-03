const bcrypt = require("bcrypt");

async function encryptPassword(password) {
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) reject(err);

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
  return encryptedPassword;
}

async function comparePassword(password, encryptedPassword) {
  const doPasswordsMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, function (err, passwordsMatch) {
      if (err) reject(err);

      resolve(passwordsMatch);
    });
  });
  return doPasswordsMatch;
}

module.exports = { encryptPassword, comparePassword };
