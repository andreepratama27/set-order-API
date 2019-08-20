const validateUser = (req, res, next) => {
  console.log(req.headers);
  let token = req.headers['authorization'] || req.headers['x-access-token'];

  if (token.startsWith('Bearer')) {
    token = token.substr(7, token.length);
  }

  if (token) {
    jwt.verify(req.headers['authorization'], 'secret_key', (err, decoded) => {
      if (err) {
        res.status(500).json({success: false, message: err.message, data: {}});
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } else {
    res
      .status(500)
      .json({success: false, message: 'Token not provided', data: {}});
  }
};

module.export = {
  validateUser,
};
