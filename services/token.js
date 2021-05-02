'use strict'

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign({
        data: payload,
    },
        '49dd49f4-b472-43d7-a0e5-d1dfd073ef15', { expiresIn: '1d' }
    );
}

module.exports = {
    generate: generateToken,
}