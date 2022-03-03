const jwt = require('jsonwebtoken');

/**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @param { import("express").NextFunction } next
* */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'token not provided' });
  }

  // Bearer jojojo
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET)

    req.userId = decoded.id;

    return next();
  } catch (e) {
    return res.status(401).send({ error: 'invalid token' });
  }
};
