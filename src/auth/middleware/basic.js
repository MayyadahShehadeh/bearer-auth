'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js')

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
  // { return _authError(); }
  next('No Authorization info');
  return;}
  let basic = req.headers.authorization;
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await user.authenticateBasic(username, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

