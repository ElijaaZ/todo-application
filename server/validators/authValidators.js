const { check, validationResult } = require('express-validator');

exports.registerValidator = [
  check('username', 'Username must be at least 6 characters long.').isLength({ min: 6 }),
  check('email', 'Valid email is required.').isEmail(),
  check('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }),
  check('repeatPassword', 'Passwords do not match.').custom((value, { req }) => value === req.body.password),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.signinValidator = [
  check('username', 'Username  is required.').notEmpty(),
  check('password', 'Password is required.').notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];