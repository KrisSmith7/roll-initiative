const jwt = require('jsonwebtoken');

// secret and expiry can be changed if we want
const secret = 'roll4deception';
const expiration = '1h';

// barebones export, haven't tailored to our app
module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
//   signToken args will change based on our User model 
  signToken: function ({ /* insert args here */ }) {
    const payload = { /* pulled from args */ };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
