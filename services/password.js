'use strict'


const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (myPlaintextPassword) => {
    return bcrypt.hash(myPlaintextPassword, saltRounds);

}

const verifyPassword = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}


module.exports = {
    hash: hashPassword,
    password: verifyPassword,
};
